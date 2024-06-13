import React, { useState } from "react";
import { SparkBarChart, SparkBarChartBar, WeekCalendar } from "../../presentational";
import { add, isSameDay, startOfDay } from "date-fns";
import { useInitializeView } from "../../../helpers/Initialization";
import getDayKey from "../../../helpers/get-day-key";
import { RelativeActivityDataType, RelativeActivityQueryResult } from "../../../helpers";
import { queryRelativeActivity } from "../../../helpers/relative-activity";

export interface RelativeActivityDayNavigatorProps {
    selectedDate: Date;
    onDateSelected(date: Date): void;
    dataTypes: RelativeActivityDataType[];
    previewState?: "default";
    innerRef?: React.Ref<HTMLDivElement>;
    onDataLoaded?(data: { [key: string]: { [key: string]: RelativeActivityQueryResult } }): void;
    keyType?: RelativeActivityDataType;
    keyTypeIcon?: React.ReactNode;
}

export default function (props: RelativeActivityDayNavigatorProps) {
    let [today, setToday] = useState<Date>(startOfDay(new Date()));
    let [weekStart, setWeekStart] = useState<Date>(add(startOfDay(new Date()), { days: -6 }));
    let [dailyData, setDailyData] = useState<{ [key: string]: { [key: string]: RelativeActivityQueryResult } } | null>(null);

    function loadData() {
        if (!props.dataTypes.length) return;

        queryRelativeActivity(add(weekStart, { days: -7 }), add(weekStart, { days: 7 }), props.dataTypes, !!props.previewState).then(results => {
            setDailyData(results);
            props.onDataLoaded?.(results);
        });
    }
    useInitializeView(() => {
        //ensure we reload when it passes midnight
        if (!isSameDay(today, startOfDay(new Date()))) {
            setWeekStart(add(startOfDay(new Date()), { days: -6 }));
            setToday(startOfDay(new Date()));
        }

        loadData();
    }, ['externalAccountSyncComplete'], [props.dataTypes, props.previewState, weekStart]);

    let dayRenderer = function (year: number, month: number, day: number, selectedWeek: boolean) {
        if (!props.dataTypes.length) { return null; }

        var date = new Date(year, month, day);
        var dayKey = getDayKey(date);
        let bars: SparkBarChartBar[] = props.dataTypes.filter(d => d != props.keyType).map(dataType => {
            if (!dailyData || !dailyData[dataType.dailyDataType] || !dailyData[dataType.dailyDataType][dayKey]) {
                return { color: "var(--mdhui-color-primary)", barFillPercent: 0 };
            }
            let value = dailyData[dataType.dailyDataType][dayKey].value || 0;
            let color = dataType.color || "var(--mdhui-color-primary)";
            if (dataType.threshold != "30DayAverage" &&
                dataType.threshold !== undefined &&
                value > dataType.threshold &&
                dataType.overThresholdColor) {
                color = dataType.overThresholdColor;
            }

            return {
                color: color,
                barFillPercent: dailyData[dataType.dailyDataType][dayKey].relativePercent
            }
        });


        function getGlucoseRangeThing() {
            let glucoseMin = Math.random() * 50;
            let glucoseMax = glucoseMin + 50 + Math.random() * 90;
            let randomAverage = glucoseMin + (glucoseMax - glucoseMin) / 2 - 10 + Math.random() * 20;

            return <div className="glucose-range-container">
                <div className="average-line"></div>
                <div className="glucose-range" style={{ bottom: (glucoseMin / 170) * 100 + "%", height: ((glucoseMax - glucoseMin) / 170) * 100 + "%" }}>
                    <div className="glucose-range-mid" style={{ bottom: Math.random() * 40 + 30 + "%" }}></div>
                    <div className="glucose-range-top"></div>
                    <div className="glucose-range-bottom"></div>
                </div>
            </div>
        }

        let keyValue = dailyData && props.keyType && dailyData[props.keyType.dailyDataType] && dailyData[props.keyType.dailyDataType][dayKey];
        return <div style={{ paddingTop: "8px" }}>
            {getGlucoseRangeThing()}

            {/* {keyValue && <div style={{ alignItems: "center", fontSize: "12px", display: "flex", justifyContent: "center", gap: "4px", marginBottom: "4px" }}>
                {props.keyTypeIcon}
                <div>{keyValue.value}</div>
            </div>} */}
            {/* <SparkBarChart
                averageFillPercent={0.5}
                bars={bars} /> */}
        </div>
    }

    let weekStartChanged = function (weekStart: Date) {
        setWeekStart(weekStart);
        props.onDateSelected(add(weekStart, { days: 6 }));
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