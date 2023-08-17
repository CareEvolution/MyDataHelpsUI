import React, { useState, useEffect, useRef, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { DailyDataProvider, DailyDataQueryResult, DailyDataType, queryDailyData } from '../../../helpers/query-daily-data'
import { add, format } from 'date-fns'
import MyDataHelps from '@careevolution/mydatahelps-js'
import { LoadingIndicator } from '../../presentational'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import getDayKey from '../../../helpers/get-day-key'
import "./DailyDataChart.css"

export interface DailyDataChartProps {
    title: string
    intervalType?: "Week" | "Month"
    weekStartsOn?: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "7DaysAgo" | "8DaysAgo"
    dailyDataType: string
    valueConverter?(value: number): number
    valueFormatter?(value: number): string
    chartType: "Line" | "Bar"
    previewDataProvider?: DailyDataProvider
}

function getDefaultIntervalStart(intervalType: "Week" | "Month", weekStartsOn?: "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "7DaysAgo" | "8DaysAgo") {
    let intervalStart = new Date();
    if (intervalType === "Week") {
        //TODO Incorporate weekStartsOn
        while (intervalStart.getDay() != 0) {
            intervalStart = add(intervalStart, { days: -1 });
        }
    } else {
        intervalStart = new Date(intervalStart.getFullYear(), intervalStart.getMonth(), 1, 0, 0, 0, 0);
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
    var graphHasData: boolean = false;
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
                graphHasData = true;
            }
            currentDate = add(currentDate, { days: 1 });
        }
    }

    const GraphToolTip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            var date = new Date(intervalStart.getFullYear(), intervalStart.getMonth(), payload[0].payload.day);
            return (
                <div className="graph-tooltip">
                    <div className="graph-date">{format(date, 'MM/dd/yyyy')}</div>
                    <div className="graph-value">
                        {props.valueFormatter ? props.valueFormatter(payload[0].value) : payload[0].value}
                    </div>
                </div>
            );
        }
        return null;
    };

    const DayTick = ({ x, y, stroke, payload }: any) => {
        var value = payload.value;
        if (intervalType == "Month") {
            return <text fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{value}</text>;
        } else {
            let currentDate = intervalStart;
            let dayOfWeek = format(currentDate, "E").substr(0, 1);
            let month = currentDate.getMonth();
            for (let i = 0; i < 7; i++) {
                if(currentDate.getDate() == value){
                    month = currentDate.getMonth();
                    dayOfWeek = format(currentDate, "E").substr(0, 1);
                }
                currentDate = add(currentDate, { days: 1 });
            }
            month++;
            return <>
            <text fill="var(--mdhui-text-color-2)" x={x} y={y + 8} textAnchor="middle" fontSize="11">{dayOfWeek}</text>
            <text fill="var(--mdhui-text-color-2)" x={x} y={y + 24} textAnchor="middle" fontSize="12">{value}</text>
            </>;
        }
    }

    function tickFormatter(args: any) {
        if (args >= 10000) {
            return Number((args / 1000).toFixed(1)) + 'K';
        }
        return args;
    }

    return <div className="mdhui-daily-data-chart">
        {props.title &&
            <div className="title">
                {props.title}
            </div>
        }
        <div className="chart-container">
            {(!graphHasData) &&
                <div>
                    {currentData &&
                        <div className="no-data-label">No Data</div>
                    }
                    {!currentData &&
                        <LoadingIndicator />
                    }
                    <ResponsiveContainer width="100%" height={150}>
                        <LineChart width={400} height={400} data={data} syncId="DailyDataChart">
                            <CartesianGrid strokeDasharray="3 3" />
                            <YAxis axisLine={false} interval={0} tickLine={false} width={32} scale="linear" />
                            <XAxis id="myXAxis" tick={DayTick} axisLine={false} dataKey="day" tickMargin={0} minTickGap={0} tickLine={false} interval={1} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            }
            {graphHasData && props.chartType == "Line" &&
                <ResponsiveContainer width="100%" height={150}>
                    <LineChart width={400} height={400} data={data} syncId="DailyDataChart">
                        <Line key="line" type="monotone" dataKey="value" stroke="var(--mdhui-color-primary)" />
                        <Tooltip content={<GraphToolTip />} />
                        <CartesianGrid strokeDasharray="2 4" />
                        <YAxis tickFormatter={tickFormatter} axisLine={false} interval={0} tickLine={false} width={32} />
                        <XAxis id="myXAxis" tick={DayTick} axisLine={false} dataKey="day" tickMargin={0} minTickGap={0} tickLine={false} interval={1} />
                    </LineChart>
                </ResponsiveContainer>
            }
            {graphHasData && props.chartType == "Bar" &&
                <ResponsiveContainer width="100%" height={150}>
                    <BarChart width={400} height={400} data={data} syncId="DailyDataChart">
                        <CartesianGrid vertical={false} strokeDasharray="2 4" />
                        <Tooltip content={<GraphToolTip />} />
                        <Bar key="bar" type="monotone" dataKey="value" fill="var(--mdhui-color-primary)" stroke="var(--mdhui-color-primary)" />
                        <YAxis tickFormatter={tickFormatter} axisLine={false} interval={0} tickLine={false} width={32} />
                        <XAxis id="myXAxis" tick={DayTick} axisLine={false} dataKey="day" tickMargin={0} minTickGap={0} tickLine={false} interval={intervalType == "Month" ? 1 : 0} />
                    </BarChart>
                </ResponsiveContainer>
            }
        </div>
    </div>
}