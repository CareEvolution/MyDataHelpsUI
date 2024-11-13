import React, { useState } from 'react';
import { checkDailyDataAvailability, DailyDataQueryResult, queryDailyData } from '../../../helpers/query-daily-data';
import { LoadingIndicator, Title } from '../../presentational';
import { add, differenceInDays, startOfToday } from 'date-fns';
import getDayKey from '../../../helpers/get-day-key';
import { AxisDomain } from 'recharts/types/util/types';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useInitializeView } from '../../../helpers/Initialization';
import './RecentDailyDataBarChart.css';
import { randomDataProvider } from '../../../helpers/daily-data-providers';
import language from '../../../helpers/language';
import { formatDate } from '../../../helpers/locale';

export interface RecentDailyDataBarChartProps {
    previewState?: 'loading' | 'loaded without data' | 'loaded with data';
    previewDataProvider?: (start: Date, end: Date) => Promise<DailyDataQueryResult>;
    title: string;
    dailyDataType: string;
    domain?: AxisDomain;
    emptyDomain?: AxisDomain;
    valueConverter?: (rawValue: number) => number;
    valueFormatter?: (value: number) => string;
    highlight?: (rawValue: number) => boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: RecentDailyDataBarChartProps) {
    let [loading, setLoading] = useState<boolean>(true);
    let [currentData, setCurrentData] = useState<DailyDataQueryResult | null>(null);

    let today = startOfToday();
    let startDate = add(today, {days: -6});
    let endDate = add(today, {days: 1});

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState === 'loading') {
            setCurrentData({});
            return;
        }
        if (props.previewState === 'loaded without data') {
            setCurrentData({});
            setLoading(false);
            return;
        }
        if (props.previewState === 'loaded with data') {
            if (props.previewDataProvider) {
                props.previewDataProvider(startDate, endDate).then((data) => {
                    setCurrentData(data);
                    setLoading(false);
                });
                return;
            }
            randomDataProvider(startDate, endDate, 0, 20000).then((data) => {
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
    }, ['externalAccountSyncComplete'], [props.previewState])

    let currentDate = startDate;
    let data: any[] = [];
    let chartHasData: boolean = false;
    if (currentData) {
        while (currentDate < endDate) {
            let dataDay: any = {
                daysAfterStart: differenceInDays(currentDate, startDate)
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
        let daysAfterStart = payload.value;
        let currentDate = add(startDate, {days: daysAfterStart});
        return <text x={x} y={y + 8} fontSize="11" fontWeight="bold" textAnchor="middle" fill="var(--mdhui-text-color-2)">{formatDate(currentDate, 'M/d')}</text>;
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

    return <div className="mdhui-recent-daily-data-bar-chart" ref={props.innerRef}>
        <Title order={3} className="mdhui-recent-daily-data-bar-chart-title">{props.title}</Title>
        <div className="mdhui-recent-daily-data-bar-chart-subtitle">{language('recent-daily-data-bar-chart-subtitle')}</div>
        <div className="mdhui-recent-daily-data-bar-chart-container">
            {loading && <LoadingIndicator/>}
            {!loading && !chartHasData && <div className="mdhui-recent-daily-data-bar-chart-no-data-label">{language('recent-daily-data-bar-chart-no-data')}</div>}
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} cx={20}>
                    {(chartHasData || props.emptyDomain) && <CartesianGrid vertical={false} x={0} horizontal={createLine}/>}
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
                        dataKey="daysAfterStart"
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