import React from "react";
import { DailyDataQueryResult, DailyDataType } from "../../../helpers/query-daily-data";
import { Card, Layout } from "../../presentational";
import DailyDataChart, { DailyDataChartProps } from "./DailyDataChart";
import getDayKey from "../../../helpers/get-day-key";
import { add } from "date-fns";

export default { title: "Container/DailyDataChart", component: DailyDataChart, parameters: { layout: 'fullscreen' } };
let render = (args: DailyDataChartProps) => <Layout colorScheme="auto"><Card><DailyDataChart {...args} /></Card></Layout>

export const stepsLineChart = {
    args: {
        title: "Steps",
        options: {
            domainMin: 0,
            lineColor: "red"
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


export const stepsBarWithThresholdsChart = {
    args: {
        title: "Steps",
        options: {
            thresholds: [
                {
                    threshold: 8000,
                    thresholdLineColor: "red",
                    overThresholdBarColor: "green",
                },
                {
                    threshold: 10000,
                    thresholdLineColor: "blue",
                    overThresholdBarColor: "red",
                }
            ],
            barColor: "#bbb"
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


export const stepsLiveBarChart = {
    args: {
        title: "Steps",
        options: {

        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        valueFormatter: (value: number) => Number(value.toFixed(0)).toLocaleString(),
        chartType: "Bar"
    },
    render: render
};

export const stepsAreaChart = {
    args: {
        title: "Steps",
        options: {
            areaColor: "red",
            lineColor: "green"
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


export const sleepBarChart = {
    args: {
        title: "Sleep",
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.FitbitSleepMinutes,
        valueFormatter: (value: number) => {
            var hours = Math.floor(value / 60);
            var displayValue = hours > 0 ? (hours + "h ") : "";
            displayValue = displayValue + (Math.round(value - (hours * 60)) + "m");
            return displayValue;
        },
        valueConverter: (value: number) => {
            return value / 60.0;
        },
        chartType: "Bar",
        previewDataProvider: (start: Date, end: Date) => {
            let data: DailyDataQueryResult = {};
            let currentDate = new Date(start);
            while (currentDate < end) {
                let dayKey = getDayKey(currentDate);
                data[dayKey] = Math.random() * 50 + 100;
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