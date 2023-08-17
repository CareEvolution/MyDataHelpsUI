import React from "react";
import { DailyDataQueryResult, DailyDataType } from "../../../helpers/query-daily-data";
import { Card, Layout } from "../../presentational";
import DailyDataChart, { DailyDataChartProps } from "./DailyDataChart";
import getDayKey from "../../../helpers/get-day-key";
import { add } from "date-fns";

export default { title: "Container/DailyDataChart", component: DailyDataChart, parameters: { layout: 'fullscreen' } };
let render = (args: DailyDataChartProps) => <Layout><DailyDataChart {...args} /></Layout>
export const steps2 = {
    args: {
        title: "Steps",
        intervalType: "Month",
        dailyDataType: DailyDataType.Steps,
        valueFormatter: (value: number) => value.toFixed(0),
        chartType: "Line",
        previewDataProvider: (start: Date, end: Date) => {
            let data: DailyDataQueryResult = {};
            let currentDate = new Date(start);
            while (currentDate < end) {
                let dayKey = getDayKey(currentDate);
                data[dayKey] = Math.random() * 25000;
                currentDate = add(currentDate, { days: 1 });
            }
            return Promise.resolve(data);
        }
    },
    render: render
};