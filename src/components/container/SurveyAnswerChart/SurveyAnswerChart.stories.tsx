import React from "react";
import { Card, DateRangeCoordinator, Layout } from "../../presentational";
import SurveyAnswerChart, { SurveyAnswerChartProps } from "./SurveyAnswerChart";
import { SurveyAnswer } from "@careevolution/mydatahelps-js";
import add from "date-fns/add";

export default { title: "Container/SurveyAnswerChart", component: SurveyAnswerChart, parameters: { layout: 'fullscreen' } };
let render = (args: SurveyAnswerChartProps) => <Layout colorScheme="auto"><Card><SurveyAnswerChart {...args} /></Card></Layout>

function generateSurveyResponse(date: Date, resultIdentifier: string, surveyName: string): SurveyAnswer {
    return {
        "id": "00000000-0000-0000-0000-000000000000",
        "surveyID": "00000000-0000-0000-0000-000000000000",
        "surveyResultID": "00000000-0000-0000-0000-000000000000",
        "surveyVersion": 0,
        "surveyName": surveyName,
        "surveyDisplayName": surveyName,
        "date": date.toISOString(),
        "stepIdentifier": resultIdentifier,
        "resultIdentifier": resultIdentifier,
        "answers": [
            (Math.random() * 90 + 10).toString()
        ],
        "insertedDate": date.toISOString()
    };
}

function getRandomFFWELData(start: Date, end: Date) {
    let creativeSelfResponses: (SurveyAnswer | null)[] = [];
    let copingSelfResponses: (SurveyAnswer | null)[] = [];
    let socialSelfResponses: (SurveyAnswer | null)[] = [];

    let currentDate = new Date(start);
    while (currentDate < end) {
        creativeSelfResponses.push(generateSurveyResponse(currentDate, "CreativeSelf", 'FFWEL'));
        socialSelfResponses.push(generateSurveyResponse(currentDate, "SocialSelf", 'FFWEL'));
        copingSelfResponses.push(generateSurveyResponse(currentDate, "CopingSelf", 'FFWEL'));
        currentDate = add(currentDate, { months: 1 });
    }
    function filterNull(arr: any[]) { return arr.filter((a: any) => !!a); }
    let standardData: SurveyAnswer[][] = [filterNull(creativeSelfResponses), filterNull(copingSelfResponses), filterNull(socialSelfResponses)];
    return standardData;
}

function getRandomPainData(start: Date, end: Date) {
    var responses = [];
    let currentDate = new Date(start);
    while (currentDate < end) {
        responses.push(generateSurveyResponse(currentDate, "PainToday", 'Pain Survey'));
        currentDate = add(currentDate, { days: 1 });
    }
    let standardData: SurveyAnswer[][] = [responses];
    return standardData;
}


export const ffwelLineChart = {
    args: {
        title: "FFWEL Responses Line Chart",
        options: {
            domainMin: 0,
            connectNulls: true,
            lineColor: ["#e41a1c", "#377eb8", "#4daf4a"]
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        charts: [{ label: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                { label: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                { label: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Line",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getRandomFFWELData(start, end));
        }
    },
    render: render
};

export const ffwelBarChart = {
    args: {
        title: "FFWEL Response Bar Chart",
        options: {
            domainMin: 0,
            barColor: ["#e41a1c", "#377eb8", "#4daf4a"]
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        charts: [{ label: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                { label: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                { label: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Bar",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getRandomFFWELData(start,end));
        }
    },
    render: render
};

export const ffwelAreaChart = {
    args: {
        title: "FFWEL Response Area Chart",
        options: {
            domainMin: 0,
            lineColor: ["#e41a1c", "#377eb8", "#4daf4a"],
            areaColor: ["#d41a1c", "#277eb8", "#3daf4a"]
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        charts: [{ label: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                { label: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                { label: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Area",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getRandomFFWELData(start,end));
        }
    },
    render: render
};

export const ffwelLive = {
    args: {
        title: "FFWEL Live",
        options: {
            domainMin: 0,
            lineColor: ["#e41a1c", "#377eb8", "#4daf4a"]
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        charts: [{ label: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                { label: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                { label: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Line",
    },
    render: (args: SurveyAnswerChartProps) => <Layout colorScheme="auto"><Card><DateRangeCoordinator intervalType="6Month"><SurveyAnswerChart {...args} /></DateRangeCoordinator></Card></Layout>
};

export const dailyPainLineSurvey = {
    args: {
        title: "Daily Pain Line Survey",
        options: {
            domainMin: 0,
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        charts: [{ label: "Pain Level", surveyName: "Pain Survey", stepIdentifier: "PainToday", resultIdentifier: "PainToday" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Line",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getRandomPainData(start,end));
        }
    },
    render: render
};
export const dailyPainBarSurvey = {
    args: {
        title: "Daily Pain Bar Survey",
        options: {
            domainMin: 0,
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        charts: [{ label: "Pain Level", surveyName: "Pain Survey", stepIdentifier: "PainToday", resultIdentifier: "PainToday" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Bar",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getRandomPainData(start,end));
        }
    },
    render: render
};
export const dailyPainAreaSurvey = {
    args: {
        title: "Daily Pain Area Survey",
        options: {
            domainMin: 0,
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        charts: [{ label: "Pain Level", surveyName: "Pain Survey", stepIdentifier: "PainToday", resultIdentifier: "PainToday" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Area",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getRandomPainData(start,end));
        }
    },
    render: render
}