import React, { useContext } from 'react'
import { add, addDays, addHours, addMonths, differenceInDays, Duration, getDaysInMonth, isToday, startOfMonth } from 'date-fns'
import { CardTitle, LayoutContext, LoadingIndicator } from '..'
import { Area, Bar, CartesianGrid, Cell, ComposedChart, Line, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import './TimeSeriesChart.css'
import { AreaChartSeries, ChartSeries, createAreaChartDefs, createBarChartDefs, createLineChartDefs, MultiSeriesBarChartOptions, MultiSeriesLineChartOptions, resolveColor } from '../../../helpers'
import ceil from 'lodash/ceil'
import language from "../../../helpers/language"
import { getAbbreviatedMonthName, getAbbreviatedDayOfWeek, getShortTimeOfDayString } from '../../../helpers/date-helpers'
import { formatNumberForLocale } from "../../../helpers/locale";

export interface TimeSeriesDataPoint {
    timestamp: number; // Unix Timestamp in ms since epoch
    // Other properties of this object are either:
    //  - Named the same as a dataKey property of the configured ChartSeries for the graph
    //  - Arbitrary properties you want access to in places such as the tooltip callback.
    [key: string]: any;
}

export interface TimeSeriesChartProps {
    title?: string;
    intervalType?: "Week" | "Month" | "6Month" | "Day";
    intervalStart: Date;
    data?: TimeSeriesDataPoint[];
    expectedDataInterval?: Duration;
    series: ChartSeries[] | AreaChartSeries[];
    chartHasData: boolean;
    tooltip?: ({ active, payload, label }: any) => React.JSX.Element | null;
    chartType: "Line" | "Bar" | "Area";
    options?: MultiSeriesLineChartOptions | MultiSeriesBarChartOptions;
    syncId?: string;
    children?: React.ReactNode;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function TimeSeriesChart(props: TimeSeriesChartProps) {
    let layoutContext = useContext(LayoutContext);
    let intervalType = props.intervalType || "Month";

    // Ensures that gradients are unique for each chart.
    let gradientKey = `gradient_${Math.random()}_`;

    const DayTick = ({ x, y, payload, index }: any) => {
        let value = payload.value;
        let currentDate = new Date(value);
        if (intervalType === "Month") {
            if (index > 0 && differenceInDays(currentDate, new Date(xAxisTicks![index - 1])) < 2) return <text />;
            return <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{currentDate.getDate()}</text>;
        } else if (intervalType === "6Month") {
            let monthLabel = currentDate.getDate() === 1 ? getAbbreviatedMonthName(currentDate) : "";
            let dayLabel = currentDate.getDate().toString();
            return <>
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 10} textAnchor="middle" fontSize="11">{monthLabel}</text>
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 24} textAnchor="middle" fontSize="12">{dayLabel}</text>
            </>;
        } else if (intervalType === "Week") {
            let dayOfWeek: string = "";
            for (let i = 0; i < 7; i++) {
                if (currentDate.getTime() === value) {
                    dayOfWeek = getAbbreviatedDayOfWeek(currentDate);
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
                <text fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{getShortTimeOfDayString(currentDate)}</text>
            </>;
        }
        return <>
            <text fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{value}</text>
        </>;
    }

    function getXAxisTicks() {
        const startTime = new Date(props.intervalStart);
        startTime.setHours(0, 0, 0, 0);

        if (intervalType === "Week") {
            return Array.from({ length: 7 }, (_, i) => addDays(startTime, i).getTime());
        } else if (intervalType === "Month") {
            const monthLength = getDaysInMonth(startTime);
            const numberOfTicks = ceil(monthLength / 2);
            return Array.from({ length: numberOfTicks }, (_, i) => addDays(startTime, i * 2).getTime())
                .concat(monthLength % 2 === 0 ? [addDays(startTime, monthLength - 1).getTime()] : []);
        } else if (intervalType === "6Month") {
            const ticks: number[] = [];
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
            ticks.push(currentTick.getTime());

            return ticks;
        } else if (intervalType === "Day") {
            return Array.from({ length: 9 }, (_, i) => addHours(startTime, i * 3).getTime());
        }
    }

    function tickFormatter(args: any) {
        if (args >= 10000) {
            return formatNumberForLocale(args / 1000, 1) + 'K'; // K is SI prefix - not localized
        } else {
            return formatNumberForLocale(args, 1);
        }
    }

    function getBarColor(value: number, index: number) {
        let thresholds = (props.options as MultiSeriesBarChartOptions)?.thresholds;
        if (!thresholds) return `url(#${gradientKey}${index})`;

        let highestThresholdIndex = -1;
        for (let i = 0; i < thresholds?.length; i++) {
            if (value > thresholds[i].value && (highestThresholdIndex === -1 || thresholds[i].value > thresholds[highestThresholdIndex].value)) {
                highestThresholdIndex = i;
            }
        }

        if (highestThresholdIndex === -1) return `url(#${gradientKey}${index})`;
        return `url(#${gradientKey}_threshold${highestThresholdIndex})`;
    }

    const keys = props.series.map(s => s.dataKey);

    let dataToDisplay: TimeSeriesDataPoint[] | undefined;
    if (props.data && props.expectedDataInterval) {
        dataToDisplay = [];
        for (let i = 0; i < props.data.length - 1; ++i) {
            dataToDisplay.push(props.data[i]);

            let currentPoint = new Date(props.data[i].timestamp);
            let nextPoint = new Date(props.data[i + 1].timestamp);
            let nextExpectedPoint = add(currentPoint, props.expectedDataInterval);
            if (nextExpectedPoint < nextPoint) {
                let nullValue = {
                    timestamp: nextExpectedPoint.getTime()
                }
                dataToDisplay.push(nullValue);
            }
        }
        dataToDisplay.push(props.data[props.data.length - 1])
    } else {
        dataToDisplay = props.data;
    }

    const xAxisTicks = getXAxisTicks();

    if (props.data?.length === 1 && props.chartType === 'Bar') {
        let currentPoint = new Date(props.data[0].timestamp);
        let nextExpectedPoint = add(currentPoint, props.expectedDataInterval || { days: 1 });
        dataToDisplay?.push({
            timestamp: nextExpectedPoint.getTime()
        });
    }

    return <div className="mdhui-time-series-chart" ref={props.innerRef}>
        {props.title &&
            <CardTitle title={props.title}></CardTitle>
        }
        <div className="chart-container">
            {!props.chartHasData && !!dataToDisplay && <div className="no-data-label">{language('no-data')}</div>}
            {!props.chartHasData && !dataToDisplay && <LoadingIndicator />}
            <ResponsiveContainer width="100%" height={150} {...props.options?.containerOptions}>
                <ComposedChart data={dataToDisplay} syncId={props.syncId}>
                    {props.chartHasData && props.tooltip &&
                        <Tooltip wrapperStyle={{ outline: "none" }} active content={<props.tooltip />} />
                    }
                    {!props.options?.gridOptions?.hide &&
                        <CartesianGrid vertical={props.chartType !== "Bar"} strokeDasharray="2 4" />
                    }
                    <YAxis
                        tickFormatter={tickFormatter}
                        axisLine={false}
                        interval={0}
                        tickLine={false}
                        width={32}
                        domain={props.chartType === 'Line' ? ['auto', 'auto'] : undefined}
                        allowDataOverflow
                        {...props.options?.yAxisOptions}
                    />
                    <XAxis
                        id="myXAxis"
                        domain={[xAxisTicks![0], xAxisTicks![xAxisTicks!.length - 1]]}
                        padding={props.chartType === 'Bar' ? 'gap' : { left: 0, right: 0 }}
                        tick={!props.options?.xAxisOptions?.tickFormatter ? DayTick : undefined}
                        scale={'time'}
                        type={'number'}
                        axisLine={false}
                        dataKey="timestamp"
                        tickMargin={0}
                        minTickGap={0}
                        tickLine={false}
                        ticks={xAxisTicks}
                        allowDataOverflow
                        interval={0}
                        {...props.options?.xAxisOptions}
                    />
                    {props.children}
                    {props.chartHasData &&
                        <>
                            {props.chartType === "Line" &&
                                <>
                                    {createLineChartDefs(layoutContext, gradientKey, props.series, props.options, keys, dataToDisplay!)}
                                    {(props.options as MultiSeriesLineChartOptions)?.thresholds?.filter(t => t.referenceLineColor)?.map((threshold, index) =>
                                        <ReferenceLine key={`line-ref-${index}`} y={threshold.value} stroke={resolveColor(layoutContext.colorScheme, threshold.referenceLineColor)} />
                                    )}
                                    {keys.map((dk, i) =>
                                        <Line
                                            key={`line-${dk}`}
                                            strokeWidth={2}
                                            type="monotone"
                                            dataKey={dk}
                                            stroke={`url(#${gradientKey}${i})`}
                                            dot={{ clipDot: false }}
                                            {...(props.options as MultiSeriesLineChartOptions)?.lineOptions}
                                        />
                                    )}
                                </>
                            }
                            {props.chartType === "Bar" &&
                                <>
                                    {createBarChartDefs(layoutContext, gradientKey, props.series, props.options)}
                                    {(props.options as MultiSeriesBarChartOptions)?.thresholds?.filter(t => t.referenceLineColor)?.map((threshold, index) =>
                                        <ReferenceLine key={`bar-ref-${index}`} y={threshold.value} stroke={resolveColor(layoutContext.colorScheme, threshold.referenceLineColor)} />
                                    )}
                                    {keys.map((dk, i) =>
                                        <Bar
                                            key={`bar-${dk}`}
                                            type="monotone"
                                            dataKey={dk}
                                            fill={`url(#${gradientKey}${i})`}
                                            radius={[2, 2, 0, 0]}
                                        >
                                            {dataToDisplay!.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={getBarColor(entry[dk], i)} />
                                            ))}
                                        </Bar>
                                    )}
                                </>
                            }
                            {props.chartType === "Area" &&
                                <>
                                    {createAreaChartDefs(layoutContext, gradientKey, props.series)}
                                    {keys.map((dk, i) =>
                                        <Area
                                            key={`area-${dk}`}
                                            type="monotone"
                                            dataKey={dk}
                                            fillOpacity={1}
                                            strokeWidth={2}
                                            fill={`url(#${gradientKey}${i}-fill)`}
                                            stroke={`url(#${gradientKey}${i}-stroke)`}
                                        />
                                    )}
                                </>
                            }
                        </>
                    }
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    </div>;
}