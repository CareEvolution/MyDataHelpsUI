import "./BloodPressureVisualization.css";
import { useContext, useState } from "react";
import React from "react";
import { Action, DateRangeContext, Grid, LoadingIndicator } from "../../presentational";
import DumbbellChart from "../../presentational/DumbbellChart";
import { ClosedInterval, Axis, DataPoint, DumbbellClass, DumbbellDataPoint } from "../../presentational/DumbbellChart/DumbbellChart";
import { addDays, startOfDay } from "date-fns";
import language from "../../../helpers/language";
import { previewBloodPressureDataPoint } from "./BloodPressureVisualization.previewdata";
import { WeekStartsOn, getWeekStart } from "../../../helpers/get-interval-start";
import { useInitializeView } from "../../../helpers/Initialization";
import { BloodPressureDataPoint, BloodPressureDeviceDataSource, SurveyBloodPressureDataParameters, bloodPressureDataProvider } from "../../../helpers/blood-pressure-data-providers";
import { getShortestDateString } from "../../../helpers/date-helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";

enum Category { "Low", "Normal", "Elevated", "Stage 1", "Stage 2", "Crisis", "Unknown" };
export type BloodPressurePreviewState = "Default" | "NoData" | "Loading";

export interface BloodPressureVisualizationProps {
    previewState?: BloodPressurePreviewState,
    surveyDataSource?: SurveyBloodPressureDataParameters,
    weekStartsOn?: WeekStartsOn,
    deviceDataSource?: BloodPressureDeviceDataSource[],
    innerRef?: React.Ref<HTMLDivElement>
    variant?: "default" | "minimal";
    onClick?: () => void;
};

interface BloodPressureMetrics {
    averageSystolic?: number,
    averageSystolicAlert?: Category,
    averageSystolicAlertClass: string,
    averageDiastolic?: number,
    averageDiastolicAlert?: Category,
    averageDiastolicAlertClass: string,
    maxSystolic?: number,
    maxSystolicAlert?: Category,
    maxSystolicAlertClass: string,
    minSystolic?: number,
    minSystolicAlert?: Category,
    minSystolicAlertClass: string
    combinedAlert?: Category
    combinedAlertClass: string
}

export default function (props: BloodPressureVisualizationProps) {
    const _minSystolic = 0;
    const _maxSystolic = 250;
    const yInterval: ClosedInterval = { values: [_minSystolic, _maxSystolic] };
    const axis: Axis = { yRange: yInterval, yIncrement: 50, xIncrement: (80 / 7) };
    const [bloodPressureData, setBloodPressureDataData] = useState<Map<string, BloodPressureDataPoint[]> | undefined>(undefined);
    const dateRangeContext = useContext(DateRangeContext);

    let intervalStart = dateRangeContext?.intervalStart ?? getWeekStart(props.weekStartsOn ?? "Monday");
    intervalStart = startOfDay(intervalStart);

    async function initialize() {
        if (props.previewState !== "Loading") {
            if (["Default", "NoData"].includes(props.previewState ?? "")) {
                const params = (props.previewState === "Default") ? previewBloodPressureDataPoint : [];
                setBloodPressureDataData(groupDataPointsByDate(params));
            }
            else {
                bloodPressureDataProvider(props.surveyDataSource, props.deviceDataSource).then((bloodPressureDataPoints: BloodPressureDataPoint[]) => {
                    setBloodPressureDataData(groupDataPointsByDate(bloodPressureDataPoints));
                });
            }
        }
    }

    function groupDataPointsByDate(bpDataPoints: BloodPressureDataPoint[]) {
        var bpByDate: Map<string, BloodPressureDataPoint[]> = new Map<string, BloodPressureDataPoint[]>();
        bpDataPoints.forEach((bpDataPoint) => {
            const dateKey = bpDataPoint.date.toString();
            var exists = bpByDate.get(dateKey);
            if (exists) {
                exists.push(bpDataPoint);
            } else {
                bpByDate.set(dateKey, [bpDataPoint]);
            }
        });
        return bpByDate;
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

    function getAlertPrompt(alert: Category | undefined): string {
        switch (alert) {
            case undefined:
                return language('no-data-yet');
            case Category.Crisis:
                return language('bp-crisis');
            case Category.Elevated:
                return language('bp-elevated');
            case Category.Low:
                return language('bp-low');
            case Category.Normal:
                return language('bp-normal');
            case Category["Stage 1"]:
                return language('bp-stage1');
            case Category["Stage 2"]:
                return language('bp-stage2');
            default:
                return language('bp-unknown');
        }
    }

    function buildMetrics(data: BloodPressureDataPoint[]) {
        const metrics = buildAggregates(data);

        return <div className="mdhui-blood-pressure-metrics">
            <div className="mdhui-blood-pressure-metrics-rows">
                {buildDetailBlock(language("systolic-average"), metrics.averageSystolicAlert, metrics.averageSystolicAlertClass, metrics.averageSystolic)}
                {buildDetailBlock(language("diastolic-average"), metrics.averageDiastolicAlert, metrics.averageDiastolicAlertClass, metrics.averageDiastolic)}
            </div>
            <div className="mdhui-blood-pressure-metrics-rows">
                {buildDetailBlock(language("highest-systolic"), metrics.maxSystolicAlert, metrics.maxSystolicAlertClass, metrics.maxSystolic)}
                {buildDetailBlock(language("lowest-systolic"), metrics.minSystolicAlert, metrics.minSystolicAlertClass, metrics.minSystolic)}
            </div>
        </div>;
    }

    function buildAggregates(data: BloodPressureDataPoint[]) {
        let bpMetrics: BloodPressureMetrics = {
            averageDiastolicAlertClass: "",
            averageSystolicAlertClass: "",
            minSystolicAlertClass: "",
            maxSystolicAlertClass: "",
            combinedAlertClass: "",
            combinedAlert: Category.Normal
        };

        if (!data || data.length === 0) {
            return bpMetrics;
        }

        let diastolicReadings = data.map(db => db.diastolic);
        let diastolicWeeklyAvg = diastolicReadings.reduce((a, b) => a + b) / diastolicReadings.length;
        diastolicWeeklyAvg = Math.round(diastolicWeeklyAvg);
        let diastolicWeeklyAvgAlert = getDiastolicCategory(diastolicWeeklyAvg);

        let systolicReadings = data.map(db => db.systolic);
        let systolicWeeklyAvg = systolicReadings.reduce((a, b) => a + b) / systolicReadings.length;
        systolicWeeklyAvg = Math.round(systolicWeeklyAvg);
        let systolicWeeklyAvgAlert = getSystolicCategory(systolicWeeklyAvg);

        bpMetrics.averageSystolic = systolicWeeklyAvg;
        bpMetrics.averageSystolicAlert = systolicWeeklyAvgAlert;
        bpMetrics.averageSystolicAlertClass = systolicWeeklyAvgAlert === Category.Normal ? "mdhui-blood-pressure-metric-normal" : "mdhui-blood-pressure-metric-not-normal";
        bpMetrics.averageDiastolic = diastolicWeeklyAvg;
        bpMetrics.averageDiastolicAlert = diastolicWeeklyAvgAlert;
        bpMetrics.averageDiastolicAlertClass = diastolicWeeklyAvgAlert === Category.Normal ? "mdhui-blood-pressure-metric-normal" : "mdhui-blood-pressure-metric-not-normal";

        let systolicHigh = Math.max(...systolicReadings);
        bpMetrics.maxSystolic = Math.round(systolicHigh);
        let systolicHighAlert = getSystolicCategory(systolicHigh);
        bpMetrics.maxSystolicAlert = systolicHighAlert;
        bpMetrics.maxSystolicAlertClass = systolicHighAlert === Category.Normal ? "mdhui-blood-pressure-metric-normal" : "mdhui-blood-pressure-metric-not-normal";

        let systolicLow = Math.min(...systolicReadings);
        bpMetrics.minSystolic = Math.round(systolicLow);
        let systolicLowAlert = getSystolicCategory(systolicLow);
        bpMetrics.minSystolicAlert = systolicLowAlert;
        bpMetrics.minSystolicAlertClass = systolicLowAlert === Category.Normal ? "mdhui-blood-pressure-metric-normal" : "mdhui-blood-pressure-metric-not-normal";

        bpMetrics.combinedAlert = systolicHighAlert > diastolicWeeklyAvgAlert ? systolicHighAlert : diastolicWeeklyAvgAlert;
        bpMetrics.combinedAlertClass = bpMetrics.combinedAlert === Category.Normal ? "mdhui-blood-pressure-metric-normal" : "mdhui-blood-pressure-metric-not-normal";

        return bpMetrics;
    }

    function buildDetailBlock(description: string, alert: Category | undefined, alertClass?: string, value?: number) {
        return <div className="mdhui-blood-pressure-metrics-block">
            <div className="mdhui-blood-pressure-metric-value">{value ?? "--"} <span className="mdhui-blood-pressure-units">mm HG</span></div>
            <div className="mdhui-blood-pressure-metric-description">{description}</div>
            <div className={alertClass}>{getAlertPrompt(alert) ?? language('no-data-yet')}</div>
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

    function createDumbbellsPerDay(date: Date, bpDataPoints: BloodPressureDataPoint[]) {
        const systolicEntriesForDate = bpDataPoints.map(e => e.systolic);
        const systolicInterval = buildInterval(systolicEntriesForDate);
        const systolicAverage = systolicEntriesForDate.reduce((a, b) => a + b) / systolicEntriesForDate.length;
        const diastolicEntriesForDate = bpDataPoints.map(e => e.diastolic);
        const diastolicInterval = buildInterval(diastolicEntriesForDate);
        const diastolicAverage = diastolicEntriesForDate.reduce((a, b) => a + b) / diastolicEntriesForDate.length;
        const dataPoint: DataPoint = { dataSet1: diastolicInterval, dataSet2: systolicInterval };
        var db: DumbbellDataPoint = { dataPoint: dataPoint, xValue: getShortestDateString(date), class: assignClass(systolicAverage, diastolicAverage) };
        return db;
    }

    function buildMinimalMetrics(data: BloodPressureDataPoint[]) {
        const metrics = buildAggregates(data);

        return <div className="mdhui-micro-trend">
            <div className="mdhui-micro-trend-label">
                Average Blood Pressure
            </div>
            <div className="mdhui-micro-trend-info">
                <span className="mdhui-micro-trend-value">
                    <span style={{ color: "#e35c33" }}><FontAwesomeIcon icon={faHeartbeat} /></span>&nbsp;
                    {metrics.averageSystolic} / {metrics.averageDiastolic} <span className={metrics.combinedAlertClass}>({getAlertPrompt(metrics.combinedAlert)})</span>
                </span>
            </div>
        </div>
    }


    function buildVisualization(start: Date) {
        const intervalEnd = addDays(start, 6);
        var bpDataForMetrics: BloodPressureDataPoint[] = [];
        const weekData: DumbbellDataPoint[] = [];
        for (let i = start; i <= intervalEnd; i.setDate(i.getDate() + 1)) {
            var currentDate = startOfDay(i);
            var dataForDay = bloodPressureData?.get(currentDate.toString()) ?? [];
            if (dataForDay.length > 0) {
                bpDataForMetrics.push(...dataForDay);
                weekData.push(createDumbbellsPerDay(currentDate, dataForDay));
            } else {
                weekData.push({ xValue: getShortestDateString(currentDate) });
            }
        }

        return (
            <>
                {props.variant === "minimal" && buildMinimalMetrics(bpDataForMetrics)}
                <DumbbellChart variant={props.variant} dumbbells={weekData} axis={axis} ></DumbbellChart>
                {props.variant !== "minimal" && buildMetrics(bpDataForMetrics)}
            </>
        );
    }

    useInitializeView(initialize, [], [props.previewState, props.weekStartsOn]);

    let classes = ["mdhui-blood-pressure-visualization"];
    if (props.variant === "minimal") {
        classes.push("mdhui-blood-pressure-visualization-minimal");
    }

    if (!bloodPressureData) {
        return <LoadingIndicator innerRef={props.innerRef} />;
    }
    else {
        if (props.onClick) {
            return <Action innerRef={props.innerRef} onClick={props.onClick} className={classes.join(" ")}>
                {buildVisualization(intervalStart)}
            </Action>;
        } else {
            return <div ref={props.innerRef} className={classes.join(" ")}>
                {buildVisualization(intervalStart)}
            </div>;
        }
    }
}