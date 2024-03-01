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
    barColor?: string
}

export interface AreaChartOptions {
    lineColor?: string
    areaColor?: string
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
        if(props.chartType === "Line"){
            const options = (props.options as LineChartOptions);
            if(options.lineColor){
                if(Array.isArray(options.lineColor)){
                    return options.lineColor[i];
                }
                return options.lineColor;
            }

            return "var(--mdhui-color-primary)";
        }
    }

    if (!props.hasAnyData && props.hideIfNoData) {
        return null;
    }

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
                        {props.dataKeys && 
                            props.dataKeys.map((dk, i) =>
                                <Line strokeWidth={2} key={`line-${dk}`} type="monotone" dataKey={dk} stroke={getStrokeColor(i)} />
                            )
                        }
                        {!props.dataKeys &&
                            <Line strokeWidth={2} key="line" type="monotone" dataKey="value" stroke={(props.options as LineChartOptions)?.lineColor || "var(--mdhui-color-primary)"} />
                        }
                    </LineChart>
                </ResponsiveContainer>
            }
            {chartHasData && props.chartType == "Bar" &&
                <ResponsiveContainer width="100%" height={150}>
                    <BarChart width={400} height={400} data={props.data} syncId="DailyDataChart" >
                        <defs>
                            <linearGradient id={gradientKey} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={(props.options as BarChartOptions)?.barColor || "var(--mdhui-color-primary)"} stopOpacity={1.0} />
                                <stop offset="100%" stopColor={(props.options as BarChartOptions)?.barColor || "var(--mdhui-color-primary)"} stopOpacity={0.7} />
                            </linearGradient>
                        </defs>
                        {standardChartComponents()}
                        <Bar key="bar" type="monotone" dataKey="value" fill={`url(#${gradientKey})`} radius={[2, 2, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            }
            {chartHasData && props.chartType == "Area" &&
                <ResponsiveContainer width="100%" height={150}>
                    <AreaChart width={400} height={400} data={props.data} syncId="DailyDataChart">
                        <defs>
                            <linearGradient id={gradientKey} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={(props.options as AreaChartOptions)?.areaColor || "var(--mdhui-color-primary)"} stopOpacity={0.5} />
                                <stop offset="100%" stopColor={(props.options as AreaChartOptions)?.areaColor || "var(--mdhui-color-primary)"} stopOpacity={0.2} />
                            </linearGradient>
                        </defs>
                        {standardChartComponents()}
                        <Area key="area" type="monotone" dataKey="value" fillOpacity={1} strokeWidth={2} fill={`url(#${gradientKey})`} stroke={(props.options as AreaChartOptions)?.lineColor || "var(--mdhui-color-primary)"} />
                    </AreaChart>
                </ResponsiveContainer>
            }
        </div>
    </div>
}