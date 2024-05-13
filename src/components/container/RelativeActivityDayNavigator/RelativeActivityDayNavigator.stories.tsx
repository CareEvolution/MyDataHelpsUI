import React from "react"
import Layout from "../../presentational/Layout"
import RelativeActivityDayNavigator, { RelativeActivityDayNavigatorProps } from "./RelativeActivityDayNavigator";
import { startOfDay } from "date-fns";
import { DailyDataType, RelativeActivityDataType } from "../../../helpers";

export default {
    title: "Container/RelativeActivityDayNavigator",
    component: RelativeActivityDayNavigator,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: RelativeActivityDayNavigatorProps) => <Layout colorScheme="auto"><RelativeActivityDayNavigator {...args} /></Layout>

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

export const WithThresholds = {
    args: {
        previewState: "default",
        selectedDate: startOfDay(new Date()),
        onDateSelected: (date: Date) => console.log(date),
        dataTypes: dataTypes
    },
    render: render
};

let noThresholdsDataTypes = dataTypes.map(dataType => {
    return { ...dataType, threshold: undefined, overThresholdColor: undefined }
});
export const NoThresholds = {
    args: {
        previewState: "default",
        selectedDate: startOfDay(new Date()),
        onDateSelected: (date: Date) => console.log(date),
        dataTypes: noThresholdsDataTypes
    },
    render: render
};
