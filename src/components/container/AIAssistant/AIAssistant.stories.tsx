import React from "react";
import Layout from "../../presentational/Layout";
import AIAssistant, { AIAssistantProps } from "./AIAssistant";
import { MyDataHelpsTools } from "../../../helpers/assistant";

export default {
    title: 'Container/AIAssistant',
    component: AIAssistant,
    parameters: { layout: 'fullscreen' },
    argTypes: {
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
                getEhrNewsFeedPage: new MyDataHelpsTools.GetEhrNewsFeedPageTool()
            }
        }
    }
};

const render = (args: AIAssistantProps) => {
    return <Layout colorScheme='auto'>
        <AIAssistant {...args} appendTools={false} />
    </Layout>
};

export const Default = {
    args: {
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
