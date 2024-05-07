import React from "react";
import { Card, Layout } from "..";
import add from "date-fns/add";
import TimeSeriesChart, { TimeSeriesChartProps } from "./TimeSeriesChart";
import addDays from "date-fns/addDays";

export default { title: "Presentational/TimeSeriesChart", component: TimeSeriesChart, parameters: { layout: 'fullscreen' } };
let render = (args: TimeSeriesChartProps) => <Layout colorScheme="auto"><Card><TimeSeriesChart {...args} /></Card></Layout>

interface TimeSeriesChartTest {
    args: TimeSeriesChartProps,
    render: (args: TimeSeriesChartProps) => React.JSX.Element
}

function getRandomData(start: Date, end: Date) {
    var responses = [];
    let currentDate = new Date(start);
    while (currentDate < end) {
        responses.push({
            timestamp: currentDate.setHours(0,0,0,0),
            value: parseFloat((Math.random() * 20).toFixed(2))
        });
        currentDate = add(currentDate, { days: 1 });
    }
    return responses;
}

function getRandomDataWithGaps(start: Date, end: Date) {
    var responses = [];
    let currentDate = new Date(start);
    while (currentDate < end) {
        if (currentDate.getDate() % 3 !== 0) {
            responses.push({
                timestamp: currentDate.setHours(0, 0, 0, 0),
                value: parseFloat((Math.random() * 20).toFixed(2))
            });
        }
        currentDate = add(currentDate, { days: 1 });
    }
    return responses;
}

function getRandomMultipointData(start: Date, end: Date) {
    var responses = [];
    let currentDate = new Date(start);
    while (currentDate < end) {
        responses.push({
            timestamp: currentDate.setHours(0,0,0,0),
            key1: parseFloat((Math.random() * 20).toFixed(2)),
            key2: parseFloat((Math.random() * 20).toFixed(2)),
            key3: parseFloat((Math.random() * 20).toFixed(2)),
        });
        currentDate = add(currentDate, { days: 1 });
    }
    return responses;
}

function getRandomIntradayData(start: Date) {
    var responses: any[] = [];
    let currentTime = new Date(start);
    currentTime.setHours(0,0,0,0);
    let endTime = add(currentTime, {hours: 24});
    console.log(currentTime);
    console.log(endTime);
    while (currentTime < endTime) {
        responses.push({
            timestamp: currentTime,
            value: parseFloat((Math.random() * 20).toFixed(2))
        });
        currentTime = add(currentTime, { minutes: 5 });
        console.log(currentTime);
        console.log(endTime);
    }
    return responses;
}

var tooltip = function ({ active, payload, label }: any): React.JSX.Element | null {
    if(active && payload && payload.length){
        return <table className="mdhui-daily-data-tooltip">
            {payload.map((p: any, index: number) =>
                <tr key={p.dataKey}>
                    <th>{p.dataKey}: &nbsp;</th>
                    <td>{p.value}</td>
                </tr>
            )}
        </table>;
    }
    return null;
}


export const lineChart : TimeSeriesChartTest = {
    args: {
        title: "Line Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: true,
        data: getRandomData(new Date(), addDays(new Date(), 6)),
        intervalStart: new Date(),
        tooltip: tooltip
    },
    render: render
};

export const lineChartWithGaps : TimeSeriesChartTest = {
    args: {
        title: "Line Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: true,
        expectedDataInterval: {days: 1},
        data: getRandomDataWithGaps(new Date(), addDays(new Date(), 6)),
        intervalStart: new Date(),
        tooltip: tooltip
    },
    render: render
};

export const lineChartIntraday : TimeSeriesChartTest = {
    args: {
        title: "Intraday Chart",
        intervalType: "Day",
        chartType: "Line",
        chartHasData: true,
        expectedDataInterval: {minutes: 5},
        data: getRandomIntradayData(new Date()),
        intervalStart: new Date(),
        tooltip: tooltip
    },
    render: render
};

export const barChart : TimeSeriesChartTest = {
    args: {
        title: "Bar Chart",
        intervalType: "Week",
        chartType: "Bar",
        chartHasData: true,
        data: getRandomData(new Date(), addDays(new Date(), 6)),
        intervalStart: new Date(),
        tooltip
    },
    render: render
};

export const areaChart : TimeSeriesChartTest = {
    args: {
        title: "Area Chart",
        intervalType: "Week",
        chartType: "Area",
        chartHasData: true,
        data: getRandomData(new Date(), addDays(new Date(), 6)),
        intervalStart: new Date(),
        tooltip
    },
    render: render
};

export const multipleLineChart : TimeSeriesChartTest = {
    args: {
        title: "Multiple Line Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: true,
        data: getRandomMultipointData(new Date(), addDays(new Date(), 6)),
        dataKeys: ['key1', 'key2', 'key3'],
        intervalStart: new Date(),
        tooltip
    },
    render: render
};

export const multipleBarChart : TimeSeriesChartTest = {
    args: {
        title: "Multiple Bar Chart",
        intervalType: "Week",
        chartType: "Bar",
        chartHasData: true,
        data: getRandomMultipointData(new Date(), addDays(new Date(), 6)),
        dataKeys: ['key1', 'key2', 'key3'],
        intervalStart: new Date(),
        tooltip
    },
    render: render
};

export const multipleAreaChart : TimeSeriesChartTest = {
    args: {
        title: "Multiple Area Chart",
        intervalType: "Week",
        chartType: "Area",
        chartHasData: true,
        data: getRandomMultipointData(new Date(), addDays(new Date(), 6)),
        dataKeys: ['key1', 'key2', 'key3'],
        intervalStart: new Date(),
        tooltip
    },
    render: render
};

export const multipleLineColoredChart : TimeSeriesChartTest = {
    args: {
        title: "Multiple Line Colored Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: true,
        data: getRandomMultipointData(new Date(), addDays(new Date(), 6)),
        dataKeys: ['key1', 'key2', 'key3'],
        intervalStart: new Date(),
        options: { lineColor: ['red', 'green', 'blue']},
        tooltip
    },
    render: render
};

export const noData : TimeSeriesChartTest = {
    args: {
        title: "No Data Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: false,
        data: [],
        dataKeys: ['key1', 'key2', 'key3'],
        intervalStart: new Date(),
        options: { lineColor: ['red', 'green', 'blue']},
        tooltip
    },
    render: render
};

export const loading : TimeSeriesChartTest = {
    args: {
        title: "Loading Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: false,
        data: undefined,
        dataKeys: ['key1', 'key2', 'key3'],
        intervalStart: new Date(),
        options: { lineColor: ['red', 'green', 'blue']},
        tooltip
    },
    render: render
};


