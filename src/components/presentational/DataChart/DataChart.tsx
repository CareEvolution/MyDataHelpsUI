import React from 'react'
import { add, format, isToday } from 'date-fns'
import { CardTitle, LoadingIndicator } from '../../presentational'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import "./DataChart.css"
import { AxisDomain } from 'recharts/types/util/types'
import { LineChartOptions } from '../../container'

export interface DataChartProps {
    title?: string
    intervalType?: "Week" | "Month",
    intervalStart: Date,
    data: any[],
    dataKeys?: string[],
    hasAnyData: boolean,
    tooltip: ({ active, payload, label }: any) => React.JSX.Element | null,
    chartType: "Line" | "Bar" | "Area"
    options?: LineChartOptions | BarChartOptions | AreaChartOptions
    hideIfNoData?: boolean
    innerRef?: React.Ref<HTMLDivElement>
}

export interface LineChartOptions {
    lineColor?: string | string[],
    domainMin?: number | "Auto"
}

export interface BarChartOptions {
    barColor?: string | string[],
}

export interface AreaChartOptions {
    lineColor?: string | string[],
    areaColor?: string | string[],
}

export default function DataChart(props: DataChartProps) {
    let intervalType = props.intervalType || "Month";

    let chartHasData = props.data.length > 0;

    const DayTick = ({ x, y, stroke, payload }: any) => {
        var value = payload.value;
        if (intervalType == "Month") {
            let currentDate = new Date(props.intervalStart.getFullYear(), props.intervalStart.getMonth(), value);
            return <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{value}</text>;
        } else {
            let currentDate = props.intervalStart;
            let dayOfWeek: string = "";
            for (let i = 0; i < 7; i++) {
                if (currentDate.getDate() == value) {
                    dayOfWeek = format(currentDate, "EEEEEE");
                    break;
                }
                currentDate = add(currentDate, { days: 1 });
            }
            return <>
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 8} textAnchor="middle" fontSize="11">{dayOfWeek}</text>
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 24} textAnchor="middle" fontSize="12">{value}</text>
            </>;
        }
    }

    function tickFormatter(args: any) {
        if (args >= 10000) {
            return Number((args / 1000).toFixed(1)) + 'K';
        } else {
            return Number(args.toFixed(1));
        }
        return args;
    }

    //ensures that gradients are unique for each chart
    let gradientKey = `gradient_${Math.random()}`;
    function standardChartComponents() {
        let domain: AxisDomain | undefined = undefined;
        if (props.options) {
            if (props.chartType == "Line") {
                let domainMin = (props.options as LineChartOptions).domainMin;
                if (domainMin == "Auto") {
                    domain = ["auto", "auto"];
                } else if (domainMin != undefined) {
                    domain = [domainMin, "auto"];
                }
            }
        }

        return <>
            {chartHasData &&
                <Tooltip wrapperStyle={{ outline: "none" }} active content={<props.tooltip />} />
            }
            <CartesianGrid vertical={props.chartType != "Bar"} strokeDasharray="2 4" />
            <YAxis tickFormatter={tickFormatter} axisLine={false} interval={0} tickLine={false} width={32} domain={domain} />
            <XAxis id="myXAxis" tick={DayTick} axisLine={false} dataKey="day" tickMargin={0} minTickGap={0} tickLine={false} interval={intervalType == "Month" ? 1 : "preserveStartEnd"} />
        </>
    }

    function getStrokeColor(i: number) {
        if(props.chartType === "Line" || props.chartType === "Area"){
            return getColorFromOptions(i, "lineColor");
        }
    }

    function getBarColor(i: number) {
        if(props.chartType === "Bar"){
            return getColorFromOptions(i, "barColor");
        }
    }

    function getAreaColor(i: number) {
        if(props.chartType === "Area"){
            return getColorFromOptions(i, "areaColor");
        }
    }


    function getColorFromOptions(i: number, fieldName: string) {
        var property = props.options[fieldName];
        if(!!property){
            if (Array.isArray(property)) {
                return property[i];
            }
            return property;
        }

        return "var(--mdhui-color-primary)";
    }

    if (!props.hasAnyData && props.hideIfNoData) {
        return null;
    }

    const keys = props.dataKeys || ["value"];

    return <div className="mdhui-daily-data-chart" ref={props.innerRef}>
        {props.title &&
            <CardTitle title={props.title}></CardTitle>
        }
        <div className="chart-container">
            {(!chartHasData) &&
                <div>
                    {props.hasAnyData &&
                        <div className="no-data-label">No Data</div>
                    }
                    {!props.data &&
                        <LoadingIndicator />
                    }
                    <ResponsiveContainer width="100%" height={150}>
                        <LineChart width={400} height={400} data={props.data} syncId="DailyDataChart">
                            {standardChartComponents()}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            }
            {chartHasData && props.chartType == "Line" &&
                <ResponsiveContainer width="100%" height={150}>
                    <LineChart width={400} height={400} data={props.data} syncId="DailyDataChart">
                        {standardChartComponents()}
                        {keys.map((dk, i) =>
                                <Line strokeWidth={2} key={`line-${dk}`} type="monotone" dataKey={dk} stroke={getStrokeColor(i)} />
                            )
                        }
                    </LineChart>
                </ResponsiveContainer>
            }
            {chartHasData && props.chartType == "Bar" &&
                <ResponsiveContainer width="100%" height={150}>
                    <BarChart width={400} height={400} data={props.data} syncId="DailyDataChart" >
                        <defs>
                            {keys.map((dk, i) =>
                                <linearGradient id={`${gradientKey}${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={getBarColor(i)} stopOpacity={1.0} />
                                    <stop offset="100%" stopColor={getBarColor(i)} stopOpacity={0.7} />
                                </linearGradient>
                            )}
                        </defs>
                        {standardChartComponents()}
                        {keys.map((dk, i) =>
                                <Bar key={`line-${dk}`} type="monotone" dataKey={dk} fill={`url(#${gradientKey}${i})`} radius={[2, 2, 0, 0]} />
                            )
                        }
                    </BarChart>
                </ResponsiveContainer>
            }
            {chartHasData && props.chartType == "Area" &&
                <ResponsiveContainer width="100%" height={150}>
                    <AreaChart width={400} height={400} data={props.data} syncId="DailyDataChart">
                        <defs>
                            {keys.map((dk, i) =>
                            <linearGradient id={`${gradientKey}${i}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={getAreaColor(i)} stopOpacity={0.5} />
                                <stop offset="100%" stopColor={getAreaColor(i)} stopOpacity={0.2} />
                            </linearGradient>
                            )}
                        </defs>
                        {standardChartComponents()}
                        {keys.map((dk, i) =>
                                <Area key={`area-${dk}`} type="monotone" dataKey={dk} fillOpacity={1} strokeWidth={2} fill={`url(#${gradientKey}${i})`} stroke={getStrokeColor(i)} />
                            )
                        }
                    </AreaChart>
                </ResponsiveContainer>
            }
        </div>
    </div>
}