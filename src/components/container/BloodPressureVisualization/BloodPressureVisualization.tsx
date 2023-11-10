import "./BloodPressureVisualization.css";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import MyDataHelps, { Guid, SurveyAnswer, SurveyAnswersPage, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import plus from './plus.svg';
import React from "react";
import { Button, DateRangeNavigator, LoadingIndicator } from "../../presentational";
import DumbbellChart from "../../presentational/DumbbellChart";
import { Dumbbell, ClosedInterval, Axis, DataPoint, DumbbellClass } from "../../presentational/DumbbellChart/DumbbellChart";
import { previewSurveyData } from './BloodPressureVisualization.previewdata'
import { addDays, format, isEqual, isMonday, nextSunday, parseISO, previousMonday, startOfDay } from "date-fns";

export type DataFaucet = "PreviewSurvey" | "Survey";

export interface BloodPressureVisualizationProps {
    source : DataFaucet,
    surveyName?: string,
    stepIdentifier? : string,
    dateOfResultId? : string,
    systolicResultId? : string,
    diastolicResultId? : string
};

export interface IBloodPressureDataPoint {
    dateLabel: string,
    date: Date,
    systolic : number,
    diastolic : number
};

interface IBloodPressureDumbbell {
    date: Date,
    dumbbell : Dumbbell,
    averageSystolic : number,
    averageDiastolic : number
};

export default function (props : BloodPressureVisualizationProps) {
    const mdh = MyDataHelps;
    const _minDiastolic = 0;
    const _maxSystolic = 250; 
    const yInterval : ClosedInterval = {values: [_minDiastolic, _maxSystolic]};
    const axis : Axis = {yRange : yInterval, yIncrement : 50, xIncrement : 35};

    const resultFilter = [props.dateOfResultId ?? "", props.systolicResultId ?? "", props.diastolicResultId ?? "" ];
    const [loadingData, setLoadingData] = useState(false);
    const [bpData, setBpData] = useState<IBloodPressureDumbbell[]>([]);
    const [weeklyDataForViz, setWeeklyDataForViz] = useState<Dumbbell[]>([]);
    const [startOfWeek, setStartOfWeek] = useState<Date>(initializeWeekPager());

    async function initialize(){
        if (!loadingData){
            setLoadingData(true);
            
            if (props.source == "Survey" || props.source == "PreviewSurvey"){
                const allData = await loadData(previewSurveyData);
                var weekStart = initializeWeekPager();
                pageWeeklyData( weekStart, allData);
                setBpData(allData);
            }
            
            setLoadingData(false);
        }
    }

    async function loadData(previewData : SurveyAnswer[]){
        var bloodPressureDumbbells : IBloodPressureDumbbell[] = [];
        
        var surveyAnswers = previewData.length > 0 ? previewData :
             await getSurveyAnswers(
                props.surveyName ?? "", 
                [props.stepIdentifier ?? ""], 
                resultFilter
            );
        
        var sortedAnswers = surveyAnswers.sort((a, b) => {
            if (parseISO(a.date) > parseISO(b.date)) { return -1; }
            if (parseISO(a.date) < parseISO(b.date)) { return 1; }
            return 0;
        });
        
        if (sortedAnswers){
            const answersGroupedByResult = groupSurveyAnswersByResults(sortedAnswers);
    
            if (answersGroupedByResult.length > 0){
                bloodPressureDumbbells = createDumbbellsPerDay(answersGroupedByResult);
            }
        }

        return bloodPressureDumbbells;
    }

    function groupSurveyAnswersByResults(answers : SurveyAnswer[]){
        let bpDataPoints : IBloodPressureDataPoint[] = [];

        if (answers.length > 0){
            let resultIds = [...new Set(answers.map(a => a.surveyResultID ))];
            resultIds.forEach( (resultId) => {
                var resultsForSubmission = answers.filter(a => a.surveyResultID == resultId);
                var bpLogDateResults = resultsForSubmission.find( r => r.resultIdentifier == props.dateOfResultId);
                var bpLogDate =bpLogDateResults?.answers[0];
                var bpSystolicResults = resultsForSubmission.find( r => r.resultIdentifier == props.systolicResultId);
                var bpSystolic = bpSystolicResults?.answers[0];
                var bpDiastolicResults = resultsForSubmission.find( r => r.resultIdentifier == props.diastolicResultId);
                var bpDiastolic = bpDiastolicResults?.answers[0];

                if (bpLogDate){
                    var useDate = startOfDay(new Date(bpLogDate));
                    var formattedDate = format(useDate, "MM/dd");
                    var newBpEntry : IBloodPressureDataPoint = {
                        dateLabel: formattedDate, 
                        date: useDate,
                        systolic : Number(bpSystolic ?? 0), 
                        diastolic: Number(bpDiastolic ?? 0)
                    };

                    bpDataPoints.push(newBpEntry);
                }
            });
        }

        return bpDataPoints;
    }

    function createDumbbellsPerDay(bpDataPoints : IBloodPressureDataPoint[]){
        var dbs : IBloodPressureDumbbell[] = [];
        if (bpDataPoints.length > 0){
            let logDates = [...new Set(bpDataPoints.map(dp => dp.dateLabel))];
            logDates.forEach((logDay) =>{
                const entriesForDate = bpDataPoints.filter( a => a.dateLabel == logDay);
                const systolicEntriesForDate = entriesForDate.map( e => e.systolic);
                const systolicInterval = buildInterval(systolicEntriesForDate);
                const systolicAverage = systolicEntriesForDate.reduce((a, b) => a + b) / systolicEntriesForDate.length;
                const diastolicEntriesForDate = entriesForDate.map( e => e.diastolic);
                const diastolicInterval = buildInterval(diastolicEntriesForDate);
                const diastolicAverage = diastolicEntriesForDate.reduce((a, b) => a + b) / diastolicEntriesForDate.length;
                const dataPoint : DataPoint = {dataSet1: diastolicInterval, dataSet2: systolicInterval};
                var db : Dumbbell = {dataPoint  :dataPoint, xValue : logDay, class : assignClass(systolicAverage, diastolicAverage)};
                dbs.push({date: entriesForDate[0].date, dumbbell: db, averageSystolic : systolicAverage, averageDiastolic : diastolicAverage});
            });
        }

        return dbs;
    }

    async function getSurveyAnswers(surveyName: string, stepId : string[], resultId : string[]): Promise<SurveyAnswer[]> {
        let dataPage = await getSurveyDataPage(surveyName, stepId, resultId);
        let allData = dataPage.surveyAnswers;
        while (dataPage.nextPageID) {
            dataPage = await getSurveyDataPage(surveyName, stepId, resultId, dataPage.nextPageID);
            allData = allData.concat(dataPage.surveyAnswers);
        }
        return allData;
    }

    async function getSurveyDataPage(surveyName: string, stepId : string[], resultId : string[], pageID?: Guid): Promise<SurveyAnswersPage> {
        var queryParameters: SurveyAnswersQuery = {
            surveyName 
        };

        queryParameters.stepIdentifier = stepId;
        queryParameters.resultIdentifier = resultId;
        
        if (pageID) {
            queryParameters.pageID = pageID;
        }

        return MyDataHelps.querySurveyAnswers(queryParameters);
    }

    function initializeWeekPager() : Date {
        const today = startOfDay(new Date());
        const monday : Date = isMonday(today) ? today : previousMonday(today);
        const sunday : Date = nextSunday(monday);
        return monday;
    }

    function pageWeek(newStart: Date) {
        pageWeeklyData( newStart );
    }

    function pageWeeklyData(startOfWeek: Date, freshData? : IBloodPressureDumbbell[]){
        const useData = freshData ?? bpData;
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

        setWeeklyDataForViz(weekData);
        setStartOfWeek(startOfWeek);
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

        if ((avgSystolic >=90 && avgSystolic <= 119) && (avgDiastolic >= 60 && avgDiastolic <= 79)){
            return DumbbellClass.inRange;
        }

        return DumbbellClass.outOfRange;
    }

    useEffect(() => {
        let debouncedInitialize = debounce(initialize, 500);
 
        debouncedInitialize();
        mdh.on("applicationDidBecomeVisible", debouncedInitialize);
         
        return () => {
            mdh.off("applicationDidBecomeVisible", debouncedInitialize);
        }
     }, []);

    if (loadingData) 
    {
        return <LoadingIndicator/>;
    }
    else
    {
        return (
            <div className="bloodPressureVisualization">
                <div className="bpTitle">Blood Pressure</div>
                <div>
                    <div className="pagerRow">
                        <DateRangeNavigator intervalType="Week" intervalStart={startOfWeek} onIntervalChange={pageWeek}></DateRangeNavigator>
                    </div>
                    <DumbbellChart dumbbells={weeklyDataForViz} axis={axis} ></DumbbellChart>
                </div>
                <div className="buffer"></div>
                <div>
                    <Button onClick={() => mdh.startSurvey(props.surveyName ?? "")}><span className="buttonCaption">Log Blood Pressure</span><img src={plus}/></Button>
                </div>
            </div>
        )
    }
}