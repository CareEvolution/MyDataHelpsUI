import React, { useState } from "react";
import { DailyDataQueryResult, queryDailyData } from "../../../helpers/query-daily-data";
import { SparkBarChart, SparkBarChartBar, WeekCalendar } from "../../presentational";
import { add, addDays, startOfDay } from "date-fns";
import { useInitializeView } from "../../../helpers/Initialization";
import getDayKey from "../../../helpers/get-day-key";
import { RelativeActivityDataType } from "../RelativeActivity/RelativeActivity";

export interface RelativeActivityWeekNavigatorProps {
    selectedDate: Date;
    onDateSelected(date: Date): void;
    dataTypes: RelativeActivityDataType[];
    previewState?: "default";
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: RelativeActivityWeekNavigatorProps) {
    let [weekStart, setWeekStart] = useState<Date>(add(startOfDay(new Date()), { days: -6 }));
    let [dailyData, setDailyData] = useState<{ [key: string]: DailyDataQueryResult } | null>(null);

    function loadData() {
        if (!props.dataTypes.length) return;

        function queryData() {
            if (props.previewState === "default") {
                let result = props.dataTypes.map(dataType => {
                    let data: DailyDataQueryResult = {};
                    for (let i = -7; i < 7; i++) {
                        let dayKey = getDayKey(add(weekStart, { days: i }));
                        data[dayKey] = Math.random() * dataType.threshold * 2;
                    }
                    return data;
                });
                return Promise.resolve(result);
            }

            let promises = props.dataTypes.map(dataType => queryDailyData(dataType.dailyDataType, add(weekStart, { days: -7 }), add(weekStart, { days: 7 })));
            return Promise.all(promises).then(results => {
                return results;
            });
        }

        queryData().then((results) => {
            let resultsMap: { [key: string]: DailyDataQueryResult } = { ...dailyData };
            let currentDailyData = dailyData || {};
            results.forEach((result, index) => {
                let newResult = { ...currentDailyData[props.dataTypes[index].dailyDataType], ...result };
                resultsMap[props.dataTypes[index].dailyDataType] = newResult;
            });
            setDailyData(resultsMap);
        });

        if (props.previewState === "default") {
            setDailyData({});
            return;
        };
    }
    useInitializeView(() => {
        loadData();
    }, ['externalAccountSyncComplete'], [props.dataTypes, props.previewState, weekStart]);

    let dayRenderer = function (year: number, month: number, day: number, selectedWeek: boolean) {
        if (!props.dataTypes.length) { return null; }

        var date = new Date(year, month, day);
        var dayKey = getDayKey(date);
        let bars: SparkBarChartBar[] = props.dataTypes.map(dataType => {
            if (!dailyData) {
                return { color: "var(--mdhui-color-primary)", barFillPercent: 0 };
            }
            let value = dailyData[dataType.dailyDataType]?.[dayKey] ?? 0;
            let color = dataType.color || "var(--mdhui-color-primary)";
            if (value > dataType.threshold && dataType.overThresholdColor) {
                color = dataType.overThresholdColor;
            }

            let fillPercent = value / (dataType.threshold * 2);
            if (fillPercent > 1) { fillPercent = 1; }
            return {
                color: color,
                barFillPercent: fillPercent
            }
        });

        return <div style={{ paddingTop: "8px" }}>
            <SparkBarChart
                averageFillPercent={0.5}
                bars={bars} /></div>
    }

    let weekStartChanged = function (weekStart: Date) {
        setWeekStart(weekStart);
        props.onDateSelected(addDays(weekStart, 6));
    }

    return <WeekCalendar
        innerRef={props.innerRef}
        startDate={weekStart}
        selectedDate={props.selectedDate}
        onDateSelected={(d) => props.onDateSelected(d)}
        onStartDateChange={(d) => weekStartChanged(d)}
        dayRenderer={dayRenderer}
        loading={!dailyData} />
}