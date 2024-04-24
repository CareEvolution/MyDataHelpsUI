import React from "react"
import RelativeActivity, { RelativeActivityDataType, RelativeActivityProps } from "./RelativeActivity";
import { DailyDataType } from "../../../helpers/query-daily-data";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faBed, faHeartbeat, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { Card, DateRangeCoordinator, Layout } from "../../presentational";

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
    label: "Steps",
    icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
    color: "rgba(255, 166, 102, 1)",
    formatter: function (number: number) {
        return Math.floor(number).toLocaleString()
    }
}, {
    dailyDataType: DailyDataType.FitbitActiveMinutes,
    label: "Active Minutes",
    icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
    color: "rgba(255, 166, 102, 1)",
    formatter: function (number: number) {
        return Math.floor(number).toString() + " minutes";
    }
},
{
    dailyDataType: DailyDataType.AppleHealthSleepMinutes,
    label: "Sleep Time",
    icon: <FontAwesomeSvgIcon icon={faBed} />,
    color: "rgba(74, 144, 226, 1)",
    formatter: function (number: number) {
        var hours = Math.floor(number / 60);
        var displayValue = hours + "h " + Math.round(number - (hours * 60)) + "m";
        return displayValue;
    }
},
{
    dailyDataType: DailyDataType.FitbitSleepMinutes,
    label: "Sleep Time",
    icon: <FontAwesomeSvgIcon icon={faBed} />,
    color: "rgba(74, 144, 226, 1)",
    formatter: function (number: number) {
        var hours = Math.floor(number / 60);
        var displayValue = hours + "h " + Math.round(number - (hours * 60)) + "m";
        return displayValue;
    }
},
{
    dailyDataType: DailyDataType.AppleHealthMaxHeartRate,
    label: "Max Heart Rate",
    icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
    color: "rgba(239, 132, 129, 1)",
    formatter: function (number: number) {
        return Math.floor(number).toString() + " bpm";
    }
},
{
    dailyDataType: DailyDataType.FitbitElevatedHeartRateMinutes,
    label: "Elevated Heart Rate Time",
    icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
    color: "rgba(239, 132, 129, 1)",
    formatter: function (number: number) {
        return Math.floor(number).toString() + " minutes";
    }
}];

export const AverageAsThreshold = {
    args: {
        dataTypes: dataTypes,
        title: "Activity",
        previewState: "default"
    },
    render: render
};

let dataTypesWithThresholds: RelativeActivityDataType[] = [
    { ...dataTypes[0], threshold: 5000 },
    { ...dataTypes[1], threshold: 200 },
    { ...dataTypes[2], threshold: 60 * 8 },
    { ...dataTypes[3], threshold: 60 * 8 },
    { ...dataTypes[4], threshold: 120 },
    { ...dataTypes[5], threshold: 120 }];

export const SpecificThresholds = {
    args: {
        dataTypes: dataTypesWithThresholds,
        title: "Activity",
        previewState: "default",
        specifyThresholds: true
    },
    render: render
};