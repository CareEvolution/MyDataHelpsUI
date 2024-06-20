import React, { useContext } from 'react'
import { add, addDays, addMonths, format, isToday } from 'date-fns'
import { CardTitle, LayoutContext, LoadingIndicator } from '..'
import { Area, Bar, CartesianGrid, Cell, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import './TimeSeriesChart.css'
import { AxisDomain } from 'recharts/types/util/types'
import { AreaChartSeries, ChartSeries, ColorDefinition, MultiSeriesBarChartOptions, MultiSeriesLineChartOptions, resolveColor } from '../../../helpers'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import { ceil } from 'lodash'
import addHours from 'date-fns/addHours'
import startOfMonth from 'date-fns/startOfMonth'
import { Props as XAxisProps } from 'recharts/types/cartesian/XAxis'
import { Props as YAxisProps } from 'recharts/types/cartesian/YAxis'
import { Props as LineProps } from 'recharts/types/cartesian/Line'

export interface TimeSeriesChartProps {
    title?: string
    intervalType?: "Week" | "Month" | "6Month" | "Day",
    intervalStart: Date,
    data: Record<string, any>[] | undefined,
    expectedDataInterval?: Duration,
    series: ChartSeries[] | AreaChartSeries[],
    chartHasData: boolean,
    tooltip?: ({ active, payload, label }: any) => React.JSX.Element | null,
    chartType: "Line" | "Bar" | "Area",
    options?: MultiSeriesLineChartOptions | MultiSeriesBarChartOptions,
    innerRef?: React.Ref<HTMLDivElement>,
    children?: React.ReactNode,
    height?: number,
    xAxisProps?: XAxisProps,
    yAxisProps?: YAxisProps,
    lineProps?: LineProps
}

export default function TimeSeriesChart(props: TimeSeriesChartProps) {
    let layoutContext = useContext(LayoutContext);
    let intervalType = props.intervalType || "Month";

    const DayTick = ({ x, y, payload }: any) => {
        let value = payload.value;
        let currentDate = new Date(value);
        if (intervalType === "Month") {
            return <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{currentDate.getDate()}</text>;
        } else if (intervalType === "6Month") {
            let monthLabel = currentDate.getDate() === 1 ? format(currentDate, "LLL") : "";
            let dayLabel = currentDate.getDate().toString();
            return <>
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 10} textAnchor="middle" fontSize="11">{monthLabel}</text>
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 24} textAnchor="middle" fontSize="12">{dayLabel}</text>
            </>;
        } else if (intervalType === "Week") {
            let dayOfWeek: string = "";
            for (let i = 0; i < 7; i++) {
                if (currentDate.getTime() === value) {
                    dayOfWeek = format(currentDate, "EEEEEE");
                    break;
                }
                currentDate = add(currentDate, { days: 1 });
            }
            return <>
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 10} textAnchor="middle" fontSize="11">{dayOfWeek}</text>
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 24} textAnchor="middle" fontSize="12">{currentDate.getDate()}</text>
            </>;
        } else if (intervalType === "Day") {
            if (currentDate.getHours() === 0) {
                return <></>;
            }
            return <>
                <text fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{format(currentDate, "h aaa")}</text>
            </>;
        }
        return <>
            <text fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{value}</text>
        </>;
    }

    function getXAxisTicks(): number[] {
        const startTime = new Date(props.intervalStart);
        startTime.setHours(0, 0, 0, 0);

        if (intervalType === "Week") {
            return Array.from({ length: 7 }, (_, i) => addDays(startTime, i).getTime());
        } else if (intervalType === "Month") {
            const monthLength = getDaysInMonth(startTime);
            const numberOfTicks = ceil(monthLength / 2);
            return Array.from({ length: numberOfTicks }, (_, i) => addDays(startTime, i * 2).getTime());
        } else if (intervalType === "6Month") {
            const ticks = [];
            let currentTick: Date;
            let endOfGraph = addMonths(startTime, 6);

            if (startTime.getDate() === 1) {
                currentTick = startTime;
            } else if (startTime.getDate() <= 15) {
                const firstTick = addDays(startOfMonth(startTime), 14);
                ticks.push(firstTick.getTime());
                currentTick = startOfMonth(addMonths(startTime, 1));
            } else {
                currentTick = startOfMonth(addMonths(startTime, 1));
            }
            while (currentTick < endOfGraph) {
                ticks.push(currentTick.getTime());
                ticks.push(addDays(currentTick, 14).getTime());
                currentTick = addMonths(currentTick, 1);
            }

            return ticks;
        } else if (intervalType === "Day") {
            return Array.from({ length: 9 }, (_, i) => addHours(startTime, i * 3).getTime());
        }

        return [];
    }

    function tickFormatter(args: any) {
        if (args >= 10000) {
            return Number((args / 1000).toFixed(1)) + 'K';
        } else {
            return Number(args.toFixed(1)).toString();
        }
    }

    //ensures that gradients are unique for each chart
    let gradientKey = `gradient_${Math.random()}`;

    function standardChartComponents() {
        let domain: AxisDomain | undefined = undefined;
        if (props.options) {
            if (props.chartType === "Line") {
                let domainMin = (props.options as MultiSeriesLineChartOptions).domainMin;
                if (domainMin === "Auto") {
                    domain = ["auto", "auto"];
                } else if (domainMin !== undefined) {
                    domain = [domainMin, "auto"];
                }
            }
        }

        return <>
            {props.chartHasData && props.tooltip &&
                <Tooltip wrapperStyle={{ outline: "none" }} active content={<props.tooltip />} />
            }
            <CartesianGrid vertical={props.chartType !== "Bar"} strokeDasharray="2 4" />
            <YAxis
                tickFormatter={tickFormatter}
                axisLine={false}
                interval={0}
                tickLine={false}
                width={32}
                domain={domain}
                {...props.yAxisProps}
            />
            <XAxis
                id="myXAxis"
                domain={['auto', 'auto']}
                padding={props.chartType === 'Bar' ? 'gap' : { left: 0, right: 0 }}
                tick={DayTick}
                scale={'time'}
                type={'number'}
                axisLine={false}
                dataKey="timestamp"
                tickMargin={0}
                minTickGap={0}
                tickLine={false}
                ticks={getXAxisTicks()}
                includeHidden
                interval={0}
                {...props.xAxisProps}
            />
            {props.children}
        </>
    }

    function colorOrDefault(color: ColorDefinition | undefined, defaultColor: string) {
        return resolveColor(layoutContext.colorScheme, color) || "var(--mdhui-color-primary)";
    }

    function getBaseColorForSeries(i: number) {
        return props.series[i].color;
    }

    function getAreaColorForSeries(i: number) {
        return (props.series[i] as AreaChartSeries).areaColor;
    }

    function getBarColor(value: number, index: number) {
        let thresholds = (props.options as MultiSeriesBarChartOptions)?.thresholds;
        if (!thresholds) return `url(#${gradientKey}${index})`;

        let highestThresholdIndex = -1;
        for (var i = 0; i < thresholds?.length; i++) {
            if (value > thresholds[i].value && (highestThresholdIndex === -1 || thresholds[i].value > thresholds[highestThresholdIndex].value)) {
                highestThresholdIndex = i;
            }
        }

        if (highestThresholdIndex === -1) return `url(#${gradientKey}${index})`;
        return `url(#${gradientKey}_threshold${highestThresholdIndex})`;
    }

    const keys = props.series.map(s => s.dataKey);

    let dataToDisplay: Record<string, any>[] | undefined;
    if (props.data && props.expectedDataInterval) {
        dataToDisplay = [];
        for (var i = 0; i < props.data.length - 1; ++i) {
            dataToDisplay.push(props.data[i]);

            var currentPoint = new Date(props.data[i].timestamp);
            var nextPoint = new Date(props.data[i + 1].timestamp);
            var nextExpectedPoint = add(currentPoint, props.expectedDataInterval);
            if (nextExpectedPoint < nextPoint) {
                var nullValue = {
                    timestamp: props.data[i].timestamp + 1
                }
                dataToDisplay.push(nullValue);
            }
        }
        dataToDisplay.push(props.data[props.data.length - 1])
    } else {
        dataToDisplay = props.data;
    }

    let chartHeight = props.height ?? 150;

    return <div className="mdhui-time-series-chart" ref={props.innerRef}>
        {props.title &&
            <CardTitle title={props.title}></CardTitle>
        }
        <div className="chart-container">
            {(!props.chartHasData) &&
                <div>
                    {!!dataToDisplay &&
                        <div className="no-data-label">No Data</div>
                    }
                    {!dataToDisplay &&
                        <LoadingIndicator />
                    }
                    <ResponsiveContainer width="100%" height={chartHeight}>
                        <ComposedChart width={400} height={400} data={dataToDisplay} syncId="DailyDataChart">
                            {standardChartComponents()}
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            }
            {props.chartHasData && props.chartType === "Line" &&
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <ComposedChart data={dataToDisplay} syncId="DailyDataChart">
                        {standardChartComponents()}
                        {keys.map((dk, i) =>
                            <Line connectNulls={(props.options as MultiSeriesLineChartOptions)?.connectNulls} strokeWidth={2} key={`line-${dk}`} type="monotone" dataKey={dk} stroke={colorOrDefault(getBaseColorForSeries(i), "var(--mdhui-color-primary")} {...props.lineProps as any} />
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            }
            {props.chartHasData && props.chartType === "Bar" &&
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <ComposedChart data={dataToDisplay} syncId="DailyDataChart">
                        <defs>
                            {keys.map((dk, i) =>
                                <linearGradient key={`lg-${dk}`} id={`${gradientKey}${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={colorOrDefault(getBaseColorForSeries(i), "var(--mdhui-color-primary)")} stopOpacity={1.0} />
                                    <stop offset="100%" stopColor={colorOrDefault(getBaseColorForSeries(i), "var(--mdhui-color-primary)")} stopOpacity={0.7} />
                                </linearGradient>
                            )}
                            {(props.options as MultiSeriesBarChartOptions)?.thresholds?.map((threshold, index) =>
                                <linearGradient key={`lg_thresh_${gradientKey}_${index}`} id={gradientKey + "_threshold" + index} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={colorOrDefault(threshold.overThresholdColor, "var(--mdhui-color-warning)")} stopOpacity={1.0} />
                                    <stop offset="100%" stopColor={colorOrDefault(threshold.overThresholdColor, "var(--mdhui-color-warning)")} stopOpacity={0.7} />
                                </linearGradient>
                            )}
                        </defs>
                        {(props.options as MultiSeriesBarChartOptions)?.thresholds?.filter(t => t.referenceLineColor)?.map((threshold, index) =>
                            <ReferenceLine key={index} y={threshold.value} stroke={resolveColor(layoutContext.colorScheme, threshold.referenceLineColor)} />
                        )}
                        {standardChartComponents()}
                        {keys.map((dk, i) =>
                            <Bar key={`line-${dk}`} type="monotone" dataKey={dk} fill={`url(#${gradientKey}${i})`} radius={[2, 2, 0, 0]}>
                                {dataToDisplay!.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getBarColor(entry.value, i)} />
                                ))}
                            </Bar>
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            }
            {props.chartHasData && props.chartType === "Area" &&
                <ResponsiveContainer width="100%" height={chartHeight}>
                    <ComposedChart data={dataToDisplay} syncId="DailyDataChart">
                        <defs>
                            {keys.map((dk, i) =>
                                <linearGradient key={`lg-${dk}`} id={`${gradientKey}${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={colorOrDefault(getBaseColorForSeries(i), "var(--mdhui-color-primary)")} stopOpacity={0.5} />
                                    <stop offset="100%" stopColor={colorOrDefault(getBaseColorForSeries(i), "var(--mdhui-color-primary)")} stopOpacity={0.2} />
                                </linearGradient>
                            )}
                        </defs>
                        {standardChartComponents()}
                        {keys.map((dk, i) =>
                            <Area key={`area-${dk}`} type="monotone" dataKey={dk} fillOpacity={1} strokeWidth={2} fill={`url(#${gradientKey}${i})`} stroke={colorOrDefault(getAreaColorForSeries(i), "var(--mdhui-color-primary)")} />
                        )}
                    </ComposedChart>
                </ResponsiveContainer>
            }
        </div>
    </div>
}