import React from "react";
import ContrastInsight, { ContrastInsightProps } from "./ContrastInsight";
import { Card, Layout } from "../../presentational";
import { DailyDataType } from "../../../helpers/daily-data-types";

export default {
    title: "Container/ContrastInsight",
    component: ContrastInsight,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: ContrastInsightProps) => <Layout colorScheme="auto">
    <Card><ContrastInsight {...args} /></Card>
</Layout>;

export const SleepAndSteps = {
    args: {
        driverDataType: DailyDataType.SleepMinutes,
        outcomeDataType: DailyDataType.Steps,
        previewState: "Default"
    },
    render: render
};

export const StepsAndNextNightSleep = {
    args: {
        driverDataType: DailyDataType.Steps,
        outcomeDataType: DailyDataType.SleepMinutes,
        lagDays: 1,
        previewState: "Default"
    },
    render: render
};

export const SleepAndRestingHeartRate = {
    args: {
        driverDataType: DailyDataType.SleepMinutes,
        outcomeDataType: DailyDataType.RestingHeartRate,
        previewState: "NegativePattern"
    },
    render: render
};

export const WeekendSteps = {
    args: {
        driverDataType: DailyDataType.Steps,
        outcomeDataType: DailyDataType.Steps,
        split: { kind: "weekendVsWeekday" },
        title: "Weekends & Weekdays",
        previewState: "Default"
    },
    render: render
};

export const ExpandedByDefault = {
    args: {
        driverDataType: DailyDataType.SleepMinutes,
        outcomeDataType: DailyDataType.Steps,
        defaultExpanded: true,
        previewState: "Default"
    },
    render: render
};

export const NoPattern = {
    args: {
        driverDataType: DailyDataType.SleepMinutes,
        outcomeDataType: DailyDataType.Steps,
        hideIfNoRelationship: false,
        previewState: "NoPattern"
    },
    render: render
};

export const NoPatternHidden = {
    args: {
        driverDataType: DailyDataType.SleepMinutes,
        outcomeDataType: DailyDataType.Steps,
        previewState: "NoPattern"
    },
    render: render
};

export const InsufficientData = {
    args: {
        driverDataType: DailyDataType.SleepMinutes,
        outcomeDataType: DailyDataType.Steps,
        hideIfNoRelationship: false,
        previewState: "InsufficientData"
    },
    render: render
};

export const Live = {
    args: {
        driverDataType: DailyDataType.SleepMinutes,
        outcomeDataType: DailyDataType.Steps
    },
    render: render
};
