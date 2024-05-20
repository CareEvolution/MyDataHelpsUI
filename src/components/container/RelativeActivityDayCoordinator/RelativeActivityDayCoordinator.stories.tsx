import React from "react"
import Layout from "../../presentational/Layout"
import RelativeActivityDayCoordinator, { RelativeActivityDayCoordinatorProps } from "./RelativeActivityDayCoordinator";
import { DailyDataType, RelativeActivityDataType } from "../../../helpers";
import DateRangeTitle from "../../presentational/DateRangeTitle";
import RelativeActivity from "../RelativeActivity/RelativeActivity";
import { Card } from "../../presentational";

export default {
    title: "Container/RelativeActivityDayCoordinator",
    component: RelativeActivityDayCoordinator,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: RelativeActivityDayCoordinatorProps) => <Layout colorScheme="auto"><RelativeActivityDayCoordinator {...args} /></Layout>

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

let noThresholdsDataTypes = dataTypes.map(dataType => {
    return { ...dataType, threshold: undefined, overThresholdColor: undefined }
});
export const NoThresholds = {
    args: {

        previewState: "default",
        dataTypes: noThresholdsDataTypes,
        children: <DateRangeTitle defaultMargin />
    },
    render: render
};

export const WithRelativeActivity = {
    args: {
        previewState: "default",
        dataTypes: dataTypes,
        children: <>
            <DateRangeTitle defaultMargin />
            <Card>
                <RelativeActivity dataTypes={[]} useContext previewState="Default" />
            </Card>
        </>
    },
    render: render
};

export const WithRelativeActivityNoThresholds = {
    args: {
        previewState: "default",
        dataTypes: noThresholdsDataTypes,
        children: <>
            <DateRangeTitle defaultMargin />
            <Card>
                <RelativeActivity dataTypes={[]} useContext previewState="Default" />
            </Card>
        </>
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

