import React from "react";
import { DailyDataQueryResult, DailyDataType } from "../../../helpers/query-daily-data";
import { Card, Layout } from "../../presentational";
import SurveyDataChart, { SurveyDataChartProps } from "./SurveyDataChart";
import getDayKey from "../../../helpers/get-day-key";
import { add } from "date-fns";
import { SurveyAnswersPage } from "@careevolution/mydatahelps-js";

export default { title: "Container/SurveyDataChart", component: SurveyDataChart, parameters: { layout: 'fullscreen' } };
let render = (args: SurveyDataChartProps) => <Layout colorScheme="auto"><Card><SurveyDataChart {...args} /></Card></Layout>

export const ffwelCreativeSelfChart = {
    args: {
        title: "Steps",
        options: {
            domainMin: 0,
            lineColor: ["#e41a1c", "#377eb8"]
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        lines: [{ label: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf", stroke: "#377eb8" },
                { label: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf", stroke: "#377eb8" }],
        dailyDataType: DailyDataType.Steps,
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Line",
        previewDataProvider: (start: Date, end: Date) => {
            let data: SurveyAnswersPage[] = [{
                "surveyAnswers": [
                    {
                        "id": "9d8b29c4-5747-ee11-aabe-c8d78ddb1645",
                        "surveyResultID": "aa8a29c4-5747-ee11-aabe-c8d78ddb1645",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 3,
                        "taskID": "01b61889-5747-ee11-aabe-c8d78ddb1645",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-08-30T13:07:49.308-04:00",
                        "stepIdentifier": "CreativeSelf",
                        "resultIdentifier": "CreativeSelf",
                        "answers": [
                            "65.4761904761905"
                        ],
                        "insertedDate": "2023-08-30T17:07:58.727Z",
                    },
                    {
                        "id": "0e991f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyResultID": "0e981f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 1,
                        "taskID": "5aeaea1e-f426-ee11-aabd-cf59b359f543",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-07-20T08:15:18.545-04:00",
                        "stepIdentifier": "CreativeSelf",
                        "resultIdentifier": "CreativeSelf",
                        "answers": [
                            "475"
                        ],
                        "insertedDate": "2023-07-20T12:15:28.02Z",
                    }
                ],
            },
            {
                "surveyAnswers": [
                    {
                        "id": "ac8b29c4-5747-ee11-aabe-c8d78ddb1645",
                        "surveyResultID": "aa8a29c4-5747-ee11-aabe-c8d78ddb1645",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 3,
                        "taskID": "01b61889-5747-ee11-aabe-c8d78ddb1645",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-08-30T13:07:51.239-04:00",
                        "stepIdentifier": "CopingSelf",
                        "resultIdentifier": "CopingSelf",
                        "answers": [
                            "65.7894736842105"
                        ],
                        "insertedDate": "2023-08-30T17:07:58.743Z",
                    },
                    {
                        "id": "1d991f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyResultID": "0e981f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 1,
                        "taskID": "5aeaea1e-f426-ee11-aabd-cf59b359f543",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-07-20T08:15:20.384-04:00",
                        "stepIdentifier": "CopingSelf",
                        "resultIdentifier": "CopingSelf",
                        "answers": [
                            "407.894736842105"
                        ],
                        "insertedDate": "2023-07-20T12:15:28.05Z",
                    }
                ],
            }
        ];
            return Promise.resolve(data);
        }
    },
    render: render
};

export const stepsBarChart = {
    args: {
        title: "Steps",
        options: {

        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Bar",
        previewDataProvider: (start: Date, end: Date) => {
            let data: DailyDataQueryResult = {};
            let currentDate = new Date(start);
            while (currentDate < end) {
                let dayKey = getDayKey(currentDate);
                data[dayKey] = Math.random() * 10000 + 3000;
                currentDate = add(currentDate, { days: 1 });
            }
            return Promise.resolve(data);
        }
    },
    render: render
};


export const stepsLiveBarChart = {
    args: {
        title: "Steps",
        options: {

        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Bar"
    },
    render: render
};

export const stepsAreaChart = {
    args: {
        title: "Steps",
        options: {
            areaColor: "red",
            lineColor: "green"
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Area",
        previewDataProvider: (start: Date, end: Date) => {
            let data: DailyDataQueryResult = {};
            let currentDate = new Date(start);
            while (currentDate < end) {
                let dayKey = getDayKey(currentDate);
                data[dayKey] = Math.random() * 10000 + 3000;
                currentDate = add(currentDate, { days: 1 });
            }
            return Promise.resolve(data);
        }
    },
    render: render
};


export const sleepBarChart = {
    args: {
        title: "Sleep",
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.FitbitSleepMinutes,
        valueFormatter: (value: number) => {
            var hours = Math.floor(value / 60);
            var displayValue = hours > 0 ? (hours + "h ") : "";
            displayValue = displayValue + (Math.round(value - (hours * 60)) + "m");
            return displayValue;
        },
        valueConverter: (value: number) => {
            return value / 60.0;
        },
        chartType: "Bar",
        previewDataProvider: (start: Date, end: Date) => {
            let data: DailyDataQueryResult = {};
            let currentDate = new Date(start);
            while (currentDate < end) {
                let dayKey = getDayKey(currentDate);
                data[dayKey] = Math.random() * 50 + 100;
                currentDate = add(currentDate, { days: 1 });
            }
            return Promise.resolve(data);
        }
    },
    render: render
};

export const noData = {
    args: {
        title: "Steps",
        intervalType: "Week",
        dailyDataType: DailyDataType.Steps,
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Line",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve({});
        }
    },
    render: render
};