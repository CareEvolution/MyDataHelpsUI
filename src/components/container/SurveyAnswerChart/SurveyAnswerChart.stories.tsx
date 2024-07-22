import React from "react";
import { Card, DateRangeCoordinator, Layout } from "../../presentational";
import SurveyAnswerChart, { SurveyAnswerChartProps } from "./SurveyAnswerChart";
import { SurveyAnswer } from "@careevolution/mydatahelps-js";
import add from "date-fns/add";
import { generateSurveyResponse } from "./SurveyAnswerData.previewdata";

export default { title: "Container/SurveyAnswerChart", component: SurveyAnswerChart, parameters: { layout: 'fullscreen' } };
let render = (args: SurveyAnswerChartProps) => <Layout colorScheme="auto"><Card><SurveyAnswerChart {...args} /></Card></Layout>

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
            yAxisOptions: {
                domain: [0, 'auto']
            },
            lineOptions : {
                connectNulls: true
            }
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        series: [{ color: "#e41a1c", dataKey: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                {  color: "#377eb8", dataKey: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                {  color: "#4daf4a", dataKey: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        chartType: "Line",
        previewState: "default"
    },
    render: render
};

export const ffwelLineChartDRC = {
    args: {
        title: "FFWEL Responses Line Chart Date Range Coordinator",
        options: {
            yAxisOptions: {
                domain: [0, 'auto']
            },
            lineOptions : {
                connectNulls: true
            }
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        series: [{ color: "#e41a1c", dataKey: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                {  color: "#377eb8", dataKey: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                {  color: "#4daf4a", dataKey: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        chartType: "Line",
        previewState: "default"
    },
    render: (args: SurveyAnswerChartProps) => <Layout colorScheme="auto"><Card><DateRangeCoordinator intervalType={args.intervalType || "6Month"}><SurveyAnswerChart {...args} /></DateRangeCoordinator></Card></Layout>
};



export const ffwelLineChartWithDataGap = {
    args: {
        title: "FFWEL Responses Line Chart",
        options: {
            yAxisOptions: {
                domain: [0, 'auto']
            }
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        series: [{ color: "#e41a1c", dataKey: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                {  color: "#377eb8", dataKey: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                {  color: "#4daf4a", dataKey: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
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
            yAxisOptions: {
                domain: [0, 'auto']
            }
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        series: [{ color: "#e41a1c", dataKey: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                {  color: "#377eb8", dataKey: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                {  color: "#4daf4a", dataKey: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        chartType: "Bar",
        previewState: 'default'
    },
    render: render
};


export const ffwelBarChartThresholds = {
    args: {
        title: "FFWEL Response Bar Chart with Thresholds",
        options: {
            yAxisOptions: {
                domain: [0, 'auto']
            },
            thresholds: [
                {
                    value: 50,
                    referenceLineColor: 'red',
                    overThresholdColor: 'red'
                }
            ]
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        series: [{ color: "#e41a1c", dataKey: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                {  color: "#377eb8", dataKey: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                {  color: "#4daf4a", dataKey: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        chartType: "Bar",
        previewState: 'default'
    },
    render: render
};

export const ffwelAreaChart = {
    args: {
        title: "FFWEL Response Area Chart",
        options: {
            yAxisOptions: {
                domain: [0, 'auto']
            }
        },
        intervalType: "6Month",
        weekStartsOn: "6DaysAgo",
        series: [{ color: "#e41a1c", areaColor: '#d41a1c', dataKey: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                {  color: "#377eb8", areaColor: '#277eb8', dataKey: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                {  color: "#4daf4a", areaColor: '#3daf4a', dataKey: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        chartType: "Area",
        previewState: 'default'
    },
    render: render
};

export const ffwelLive = {
    args: {
        title: "FFWEL Live",
        options: {
            yAxisOptions: {
                domain: [0, 'auto']
            }
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        series: [{ color: "#e41a1c", dataKey: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf" },
                {  color: "#377eb8", dataKey: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf" },
                {  color: "#4daf4a", dataKey: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf" }],
        chartType: "Line",
    },
    render: (args: SurveyAnswerChartProps) => <Layout colorScheme="auto"><Card><DateRangeCoordinator intervalType="6Month"><SurveyAnswerChart {...args} /></DateRangeCoordinator></Card></Layout>
};

export const dailyPainLineSurvey = {
    args: {
        title: "Daily Pain Line Survey",
        options: {
            yAxisOptions: {
                domain: [0, 'auto']
            }
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        series: [{ dataKey: "Pain Level", surveyName: "Pain Survey", stepIdentifier: "PainToday", resultIdentifier: "PainToday" }],
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
            yAxisOptions: {
                domain: [0, 'auto']
            }
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        series: [{ dataKey: "Pain Level", surveyName: "Pain Survey", stepIdentifier: "PainToday", resultIdentifier: "PainToday" }],
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
            yAxisOptions: {
                domain: [0, 'auto']
            }
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        series: [{ dataKey: "Pain Level", surveyName: "Pain Survey", stepIdentifier: "PainToday", resultIdentifier: "PainToday" }],
        chartType: "Area",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve(getRandomPainData(start,end));
        }
    },
    render: render
}