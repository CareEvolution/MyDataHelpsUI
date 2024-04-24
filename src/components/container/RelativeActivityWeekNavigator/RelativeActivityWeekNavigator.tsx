import React, { useEffect, useState } from "react";
import { DailyDataQueryResult, DailyDataType, queryDailyData } from "../../../helpers/query-daily-data";
import { ColorDefinition } from "../../../helpers/colors";
import { SparkBarChart, SparkBarChartBar, WeekCalendar } from "../../presentational";
import { add, startOfDay } from "date-fns";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { useInitializeView } from "../../../helpers/Initialization";
import getDayKey from "../../../helpers/get-day-key";

export interface RelativeActivityWeekNavigatorProps {
    selectedDate: Date;
    onDateSelected(date: Date): void;
    dataTypes: WeeklyRelativeActivityDataType[];
    previewState?: "default";
}

export interface WeeklyRelativeActivityDataType {
    dailyDataType: DailyDataType;
    threshold: number;
    color?: ColorDefinition;
    overthresholdColor?: ColorDefinition;
}

export default function (props: RelativeActivityWeekNavigatorProps) {
    let [weekStart, setWeekStart] = useState<Date>(add(startOfDay(new Date()), { days: -6 }));
    let [dailyData, setDailyData] = useState<{ [key: string]: DailyDataQueryResult }>({});
    let [loadedWeeks, setLoadedWeeks] = useState<string[]>([]);

    function loadData() {
        if (loadedWeeks.includes(getDayKey(weekStart))) {
            return;
        }

        function queryData() {
            if (props.previewState === "default") {
                let result = props.dataTypes.map(dataType => {
                    let data: DailyDataQueryResult = {};
                    let currentDate = new Date(weekStart);
                    for (let i = 0; i < 7; i++) {
                        let dayKey = getDayKey(currentDate);
                        data[dayKey] = Math.random() * dataType.threshold * 2;
                        currentDate = add(currentDate, { days: 1 });
                    }
                    return data;
                });
                return Promise.resolve(result);
            }

            let promises = props.dataTypes.map(dataType => queryDailyData(dataType.dailyDataType, weekStart, add(weekStart, { days: 7 })));
            return Promise.all(promises).then(results => {
                return results;
            });
        }

        queryData().then((results) => {
            let resultsMap: { [key: string]: DailyDataQueryResult } = { ...dailyData };
            results.forEach((result, index) => {
                let newResult = { ...dailyData[props.dataTypes[index].dailyDataType], ...result };
                resultsMap[props.dataTypes[index].dailyDataType] = newResult;
            });
            setDailyData(resultsMap);
            setLoadedWeeks([...loadedWeeks, getDayKey(weekStart)]);
        });

        if (props.previewState === "default") {
            setDailyData({});
            return;
        };
    }

    useEffect(() => {
        loadData();
    }, [weekStart]);

    useInitializeView(() => {
        loadData();
        MyDataHelps.on("externalAccountSyncComplete", loadData);
        MyDataHelps.on("applicationDidBecomeVisible", loadData);
        return () => {
            MyDataHelps.off("externalAccountSyncComplete", loadData);
            MyDataHelps.off("applicationDidBecomeVisible", loadData);
        }
    }, ['externalAccountSyncComplete'], [props.dataTypes, props.previewState]);

    let dayRenderer = function (year: number, month: number, day: number, selectedWeek: boolean) {
        var date = new Date(year, month, day);
        var dayKey = getDayKey(date);
        let bars: SparkBarChartBar[] = props.dataTypes.map(dataType => {
            let value = dailyData[dataType.dailyDataType]?.[dayKey] ?? 0;
            let color = dataType.color || "var(--mdhui-color-primary)";
            if (value > dataType.threshold && dataType.overthresholdColor) {
                color = dataType.overthresholdColor;
            }

            return {
                color: color,
                barFillPercent: value / (dataType.threshold * 2)
            }
        });

        return <SparkBarChart
            averageFillPercent={50}
            bars={bars} />
    }

    return <WeekCalendar
        startDate={weekStart}
        selectedDate={props.selectedDate}
        onDateSelected={(d) => props.onDateSelected(d)}
        onStartDateChange={(d) => setWeekStart(d)}
        dayRenderer={dayRenderer}
        loading={!loadedWeeks.includes(getDayKey(weekStart))} />
}