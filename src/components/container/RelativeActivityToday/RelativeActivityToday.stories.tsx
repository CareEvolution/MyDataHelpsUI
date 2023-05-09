import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import RelativeActivityToday, { RelativeActivityTodayProps } from "./RelativeActivityToday"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon"
import { DailyDataType } from "../../../helpers/query-daily-data"
import { faBed, faHeartbeat, faPersonRunning } from "@fortawesome/free-solid-svg-icons"

export default {
    title: "Container/RelativeActivityToday",
    component: RelativeActivityToday,
    parameters: {
        layout: 'fullscreen',
    }
} as ComponentMeta<typeof RelativeActivityToday>;

const Template: ComponentStory<typeof RelativeActivityToday> = (args: RelativeActivityTodayProps) =>
    <Layout colorScheme="auto">
        <Card>
            <RelativeActivityToday {...args} />
        </Card>
    </Layout>;

export const Default = Template.bind({});
Default.args = {
    title: "Activity Today",
    previewState: "Default",
    dataTypes: [{
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
    }]
}

export const Live = Template.bind({});
Live.args = {
    title: "Activity Today",
    dataTypes: [{
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
    }]
}