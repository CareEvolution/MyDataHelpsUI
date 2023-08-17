import React, { useState, useEffect, useRef, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { DailyDataProvider, DailyDataQueryResult, DailyDataType, queryDailyData } from '../../../helpers/query-daily-data'
import { add, format, getWeek, isToday } from 'date-fns'
import MyDataHelps from '@careevolution/mydatahelps-js'
import { CardTitle, LoadingIndicator } from '../../presentational'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import getDayKey from '../../../helpers/get-day-key'
import "./DailyDataChart.css"
import { AxisDomain } from 'recharts/types/util/types'
import { WeekStartsOn, getMonthStart, getWeekStart } from '../../../helpers/get-interval-start'

export interface DailyDataChartProps {
    title: string
    intervalType?: "Week" | "Month"
    weekStartsOn?: WeekStartsOn
    dailyDataType: string
    valueConverter?(value: number): number
    valueFormatter?(value: number): string
    chartType: "Line" | "Bar" | "Area"
    options?: LineChartOptions | BarChartOptions | AreaChartOptions
    previewDataProvider?: DailyDataProvider
}

export interface LineChartOptions {
    lineColor?: string
    domainMin?: number | "Auto"
}

export interface BarChartOptions {
    barColor?: string
}

export interface AreaChartOptions {
    lineColor?: string
    areaColor?: string
}

function getDefaultIntervalStart(intervalType: "Week" | "Month", weekStartsOn?: WeekStartsOn) {
    let intervalStart = new Date();
    if (intervalType === "Week") {
        intervalStart = getWeekStart(weekStartsOn);
    } else {
        intervalStart = getMonthStart();
    }
    return intervalStart;
}

export default function DailyDataChart(props: DailyDataChartProps) {
    let [currentData, setCurrentData] = useState<DailyDataQueryResult | null>(null);
    const dateRangeContext = useContext<DateRangeContext | null>(DateRangeContext);
    let intervalType = props.intervalType || "Month";
    let intervalStart: Date = new Date();

    if (dateRangeContext) {
        intervalType = dateRangeContext.intervalType;
        intervalStart = dateRangeContext.intervalStart;
    }
    else {
        intervalStart = getDefaultIntervalStart(intervalType, props.weekStartsOn);
    }

    let intervalEnd = intervalType == "Week" ? add(intervalStart, { days: 7 }) : add(intervalStart, { months: 1 });
    function loadCurrentInterval() {
        setCurrentData(null);
        if (props.previewDataProvider) {
            props.previewDataProvider(intervalStart, intervalEnd)
                .then((data) => {
                    setCurrentData(data);
                });
            return;
        }
        queryDailyData(props.dailyDataType, intervalStart, intervalEnd)
            .then((data) => {
                setCurrentData(data);
            });
    }

    useEffect(() => {
        loadCurrentInterval();
        MyDataHelps.on("applicationDidBecomeVisible", loadCurrentInterval);
        MyDataHelps.on("externalAccountSyncComplete", loadCurrentInterval);

        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", loadCurrentInterval);
            MyDataHelps.off("externalAccountSyncComplete", loadCurrentInterval);
        }
    }, [props.intervalType, props.weekStartsOn, dateRangeContext]);

    var currentDate = intervalStart;
    var data: any[] = [];
    var chartHasData: boolean = false;
    if (currentData) {
        while (currentDate < intervalEnd) {
            var dataDay: any = {
                day: currentDate.getDate()
            };
            data.push(dataDay);
            var dayKey = getDayKey(currentDate);
            if (currentData[dayKey] != undefined && currentData[dayKey] != null) {
                dataDay.value = currentData[dayKey];
                if (props.valueConverter) {
                    dataDay.value = props.valueConverter(dataDay.value);
                }
                chartHasData = true;
            }
            currentDate = add(currentDate, { days: 1 });
        }
    }

    const GraphToolTip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            var date = new Date(intervalStart.getFullYear(), intervalStart.getMonth(), payload[0].payload.day);
            return (
                <div className="mdhui-daily-data-tooltip">
                    <div className="mdhui-daily-data-tooltip-value">
                        {props.valueFormatter ? props.valueFormatter(payload[0].value) : payload[0].value}
                    </div>
                    <div className="mdhui-daily-data-tooltip-date">{format(date, 'MM/dd/yyyy')}</div>
                </div>
            );
        }
        return null;
    };

    const DayTick = ({ x, y, stroke, payload }: any) => {
        var value = payload.value;
        if (intervalType == "Month") {
            let currentDate = new Date( intervalStart.getFullYear(), intervalStart.getMonth(), value);
            return <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{value}</text>;
        } else {
            let currentDate = intervalStart;
            let dayOfWeek = format(currentDate, "E").substr(0, 1);
            let month = currentDate.getMonth();
            for (let i = 0; i < 7; i++) {
                if (currentDate.getDate() == value) {
                    month = currentDate.getMonth();
                    dayOfWeek = format(currentDate, "E").substr(0, 1);
                    break;
                }
                currentDate = add(currentDate, { days: 1 });
            }
            month++;
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
            return Number(args.toFixed(0));
        }
        return args;
    }

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
                <Tooltip wrapperStyle={{ outline: "none" }} active content={<GraphToolTip />} />
            }
            <CartesianGrid vertical={props.chartType != "Bar"} strokeDasharray="2 4" />
            <YAxis tickFormatter={tickFormatter} axisLine={false} interval={0} tickLine={false} width={32} domain={domain} />
            <XAxis id="myXAxis" tick={DayTick} axisLine={false} dataKey="day" tickMargin={0} minTickGap={0} tickLine={false} interval={intervalType == "Month" ? 1 : "preserveStartEnd"} />
        </>
    }

    return <div className="mdhui-daily-data-chart">
        {props.title &&
            <CardTitle title={props.title}></CardTitle>
        }
        <div className="chart-container">
            {(!chartHasData) &&
                <div>
                    {currentData &&
                        <div className="no-data-label">No Data</div>
                    }
                    {!currentData &&
                        <LoadingIndicator />
                    }
                    <ResponsiveContainer width="100%" height={150}>
                        <LineChart width={400} height={400} data={data} syncId="DailyDataChart">
                            {standardChartComponents()}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            }
            {chartHasData && props.chartType == "Line" &&
                <ResponsiveContainer width="100%" height={150}>
                    <LineChart width={400} height={400} data={data} syncId="DailyDataChart">
                        {standardChartComponents()}
                        <Line strokeWidth={2} key="line" type="monotone" dataKey="value" stroke="var(--mdhui-color-primary)" />
                    </LineChart>
                </ResponsiveContainer>
            }
            {chartHasData && props.chartType == "Bar" &&
                <ResponsiveContainer width="100%" height={150}>
                    <BarChart width={400} height={400} data={data} syncId="DailyDataChart">
                        {standardChartComponents()}
                        <Bar key="bar" type="monotone" dataKey="value" fill="var(--mdhui-color-primary)" stroke="var(--mdhui-color-primary)" />
                    </BarChart>
                </ResponsiveContainer>
            }
            {chartHasData && props.chartType == "Area" &&
                <ResponsiveContainer width="100%" height={150}>
                    <AreaChart width={400} height={400} data={data} syncId="DailyDataChart">
                        {standardChartComponents()}
                        <Area key="area" type="monotone" dataKey="value" fill="var(--mdhui-color-primary)" stroke="var(--mdhui-color-primary)" />
                    </AreaChart>
                </ResponsiveContainer>
            }
        </div>
    </div>
}