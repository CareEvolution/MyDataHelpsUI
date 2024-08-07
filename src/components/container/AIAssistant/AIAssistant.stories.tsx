import React from "react";
import Layout from "../../presentational/Layout";
import MyDataHelpsAssistant, { AIAssistantProps } from "./AIAssistant";
import { MyDataHelpsAssistantTools } from "../../../helpers/assistant";

export default {
    title: 'Container/MyDataHelpsAssistant',
    component: MyDataHelpsAssistant,
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
                'querySurveyAnswers', 'queryDailyData', 'getAllDailyDataTypes'],
            mapping: {
                persistParticipantInfo: new MyDataHelpsAssistantTools.PersistParticipantInfoTool(),
                queryAppleHealthActivitySummaries: new MyDataHelpsAssistantTools.QueryAppleHealthActivitySummariesTool(),
                queryAppleHealthWorkouts: new MyDataHelpsAssistantTools.QueryAppleHealthWorkoutsTool(),
                queryDailySleep: new MyDataHelpsAssistantTools.QueryDailySleepTool(),
                queryDeviceDataV2Aggregate: new MyDataHelpsAssistantTools.QueryDeviceDataV2AggregateTool(),
                queryDeviceDataV2: new MyDataHelpsAssistantTools.QueryDeviceDataV2Tool(),
                queryNotifications: new MyDataHelpsAssistantTools.QueryNotificationsTool(),
                querySurveyAnswers: new MyDataHelpsAssistantTools.QuerySurveyAnswersTool(),
                queryDailyDataTool: new MyDataHelpsAssistantTools.QueryDailyDataTool(),
                getAllDailyDataTypes: new MyDataHelpsAssistantTools.GetAllDailyDataTypesTool(),
            }
        }
    }
};

const render = (args: AIAssistantProps) => {
    return <Layout colorScheme='auto'>
        <MyDataHelpsAssistant {...args} appendTools={false} />
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
