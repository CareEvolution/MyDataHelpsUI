import "./BloodPressureVisualization.css";
import { useState } from "react";
import React from "react";
import { DateRangeNavigator, LoadingIndicator, Title } from "../../presentational";
import DumbbellChart from "../../presentational/DumbbellChart";
import { Dumbbell, ClosedInterval, Axis, DataPoint, DumbbellClass } from "../../presentational/DumbbellChart/DumbbellChart";
import { addDays, format, startOfDay } from "date-fns";
import language from "../../../helpers/language";
import { previewBloodPressureDataPoint } from "./BloodPressureVisualization.previewdata";
import { WeekStartsOn, getWeekStart } from "../../../helpers/get-interval-start";
import { useInitializeView } from "../../../helpers/Initialization";
import { BloodPressureDataPoint, bloodPressureDataProvider, SurveyBloodPressureDataParameters } from "../../../helpers/blood-pressure-data-providers";


enum Category { "Low", "Normal", "Elevated", "Stage 1", "Stage 2", "Crisis", "Unknown" };
export type BloodPressurePreviewState = "Default" | "NoData" | "Loading";

export interface BloodPressureVisualizationProps {
    previewState?: BloodPressurePreviewState,
    surveyDataSource: SurveyBloodPressureDataParameters,
    weekStartsOn?: WeekStartsOn
};

interface BloodPressureDumbbell {
    date: Date,
    dumbbell: Dumbbell,
    averageSystolic: number,
    averageDiastolic: number
};

interface BloodPressureMetrics {
    averageSystolic?: number,
    averageSystolicAlert?: string,
    averageSystolicAlertClass: string,
    averageDiastolic?: number,
    averageDiastolicAlert?: string,
    averageDiastolicAlertClass: string,
    maxSystolic?: number,
    maxSystolicAlert?: string,
    maxSystolicAlertClass: string,
    minDiastolic?: number,
    minDiastolicAlert?: string,
    minDiastolicAlertClass: string
}

export default function (props: BloodPressureVisualizationProps) {
    const _minDiastolic = 0;
    const _maxSystolic = 250;
    const yInterval: ClosedInterval = { values: [_minDiastolic, _maxSystolic] };
    const axis: Axis = { yRange: yInterval, yIncrement: 50, xIncrement: (80 / 7) };
    const [bloodPressureData, setDataForGraph] = useState<Map<string, BloodPressureDumbbell> | undefined>(undefined);
    const [datePagerStartDate, setStartOfWeek] = useState<Date>(startOfDay(getWeekStart(props.weekStartsOn ?? "Monday")));

    async function initialize() {
        if (props.previewState !== "Loading") {
            if (["Default", "NoData"].includes(props.previewState ?? "")) {
                const params = (props.previewState === "Default") ? previewBloodPressureDataPoint : [];
                transformToGraphData(params);
            }
            else {
                bloodPressureDataProvider(props.surveyDataSource).then((bloodPressureDataPoints: BloodPressureDataPoint[]) => {
                    transformToGraphData(bloodPressureDataPoints);
                });
            }
        }
    }

    function transformToGraphData(bloodPressureDataPoints: BloodPressureDataPoint[]) {
        const bpByDayMap = createDumbbellsPerDay(bloodPressureDataPoints);
        setDataForGraph(bpByDayMap);
    }

    function createDumbbellsPerDay(bpDataPoints: BloodPressureDataPoint[]) {
        var dbs: Map<string, BloodPressureDumbbell> = new Map<string, BloodPressureDumbbell>;

        var bpByDate: Map<string, BloodPressureDataPoint[]> = new Map<string, BloodPressureDataPoint[]>();
        bpDataPoints.forEach((bpDataPoint) => {
            var exists = bpByDate.get(bpDataPoint.date.toString());
            if (exists) {
                exists.push(bpDataPoint);
            } else {
                bpByDate.set(bpDataPoint.date.toString(), [bpDataPoint]);
            }
        });

        bpByDate.forEach((bpDate, key, map) => {
            const keyDate = new Date(key);
            const systolicEntriesForDate = bpDate.map(e => e.systolic);
            const systolicInterval = buildInterval(systolicEntriesForDate);
            const systolicAverage = systolicEntriesForDate.reduce((a, b) => a + b) / systolicEntriesForDate.length;
            const diastolicEntriesForDate = bpDate.map(e => e.diastolic);
            const diastolicInterval = buildInterval(diastolicEntriesForDate);
            const diastolicAverage = diastolicEntriesForDate.reduce((a, b) => a + b) / diastolicEntriesForDate.length;
            const dataPoint: DataPoint = { dataSet1: diastolicInterval, dataSet2: systolicInterval };
            var db: Dumbbell = { dataPoint: dataPoint, xValue: format(keyDate, "MM/dd"), class: assignClass(systolicAverage, diastolicAverage) };
            dbs.set(key, { date: keyDate, dumbbell: db, averageSystolic: systolicAverage, averageDiastolic: diastolicAverage });
        });

        return dbs;
    }

    function pageWeeklyData(startOfWeek: Date) {
        const weekData: Dumbbell[] = [];
        if (bloodPressureData) {
            for (let i = 0; i < 7; i++) {
                var currentDate = startOfDay(addDays(startOfWeek, i));
                var dataForDay = bloodPressureData.get(currentDate.toString());
                if (!dataForDay) {
                    weekData.push({ xValue: format(currentDate, "MM/dd") });
                }
                else {
                    weekData.push(dataForDay.dumbbell);
                }
            }
        }

        return <DumbbellChart dumbbells={weekData} axis={axis} ></DumbbellChart>;
    }

    function pageWeeklyMetrics(startOfWeek: Date) {
        const metrics = getWeeklyAggregates(startOfWeek);

        return <div className="mdhui-blood-pressure-metrics">
            <div className="mdhui-blood-pressure-metrics-rows">
                {buildDetailBlock(language("systolic-average"), metrics.averageSystolicAlert, metrics.averageSystolicAlertClass, metrics.averageSystolic)}
                {buildDetailBlock(language("diastolic-average"), metrics.averageDiastolicAlert, metrics.averageDiastolicAlertClass, metrics.averageDiastolic)}
            </div>
            <div className="mdhui-blood-pressure-metrics-rows">
                {buildDetailBlock(language("highest-systolic"), metrics.maxSystolicAlert, metrics.maxSystolicAlertClass, metrics.maxSystolic)}
                {buildDetailBlock(language("lowest-diastolic"), metrics.minDiastolicAlert, metrics.minDiastolicAlertClass, metrics.minDiastolic)}
            </div>
        </div>;
    }

    function getWeeklyAggregates(startOfWeek: Date) {

        const start = startOfDay(startOfWeek);
        const end = startOfDay(addDays(startOfWeek, 6));
        let bpMetrics: BloodPressureMetrics = {
            averageDiastolicAlertClass: "",
            averageSystolicAlertClass: "",
            minDiastolicAlertClass: "",
            maxSystolicAlertClass: ""
        };

        if (!bloodPressureData) {
            return bpMetrics;
        }

        var dataForDateRange: BloodPressureDumbbell[] = [];
        for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
            const exists = bloodPressureData.get(startOfDay(d).toString());
            if (exists && exists.dumbbell.dataPoint) {
                dataForDateRange.push(exists);
            }
        }

        if (dataForDateRange.length === 0) {
            return bpMetrics;
        }

        let diastolicReadings = dataForDateRange.map(db => db.averageDiastolic);
        let diastolicWeeklyAvg = diastolicReadings.reduce((a, b) => a + b) / diastolicReadings.length;
        diastolicWeeklyAvg = Math.round(diastolicWeeklyAvg);
        let diastolicWeeklyAvgAlert = getDiastolicCategory(diastolicWeeklyAvg);

        let systolicReadings = dataForDateRange.map(db => db.averageSystolic);
        let systolicWeeklyAvg = systolicReadings.reduce((a, b) => a + b) / systolicReadings.length;
        systolicWeeklyAvg = Math.round(systolicWeeklyAvg);
        let systolicWeeklyAvgAlert = getSystolicCategory(systolicWeeklyAvg);

        bpMetrics.averageSystolic = systolicWeeklyAvg;
        bpMetrics.averageSystolicAlert = Category[systolicWeeklyAvgAlert];
        bpMetrics.averageSystolicAlertClass = systolicWeeklyAvgAlert == Category.Normal ? "mdhui-blood-pressure-metric-normal" : "mdhui-blood-pressure-metric-not-normal";
        bpMetrics.averageDiastolic = diastolicWeeklyAvg;
        bpMetrics.averageDiastolicAlert = Category[diastolicWeeklyAvgAlert];
        bpMetrics.averageDiastolicAlertClass = diastolicWeeklyAvgAlert == Category.Normal ? "mdhui-blood-pressure-metric-normal" : "mdhui-blood-pressure-metric-not-normal";


        var weekDataEntryDataPoints = dataForDateRange.map(e => e.dumbbell.dataPoint);
        let diastolicLows = weekDataEntryDataPoints.filter(db => !isNaN(Number(db?.dataSet1.values[0]))).map(db => Number(db?.dataSet1.values[0]));
        let diastolicLow = Math.min(...diastolicLows);
        bpMetrics.minDiastolic = Math.round(diastolicLow);
        let cat = getDiastolicCategory(diastolicLow);
        bpMetrics.minDiastolicAlert = Category[cat];
        bpMetrics.minDiastolicAlertClass = cat === Category.Normal ? "mdhui-blood-pressure-metric-normal" : "mdhui-blood-pressure-metric-not-normal";

        let systolicHighs = weekDataEntryDataPoints.filter(db => !isNaN(Number(db?.dataSet2.values[1]))).map(db => Number(db?.dataSet2.values[1]));
        let systolicHigh = Math.max(...systolicHighs);
        bpMetrics.maxSystolic = Math.round(systolicHigh);
        cat = getSystolicCategory(systolicHigh);
        bpMetrics.maxSystolicAlert = Category[cat];
        bpMetrics.maxSystolicAlertClass = cat === Category.Normal ? "mdhui-blood-pressure-metric-normal" : "mdhui-blood-pressure-metric-not-normal";

        return bpMetrics;
    }

    function buildDetailBlock(description: string, alert?: string, alertClass?: string, value?: number) {
        return <div className="mdhui-blood-pressure-metrics-block">
            <div className="mdhui-blood-pressure-metric-value">{value ?? "--"} <span className="mdhui-blood-pressure-units">mm HG</span></div>
            <div className="mdhui-blood-pressure-metric-description">{description}</div>
            <div className={alertClass}>{alert ?? "No data yet"}</div>
        </div>
    }

    function buildInterval(entries: number[]) {
        const min = Math.min(...entries);
        const closedInterval: ClosedInterval = { values: [min] };

        var max = min;
        if (entries.length > 1) {
            max = Math.max(...entries);
        }
        closedInterval.values.push(max);
        return closedInterval;
    }

    function assignClass(avgSystolic: number, avgDiastolic: number) {

        const systolicCategory = getSystolicCategory(avgSystolic);
        const diastolicCategory = getDiastolicCategory(avgDiastolic);

        if (systolicCategory === Category.Normal && diastolicCategory === Category.Normal) {
            return DumbbellClass["mdhui-dumbbell-in-range"];
        }

        return DumbbellClass["mdhui-dumbbell-out-of-range"];
    }

    function getSystolicCategory(systolicValue: number) {
        if (systolicValue < 90) {
            return Category.Low
        }

        if (systolicValue >= 90 && systolicValue <= 119) {
            return Category.Normal;
        }

        if (systolicValue >= 120 && systolicValue <= 129) {
            return Category.Elevated;
        }

        if (systolicValue >= 130 && systolicValue <= 139) {
            return Category["Stage 1"];
        }

        if (systolicValue >= 140 && systolicValue <= 180) {
            return Category["Stage 2"];
        }

        if (systolicValue > 180) {
            return Category.Crisis;
        }

        return Category.Unknown;
    }

    function getDiastolicCategory(diastolicValue: number) {
        if (diastolicValue < 60) {
            return Category.Low
        }

        if (diastolicValue >= 60 && diastolicValue <= 79) {
            return Category.Normal;
        }

        if (diastolicValue >= 80 && diastolicValue <= 89) {
            return Category["Stage 1"];
        }

        if (diastolicValue >= 90 && diastolicValue <= 120) {
            return Category["Stage 2"];
        }

        if (diastolicValue > 120) {
            return Category.Crisis;
        }

        return Category.Unknown;
    }

    function pageWeek(newStart: Date) {
        setStartOfWeek(newStart);
    }

    useInitializeView(initialize, [], [props.previewState]);

    if (!bloodPressureData) {
        return <LoadingIndicator />;
    }
    else {
        return (
            <>
                <DateRangeNavigator intervalType="Week" intervalStart={datePagerStartDate} onIntervalChange={pageWeek}></DateRangeNavigator>
                {pageWeeklyData(datePagerStartDate)}
                {pageWeeklyMetrics(datePagerStartDate)}
            </>
        )
    }
}