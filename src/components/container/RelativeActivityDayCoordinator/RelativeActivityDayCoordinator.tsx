import React, { createContext, DependencyList, useContext, useState } from 'react';
import { checkDailyDataAvailability, queryRelativeActivity, RelativeActivityDataType, RelativeActivityQueryResult, useInitializeView } from '../../../helpers';
import { startOfToday } from 'date-fns';
import { DateRangeContext, DateRangeCoordinator, LoadingIndicator, SparkBarChart, SparkBarChartBar } from '../../presentational';
import { WeeklyDayNavigator } from '../../container';

export interface RelativeActivityDayCoordinatorProps {
    innerRef?: React.Ref<HTMLDivElement>;
    dataTypes: RelativeActivityDataType[];
    previewState?: 'default';
    children?: React.ReactNode;
}

export interface RelativeActivityContext {
    dataTypes: RelativeActivityDataType[];
    data?: { [key: string]: { [key: string]: RelativeActivityQueryResult } };
}

export const RelativeActivityContext = createContext<RelativeActivityContext | null>(null);

export default function RelativeActivityDateRangeCoordinator(props: RelativeActivityDayCoordinatorProps) {
    const [availableDataTypes, setAvailableDataTypes] = useState<RelativeActivityDataType[]>();
    const [relativeActivityData, setRelativeActivityData] = useState<{ [key: string]: { [key: string]: RelativeActivityQueryResult } }>();

    const checkAvailableDataTypes = () => {
        if (props.previewState === 'default') {
            setAvailableDataTypes(props.dataTypes);
            return;
        }

        const promises = props.dataTypes.map(dataType => checkDailyDataAvailability(dataType.dailyDataType));
        Promise.all(promises).then(results => {
            setAvailableDataTypes(props.dataTypes.filter((_, index) => results[index]));
        });
    };

    useInitializeView(() => {
        checkAvailableDataTypes();
    }, ['externalAccountSyncComplete'], [props.dataTypes, props.previewState]);

    const loadData = async (startDate: Date, endDate: Date): Promise<void> => {
        if (!props.dataTypes.length) return Promise.resolve();
        setRelativeActivityData(await queryRelativeActivity(startDate, endDate, props.dataTypes, !!props.previewState));
    };

    const dayRenderer = (dayKey: string): React.JSX.Element | null => {
        if (!props.dataTypes.length || !availableDataTypes?.length) return null;

        let bars: SparkBarChartBar[] = availableDataTypes.map(dataType => {
            const dataForDay = relativeActivityData?.[dataType.dailyDataType]?.[dayKey];
            const relativePercent = dataForDay?.relativePercent ?? 0;
            if (relativePercent === undefined) {
                return { color: 'var(--mdhui-color-primary)', barFillPercent: 0 };
            }

            const value = dataForDay?.value ?? 0;
            let color = dataType.color || 'var(--mdhui-color-primary)';
            if (dataType.threshold !== undefined && dataType.threshold !== '30DayAverage' && value > dataType.threshold && dataType.overThresholdColor) {
                color = dataType.overThresholdColor;
            }

            return {
                color: color,
                barFillPercent: relativePercent
            };
        });

        return <div style={{ paddingTop: '8px' }}>
            <SparkBarChart averageFillPercent={0.5} bars={bars} />
        </div>;
    };

    return <div ref={props.innerRef}>
        {!availableDataTypes && <LoadingIndicator />}
        {availableDataTypes &&
            <RelativeActivityContext.Provider value={{ dataTypes: availableDataTypes, data: relativeActivityData }}>
                <DateRangeCoordinator initialIntervalStart={startOfToday()} intervalType="Day" useCustomNavigator={true}>
                    <RelativeActivityDayNavigator
                        loadData={loadData}
                        dayRenderer={dayRenderer}
                        dependencies={[props.previewState, props.dataTypes]}
                    />
                    {relativeActivityData && props.children}
                </DateRangeCoordinator>
            </RelativeActivityContext.Provider>
        }
    </div>;
}

interface RelativeActivityDayNavigatorProps {
    loadData: (startDate: Date, endDate: Date) => Promise<void>;
    dayRenderer: (dayKey: string) => React.JSX.Element | null;
    dependencies?: DependencyList;
}

function RelativeActivityDayNavigator(props: RelativeActivityDayNavigatorProps) {
    const dateRangeContext = useContext(DateRangeContext)

    return <WeeklyDayNavigator
        selectedDate={dateRangeContext!.intervalStart}
        loadData={props.loadData}
        dayRenderer={props.dayRenderer}
        dependencies={props.dependencies}
    />;
}