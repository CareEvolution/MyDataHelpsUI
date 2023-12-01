import "./BloodPressureVisualization.css";
import { useEffect, useState } from "react";
import MyDataHelps from "@careevolution/mydatahelps-js";
import React from "react";
import { Button, DateRangeNavigator, LoadingIndicator, Title } from "../../presentational";
import DumbbellChart from "../../presentational/DumbbellChart";
import { Dumbbell, ClosedInterval, Axis, DataPoint, DumbbellClass } from "../../presentational/DumbbellChart/DumbbellChart";
import { addDays, format, isEqual, startOfDay } from "date-fns";
import { FontAwesomeSvgIcon } from 'react-fontawesome-svg-icon';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import language from "../../../helpers/language";
import { previewBloodPressureDataPoint } from "./BloodPressureVisualization.previewdata";
import surveyBloodPressureDataProvider, { BloodPressureDataPoint, SurveyBloodPressureDataParameters } from "../../../helpers/blood-pressure-data-providers/survey-blood-pressure-data-provider";
import { WeekStartsOn, getWeekStart } from "../../../helpers/get-interval-start";

enum Category {"Low", "Normal", "Elevated", "Stage 1", "Stage 2", "Crisis", "Unknown"};
export type BloodPressurePreviewState = "WithData" | "NoData" | "Loading" | "Live";

export interface BloodPressureVisualizationProps {
    previewState? : BloodPressurePreviewState,
    surveyDataSource : SurveyBloodPressureDataParameters,
    weekStartsOn?: WeekStartsOn
};

interface BloodPressureDumbbell {
    date: Date,
    dumbbell : Dumbbell,
    averageSystolic : number,
    averageDiastolic : number
};

interface BloodPressureMetrics {
    averageSystolic? : number,
    averageSystolicAlert? : string,
    averageSystolicAlertClass : string,
    averageDiastolic? : number,
    averageDiastolicAlert? : string,
    averageDiastolicAlertClass : string,
    maxSystolic? : number,
    maxSystolicAlert? : string,
    maxSystolicAlertClass : string,
    minDiastolic? : number, 
    minDiastolicAlert? : string,
    minDiastolicAlertClass : string
}

export default function (props : BloodPressureVisualizationProps) {
    const _minDiastolic = 0;
    const _maxSystolic = 250; 
    const yInterval : ClosedInterval = {values: [_minDiastolic, _maxSystolic]};
    const axis : Axis = {yRange : yInterval, yIncrement : 50, xIncrement : (85/7)};
    const [bloodPressureData, setDataForGraph] = useState<BloodPressureDumbbell[]>();
    const [datePagerStartDate, setStartOfWeek] = useState<Date>(startOfDay(getWeekStart(props.weekStartsOn ?? "Monday")));

    async function initialize(){

        if (!bloodPressureData){
            if (props.previewState){
                switch(props.previewState){
                    case "NoData":
                        transformToGraphData([]);
                        break;
                    case "WithData":
                        transformToGraphData(previewBloodPressureDataPoint);
                        break;
                    default:
                        return;
                }
            }
            else
            {
                surveyBloodPressureDataProvider(props.surveyDataSource).then((bloodPressureDataPoints: BloodPressureDataPoint[]) => {
                    transformToGraphData(bloodPressureDataPoints);
                });
            }
        }
    }

    function transformToGraphData(bloodPressureDataPoints : BloodPressureDataPoint[]){
        const bloodPressureDumbbells = createDumbbellsPerDay(bloodPressureDataPoints);
        setDataForGraph(bloodPressureDumbbells);
    }

    function createDumbbellsPerDay(bpDataPoints : BloodPressureDataPoint[]){
        var dbs : BloodPressureDumbbell[] = [];

        if (bpDataPoints.length > 0){
            var logDates = bpDataPoints.map(dp => dp.date);
            var distinctLogDates : Date[] = [];
            logDates.forEach((val) => {
                if (!distinctLogDates.find(dld => isEqual(dld, val))){
                    distinctLogDates.push(val);
                    const entriesForDate = bpDataPoints.filter(a => isEqual(val, a.date));
                    const systolicEntriesForDate = entriesForDate.map( e => e.systolic);
                    const systolicInterval = buildInterval(systolicEntriesForDate);
                    const systolicAverage = systolicEntriesForDate.reduce((a, b) => a + b) / systolicEntriesForDate.length;
                    const diastolicEntriesForDate = entriesForDate.map( e => e.diastolic);
                    const diastolicInterval = buildInterval(diastolicEntriesForDate);
                    const diastolicAverage = diastolicEntriesForDate.reduce((a, b) => a + b) / diastolicEntriesForDate.length;
                    const dataPoint : DataPoint = {dataSet1: diastolicInterval, dataSet2: systolicInterval};
                    var db : Dumbbell = {dataPoint  :dataPoint, xValue : format(val, "MM/dd"), class : assignClass(systolicAverage, diastolicAverage)};
                    dbs.push({date: entriesForDate[0].date, dumbbell: db, averageSystolic : systolicAverage, averageDiastolic : diastolicAverage});
                }
            });
        }

        return dbs;
    }

    function pageWeeklyData(startOfWeek: Date){
        const useData : BloodPressureDumbbell[] = (bloodPressureData ?? []);
        const weekData : Dumbbell[] = [];
        for (let i = 0; i < 7; i++) {
            var currentDate = startOfDay(addDays(startOfWeek, i));
            var dataForDay = useData.find( db => isEqual(db.date, currentDate));
            if (!dataForDay)
            {
                var formattedDate = format(currentDate, "MM/dd");
                weekData.push({xValue : formattedDate});
            } 
            else 
            {
                weekData.push(dataForDay.dumbbell);
            }
        }

        return <DumbbellChart dumbbells={weekData} axis={axis} ></DumbbellChart>;
    }

    function pageWeeklyMetrics(startOfWeek: Date){
        const metrics = getWeeklyAggregates(startOfWeek);

        return <div className="mdhui-blood-pressure-metrics">
        <div className="mdhui-blood-pressure-metrics-rows">
            {buildDetailBlock(language("systolic-average"), metrics.averageSystolicAlert, metrics.averageSystolicAlertClass, metrics.averageSystolic)}
            {buildDetailBlock(language("diastolic-average"), metrics.averageDiastolicAlert, metrics.averageDiastolicAlertClass, metrics.averageDiastolic)}
        </div>
        <div className="mdhui-blood-pressure-metrics-rows">
            {buildDetailBlock(language("highest-systolic"),metrics.maxSystolicAlert, metrics.maxSystolicAlertClass, metrics.maxSystolic)}
            {buildDetailBlock(language("lowest-diastolic"), metrics.minDiastolicAlert, metrics.minDiastolicAlertClass, metrics.minDiastolic)}
        </div>
        </div>;
     }

    function getWeeklyAggregates(startOfWeek: Date){

        const useData : BloodPressureDumbbell[] = (bloodPressureData ?? []);
        const start = startOfDay(startOfWeek);
        const end = startOfDay(addDays(startOfWeek, 6));
        let bpMetrics : BloodPressureMetrics = { 
            averageDiastolicAlertClass : "",
            averageSystolicAlertClass : "",
            minDiastolicAlertClass : "",
            maxSystolicAlertClass : ""
        };

        var dbs = useData.filter( db => (db.date >= start && db.date <= end));
        if (dbs.length === 0) return bpMetrics;

        let diastolicReadings = dbs.map(db => db.averageDiastolic);
        let diastolicWeeklyAvg = diastolicReadings.reduce((a, b) => a + b) / diastolicReadings.length;
        diastolicWeeklyAvg = Math.round(diastolicWeeklyAvg);
        let diastolicWeeklyAvgAlert = getDiastolicCategory(diastolicWeeklyAvg);

        let systolicReadings = dbs.map(db => db.averageSystolic);
        let systolicWeeklyAvg = systolicReadings.reduce((a, b) => a + b) / systolicReadings.length;
        systolicWeeklyAvg = Math.round(systolicWeeklyAvg);
        let systolicWeeklyAvgAlert = getSystolicCategory(systolicWeeklyAvg);

        bpMetrics.averageSystolic = systolicWeeklyAvg;
        bpMetrics.averageSystolicAlert = Category[systolicWeeklyAvgAlert];
        bpMetrics.averageSystolicAlertClass = systolicWeeklyAvgAlert == Category.Normal ? "mdhui-blood-pressure-metric-normal" : "mdhui-blood-pressure-metric-not-normal";
        bpMetrics.averageDiastolic = diastolicWeeklyAvg;
        bpMetrics.averageDiastolicAlert = Category[diastolicWeeklyAvgAlert];
        bpMetrics.averageDiastolicAlertClass = diastolicWeeklyAvgAlert == Category.Normal ? "mdhui-blood-pressure-metric-normal" : "mdhui-blood-pressure-metric-not-normal";


        var weekDataEntries = dbs.filter(db => db.dumbbell.dataPoint !== undefined);
        if (weekDataEntries){
            var weekDataEntryDataPoints = weekDataEntries.map(e => e.dumbbell.dataPoint);
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
        }

        return bpMetrics;
    }

    function buildDetailBlock( description : string, alert? : string, alertClass? : string, value? : number ){
        return <div className="mdhui-blood-pressure-metrics-block">
            <div className="mdhui-blood-pressure-metric-value">{value ?? "--"} <span className="mdhui-blood-pressure-units">mm HG</span></div>
            <div className="mdhui-blood-pressure-metric-description">{description}</div>
            <div className={alertClass}>{alert ?? "No data yet"}</div>
        </div>
    }

    function buildInterval(entries : number[]){
        const min = Math.min(...entries);
        const closedInterval : ClosedInterval = {values : [min]};
        
        var max = min;
        if (entries.length > 1){
            max = Math.max(...entries);
        }
        closedInterval.values.push(max);
        return closedInterval;
    }

    function assignClass(avgSystolic : number, avgDiastolic : number){

        const systolicCategory = getSystolicCategory(avgSystolic);
        const diastolicCategory = getDiastolicCategory(avgDiastolic);

        if (systolicCategory === Category.Normal && diastolicCategory === Category.Normal){
            return DumbbellClass["mdhui-dumbbell-in-range"];
        }

        return DumbbellClass["mdhui-dumbbell-out-of-range"];
    }

    function getSystolicCategory(systolicValue : number) {
        if (systolicValue < 90){
            return Category.Low
        }

        if (systolicValue >= 90 && systolicValue <= 119){
            return Category.Normal;
        }

        if (systolicValue >= 120 && systolicValue <= 129){
            return Category.Elevated;
        }

        if (systolicValue >= 130 && systolicValue <= 139){
            return Category["Stage 1"];
        }

        if (systolicValue >= 140 && systolicValue <= 180){
            return Category["Stage 2"];
        }

        if (systolicValue > 180){
            return Category.Crisis;
        }

        return Category.Unknown;
    }

    function getDiastolicCategory(diastolicValue : number) {
        if (diastolicValue < 60){
            return Category.Low
        }

        if (diastolicValue >= 60 && diastolicValue <= 79){
            return Category.Normal;
        }

        if (diastolicValue >= 80 && diastolicValue <= 89){
            return Category["Stage 1"];
        }

        if (diastolicValue >= 90 && diastolicValue <= 120){
            return Category["Stage 2"];
        }

        if (diastolicValue > 120){
            return Category.Crisis;
        }

        return Category.Unknown;
    }
    
    function pageWeek(newStart: Date) {
        setStartOfWeek( newStart );
    }

    useEffect(() => {
        initialize();
        MyDataHelps.on("applicationDidBecomeVisible", initialize);
         
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", initialize);
        }
     }, []);

    if (!bloodPressureData) 
    {
        return <LoadingIndicator/>;
    }
    else
    {
        return (
            <>
                <Title defaultMargin order={3}>{language("blood-pressure")}</Title>
                <DateRangeNavigator intervalType="Week" intervalStart={datePagerStartDate} onIntervalChange={pageWeek}></DateRangeNavigator>
                {pageWeeklyData(datePagerStartDate)}
                {pageWeeklyMetrics(datePagerStartDate)}
                <Button defaultMargin onClick={() => MyDataHelps.startSurvey(props.surveyDataSource.surveyName)}>{language("log-blood-pressure")} <FontAwesomeSvgIcon icon={faPlus} /></Button>
            </>
        )
    }
}