import React, { useState, useEffect, useRef, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { DailyDataProvider, DailyDataQueryResult, checkDailyDataAvailability, queryDailyData } from '../../../helpers/query-daily-data'
import { add, format, getWeek, isToday } from 'date-fns'
import MyDataHelps from '@careevolution/mydatahelps-js'
import { CardTitle, LoadingIndicator } from '../../presentational'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import getDayKey from '../../../helpers/get-day-key'
import { AxisDomain } from 'recharts/types/util/types'
import { WeekStartsOn, getMonthStart, getWeekStart } from '../../../helpers/get-interval-start'
import "./IntradayHeartRateChart.css"
import hrData from "./IntradayHeartRateChart.data"

export interface IntradayHeartRateChartProps {

}

export default function IntradayHeartRateChart(props: IntradayHeartRateChartProps) {
    var data: any[] = [];
    // let previousValue = 60;
    // for (var i = 0; i < 1440; i += 5) {
    //     let value = (previousValue - 2.5) + Math.random() * 5;
    //     if(i < 600 ) {
    //         value = (previousValue - 2.5) + Math.random() * 5.75;
    //     }
    //     if(i > 600 && i < 625) {
    //         value = (previousValue - 2.5) + Math.random() * 7;
    //     }
    //     if(i > 720 && i < 900) {
    //         value = (previousValue - 2.5) + Math.random() * 4;
    //     }

    //     while (value > 130 || value < 60){
    //         value = (previousValue - 2.5) + Math.random() * 5;
    //     }
    //     previousValue = value;
    //     data.push({
    //         minute: i,
    //         value: value
    //     });
    // }

    data = hrData;

    console.log(JSON.stringify(data));

    const GraphToolTip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="mdhui-daily-data-tooltip">
                    <div className="mdhui-daily-data-tooltip-value">
                        95 bpm
                    </div>
                    <div className="mdhui-daily-data-tooltip-date">3:30 pm</div>
                </div>
            );
        }
        return null;
    };

    const HourTick = ({ x, y, stroke, payload }: any) => {
        var value = payload.value;
        let hour = value / 60;
        let ampm = "am";
        if (hour == 0) {
            return <text fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12"></text>;
        }
        if (hour > 12) {
            hour = hour - 12;
            ampm = "pm";
        }

        return <text fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{hour} {ampm}</text>;
    }

    //ensures that gradients are unique for each chart
    function standardChartComponents() {
        let domain: AxisDomain | undefined = undefined;

        return <>
            <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
                    <stop offset="0%" stopColor="var(--mdhui-color-danger)" />
                    {/* <stop offset={`${percentage}%`} stopColor="red" />
                    <stop offset={`${percentage}%`} stopColor="blue" /> */}
                    <stop offset="35%" stopColor="#bbb" />
                    <stop offset="100%" stopColor="#bbb" />
                </linearGradient>
            </defs>
            <Tooltip wrapperStyle={{ outline: "none" }} active content={<GraphToolTip />} />
            <CartesianGrid vertical strokeDasharray="2 4" />
            <ReferenceLine y={115} stroke="#bbb" />
            <YAxis axisLine={false} interval={0} tickLine={false} width={32} domain={domain} />
            <XAxis id="myXAxis" tick={HourTick} axisLine={false} dataKey="minute" tickMargin={0} minTickGap={0} tickLine={false} interval={35} />
        </>
    }

    return <div className="mdhui-daily-data-chart">
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={150}>
                <LineChart width={400} height={400} data={data} syncId="DailyDataChart">
                    {standardChartComponents()}
                    <Line dot={false} strokeWidth={3} key="line" type="monotone" dataKey="value" stroke="url(#gradient)" />

                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
}