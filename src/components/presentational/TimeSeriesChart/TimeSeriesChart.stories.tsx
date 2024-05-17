import React from "react";
import { Card, Layout } from "..";
import add from "date-fns/add";
import TimeSeriesChart, { TimeSeriesChartProps } from "./TimeSeriesChart";
import addDays from "date-fns/addDays";
import { predicatableRandomNumber } from "../../../helpers/predictableRandomNumber";

export default { 
    title: "Presentational/TimeSeriesChart", 
    component: TimeSeriesChart, 
    parameters: { layout: 'fullscreen' },
};
let render = (args: TimeSeriesChartProps, { loaded: { randomData } }: any) => <Layout colorScheme="auto"><Card><TimeSeriesChart {...args} data={randomData} /></Card></Layout>

interface TimeSeriesChartTest {
    args: TimeSeriesChartProps,
    render: (args: TimeSeriesChartProps, { loaded: { data } }: any) => React.JSX.Element,
    loaders?: any[]
}



async function getRandomData(start: Date, end: Date) {
    var responses = [];
    let currentDate = new Date(start);
    while (currentDate < end) {
        responses.push({
            timestamp: currentDate.setHours(0,0,0,0),
            value: (await predicatableRandomNumber(currentDate.toISOString())) % 200
        });
        currentDate = add(currentDate, { days: 1 });
    }
    return responses;
}

async function getRandomDataWithGaps(start: Date, end: Date) {
    var responses = [];
    let currentDate = new Date(start);
    while (currentDate < end) {
        if (currentDate.getDate() % 3 !== 0) {
            responses.push({
                timestamp: currentDate.setHours(0, 0, 0, 0),
                value: (await predicatableRandomNumber(currentDate.toISOString())) % 200
            });
        }
        currentDate = add(currentDate, { days: 1 });
    }
    return responses;
}

async function getRandomMultipointData(start: Date, end: Date) {
    var responses = [];
    let currentDate = new Date(start);
    while (currentDate < end) {
        responses.push({
            timestamp: currentDate.setHours(0,0,0,0),
            key1: (await predicatableRandomNumber(currentDate.toISOString()+"key1")) % 200,
            key2: (await predicatableRandomNumber(currentDate.toISOString()+"key2")) % 200,
            key3: (await predicatableRandomNumber(currentDate.toISOString()+"key3")) % 200,
        });
        currentDate = add(currentDate, { days: 1 });
    }
    return responses;
}

async function getRandomIntradayData(start: Date) {
    var responses: any[] = [];
    let currentTime = new Date(start);
    currentTime.setHours(0,0,0,0);
    let endTime = add(currentTime, {hours: 24});
    console.log(currentTime);
    console.log(endTime);
    while (currentTime < endTime) {
        responses.push({
            timestamp: currentTime,
            value: (await predicatableRandomNumber(currentTime.toISOString())) % 200
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
        data: undefined, 
        intervalStart: new Date(),
        tooltip: tooltip
    },
    render: render,
    loaders: [
        async()=>({
            randomData: await getRandomData(new Date(), addDays(new Date(), 6))
        })
    ]
};


export const lineChartWithGaps : TimeSeriesChartTest = {
    args: {
        title: "Line Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: true,
        expectedDataInterval: {days: 1},
        data: undefined,
        intervalStart: new Date(),
        tooltip: tooltip
    },
    render: render,
    loaders: [
        async()=>({
            randomData: await getRandomDataWithGaps(new Date(), addDays(new Date(), 6)),
        })
    ]
};

export const lineChartIntraday : TimeSeriesChartTest = {
    args: {
        title: "Intraday Chart",
        intervalType: "Day",
        chartType: "Line",
        chartHasData: true,
        expectedDataInterval: {minutes: 5},
        data: undefined,
        intervalStart: new Date(),
        tooltip: tooltip
    },
    render: render,
    loaders: [
        async()=>({
            randomData: await getRandomIntradayData(new Date())
        })
    ]
};

export const barChart : TimeSeriesChartTest = {
    args: {
        title: "Bar Chart",
        intervalType: "Week",
        chartType: "Bar",
        chartHasData: true,
        data: undefined,
        intervalStart: new Date(),
        tooltip
    },
    render: render,
    loaders: [
        async()=>({
            randomData: await getRandomData(new Date(), addDays(new Date(), 6))
        })
    ]
};

export const areaChart : TimeSeriesChartTest = {
    args: {
        title: "Area Chart",
        intervalType: "Week",
        chartType: "Area",
        chartHasData: true,
        data: undefined,
        intervalStart: new Date(),
        tooltip
    },
    render: render,
    loaders: [
        async()=>({
            randomData: await getRandomData(new Date(), addDays(new Date(), 6))
        })
    ]
};

export const multipleLineChart : TimeSeriesChartTest = {
    args: {
        title: "Multiple Line Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: true,
        data: undefined,
        dataKeys: ['key1', 'key2', 'key3'],
        intervalStart: new Date(),
        tooltip
    },
    render: render,
    loaders: [
        async()=>({
            randomData: await getRandomMultipointData(new Date(), addDays(new Date(), 6))
        })
    ]
};

export const multipleBarChart : TimeSeriesChartTest = {
    args: {
        title: "Multiple Bar Chart",
        intervalType: "Week",
        chartType: "Bar",
        chartHasData: true,
        data: undefined,
        dataKeys: ['key1', 'key2', 'key3'],
        intervalStart: new Date(),
        tooltip
    },
    render: render,
    loaders: [
        async()=>({
            randomData: await getRandomMultipointData(new Date(), addDays(new Date(), 6))
        })
    ]
};

export const multipleAreaChart : TimeSeriesChartTest = {
    args: {
        title: "Multiple Area Chart",
        intervalType: "Week",
        chartType: "Area",
        chartHasData: true,
        data: undefined,
        dataKeys: ['key1', 'key2', 'key3'],
        intervalStart: new Date(),
        tooltip
    },
    render: render,
    loaders: [
        async()=>({
            randomData: await getRandomMultipointData(new Date(), addDays(new Date(), 6))
        })
    ]
};

export const multipleLineColoredChart : TimeSeriesChartTest = {
    args: {
        title: "Multiple Line Colored Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: true,
        data: undefined,
        dataKeys: ['key1', 'key2', 'key3'],
        intervalStart: new Date(),
        options: { lineColor: ['red', 'green', 'blue']},
        tooltip
    },
    render: render,
    loaders: [
        async()=>({
            randomData: await getRandomMultipointData(new Date(), addDays(new Date(), 6))
        })
    ]
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