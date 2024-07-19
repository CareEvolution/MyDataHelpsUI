import React from "react";
import { Card, Layout } from "..";
import add from "date-fns/add";
import TimeSeriesChart, { TimeSeriesChartProps } from "./TimeSeriesChart";
import addDays from "date-fns/addDays";
import { predictableRandomNumber } from "../../../helpers/predictableRandomNumber";
import { Meta, StoryObj } from "@storybook/react";
import { ChartThreshold, MultiSeriesLineChartOptions } from "../../../helpers";
import { Bar } from "recharts";
import { format, startOfToday } from "date-fns";

const meta: Meta<typeof TimeSeriesChart> = {
    title: "Presentational/TimeSeriesChart",
    component: TimeSeriesChart,
    parameters: { layout: 'fullscreen' },
    render: (args: TimeSeriesChartProps, { loaded: { randomData } }) => <Layout colorScheme="auto"><Card><TimeSeriesChart {...args} data={randomData} /></Card></Layout>
};

export default meta;
type Story = StoryObj<typeof TimeSeriesChart>;

async function getRandomData(start: Date, end: Date) {
    const responses = [];
    let currentDate = new Date(start);
    while (currentDate < end) {
        responses.push({
            timestamp: currentDate.setHours(0, 0, 0, 0),
            value: (await predictableRandomNumber(currentDate.toISOString())) % 200
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
                value: (await predictableRandomNumber(currentDate.toISOString())) % 200
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
            timestamp: currentDate.setHours(0, 0, 0, 0),
            key1: (await predictableRandomNumber(`${currentDate.toISOString()}key1`)) % 200,
            key2: (await predictableRandomNumber(`${currentDate.toISOString()}key2`)) % 200,
            key3: (await predictableRandomNumber(`${currentDate.toISOString()}key3`)) % 200,
        });
        currentDate = add(currentDate, { days: 1 });
    }
    return responses;
}


function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntradayWithinDomainMultipointData(start: Date, domainMin: number = 0, domainMax: number = 200) {
    var responses = [];
    let currentTime = new Date(start);
    currentTime.setHours(0, 0, 0, 0);
    let endTime = add(currentTime, { hours: 24 });
    while (currentTime < endTime) {
        responses.push({
            timestamp: currentTime,
            key1: (getRandomInt(domainMin - 6, domainMax + 15)),
            key2: (getRandomInt(domainMin - 2, domainMax + 5)),
        });
        currentTime = add(currentTime, { minutes: 5 });
    }
    return responses;
}

async function getRandomIntradayData(start: Date, intervalMinutes?: number) {
    var responses: { timestamp: Date, value: number }[] = [];
    let currentTime = new Date(start);
    currentTime.setHours(0, 0, 0, 0);
    let endTime = add(currentTime, { hours: 24 });
    while (currentTime < endTime) {
        responses.push({
            timestamp: currentTime,
            value: (await predictableRandomNumber(currentTime.toISOString())) % 200
        });
        currentTime = add(currentTime, { minutes: intervalMinutes ?? 5 });
    }
    return responses;
}

var tooltip = ({ active, payload, _label }: any): React.JSX.Element | null => {
    if (active && payload && payload.length) {
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


export const lineChart: Story = {
    args: {
        title: "Line Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: true,
        series: [{ dataKey: 'value' }],
        data: undefined,
        intervalStart: new Date(),
        tooltip: tooltip
    },
    loaders: [
        async () => ({
            randomData: await getRandomData(new Date(), addDays(new Date(), 6))
        })
    ]
};


export const lineChartWithGaps: Story = {
    args: {
        title: "Line Chart with Gaps",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: true,
        expectedDataInterval: { days: 1 },
        series: [{ dataKey: 'value' }],
        data: undefined,
        intervalStart: new Date(),
        tooltip: tooltip
    },
    loaders: [
        async () => ({
            randomData: await getRandomDataWithGaps(new Date(), addDays(new Date(), 6)),
        })
    ]
};

export const lineChartsWithGapsAndTooltipSync: Story = {
    args: {
        title: "Line Charts Tooltip Syncing",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: true,
        expectedDataInterval: { days: 1 },
        series: [{ dataKey: 'value' }],
        data: undefined,
        intervalStart: new Date(),
        tooltip: tooltip
    },
    loaders: [
        async () => ({
            randomDataWithGaps: await getRandomDataWithGaps(new Date(), addDays(new Date(), 6)),
            randomData: await getRandomData(new Date(), addDays(new Date(), 6)),
        })
    ],
    render: (args: TimeSeriesChartProps, { loaded: { randomDataWithGaps, randomData } }) => <Layout colorScheme="auto">
        <Card>
            <TimeSeriesChart {...args} data={randomDataWithGaps} syncId="A" />
            <TimeSeriesChart {...args} data={randomData} syncId="A" />
        </Card>
    </Layout>
};


export const lineChartIntraday: Story = {
    args: {
        title: "Intraday Chart",
        intervalType: "Day",
        chartType: "Line",
        chartHasData: true,
        expectedDataInterval: { minutes: 5 },
        series: [{ dataKey: 'value' }],
        data: undefined,
        intervalStart: new Date(),
        tooltip: tooltip
    },
    loaders: [
        async () => ({
            randomData: await getRandomIntradayData(new Date())
        })
    ]
};

export const barChart: Story = {
    args: {
        title: "Bar Chart",
        intervalType: "Week",
        chartType: "Bar",
        chartHasData: true,
        series: [{ dataKey: 'value' }],
        data: undefined,
        intervalStart: new Date(),
        tooltip
    },
    loaders: [
        async () => ({
            randomData: await getRandomData(new Date(), addDays(new Date(), 6))
        })
    ]
};

export const areaChart: Story = {
    args: {
        title: "Area Chart",
        intervalType: "Week",
        chartType: "Area",
        chartHasData: true,
        series: [{ dataKey: 'value' }],
        data: undefined,
        intervalStart: new Date(),
        tooltip
    },
    loaders: [
        async () => ({
            randomData: await getRandomData(new Date(), addDays(new Date(), 6))
        })
    ]
};

export const multipleLineChart: Story = {
    args: {
        title: "Multiple Line Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: true,
        series: [{ dataKey: 'key1', color: 'red' }, { dataKey: 'key2', color: 'green' }, { dataKey: 'key3' }],
        data: undefined,
        intervalStart: new Date(),
        tooltip
    },
    loaders: [
        async () => ({
            randomData: await getRandomMultipointData(new Date(), addDays(new Date(), 6))
        })
    ]
};

const thresholds: ChartThreshold[] = [
    { value: 80, referenceLineColor: "green", overThresholdColor: "green" },
    { value: 120, referenceLineColor: "orange", overThresholdColor: "#ffdd21" },
    { value: 180, referenceLineColor: "red", overThresholdColor: "#ff0000" }
];
const multiSeriesLineOptions: MultiSeriesLineChartOptions = {
    thresholds: thresholds,
    yAxisOptions: {
        domain: [0, 200]
    },
    lineOptions: {
        connectNulls: false,
        dot: false
    }
};

export const multipleLineChartWithThresholds: Story = {
    args: {
        title: "Multiple Line Chart with Thresholds",
        intervalType: "Day",
        chartType: "Line",
        chartHasData: true,
        series: [{ dataKey: 'key1', color: 'blue' }, { dataKey: 'key2', color: 'purple' }, { dataKey: 'key3', color: 'black' }],
        data: undefined,
        intervalStart: new Date(),
        options: multiSeriesLineOptions,
        tooltip
    },
    loaders: [
        async () => ({
            randomData: await getRandomIntradayWithinDomainMultipointData(new Date())
        })
    ]
};

export const multipleLineChartWithThresholdsSmallRange: Story = {
    args: {
        title: "Multiple Line Chart with Thresholds",
        intervalType: "Day",
        chartType: "Line",
        chartHasData: true,
        series: [{ dataKey: 'key1', color: 'blue' }, { dataKey: 'key2', color: 'purple' }, { dataKey: 'key3', color: 'black' }],
        data: undefined,
        intervalStart: new Date(),
        options: multiSeriesLineOptions,
        tooltip
    },
    loaders: [
        async () => ({
            randomData: await getRandomIntradayWithinDomainMultipointData(new Date(), 20, 150)
        })
    ]
};

export const multipleBarChart: Story = {
    args: {
        title: "Multiple Bar Chart",
        intervalType: "Week",
        chartType: "Bar",
        chartHasData: true,
        data: undefined,
        series: [{ dataKey: 'key1', color: 'red' }, { dataKey: 'key2', color: 'green' }, { dataKey: 'key3' }],
        intervalStart: new Date(),
        tooltip
    },
    loaders: [
        async () => ({
            randomData: await getRandomMultipointData(new Date(), addDays(new Date(), 6))
        })
    ]
};

export const multipleAreaChart: Story = {
    args: {
        title: "Multiple Area Chart",
        intervalType: "Week",
        chartType: "Area",
        chartHasData: true,
        data: undefined,
        series: [{ dataKey: 'key1', color: 'red', areaColor: 'blue' }, { dataKey: 'key2', color: 'green', areaColor: 'green' }, { dataKey: 'key3', color: 'blue', areaColor: 'red' }],
        intervalStart: new Date(),
        tooltip
    },
    loaders: [
        async () => ({
            randomData: await getRandomMultipointData(new Date(), addDays(new Date(), 6))
        })
    ]
};

export const noData: Story = {
    args: {
        title: "No Data Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: false,
        data: [],
        series: [{ dataKey: 'value' }],
        intervalStart: new Date(),
        tooltip
    },
    loaders: [
        async () => ({
            randomData: []
        })
    ]
};

export const loading: Story = {
    args: {
        title: "Loading Chart",
        intervalType: "Week",
        chartType: "Line",
        chartHasData: false,
        data: undefined,
        series: [{ dataKey: 'value' }],
        intervalStart: new Date(),
        tooltip
    },
};

export const overlay: Story = {
    args: {
        title: "Line Chart With Overlay",
        intervalType: "Day",
        chartType: "Line",
        chartHasData: true,
        series: [{ dataKey: 'value' }],
        intervalStart: new Date(),
        options: {
            lineOptions: {
                dot: false
            }
        }
    },
    loaders: [
        async () => {
            let steps = await getRandomIntradayData(new Date(), 30);

            steps.forEach(s => {
                if (s.timestamp.getHours() < 7 || s.timestamp.getHours() > 22) {
                    s.value = 0;
                } else {
                    s.value += 20;
                }
            });

            let maxSteps = Math.max(...steps.map(r => r.value));
            let stepsScale = 220 / (maxSteps * 0.8);
            let overlaySteps = steps.filter(r => r.value > 0).map(r => {
                return { ...r, value: r.value * stepsScale }
            });

            return {
                randomData: await getRandomIntradayData(new Date(), 15),
                children: <Bar data={overlaySteps} type="monotone" dataKey="value" fill="#f5b722" opacity={0.3} radius={[2, 2, 0, 0]} />
            };
        }
    ],
    render: (args: TimeSeriesChartProps, { loaded: { randomData, children } }) => <Layout colorScheme="auto">
        <Card>
            <TimeSeriesChart {...args} data={randomData} children={children} />
        </Card>
    </Layout>
};

export const customizedLineChart: StoryObj = {
    args: {},
    loaders: [
        async () => {
            return {
                randomData: await getRandomIntradayData(new Date(), 60),
            };
        }
    ],
    render: (_, { loaded: { randomData } }) => {
        let selectedDate = startOfToday();

        const customDot = (props: { cx: number, cy?: number, payload: { timestamp: Date } }) => {
            return <svg>
                <circle cx={props.cx} cy={props.cy} r={8} fill="red" />
            </svg>;
        };

        const customDotLabel = (props: any) => {
            return <text x={props.x} y={props.y} dy={3} fill="#fff" fontSize={9} textAnchor="middle">{props.index}</text>;
        };

        let chartDomain: [number, number] = [selectedDate.valueOf(), add(selectedDate, { hours: 24 }).valueOf()];

        let chartTicks = [
            selectedDate.valueOf(),
            add(selectedDate, { hours: 6 }).valueOf(),
            add(selectedDate, { hours: 12 }).valueOf(),
            add(selectedDate, { hours: 18 }).valueOf(),
            add(selectedDate, { hours: 24 }).valueOf()
        ];

        let chartTickFormatter = (value: number) => {
            if (value === chartDomain[0] || value === chartDomain[1]) {
                return "";
            }
            return format(new Date(value), 'h aaa');
        }

        return <Layout colorScheme="auto">
            <Card>
                <TimeSeriesChart
                    title="Customized Line Chart"
                    intervalType="Day"
                    chartType="Line"
                    chartHasData={true}
                    series={[{ dataKey: 'value' }]}
                    intervalStart={selectedDate}
                    data={randomData}
                    options={{
                        lineOptions: {
                            dot: customDot,
                            label: customDotLabel,
                            strokeWidth: 2,
                            animationDuration: 500
                        },
                        containerOptions: {
                            height: 200
                        },
                        xAxisOptions: {
                            domain: chartDomain,
                            ticks: chartTicks,
                            tickFormatter: chartTickFormatter
                        },
                        yAxisOptions: {
                            width: 40,
                            domain: [20, 260],
                            ticks: [-100, -60, -20, 20, 60, 100, 140, 180, 220, 260]
                        }
                    }}
                />
            </Card>
        </Layout>;
    }
};