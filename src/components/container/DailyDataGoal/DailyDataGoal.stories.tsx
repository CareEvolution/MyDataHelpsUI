import React from "react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import { DailyDataType } from "../../../helpers";
import DailyDataGoal, { DailyDataGoalProps } from "./DailyDataGoal";
import { add, startOfDay } from "date-fns";

export default {
    title: "Container/DailyDataGoal",
    component: DailyDataGoal,
    parameters: {
        layout: 'fullscreen',
    }
};

const render = (args: DailyDataGoalProps) => <Layout colorScheme='auto'>
    <DailyDataGoal {...args} />
</Layout>;

export const SleepGoal = {
    args: {
        previewState: "Default",
        goal: 1,
        dailyDataType: DailyDataType.FitbitSleepMinutes,
        title: "Worn to Sleep",
        subtitle: "200 points",
        messages: [
            {
                threshold: 0,
                message: "No points yet"
            },
            {
                threshold: 1,
                message: "Complete!"
            }
        ]
    },
    render: render
};

export const WearTimeGoal = {
    args: {
        previewState: "Default",
        goal: 10000,
        dailyDataType: DailyDataType.FitbitSteps, // TODO Wear time 
        title: "Worn 10 Hours",
        subtitle: "100 points",
        messages: [
            {
                threshold: 0,
                message: "No points yet"
            },
            {
                threshold: 2500,
                message: "Keep going!"
            },
            {
                threshold: 5000,
                message: "Halfway there!"
            },
            {
                threshold: 7500,
                message: "Almost there!"
            },
            {
                threshold: 10000,
                message: "Complete!"
            }
        ]
    },
    render: render
};

export const Zero = {
    args: {
        previewState: "Default",
        date: startOfDay(add(new Date(), { days: 2 })),
        goal: 1,
        dailyDataType: DailyDataType.FitbitSleepMinutes,
        title: "Worn to Sleep",
        subtitle: "200 points",
        messages: [
            {
                threshold: 0,
                message: "No points yet"
            },
            {
                threshold: 1,
                message: "Complete!"
            }
        ]
    },
    render: render
};