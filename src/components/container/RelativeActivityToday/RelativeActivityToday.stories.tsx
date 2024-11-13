import React from "react"
import RelativeActivityToday, { RelativeActivityTodayProps } from "./RelativeActivityToday"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon"
import { DailyDataType } from "../../../helpers"
import { faBed, faHeartbeat, faPersonRunning } from "@fortawesome/free-solid-svg-icons"

export default {
    title: "Container/RelativeActivityToday",
    component: RelativeActivityToday,
    parameters: {
        layout: 'fullscreen',
    }
};

const render = (args: RelativeActivityTodayProps) =>
    <Layout colorScheme="auto">
        <Card>
            <RelativeActivityToday {...args} />
        </Card>
    </Layout>;

let dataTypes = [{
    dailyDataType: DailyDataType.Steps,
    label: "Steps",
    icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
    color: "rgba(255, 166, 102, 1)"
}, {
    dailyDataType: DailyDataType.FitbitActiveMinutes,
    label: "Active Minutes",
    icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
    color: "rgba(255, 166, 102, 1)"
},
{
    dailyDataType: DailyDataType.SleepMinutes,
    label: "Sleep Time",
    icon: <FontAwesomeSvgIcon icon={faBed} />,
    color: "rgba(74, 144, 226, 1)"
},
{
    dailyDataType: DailyDataType.AppleHealthMaxHeartRate,
    label: "Max Heart Rate",
    icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
    color: "rgba(239, 132, 129, 1)"
},
{
    dailyDataType: DailyDataType.FitbitElevatedHeartRateMinutes,
    label: "Elevated Heart Rate Time",
    icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
    color: "rgba(239, 132, 129, 1)"
}];

export const Default = {
    args: {
        title: "Activity Today",
        previewState: "Default",
        dataTypes: dataTypes
    },
    render: render
};