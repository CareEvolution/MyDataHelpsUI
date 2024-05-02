import React from "react";
import { Card, DateRangeCoordinator, Layout } from "../../presentational";
import SurveyDataChart, { SurveyDataChartProps } from "./SurveyDataChart";
import { SurveyAnswer } from "@careevolution/mydatahelps-js";
import add from "date-fns/add";

export default { title: "Container/SurveyDataChart", component: SurveyDataChart, parameters: { layout: 'fullscreen' } };
let render = (args: SurveyDataChartProps) => <Layout colorScheme="auto"><Card><SurveyDataChart {...args} /></Card></Layout>

function getStandardData(start: Date, end: Date) {
    function generateSurveyResponse(date: Date, identifier: string) : SurveyAnswer | null {
        if(Math.random() < 0.2) return null;

        return {
            "id": "00000000-0000-0000-0000-000000000000",
            "surveyID": "00000000-0000-0000-0000-000000000000",
            "surveyResultID": "00000000-0000-0000-0000-000000000000",
            "surveyVersion": 0,
            "surveyName": "FFWEL",
            "surveyDisplayName": "Five Factor Wellness Inventory",
            "date": date.toISOString(),
            "stepIdentifier": identifier,
            "resultIdentifier": identifier,
            "answers": [
                (Math.random() * 90 + 10).toString()
            ],
            "insertedDate": date.toISOString()
        };
    }

    let creativeSelfResponses: (SurveyAnswer | null)[] = [];
    let copingSelfResponses: (SurveyAnswer | null)[] = [];
    let socialSelfResponses: (SurveyAnswer | null)[] = [];

    let currentDate = new Date(start);
    while (currentDate < end) {
        creativeSelfResponses.push(generateSurveyResponse(currentDate, "CreativeSelf"));
        socialSelfResponses.push(generateSurveyResponse(currentDate, "SocialSelf"));
        copingSelfResponses.push(generateSurveyResponse(currentDate, "CopingSelf"));
        currentDate = add(currentDate, { days: 1 });
    }
    function filterNull(arr: any[]) { return arr.filter((a: any) => !!a); }
    let standardData: SurveyAnswer[][] = [filterNull(creativeSelfResponses), filterNull(copingSelfResponses), filterNull(socialSelfResponses)];
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
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        charts: [{ label: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                { label: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                { label: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Line",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getStandardData(start, end));
        }
    },
    render: render
};

export const ffwelLineNullGapsChart = {
    args: {
        title: "FFWEL Responses Line Chart With Null Gaps",
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
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getStandardData(start, end));
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
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        charts: [{ label: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                { label: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                { label: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Bar",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getStandardData(start,end));
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
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        charts: [{ label: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                { label: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                { label: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Area",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getStandardData(start,end));
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
    render: (args: SurveyDataChartProps) => <Layout colorScheme="auto"><Card><DateRangeCoordinator intervalType="SixMonth"><SurveyDataChart {...args} /></DateRangeCoordinator></Card></Layout>
};