import React from "react";
import { DailyDataQueryResult, DailyDataType } from "../../../helpers/query-daily-data";
import { Card, Layout } from "../../presentational";
import DailyDataChart, { DailyDataChartProps } from "./DailyDataChart";
import getDayKey from "../../../helpers/get-day-key";
import { add } from "date-fns";

export default { title: "Container/DailyDataChart", component: DailyDataChart, parameters: { layout: 'fullscreen' } };
let render = (args: DailyDataChartProps) => <Layout><Card><DailyDataChart {...args} /></Card></Layout>
export const stepsLineChart = {
    args: {
        title: "Steps",
        options: {
            domainMin:0,
            lineColor:"red"
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Line",
        previewDataProvider: (start: Date, end: Date) => {
            let data: DailyDataQueryResult = {};
            let currentDate = new Date(start);
            while (currentDate < end) {
                let dayKey = getDayKey(currentDate);
                data[dayKey] = Math.random() * 10000 + 3000;
                currentDate = add(currentDate, { days: 1 });
            }
            return Promise.resolve(data);
        }
    },
    render: render
};

export const stepsBarChart = {
    args: {
        title: "Steps",
        options: {
            
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Bar",
        previewDataProvider: (start: Date, end: Date) => {
            let data: DailyDataQueryResult = {};
            let currentDate = new Date(start);
            while (currentDate < end) {
                let dayKey = getDayKey(currentDate);
                data[dayKey] = Math.random() * 10000 + 3000;
                currentDate = add(currentDate, { days: 1 });
            }
            return Promise.resolve(data);
        }
    },
    render: render
};

export const stepsAreaChart = {
    args: {
        title: "Steps",
        options: {
            
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Area",
        previewDataProvider: (start: Date, end: Date) => {
            let data: DailyDataQueryResult = {};
            let currentDate = new Date(start);
            while (currentDate < end) {
                let dayKey = getDayKey(currentDate);
                data[dayKey] = Math.random() * 10000 + 3000;
                currentDate = add(currentDate, { days: 1 });
            }
            return Promise.resolve(data);
        }
    },
    render: render
};

export const noData = {
    args: {
        title: "Steps",
        intervalType: "Week",
        dailyDataType: DailyDataType.Steps,
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Line",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve({});
        }
    },
    render: render
};