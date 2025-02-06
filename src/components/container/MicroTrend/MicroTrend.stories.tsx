import React from "react"
import MicroTrend, { MicroTrendProps } from "./MicroTrend";
import { Card, Layout } from "../../presentational";
import { DailyDataType } from "../../../helpers/daily-data-types";

export default {
    title: "Container/MicroTrend",
    component: MicroTrend,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: MicroTrendProps) => <Layout colorScheme="auto">
    <Card><MicroTrend {...args} /></Card>
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
        dataType: {
            dailyDataType: DailyDataType.Steps,
            color: "rgba(255, 166, 102, 1)",
            threshold: 7000,
            overThresholdColor: "rgba(255, 0, 0, 1)"
        },
        previewState: "default"
    },
    render: render
};
