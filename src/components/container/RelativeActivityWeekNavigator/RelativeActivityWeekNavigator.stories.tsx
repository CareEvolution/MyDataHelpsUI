import React from "react"
import Card from "../../presentational/Card"
import Layout from "../../presentational/Layout"
import RelativeActivityWeekNavigator, { RelativeActivityWeekNavigatorProps, WeeklyRelativeActivityDataType } from "./RelativeActivityWeekNavigator";
import { startOfDay } from "date-fns";
import { DailyDataType } from "../../../helpers/query-daily-data";

export default {
    title: "Container/RelativeActivityWeekNavigator",
    component: RelativeActivityWeekNavigator,
    parameters: {
        layout: 'fullscreen',
    }
};

let render = (args: RelativeActivityWeekNavigatorProps) => <Layout colorScheme="auto"><RelativeActivityWeekNavigator {...args} /></Layout>

let dataTypes:WeeklyRelativeActivityDataType[] = [
    {
        dailyDataType: DailyDataType.Steps,
        threshold: 5000,
    },
    {
        dailyDataType: DailyDataType.FitbitSleepMinutes,
        threshold: 8000,
    }
]

export const Default = {
    args: {
        previewState: "default",
        selectedDate: startOfDay(new Date()),
        onDateSelected: (date: Date) => console.log(date),
        dataTypes: dataTypes
    },
    render: render
};
