import React from "react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { DailyDataType } from "../../../helpers";
import DailyDataGoals, { DailyDataGoalsProps } from "./DailyDataGoals";
import { add, startOfDay } from "date-fns";

export default {
    title: "Container/DailyDataGoals",
    component: DailyDataGoals,
    parameters: {
        layout: 'fullscreen',
    }
};

const render = (args: DailyDataGoalsProps) => <Layout colorScheme='auto'>
    <Card>
        <DailyDataGoals {...args} />
    </Card>
</Layout>;

export const Default = {
    args: {
        previewState: "Default",
        title: "Today's Fitbit Wear",
        goals: [
            {
                type: "allOrNothing",
                goal: 1,
                dailyDataType: DailyDataType.FitbitSleepMinutes,
                title: "Worn to Sleep",
                subtitle: "200 points",
                message: "Complete"
            },
            {
                type: "percentProgress",
                goal: 8000,
                dailyDataType: DailyDataType.FitbitSteps, // TODO add intraday minute count
                title: "Worn 10 Hours",
                subtitle: "100 points",
                message: "Almost there!"
            }
        ]
    },
    render: render
};


export const Zeros = {
    args: {
        previewState: "Default",
        title: "Today's Fitbit Wear",
        date: startOfDay(add(new Date(), { days: 2 })),
        goals: [
            {
                type: "allOrNothing",
                goal: 1,
                dailyDataType: DailyDataType.FitbitSleepMinutes,
                title: "Worn to Sleep",
                subtitle: "200 points",
                message: "Complete"
            },
            {
                type: "percentProgress",
                goal: 8000,
                dailyDataType: DailyDataType.FitbitSteps, // TODO add intraday minute count
                title: "Worn 10 Hours",
                subtitle: "100 points",
                message: "Almost there!"
            }
        ]
    },
    render: render
};