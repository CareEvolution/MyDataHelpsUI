import React, { useState } from 'react';
import { checkDailyDataAvailability, DailyDataProvider, DailyDataQueryResult, queryDailyData } from '../../../../helpers/query-daily-data';
import { LoadingIndicator } from '../../../presentational';
import { add, format, startOfToday } from 'date-fns';
import getDayKey from '../../../../helpers/get-day-key';
import { AxisDomain } from 'recharts/types/util/types';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useInitializeView } from '../../../../helpers/Initialization';
import './AsthmaBarChart.css';

export interface AsthmaBarChartProps {
    previewState?: 'default';
    title: string;
    dailyDataType: string;
    domain?: AxisDomain;
    emptyDomain?: AxisDomain;
    valueConverter?: (rawValue: number) => number;
    valueFormatter?: (value: number) => string;
    highlight?: (rawValue: number) => boolean;
    previewDataProvider?: DailyDataProvider;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaBarChartProps) {
    let [loading, setLoading] = useState<boolean>(true);
    let [currentData, setCurrentData] = useState<DailyDataQueryResult | null>(null);

    let today = startOfToday();
    let startDate = add(today, {days: -6});
    let endDate = add(today, {days: 1});

    useInitializeView(() => {
        setLoading(true);

        if (props.previewDataProvider) {
            props.previewDataProvider(startDate, endDate).then((data) => {
                setCurrentData(data);
                setLoading(false);
            });
            return;
        }

        checkDailyDataAvailability(props.dailyDataType).then(function (hasData) {
            if (hasData) {
                queryDailyData(props.dailyDataType, startDate, endDate).then((data) => {
                    setCurrentData(data);
                    setLoading(false);
                });
            } else {
                setCurrentData(null);
                setLoading(false);
            }
        });
    }, ['externalAccountSyncComplete'])

    let currentDate = startDate;
    let data: any[] = [];
    let chartHasData: boolean = false;
    if (currentData) {
        while (currentDate < endDate) {
            let dataDay: any = {
                day: currentDate.getDate()
            };
            data.push(dataDay);

            let dayKey = getDayKey(currentDate);
            if (currentData[dayKey] != undefined && currentData[dayKey] != null) {
                dataDay.rawValue = currentData[dayKey];
                dataDay.value = props.valueConverter ? props.valueConverter(currentData[dayKey]) : currentData[dayKey];
                dataDay.date = currentDate;
                chartHasData = true;
            }
            currentDate = add(currentDate, {days: 1});
        }
    }

    const formatValue = (value: number): string => {
        if (value === 0) {
            return '';
        } else if (value >= 10000) {
            return Number((value / 1000)).toFixed(0) + 'K';
        } else {
            return value.toLocaleString();
        }
    };

    const valueTick = ({x, y, payload}: any) => {
        return <text x={x - 24} y={y + 12} fontSize="11" fontWeight="bold" textAnchor="middle" fill="var(--mdhui-text-color-3)">{formatValue(payload.value)}</text>;
    }

    const dayTick = ({x, y, payload}: any) => {
        let currentDate = add(startDate, {days: payload.value - startDate.getDate()});
        return <text x={x} y={y + 8} fontSize="11" fontWeight="bold" textAnchor="middle" fill="var(--mdhui-text-color-2)">{format(currentDate, 'M/d')}</text>;
    }

    const createLine = ({y1, y2, key}: any) => {
        return <line x1={0} y1={y1} x2="100%" y2={y2} stroke="var(--mdhui-background-color-2)" key={key}/>;
    };

    const labelContent = ({x, y, width, value, index}: any) => {
        if (!value) return undefined;

        let textColor = 'var(--mdhui-color-primary)';
        if (props.highlight && props.highlight(data[index].rawValue)) {
            textColor = '#6731AA';
        }
        return <text x={x + (width / 2)} y={y - 5} fontSize={10} fontWeight="bold" textAnchor="middle" fill={textColor}>{props.valueFormatter ? props.valueFormatter(value) : value.toLocaleString()}</text>;
    };

    return <div className="mdhui-asthma-bar-chart" ref={props.innerRef}>
        <div className="mdhui-asthma-bar-chart-title">{props.title}</div>
        <div className="mdhui-asthma-bar-chart-subtitle">Past 7 days</div>
        <div className="mdhui-asthma-bar-chart-container">
            {loading && <LoadingIndicator/>}
            {!loading && !chartHasData && <div className="mdhui-asthma-bar-chart-no-data-label">No Data</div>}
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} cx={20}>
                    <CartesianGrid vertical={false} x={0} horizontal={createLine}/>
                    <YAxis
                        dataKey="value"
                        tick={valueTick}
                        axisLine={false}
                        tickLine={false}
                        interval={0}
                        width={1}
                        domain={chartHasData ? props.domain : props.emptyDomain}
                        orientation="right"
                    />
                    <XAxis
                        dataKey="day"
                        tick={dayTick}
                        axisLine={false} minTickGap={0}
                        tickLine={false}
                        interval="preserveStartEnd"
                        padding={{left: 20, right: 40}}
                    />
                    <Bar key="bar" type="monotone" dataKey="value" radius={[4, 4, 0, 0]}>
                        <LabelList dataKey="value" position="center" content={labelContent}/>
                        {
                            data.map((entry, index) => {
                                if (props.highlight && props.highlight(entry.rawValue)) {
                                    return <Cell fill="#D8BDF8" key={index}/>;
                                }
                                return <Cell fill="#BBDEFF" key={index}/>;
                            })
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
}