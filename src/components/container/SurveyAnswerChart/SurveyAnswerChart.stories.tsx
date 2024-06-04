import React from "react";
import { Card, DateRangeCoordinator, Layout } from "../../presentational";
import SurveyAnswerChart, { SurveyAnswerChartProps } from "./SurveyAnswerChart";
import { SurveyAnswer } from "@careevolution/mydatahelps-js";
import add from "date-fns/add";
import { predictableRandomNumber } from "../../../helpers/predictableRandomNumber";
import { getDayKey } from "../../../helpers";

export default { title: "Container/SurveyAnswerChart", component: SurveyAnswerChart, parameters: { layout: 'fullscreen' } };
let render = (args: SurveyAnswerChartProps) => <Layout colorScheme="auto"><Card><SurveyAnswerChart {...args} /></Card></Layout>

async function generateSurveyResponse(date: Date, resultIdentifier: string, surveyName: string, rangeStart: number, rangeEnd: number): Promise<SurveyAnswer> {
    var answer = await predictableRandomNumber(getDayKey(date)+resultIdentifier);
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
            (answer % (rangeEnd - rangeStart) + rangeStart).toString()
        ],
        "insertedDate": date.toISOString()
    };
}

async function getRandomFFWELData(start: Date, end: Date) {
    let creativeSelfResponses: SurveyAnswer[] = [];
    let copingSelfResponses: SurveyAnswer[] = [];
    let socialSelfResponses: SurveyAnswer[] = [];

    let currentDate = new Date(start);
    while (currentDate < end) {
        creativeSelfResponses.push(await generateSurveyResponse(currentDate, "CreativeSelf", 'FFWEL', 10, 100));
        socialSelfResponses.push(await generateSurveyResponse(currentDate, "SocialSelf", 'FFWEL', 10, 100));
        copingSelfResponses.push(await generateSurveyResponse(currentDate, "CopingSelf", 'FFWEL', 10, 100));
        currentDate = add(currentDate, { months: 1 });
    }
    let standardData: SurveyAnswer[][] = [creativeSelfResponses, copingSelfResponses, socialSelfResponses];
    return standardData;
}

async function getRandomPainData(start: Date, end: Date) {
    var responses = [];
    let currentDate = new Date(start);
    while (currentDate < end) {
        responses.push(await generateSurveyResponse(currentDate, "PainToday", 'Pain Survey', 0, 10));
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
            connectNulls: true
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        series: [{ color: "#e41a1c", dataKey: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                {  color: "#377eb8", dataKey: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                {  color: "#4daf4a", dataKey: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Line",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getRandomFFWELData(start, end));
        }
    },
    render: render
};

export const ffwelLineChartWithDataGap = {
    args: {
        title: "FFWEL Responses Line Chart",
        options: {
            domainMin: 0,
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        series: [{ color: "#e41a1c", dataKey: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                {  color: "#377eb8", dataKey: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                {  color: "#4daf4a", dataKey: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Line",
        expectedDataInterval: {months: 1},
        previewDataProvider: async (start: Date, end: Date) => {
            var data = await getRandomFFWELData(start,end);
            data[0].splice(data[0].length/2,1);
            data[1].splice(data[1].length/2,1);
            data[2].splice(data[2].length/2,1);
            return Promise.resolve(data);
        }
    },
    render: render
};

export const ffwelBarChart = {
    args: {
        title: "FFWEL Response Bar Chart",
        options: {
            domainMin: 0,
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        series: [{ color: "#e41a1c", dataKey: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                {  color: "#377eb8", dataKey: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                {  color: "#4daf4a", dataKey: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
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
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        series: [{ color: "#e41a1c", areaColor: '#d41a1c', dataKey: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                {  color: "#377eb8", areaColor: '#277eb8', dataKey: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                {  color: "#4daf4a", areaColor: '#3daf4a', dataKey: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
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
        series: [{ color: "#e41a1c", dataKey: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                {  color: "#377eb8", dataKey: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                {  color: "#4daf4a", dataKey: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
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
        series: [{ dataKey: "Pain Level", surveyName: "Pain Survey", stepIdentifier: "PainToday", resultIdentifier: "PainToday" }],
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
        series: [{ dataKey: "Pain Level", surveyName: "Pain Survey", stepIdentifier: "PainToday", resultIdentifier: "PainToday" }],
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
        series: [{ dataKey: "Pain Level", surveyName: "Pain Survey", stepIdentifier: "PainToday", resultIdentifier: "PainToday" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Area",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getRandomPainData(start,end));
        }
    },
    render: render
}