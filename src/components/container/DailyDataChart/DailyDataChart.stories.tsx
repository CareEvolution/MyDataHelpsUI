import React from "react";
import { DailyDataQueryResult, DailyDataType, getDayKey, queryPreviewDailyData } from "../../../helpers";
import { Card, DateRangeCoordinator, Layout } from "../../presentational";
import DailyDataChart, { DailyDataChartProps } from "./DailyDataChart";
import { add } from "date-fns";

export default { title: "Container/DailyDataChart", component: DailyDataChart, parameters: { layout: 'fullscreen' } };
let render = (args: DailyDataChartProps) => <Layout colorScheme="auto"><Card><DailyDataChart {...args} /></Card></Layout>
let renderDRC = (args: DailyDataChartProps) => <Layout colorScheme="auto"><Card><DateRangeCoordinator intervalType="Week"><DailyDataChart {...args} /></DateRangeCoordinator></Card></Layout>

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
        chartType: "Line",
        previewState: "default"
    },
    render: render
};

export const stepsLineChartDRC = {
    args: {
        title: "Steps with Date Range Coordinator",
        options: {
            domainMin: 0,
            lineColor: "red"
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        chartType: "Line",
        previewState: "default"
    },
    render: renderDRC
};


export const stepsWithGapLineChart = {
    args: {
        title: "Steps",
        options: {
            domainMin: 0,
            lineColor: "red"
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        chartType: "Line",
        previewDataProvider: (start: Date, end: Date) => {
            let data: DailyDataQueryResult = {};
            let currentDate = new Date(start);
            while (currentDate < end) {
                if(currentDate.getDate() % 3 !== 0) {
                    let dayKey = getDayKey(currentDate);
                    data[dayKey] = Math.random() * 10000 + 3000;
                }
                currentDate = add(currentDate, { days: 1 });
            }
            return Promise.resolve(data);
        }
    },
    render: render
};

export const stepsWithGapLineChartTooltipSync = {
    args: {
        title: "Steps",
        options: {
            domainMin: 0,
            lineColor: "red"
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        chartType: "Line",
        previewDataProvider: (start: Date, end: Date) => {
            let data: DailyDataQueryResult = {};
            let currentDate = new Date(start);
            while (currentDate < end) {
                if(currentDate.getDate() % 3 !== 0) {
                    let dayKey = getDayKey(currentDate);
                    data[dayKey] = Math.random() * 10000 + 3000;
                }
                currentDate = add(currentDate, { days: 1 });
            }
            return Promise.resolve(data);
        }
    },
    render: (args: DailyDataChartProps) => <Layout colorScheme="auto">
        <Card>
            <DateRangeCoordinator intervalType="Week">
                <DailyDataChart {...args} />
                <DailyDataChart {...{ ...args, title: "Sleep", previewDataProvider: undefined, previewState: 'default' }} />
            </DateRangeCoordinator>
        </Card>
    </Layout>
};
export const stepsBarChart = {
    args: {
        title: "Steps",
        options: {

        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        chartType: "Bar",
        previewState: "default"
    },
    render: render
};


export const stepsBarWithThresholdsChart = {
    args: {
        title: "Steps",
        options: {
            thresholds: [
                {
                    value: 5000,
                    referenceLineColor: "red",
                    overThresholdBarColor: "green",
                },
                {
                    value: 7000,
                    referenceLineColor: "blue",
                    overThresholdBarColor: "red",
                }
            ],
            barColor: "#bbb"
        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        chartType: "Bar",
        previewState: "default"
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
        chartType: "Bar"
    },
    render: render
};

export const stepsLiveBarChartTooltipSync = {
    args: {
        title: "Steps",
        options: {

        },
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.Steps,
        chartType: "Bar"
    },
    render: (args: DailyDataChartProps) => <Layout colorScheme="auto">
        <Card>
            <DateRangeCoordinator intervalType="Month">
                <DailyDataChart {...args} />
                <DailyDataChart {...{ ...args, title: "Sleep", dailyDataType: DailyDataType.SleepMinutes, previewDataProvider: undefined }} />
            </DateRangeCoordinator>
        </Card>
    </Layout>
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
        chartType: "Area",
        previewState: "default"
    },
    render: render
};


export const sleepBarChart = {
    args: {
        title: "Sleep",
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.FitbitSleepMinutes,        
        valueConverter: (value: number) => {
            return value / 60.0;
        },
        chartType: "Bar",
        previewState: "default"
    },
    render: render
};

export const sleepAppleHealthBarChart = {
    args: {
        title: "Sleep",
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.AppleHealthSleepMinutes,        
        valueConverter: (value: number) => {
            return value / 60.0;
        },
        chartType: "Bar",
        previewState: "default"
    },
    render: render
};

export const liveSleepAppleHealthBarChart = {
    args: {
        title: "Sleep",
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.AppleHealthSleepMinutes,        
        valueConverter: (value: number) => {
            return value / 60.0;
        },
        chartType: "Bar",
    },
    render: render
};

export const liveSleepCoreAppleHealthBarChart = {
    args: {
        title: "Sleep",
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.AppleHealthCoreSleepMinutes,        
        valueConverter: (value: number) => {
            return value / 60.0;
        },
        chartType: "Bar",
    },
    render: render
};

export const liveSleepRemAppleHealthBarChart = {
    args: {
        title: "Sleep",
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.AppleHealthRemSleepMinutes,
        
        valueConverter: (value: number) => {
            return value / 60.0;
        },
        chartType: "Bar",
    },
    render: render
};

export const liveSleepDeepAppleHealthBarChart = {
    args: {
        title: "Sleep",
        intervalType: "Week",
        weekStartsOn: "6DaysAgo",
        dailyDataType: DailyDataType.AppleHealthDeepSleepMinutes,        
        valueConverter: (value: number) => {
            return value / 60.0;
        },
        chartType: "Bar",
    },
    render: render
};

export const liveAppleHealthNumberOfAlcoholicBeveragesBarChart = {
    args: {
        title: "Number of Alcoholic Beverages",
        intervalType: "Month",
        dailyDataType: DailyDataType.AppleHealthNumberOfAlcoholicBeverages,        
        chartType: "Bar",
    },
    render: render
};

export const liveHealthConnectRestingHeartRateBarChart = {
    args: {
        title: "Resting Heart Rate",
        intervalType: "Month",
        dailyDataType: DailyDataType.HealthConnectAverageRestingHeartRate,        
        chartType: "Bar",
    },
    render: renderDRC
};

export const liveHealthConnectTotalSleepingMinutesLineChart = {
    args: {
        title: "Sleeping",
        intervalType: "Month",
        dailyDataType: DailyDataType.HealthConnectTotalSleepMinutes,        
        chartType: "Line",
    },
    render: renderDRC
};

export const noData = {
    args: {
        title: "Steps",
        intervalType: "Week",
        dailyDataType: DailyDataType.Steps,
        chartType: "Line",
        previewDataProvider: (start: Date, end: Date) => {
            return Promise.resolve({});
        }
    },
    render: render
};