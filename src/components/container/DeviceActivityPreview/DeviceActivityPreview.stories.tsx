import React from "react"
import DeviceActivityPreview, { DeviceActivityPreviewProps } from "./DeviceActivityPreview";
import { Card, Layout } from "../../presentational";
import { DailyDataType } from "../../../helpers/daily-data-types";

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

export const StepsNoThreshold = {
    args: {
        dataType: {
            dailyDataType: DailyDataType.Steps,
            color: "rgba(255, 166, 102, 1)"
        },
        previewState: "default"
    },
    render: render
};

export const StepsWithThresholds = {
    args: {
        dataTypes: {
            dailyDataType: DailyDataType.Steps,
            color: "rgba(255, 166, 102, 1)",
            threshold: 5000,
            overThresholdColor: "rgba(255, 0, 0, 1)"
        },
        previewState: "default"
    },
    render: render
};
