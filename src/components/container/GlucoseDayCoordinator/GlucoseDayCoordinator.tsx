import React, { createContext, DependencyList, useContext, useState } from 'react';
import { getColorFromAssortment, getDayKey, getGlucoseReadings, Reading } from '../../../helpers';
import { add, startOfToday } from 'date-fns';
import { DateRangeContext, DateRangeCoordinator, SparkRangeChart, SparkRangeChartRange } from '../../presentational';
import { WeeklyDayNavigator } from '../../container';
import { GlucoseDayCoordinatorPreviewState, previewData } from './GlucoseDayCoordinator.previewData';

export interface GlucoseDayCoordinatorProps {
    previewState?: GlucoseDayCoordinatorPreviewState;
    children?: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export interface GlucoseContext {
    readings?: Reading[];
}

export const GlucoseContext = createContext<GlucoseContext | null>(null);

export default function (props: GlucoseDayCoordinatorProps) {
    const [glucoseReadings, setGlucoseReadings] = useState<Reading[]>();
    const [glucoseRanges, setGlucoseRanges] = useState<{ [key: string]: SparkRangeChartRange }>();
    const [recentAverage, setRecentAverage] = useState<number>();

    const loadData = async (startDate: Date, endDate: Date): Promise<void> => {
        if (props.previewState) {
            const { ranges, recentAverage } = await previewData(props.previewState, startDate, endDate);
            setGlucoseRanges(ranges);
            setRecentAverage(recentAverage);
            return;
        }

        const readings = await getGlucoseReadings(startDate, endDate);

        const readingsLookup: { [key: string]: number[] } = readings.reduce((lookup, reading) => {
            let dayKey = getDayKey(reading.timestamp);
            if (!lookup.hasOwnProperty(dayKey)) {
                lookup[dayKey] = [];
            }
            lookup[dayKey].push(reading.value);
            return lookup;
        }, {} as { [key: string]: number[] });

        let colorIndex = 0;
        let ranges = Object.keys(readingsLookup).reduce((lookup, dayKey) => {
            const readings = readingsLookup[dayKey];
            lookup[dayKey] = {
                min: Math.min(...readings),
                max: Math.max(...readings),
                average: readings.reduce((total, current) => total + current, 0) / readings.length,
                color: getColorFromAssortment(colorIndex++)
            };
            return lookup;
        }, {} as { [key: string]: SparkRangeChartRange });

        const weekStart = add(startDate, { days: 7 });
        const weekEnd = add(startDate, { days: 6 });

        let readingTotal = 0;
        let readingCount = 0;
        let currentDate = weekStart;
        while (currentDate <= weekEnd) {
            let dayKey = getDayKey(currentDate);
            if (readingsLookup.hasOwnProperty(dayKey)) {
                readingsLookup[dayKey].forEach(reading => {
                    readingTotal += reading;
                    readingCount++;
                });
            }
            currentDate = add(currentDate, { days: 1 });
        }

        setGlucoseReadings(readings);
        setGlucoseRanges(ranges);
        if (readingCount > 0) {
            setRecentAverage(readingTotal / readingCount);
        }
    };

    const dayRenderer = (dayKey: string): React.JSX.Element | null => {
        let ranges = [];
        if (glucoseRanges?.hasOwnProperty(dayKey)) {
            ranges.push(glucoseRanges![dayKey]);
        }
        return <div style={{ paddingTop: '4px' }}>
            <SparkRangeChart domain={[0, 240]} ranges={ranges} reference={recentAverage} />
        </div>;
    };

    return <div ref={props.innerRef}>
        <GlucoseContext.Provider value={{ readings: glucoseReadings }}>
            <DateRangeCoordinator initialIntervalStart={startOfToday()} intervalType="Day" useCustomNavigator={true}>
                <CustomNavigator
                    loadData={loadData}
                    dayRenderer={dayRenderer}
                    dependencies={[props.previewState]}
                />
                {glucoseRanges && props.children}
            </DateRangeCoordinator>
        </GlucoseContext.Provider>
    </div>;
}

interface CustomNavigatorProps {
    loadData: (startDate: Date, endDate: Date) => Promise<void>;
    dayRenderer: (dayKey: string) => React.JSX.Element | null;
    dependencies?: DependencyList;
}

function CustomNavigator(props: CustomNavigatorProps) {
    const dateRangeContext = useContext(DateRangeContext)

    return <WeeklyDayNavigator
        selectedDate={dateRangeContext!.intervalStart}
        loadData={props.loadData}
        dayRenderer={props.dayRenderer}
        dependencies={props.dependencies}
    />;
}