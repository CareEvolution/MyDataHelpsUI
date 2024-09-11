import React, { createContext, DependencyList, useContext, useState } from 'react';
import { computeGlucoseReadingRanges, computeGlucoseReadingRecentAverage, getDayKey, getGlucoseReadings, Reading, ReadingRange } from '../../../helpers';
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
    recentAverage?: number;
}

export const GlucoseContext = createContext<GlucoseContext | null>(null);

export default function (props: GlucoseDayCoordinatorProps) {
    const [glucoseReadings, setGlucoseReadings] = useState<Reading[]>();
    const [glucoseRanges, setGlucoseRanges] = useState<ReadingRange[]>();
    const [recentAverage, setRecentAverage] = useState<number>();

    const loadData = async (startDate: Date, endDate: Date): Promise<void> => {
        const readings = props.previewState ?
            await previewData(props.previewState, startDate, endDate) :
            await getGlucoseReadings(startDate, endDate);

        setGlucoseReadings(readings);
        setGlucoseRanges(computeGlucoseReadingRanges(readings));
        setRecentAverage(computeGlucoseReadingRecentAverage(readings, add(startDate, { days: 14 })));
    };

    const glucoseRangeLookup = glucoseRanges?.reduce((lookup, range) => {
        const dayKey = getDayKey(range.date);
        lookup[dayKey] = range;
        return lookup;
    }, {} as { [key: string]: ReadingRange });

    const dayRenderer = (dayKey: string): React.JSX.Element | null => {
        let sparkRanges: SparkRangeChartRange[] = [];
        if (glucoseRangeLookup?.hasOwnProperty(dayKey)) {
            sparkRanges.push({ ...(glucoseRangeLookup[dayKey]) });
        }
        return <div style={{ paddingTop: '4px' }}>
            <SparkRangeChart domain={[0, 240]} ranges={sparkRanges} reference={recentAverage} />
        </div>;
    };

    return <div ref={props.innerRef}>
        <GlucoseContext.Provider value={{ readings: glucoseReadings, recentAverage: recentAverage }}>
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