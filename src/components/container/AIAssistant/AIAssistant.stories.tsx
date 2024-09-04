import React from "react";
import { Global, css } from '@emotion/react';
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
                'querySurveyAnswers', 'queryDailyData', 'getAllDailyDataTypes', 'getEhrNewsFeedPage'],
            mapping: {
                persistParticipantInfo: new MyDataHelpsTools.PersistParticipantInfoTool(),
                queryAppleHealthActivitySummaries: new MyDataHelpsTools.QueryAppleHealthActivitySummariesTool(),
                queryAppleHealthWorkouts: new MyDataHelpsTools.QueryAppleHealthWorkoutsTool(),
                queryDailySleep: new MyDataHelpsTools.QueryDailySleepTool(),
                queryDeviceDataV2Aggregate: new MyDataHelpsTools.QueryDeviceDataV2AggregateTool(),
                queryDeviceDataV2: new MyDataHelpsTools.QueryDeviceDataV2Tool(),
                queryNotifications: new MyDataHelpsTools.QueryNotificationsTool(),
                querySurveyAnswers: new MyDataHelpsTools.QuerySurveyAnswersTool(),
                queryDailyDataTool: new MyDataHelpsTools.QueryDailyDataTool(),
                getAllDailyDataTypes: new MyDataHelpsTools.GetAllDailyDataTypesTool(),
                getEhrNewsFeedPage: new MyDataHelpsTools.GetEhrNewsFeedPageTool(),
                getDeviceDataV2AllDataTypes: new MyDataHelpsTools.GetDeviceDataV2AllDataTypesTool()
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
        debug: false
    },
    render: render
};

export const Debug = {
    args: {
        debug: true
    },
    render: render
};