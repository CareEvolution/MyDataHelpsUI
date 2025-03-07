import React from "react";
import { Global, css } from '@emotion/react';
import { Description } from "@storybook/blocks";

import Layout from "../../presentational/Layout";
import AIAssistant, { AIAssistantProps } from "./AIAssistant";
import { MyDataHelpsTools } from "../../../helpers/AIAssistant";

export default {
    title: 'Container/AIAssistant',
    component: AIAssistant,
    parameters: { layout: 'fullscreen' },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        docs: {
            Description: <Description />
        },
        debug: {
            control: 'boolean',
            description: 'If turned on the assistant prints what tools it is trying to call and the corresponding parameters.',
            defaultValue: {
                summary: false
            }
        },
        additionalInstructions: {
            control: 'text',
            description: 'Additional system instructions to be passed to the assistant.',
            defaultValue: {
                summary: ""
            }
        },
        showSuggestions: {
            control: 'boolean',
            description: 'If turned on the assistant will show suggestions to the user.',
            defaultValue: {
                summary: true
            }
        },
        appendTools: {
            control: false,
            description: 'If turned on the tools passed in the tools prop will be appended to the default tools.',
            defaultValue: {
                summary: true
            }
        },
        tools: {
            control: 'multi-select',
            options: ['persistParticipantInfo', 'queryAppleHealthActivitySummaries', 'queryAppleHealthWorkouts', 'getAllDailyDataTypes',
                'queryDailySleep', 'queryDeviceDataV2Aggregate', 'queryDeviceDataV2', 'queryNotifications',
                'querySurveyAnswers', 'queryDailyData', 'getAllDailyDataTypes', 'getEhrNewsFeedPage', 'getDeviceDataV2AllDataTypes',
                'graphingTool', 'uploadedFileQueryTool', 'getUploadedFileTool', 'saveLastGraphTool'],
            mapping: {
                persistParticipantInfo: MyDataHelpsTools.PersistParticipantInfoTool,
                queryAppleHealthActivitySummaries: MyDataHelpsTools.QueryAppleHealthActivitySummariesTool,
                queryAppleHealthWorkouts: MyDataHelpsTools.QueryAppleHealthWorkoutsTool,
                queryDailySleep: MyDataHelpsTools.QueryDailySleepTool,
                queryDeviceDataV2Aggregate: MyDataHelpsTools.QueryDeviceDataV2AggregateTool,
                queryDeviceDataV2: MyDataHelpsTools.QueryDeviceDataV2Tool,
                queryNotifications: MyDataHelpsTools.QueryNotificationsTool,
                querySurveyAnswers: MyDataHelpsTools.QuerySurveyAnswersTool,
                queryDailyDataTool: MyDataHelpsTools.QueryDailyDataTool,
                getAllDailyDataTypes: MyDataHelpsTools.GetAllDailyDataTypesTool,
                getEhrNewsFeedPage: MyDataHelpsTools.GetEhrNewsFeedPageTool,
                makeFhirRequest: MyDataHelpsTools.MakeFhirRequestTool,
                getDeviceDataV2AllDataTypes: MyDataHelpsTools.GetDeviceDataV2AllDataTypesTool,
                graphingTool: MyDataHelpsTools.GraphingTool,
                uploadedFileQueryTool: MyDataHelpsTools.UploadedFileQueryTool,
                getUploadedFileTool: MyDataHelpsTools.GetUploadedFileTool,
                saveLastGraphTool: MyDataHelpsTools.SaveLastGraphTool
            }
        }
    }
};

interface AIAssistantStoryArgs extends AIAssistantProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: AIAssistantStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <Global styles={css`
html {
    height: 100%;
}

body {
    height: 100%;
}

#storybook-root {
    height: 100%;
}

.mdhui-layout {
    height: 100%;
}
        `} />
        <AIAssistant {...args} appendTools={false} />
    </Layout>
};

export const Default = {
    args: {
        colorScheme: "auto",
        debug: false,
        showSuggestions: true
    },
    render: render
};

export const Debug = {
    args: {
        debug: true,
        showSuggestions: true
    },
    render: render
};

export const NoSuggestions = {
    args: {
        debug: false,
        showSuggestions: false
    },
    render: render
};
