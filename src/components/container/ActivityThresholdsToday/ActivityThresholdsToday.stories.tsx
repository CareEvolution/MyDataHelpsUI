import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import ActivityThresholdsToday, { ActivityThresholdsTodayProps } from "./ActivityThresholdsToday"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon"
import { DailyDataType } from "../../../helpers/query-daily-data"
import { faBed, faHeartbeat, faPersonRunning } from "@fortawesome/free-solid-svg-icons"

export default {
    title: "Container/ActivityThresholdsToday",
    component: ActivityThresholdsToday,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof ActivityThresholdsToday>;

const Template: ComponentStory<typeof ActivityThresholdsToday> = (args: ActivityThresholdsTodayProps) =>
    <Layout colorScheme="auto">
        <Card>
            <ActivityThresholdsToday {...args} />
        </Card>
    </Layout>;

let dataTypes = [{
    dailyDataType: DailyDataType.Steps,
    label: "Steps",
    icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
    color: "rgba(255, 166, 102, 1)",
    formatter: function (number: number) {
        return Math.floor(number).toLocaleString()
    },
    threshold: 2500
}, {
    dailyDataType: DailyDataType.FitbitActiveMinutes,
    label: "Active Minutes",
    icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
    color: "rgba(255, 166, 102, 1)",
    formatter: function (number: number) {
        return Math.floor(number).toString() + " minutes";
    },
    threshold: 80
},
{
    dailyDataType: DailyDataType.AppleHealthSleepMinutes,
    label: "Sleep Time",
    icon: <FontAwesomeSvgIcon icon={faBed} />,
    color: "rgba(74, 144, 226, 1)",
    formatter: function (number: number) {
        var hours = Math.floor(number / 60);
        var displayValue = hours + "h " + Math.round(number - (hours * 60)) + "m";
        if(Math.round(number - (hours * 60)) == 0){
            displayValue = hours + "h";
        }
        return displayValue;
    },
    threshold: 60 * 8
},
{
    dailyDataType: DailyDataType.FitbitSleepMinutes,
    label: "Sleep Time",
    icon: <FontAwesomeSvgIcon icon={faBed} />,
    color: "rgba(74, 144, 226, 1)",
    formatter: function (number: number) {
        var hours = Math.floor(number / 60);
        var displayValue = hours + "h " + Math.round(number - (hours * 60)) + "m";
        if(Math.round(number - (hours * 60)) == 0){
            displayValue = hours + " hours";
        }
        return displayValue;
    },
    threshold: 60 * 8
},
{
    dailyDataType: DailyDataType.AppleHealthMaxHeartRate,
    label: "Max Heart Rate",
    icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
    color: "rgba(239, 132, 129, 1)",
    formatter: function (number: number) {
        return Math.floor(number).toString() + " bpm";
    },
    threshold: 115
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

export const Default = Template.bind({});
Default.args = {
    title: "Activity Today",
    previewState: "Default",
    dataTypes: dataTypes
}

export const Live = Template.bind({});
Live.args = {
    title: "Activity Today",
    dataTypes: dataTypes
}