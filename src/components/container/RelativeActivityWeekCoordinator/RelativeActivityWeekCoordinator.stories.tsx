import React from "react"
import Layout from "../../presentational/Layout"
import RelativeActivityWeekCoordinator, { RelativeActivityWeekCoordinatorProps } from "./RelativeActivityWeekCoordinator";
import { DailyDataType } from "../../../helpers";
import DateRangeTitle from "../../presentational/DateRangeTitle";
import { RelativeActivityDataType } from "../RelativeActivity/RelativeActivity";

export default {
    title: "Container/RelativeActivityWeekCoordinator",
    component: RelativeActivityWeekCoordinator,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: RelativeActivityWeekCoordinatorProps) => <Layout colorScheme="auto"><RelativeActivityWeekCoordinator {...args} /></Layout>

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
        dataTypes: dataTypes,
        children: <DateRangeTitle defaultMargin />
    },
    render: render
};

export const Live = {
    args: {
        dataTypes: dataTypes,
        children: <DateRangeTitle defaultMargin />
    },
    render: render
};
