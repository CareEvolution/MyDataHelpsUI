import React from "react"
import DeviceActivityPreview, { DeviceActivityPreviewProps } from "./DeviceActivityPreview";
import { Card, Layout } from "../../presentational";
import { DailyDataType } from "../../../helpers/daily-data-types";
import { RelativeActivityDataType } from "../../../helpers";

export default {
    title: "Container/DeviceActivityPreview",
    component: DeviceActivityPreview,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: DeviceActivityPreviewProps) => <Layout colorScheme="auto">
    <Card><DeviceActivityPreview {...args} /></Card>
</Layout>;

let dataTypes: RelativeActivityDataType[] = [{
    dailyDataType: DailyDataType.Steps,
    color: "rgba(255, 166, 102, 1)"
},
{
    dailyDataType: DailyDataType.SleepMinutes,
    color: "rgba(74, 144, 226, 1)"
}];

export const NoThresholds = {
    args: {
        dataTypes: dataTypes,
        previewState: "default"
    },
    render: render
};

let dataTypesWithThresholds: RelativeActivityDataType[] = [
    { ...dataTypes[0], threshold: 5000, overThresholdColor: "rgba(255, 0, 0, 1)" },
    { ...dataTypes[1], threshold: 60 * 8, overThresholdColor: "rgba(255, 0, 0, 1)" }]

export const AllThresholds = {
    args: {
        dataTypes: dataTypesWithThresholds,
        previewState: "default"
    },
    render: render
};