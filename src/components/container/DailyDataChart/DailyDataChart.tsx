import React, { useState, useEffect, useRef, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { DailyDataProvider, DailyDataQueryResult, checkDailyDataAvailability, queryDailyData } from '../../../helpers/query-daily-data'
import { add, format, getWeek, isToday } from 'date-fns'
import MyDataHelps from '@careevolution/mydatahelps-js'
import { CardTitle, LayoutContext, LoadingIndicator } from '../../presentational'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import getDayKey from '../../../helpers/get-day-key'
import "./DailyDataChart.css"
import { AxisDomain } from 'recharts/types/util/types'
import { WeekStartsOn, getMonthStart, getWeekStart } from '../../../helpers/get-interval-start'
import { ColorDefinition, resolveColor } from '../../../helpers/colors'

export interface DailyDataChartProps {
    title?: string
    intervalType?: "Week" | "Month"
    weekStartsOn?: WeekStartsOn
    dailyDataType: string
    valueConverter?(value: number): number
    valueFormatter?(value: number): string
    chartType: "Line" | "Bar" | "Area"
    options?: LineChartOptions | BarChartOptions | AreaChartOptions
    hideIfNoData?: boolean
    previewDataProvider?: DailyDataProvider
    innerRef?: React.Ref<HTMLDivElement>
}

export interface LineChartOptions {
    lineColor?: string
    domainMin?: number | "Auto"
}

export interface BarChartOptions {
    barColor?: ColorDefinition
    thresholds?: ChartThreshold[]
}

export interface ChartThreshold {
    threshold: number
    thresholdLineColor?: ColorDefinition
    overThresholdBarColor?: ColorDefinition
}

export interface AreaChartOptions {
    lineColor?: ColorDefinition
    areaColor?: ColorDefinition
}

function getDefaultIntervalStart(intervalType: "Week" | "Month", weekStartsOn?: WeekStartsOn) {
    let intervalStart: Date;
    if (intervalType === "Week") {
        intervalStart = getWeekStart(weekStartsOn);
    } else {
        intervalStart = getMonthStart();
    }
    return intervalStart;
}

export default function DailyDataChart(props: DailyDataChartProps) {
    let [currentData, setCurrentData] = useState<DailyDataQueryResult | null>(null);
    let [hasAnyData, setHasAnyData] = useState(false);

    let layoutContext = useContext(LayoutContext);

    const dateRangeContext = useContext<DateRangeContext | null>(DateRangeContext);
    let intervalType = props.intervalType || "Month";
    let intervalStart: Date;

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
        function checkAvailability() {
            if (props.previewDataProvider) {
                setHasAnyData(true);
                return;
            }
            checkDailyDataAvailability(props.dailyDataType).then(function (hasData) {
                setHasAnyData(hasData);
            });
        }
        checkAvailability();
        MyDataHelps.on("applicationDidBecomeVisible", checkAvailability);
        MyDataHelps.on("externalAccountSyncComplete", checkAvailability);
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", checkAvailability);
            MyDataHelps.off("externalAccountSyncComplete", checkAvailability);
        }
    }, [props.dailyDataType]);

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
                dataDay.rawValue = dataDay.value;
                dataDay.date = currentDate;
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
            var date = payload[0].payload.date;
            return (
                <div className="mdhui-daily-data-tooltip">
                    <div className="mdhui-daily-data-tooltip-value">
                        {props.valueFormatter ? props.valueFormatter(payload[0].payload.rawValue) : payload[0].payload.value}
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
            let currentDate = new Date(intervalStart.getFullYear(), intervalStart.getMonth(), value);
            return <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{value}</text>;
        } else {
            let currentDate = intervalStart;
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
                <Tooltip wrapperStyle={{ outline: "none" }} active content={<GraphToolTip />} />
            }
            <CartesianGrid vertical={props.chartType != "Bar"} strokeDasharray="2 4" />
            <YAxis tickFormatter={tickFormatter} axisLine={false} interval={0} tickLine={false} width={32} domain={domain} />
            <XAxis id="myXAxis" tick={DayTick} axisLine={false} dataKey="day" tickMargin={0} minTickGap={0} tickLine={false} interval={intervalType == "Month" ? 1 : "preserveStartEnd"} />
        </>
    }

    if (!hasAnyData && props.hideIfNoData) {
        return null;
    }

    function getBarColor(value: number) {
        var thresholds = (props.options as BarChartOptions)?.thresholds;
        if (!thresholds) return `url(#${gradientKey})`;

        let highestThresholdIndex = -1;
        for (var i = 0; i < thresholds?.length; i++) {
            if (value > thresholds[i].threshold && (highestThresholdIndex == -1 || thresholds[i].threshold > thresholds[highestThresholdIndex].threshold)) {
                highestThresholdIndex = i;
            }
        }

        if (highestThresholdIndex == -1) return `url(#${gradientKey})`;
        return `url(#${gradientKey}_threshold${highestThresholdIndex})`;
    }

    return <div className="mdhui-daily-data-chart" ref={props.innerRef}>
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
                        <Line strokeWidth={2} key="line" type="monotone" dataKey="value" stroke={(props.options as LineChartOptions)?.lineColor || "var(--mdhui-color-primary)"} />
                    </LineChart>
                </ResponsiveContainer>
            }
            {chartHasData && props.chartType == "Bar" &&
                <ResponsiveContainer width="100%" height={150}>
                    <BarChart width={400} height={400} data={data} syncId="DailyDataChart" >
                        <defs>
                            <linearGradient id={gradientKey} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={resolveColor(layoutContext.colorScheme, (props.options as BarChartOptions)?.barColor) || "var(--mdhui-color-primary)"} stopOpacity={1.0} />
                                <stop offset="100%" stopColor={resolveColor(layoutContext.colorScheme, (props.options as BarChartOptions)?.barColor) || "var(--mdhui-color-primary)"} stopOpacity={0.7} />
                            </linearGradient>

                            {(props.options as BarChartOptions)?.thresholds?.map((threshold, index) =>
                                <linearGradient id={gradientKey + "_threshold" + index} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={resolveColor(layoutContext.colorScheme, threshold.overThresholdBarColor) || "var(--mdhui-color-warning)"} stopOpacity={1.0} />
                                    <stop offset="100%" stopColor={resolveColor(layoutContext.colorScheme, threshold.overThresholdBarColor) || "var(--mdhui-color-warning)"} stopOpacity={0.7} />
                                </linearGradient>
                            )}
                        </defs>
                        {(props.options as BarChartOptions)?.thresholds?.filter(t=>t.thresholdLineColor)?.map((threshold, index) =>
                            <ReferenceLine y={threshold.threshold} stroke={resolveColor(layoutContext.colorScheme, threshold.thresholdLineColor)} />
                        )}
                        {standardChartComponents()}
                        <Bar key="bar" type="monotone" dataKey="value" fill={`url(#${gradientKey})`} radius={[2, 2, 0, 0]} >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            }
            {chartHasData && props.chartType == "Area" &&
                <ResponsiveContainer width="100%" height={150}>
                    <AreaChart width={400} height={400} data={data} syncId="DailyDataChart">
                        <defs>
                            <linearGradient id={gradientKey} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={resolveColor(layoutContext.colorScheme, (props.options as AreaChartOptions)?.areaColor) || "var(--mdhui-color-primary)"} stopOpacity={0.5} />
                                <stop offset="100%" stopColor={resolveColor(layoutContext.colorScheme, (props.options as AreaChartOptions)?.areaColor) || "var(--mdhui-color-primary)"} stopOpacity={0.2} />
                            </linearGradient>
                        </defs>
                        {standardChartComponents()}
                        <Area key="area" type="monotone" dataKey="value" fillOpacity={1} strokeWidth={2} fill={`url(#${gradientKey})`} stroke={resolveColor(layoutContext.colorScheme, (props.options as AreaChartOptions)?.lineColor) || "var(--mdhui-color-primary)"} />
                    </AreaChart>
                </ResponsiveContainer>
            }
        </div>
    </div>
}