import React from "react"
import RelativeActivity, { RelativeActivityDataType, RelativeActivityProps } from "./RelativeActivity";
import { Card, DateRangeCoordinator, Layout } from "../../presentational";
import { DailyDataType } from "../../../helpers/daily-data-types";
import { dailyDataTypeDefinitions } from "../../../helpers";

export default {
    title: "Container/RelativeActivity",
    component: RelativeActivity,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: RelativeActivityProps) => <Layout colorScheme="auto">
    <DateRangeCoordinator intervalType="Day">
        <Card><RelativeActivity {...args} /></Card>
    </DateRangeCoordinator>
</Layout>;

let dataTypes: RelativeActivityDataType[] = [{
    dailyDataType: DailyDataType.Steps,
    color: "rgba(255, 166, 102, 1)"
}, {
    dailyDataType: DailyDataType.FitbitActiveMinutes,
    color: "rgba(255, 166, 102, 1)"
},
{
    dailyDataType: DailyDataType.AppleHealthSleepMinutes,
    color: "rgba(74, 144, 226, 1)"
},
{
    dailyDataType: DailyDataType.FitbitSleepMinutes,
    color: "rgba(74, 144, 226, 1)"
},
{
    dailyDataType: DailyDataType.AppleHealthMaxHeartRate,
    color: "rgba(239, 132, 129, 1)"
},
{
    dailyDataType: DailyDataType.FitbitElevatedHeartRateMinutes,
    color: "rgba(239, 132, 129, 1)"
}];

export const NoThresholds = {
    args: {
        dataTypes: dataTypes,
        title: "Activity",
        previewState: "Default"
    },
    render: render
};

let dataTypesWithSomeThresholds: RelativeActivityDataType[] = [
    { ...dataTypes[0], threshold: 5000, overThresholdColor: "rgba(255, 0, 0, 1)" },
    { ...dataTypes[1], threshold: 200, overThresholdColor: "rgba(255, 0, 0, 1)" },
    { ...dataTypes[2] },
    { ...dataTypes[3] },
    { ...dataTypes[4], threshold: 120, overThresholdColor: "rgba(255, 0, 0, 1)" },
    { ...dataTypes[5], threshold: 120, overThresholdColor: "rgba(255, 0, 0, 1)" }];

export const SomeThresholds = {
    args: {
        dataTypes: dataTypesWithSomeThresholds,
        title: "Activity",
        previewState: "Default",
        specifyThresholds: true
    },
    render: render
};


let dataTypesWithThresholds: RelativeActivityDataType[] = [
    { ...dataTypes[0], threshold: 5000, overThresholdColor: "rgba(255, 0, 0, 1)" },
    { ...dataTypes[1], threshold: 200, overThresholdColor: "rgba(255, 0, 0, 1)" },
    { ...dataTypes[2], threshold: 60 * 8 },
    { ...dataTypes[3], threshold: 60 * 8 },
    { ...dataTypes[4], threshold: 120, overThresholdColor: "rgba(255, 0, 0, 1)" },
    { ...dataTypes[5], threshold: 120, overThresholdColor: "rgba(255, 0, 0, 1)" }];

export const AllThresholds = {
    args: {
        dataTypes: dataTypesWithThresholds,
        title: "Activity",
        previewState: "Default",
        specifyThresholds: true
    },
    render: render
};

let allDataTypes: RelativeActivityDataType[] = dailyDataTypeDefinitions.map(dailyDataType => {
    return {
        dailyDataType: dailyDataType.type,
        color: "rgba(255, 166, 102, 1)"
    }
});
export const AllDataTypes = {
    args: {
        dataTypes: allDataTypes,
        title: "Activity",
        previewState: "Default"
    },
    render: render
};