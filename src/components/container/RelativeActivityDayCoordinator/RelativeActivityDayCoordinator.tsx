import React, { createContext, useState } from 'react';
import { checkDailyDataAvailability, queryRelativeActivity, RelativeActivityDataType, RelativeActivityQueryResult, useInitializeView } from '../../../helpers';
import { startOfToday } from 'date-fns';
import { DateRangeContext, LoadingIndicator, SparkBarChart, SparkBarChartBar } from '../../presentational';
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
    const [currentDateContext, setCurrentContext] = useState<DateRangeContext>({ intervalStart: startOfToday(), intervalType: 'Day' });

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

    const loadData = (startDate: Date, endDate: Date) => {
        if (!props.dataTypes.length) return;
        queryRelativeActivity(startDate, endDate, props.dataTypes, !!props.previewState).then(results => {
            setRelativeActivityData(results);
        });
    };

    const dayRenderer = (dayKey: string) => {
        if (!props.dataTypes.length) return null;

        let bars: SparkBarChartBar[] = props.dataTypes.map(dataType => {
            if (!relativeActivityData || !relativeActivityData[dataType.dailyDataType] || !relativeActivityData[dataType.dailyDataType][dayKey]) {
                return { color: 'var(--mdhui-color-primary)', barFillPercent: 0 };
            }

            const value = relativeActivityData[dataType.dailyDataType][dayKey].value || 0;
            let color = dataType.color || 'var(--mdhui-color-primary)';
            if (dataType.threshold !== undefined && dataType.threshold !== '30DayAverage' && value > dataType.threshold && dataType.overThresholdColor) {
                color = dataType.overThresholdColor;
            }

            return {
                color: color,
                barFillPercent: relativeActivityData[dataType.dailyDataType][dayKey].relativePercent
            }
        });

        return <div style={{ paddingTop: '8px' }}>
            <SparkBarChart
                averageFillPercent={0.5}
                bars={bars}
            />
        </div>;
    };

    return <div ref={props.innerRef}>
        {!availableDataTypes && <LoadingIndicator />}
        {availableDataTypes &&
            <RelativeActivityContext.Provider value={{ dataTypes: availableDataTypes, data: relativeActivityData }}>
                <DateRangeContext.Provider value={currentDateContext}>
                    <WeeklyDayNavigator
                        selectedDate={currentDateContext.intervalStart}
                        onDateSelected={(d) => setCurrentContext({ ...currentDateContext, intervalStart: d })}
                        loadData={loadData}
                        dayRenderer={dayRenderer}
                        dependencies={[props.previewState, props.dataTypes]}
                        loading={!relativeActivityData}
                        innerRef={props.innerRef}
                    />
                    {relativeActivityData && props.children}
                </DateRangeContext.Provider>
            </RelativeActivityContext.Provider>
        }
    </div>;
}