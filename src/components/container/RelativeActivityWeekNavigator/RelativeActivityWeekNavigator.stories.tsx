import React from "react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import RelativeActivityWeekNavigator, { RelativeActivityWeekNavigatorProps } from "./RelativeActivityWeekNavigator";
import { startOfDay } from "date-fns";
import { DailyDataType } from "../../../helpers";
import { RelativeActivityDataType } from "../RelativeActivity/RelativeActivity";

export default {
    title: "Container/RelativeActivityWeekNavigator",
    component: RelativeActivityWeekNavigator,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: RelativeActivityWeekNavigatorProps) => <Layout colorScheme="auto"><RelativeActivityWeekNavigator {...args} /></Layout>

let dataTypes: RelativeActivityDataType[] = [
    {
        dailyDataType: DailyDataType.Steps,
        threshold: 5000,
        color: 'var(--mdhui-text-color-4)',
        overThresholdColor: 'var(--mdhui-color-warning)'
    },
    {
        dailyDataType: DailyDataType.AppleHealthMaxHeartRate,
        threshold: 120,
        color: 'var(--mdhui-text-color-4)',
        overThresholdColor: 'var(--mdhui-color-warning)'
    },
    {
        dailyDataType: DailyDataType.FitbitActiveMinutes,
        threshold: 200,
        color: 'var(--mdhui-text-color-4)',
        overThresholdColor: 'var(--mdhui-color-warning)'
    },
    {
        dailyDataType: DailyDataType.FitbitSleepMinutes,
        threshold: 8 * 60,
        color: 'var(--mdhui-text-color-4)',
        overThresholdColor: 'var(--mdhui-color-warning)'
    }
]

export const Default = {
    args: {
        previewState: "default",
        selectedDate: startOfDay(new Date()),
        onDateSelected: (date: Date) => console.log(date),
        dataTypes: dataTypes
    },
    render: render
};
