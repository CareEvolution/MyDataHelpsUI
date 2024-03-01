import React from "react";
import { Card, Layout } from "../../presentational";
import SurveyDataChart, { SurveyDataChartProps } from "./SurveyDataChart";
import { SurveyAnswersPage } from "@careevolution/mydatahelps-js";

export default { title: "Container/SurveyDataChart", component: SurveyDataChart, parameters: { layout: 'fullscreen' } };
let render = (args: SurveyDataChartProps) => <Layout colorScheme="auto"><Card><SurveyDataChart {...args} /></Card></Layout>

export const ffwelCreativeSelfLineChart = {
    args: {
        title: "FFWEL",
        options: {
            domainMin: 0,
            lineColor: ["#e41a1c", "#377eb8", "#4daf4a"]
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        lines: [{ label: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf", stroke: "#e41a1c" },
                { label: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf", stroke: "#377eb8" },
                { label: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf", stroke: "#4daf4a" }],
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
                            "75"
                        ],
                        "insertedDate": "2023-07-20T12:15:28.02Z",
                    },
                    {
                        "id": "0e991f1c-f726-e211-aabd-cf59b359f543",
                        "surveyResultID": "0e981f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 1,
                        "taskID": "5aeaea1e-f426-ee11-aabd-cf59b359f543",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-07-24T08:15:18.545-04:00",
                        "stepIdentifier": "CreativeSelf",
                        "resultIdentifier": "CreativeSelf",
                        "answers": [
                            "85"
                        ],
                        "insertedDate": "2023-07-24T12:15:28.02Z",
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
                            "70.894736842105"
                        ],
                        "insertedDate": "2023-07-20T12:15:28.05Z",
                    },
                    {
                        "id": "1d991f1c-f726-ee11-aabd-cf59b359f343",
                        "surveyResultID": "0e981f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 1,
                        "taskID": "5aeaea1e-f426-ee11-aabd-cf59b359f543",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-07-24T08:15:20.384-04:00",
                        "stepIdentifier": "CopingSelf",
                        "resultIdentifier": "CopingSelf",
                        "answers": [
                            "50.894736842105"
                        ],
                        "insertedDate": "2023-07-24T12:15:28.05Z",
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
                        "stepIdentifier": "SocialSelf",
                        "resultIdentifier": "SocialSelf",
                        "answers": [
                            "90.7894736842105"
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
                        "stepIdentifier": "SocialSelf",
                        "resultIdentifier": "SocialSelf",
                        "answers": [
                            "80.894736842105"
                        ],
                        "insertedDate": "2023-07-20T12:15:28.05Z",
                    },
                    {
                        "id": "1d931f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyResultID": "0e981f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 1,
                        "taskID": "5aeaea1e-f426-ee11-aabd-cf59b359f543",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-07-24T08:15:20.384-04:00",
                        "stepIdentifier": "SocialSelf",
                        "resultIdentifier": "SocialSelf",
                        "answers": [
                            "84.894736842105"
                        ],
                        "insertedDate": "2023-07-24T12:15:28.05Z",
                    }

                ],
            }
        ];
            return Promise.resolve(data);
        }
    },
    render: render
};

export const ffwelCreativeSelfBarChart = {
    args: {
        title: "FFWEL",
        options: {
            domainMin: 0,
            lineColor: ["#e41a1c", "#377eb8", "#4daf4a"]
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        lines: [{ label: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf", stroke: "#e41a1c" },
                { label: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf", stroke: "#377eb8" },
                { label: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf", stroke: "#4daf4a" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Bar",
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
                            "75"
                        ],
                        "insertedDate": "2023-07-20T12:15:28.02Z",
                    },
                    {
                        "id": "0e991f1c-f726-e211-aabd-cf59b359f543",
                        "surveyResultID": "0e981f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 1,
                        "taskID": "5aeaea1e-f426-ee11-aabd-cf59b359f543",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-07-24T08:15:18.545-04:00",
                        "stepIdentifier": "CreativeSelf",
                        "resultIdentifier": "CreativeSelf",
                        "answers": [
                            "85"
                        ],
                        "insertedDate": "2023-07-24T12:15:28.02Z",
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
                            "70.894736842105"
                        ],
                        "insertedDate": "2023-07-20T12:15:28.05Z",
                    },
                    {
                        "id": "1d991f1c-f726-ee11-aabd-cf59b359f343",
                        "surveyResultID": "0e981f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 1,
                        "taskID": "5aeaea1e-f426-ee11-aabd-cf59b359f543",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-07-24T08:15:20.384-04:00",
                        "stepIdentifier": "CopingSelf",
                        "resultIdentifier": "CopingSelf",
                        "answers": [
                            "50.894736842105"
                        ],
                        "insertedDate": "2023-07-24T12:15:28.05Z",
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
                        "stepIdentifier": "SocialSelf",
                        "resultIdentifier": "SocialSelf",
                        "answers": [
                            "90.7894736842105"
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
                        "stepIdentifier": "SocialSelf",
                        "resultIdentifier": "SocialSelf",
                        "answers": [
                            "80.894736842105"
                        ],
                        "insertedDate": "2023-07-20T12:15:28.05Z",
                    },
                    {
                        "id": "1d931f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyResultID": "0e981f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 1,
                        "taskID": "5aeaea1e-f426-ee11-aabd-cf59b359f543",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-07-24T08:15:20.384-04:00",
                        "stepIdentifier": "SocialSelf",
                        "resultIdentifier": "SocialSelf",
                        "answers": [
                            "84.894736842105"
                        ],
                        "insertedDate": "2023-07-24T12:15:28.05Z",
                    }

                ],
            }
        ];
            return Promise.resolve(data);
        }
    },
    render: render
};

export const ffwelCreativeSelfAreaChart = {
    args: {
        title: "FFWEL",
        options: {
            domainMin: 0,
            lineColor: ["#e41a1c", "#377eb8", "#4daf4a"]
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        lines: [{ label: "Creative Self", surveyName: "FFWEL", stepIdentifier: "CreativeSelf", resultIdentifier: "CreativeSelf", stroke: "#e41a1c" },
                { label: "Coping Self", surveyName: "FFWEL", stepIdentifier: "CopingSelf", resultIdentifier: "CopingSelf", stroke: "#377eb8" },
                { label: "Social Self", surveyName: "FFWEL", stepIdentifier: "SocialSelf", resultIdentifier: "SocialSelf", stroke: "#4daf4a" }],
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Area",
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
                            "75"
                        ],
                        "insertedDate": "2023-07-20T12:15:28.02Z",
                    },
                    {
                        "id": "0e991f1c-f726-e211-aabd-cf59b359f543",
                        "surveyResultID": "0e981f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 1,
                        "taskID": "5aeaea1e-f426-ee11-aabd-cf59b359f543",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-07-24T08:15:18.545-04:00",
                        "stepIdentifier": "CreativeSelf",
                        "resultIdentifier": "CreativeSelf",
                        "answers": [
                            "85"
                        ],
                        "insertedDate": "2023-07-24T12:15:28.02Z",
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
                            "70.894736842105"
                        ],
                        "insertedDate": "2023-07-20T12:15:28.05Z",
                    },
                    {
                        "id": "1d991f1c-f726-ee11-aabd-cf59b359f343",
                        "surveyResultID": "0e981f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 1,
                        "taskID": "5aeaea1e-f426-ee11-aabd-cf59b359f543",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-07-24T08:15:20.384-04:00",
                        "stepIdentifier": "CopingSelf",
                        "resultIdentifier": "CopingSelf",
                        "answers": [
                            "50.894736842105"
                        ],
                        "insertedDate": "2023-07-24T12:15:28.05Z",
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
                        "stepIdentifier": "SocialSelf",
                        "resultIdentifier": "SocialSelf",
                        "answers": [
                            "90.7894736842105"
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
                        "stepIdentifier": "SocialSelf",
                        "resultIdentifier": "SocialSelf",
                        "answers": [
                            "80.894736842105"
                        ],
                        "insertedDate": "2023-07-20T12:15:28.05Z",
                    },
                    {
                        "id": "1d931f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyResultID": "0e981f1c-f726-ee11-aabd-cf59b359f543",
                        "surveyID": "31452ddc-f226-ee11-aabd-cf59b359f543",
                        "surveyVersion": 1,
                        "taskID": "5aeaea1e-f426-ee11-aabd-cf59b359f543",
                        "surveyName": "FFWEL",
                        "surveyDisplayName": "Five Factor Wellness Inventory",
                        "date": "2023-07-24T08:15:20.384-04:00",
                        "stepIdentifier": "SocialSelf",
                        "resultIdentifier": "SocialSelf",
                        "answers": [
                            "84.894736842105"
                        ],
                        "insertedDate": "2023-07-24T12:15:28.05Z",
                    }

                ],
            }
        ];
            return Promise.resolve(data);
        }
    },
    render: render
};