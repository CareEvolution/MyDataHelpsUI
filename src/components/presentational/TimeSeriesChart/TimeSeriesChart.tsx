import React, { useContext } from 'react'
import { add, addDays, addMonths, format, isToday } from 'date-fns'
import { CardTitle, LayoutContext, LoadingIndicator } from '..'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import "./TimeSeriesChart.css"
import { AxisDomain } from 'recharts/types/util/types'
import { ColorDefinition, resolveColor } from '../../../helpers/colors'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import { ceil } from 'lodash'
import addHours from 'date-fns/addHours'

export interface TimeSeriesChartProps {
    title?: string
    intervalType?: "Week" | "Month" | "SixMonth" | "Day",
    intervalStart: Date,
    data: any[] | undefined,
    expectedDataInterval?: Duration,
    dataKeys?: string[],
    chartHasData: boolean,
    tooltip: ({ active, payload, label }: any) => React.JSX.Element | null,
    chartType: "Line" | "Bar" | "Area"
    options?: LineChartOptions | BarChartOptions | AreaChartOptions
    innerRef?: React.Ref<HTMLDivElement>
}

export interface LineChartOptions {
    lineColor?: ColorDefinition | ColorDefinition[],
    connectNulls?: boolean,
    domainMin?: number | "Auto"
}

export interface BarChartOptions {
    barColor?: ColorDefinition | ColorDefinition[],
    thresholds?: BarChartThreshold[]
}

export interface BarChartThreshold {
    value: number
    referenceLineColor?: ColorDefinition
    overThresholdBarColor?: ColorDefinition
}

export interface AreaChartOptions {
    lineColor?: ColorDefinition | ColorDefinition[],
    areaColor?: ColorDefinition | ColorDefinition[],
}

export default function TimeSeriesChart(props: TimeSeriesChartProps) {
    let layoutContext = useContext(LayoutContext);
    let intervalType = props.intervalType || "Month";

    const DayTick = ({ x, y, stroke, payload }: any) => {
        var value = payload.value;
        let currentDate = new Date(value);
        if (intervalType == "Month") {
            return <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{currentDate.getDate()}</text>;
        } else if (intervalType == "SixMonth" ){
            let monthLabel = currentDate.getDate() === 1 ? format(currentDate, "LLL") : "";
            let dayLabel = currentDate.getDate().toString();
            return <>
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 8} textAnchor="middle" fontSize="11">{monthLabel}</text>
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 24} textAnchor="middle" fontSize="12">{dayLabel}</text>
            </>;
        } else if (intervalType == "Week" ){
            let dayOfWeek: string = "";
            for (let i = 0; i < 7; i++) {
                if (currentDate.getTime() == value) {
                    dayOfWeek = format(currentDate, "EEEEEE");
                    break;
                }
                currentDate = add(currentDate, { days: 1 });
            }
            return <>
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 8} textAnchor="middle" fontSize="11">{dayOfWeek}</text>
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 24} textAnchor="middle" fontSize="12">{currentDate.getDate()}</text>
            </>;
        } else if ( intervalType == "Day"){
            const startTime = new Date(props.intervalStart);
            startTime.setHours(0, 0, 0, 0);
            return <>
                {currentDate.getTime() === startTime.getTime() && <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 8} textAnchor="middle" fontSize="11">{format(currentDate, "EEEEEE")}</text>}
                <text className={isToday(currentDate) ? "today" : ""} fill="var(--mdhui-text-color-2)" x={x} y={y + 24} textAnchor="middle" fontSize="12">{format(currentDate, "hh:mm aaa")}</text>
            </>;
        }
        return <>
            <text fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{value}</text>;
        </>
    }

    function getXAxisTicks() {
        const startTime = new Date(props.intervalStart);
        startTime.setHours(0,0,0,0);

        if(intervalType === "Week") {
            return Array.from({length: 7}, (_, i) => addDays(startTime, i).getTime() );
        }
        else if (intervalType === "Month") {
            var monthLength = getDaysInMonth(startTime);
            var numberOfTicks = ceil(monthLength / 2);
            return Array.from({ length: numberOfTicks }, (_, i) => addDays(startTime, i * 2).getTime());
        }
        else if (intervalType === "SixMonth") { 
            var ticks = [];
            for(var i = 0; i < 5; ++i) {
                var currentDate = addMonths(startTime, i);
                ticks.push(currentDate.getTime());
                currentDate = addDays(currentDate, 14);
                ticks.push(currentDate.getTime());
            }
            ticks.push(addMonths(startTime, 5).getTime());

            return ticks;
        }
        else if (intervalType === "Day") {
            var ticks = [];
            return Array.from({length: 9}, (_, i) => addHours(startTime, i*3).getTime() );
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
            {props.chartHasData &&
                <Tooltip wrapperStyle={{ outline: "none" }} active content={<props.tooltip />} />
            }
            <CartesianGrid vertical={props.chartType != "Bar"} strokeDasharray="2 4" />
            <YAxis tickFormatter={tickFormatter} axisLine={false} interval={0} tickLine={false} width={32} domain={domain} />
            <XAxis id="myXAxis"
                domain={['auto', 'auto']}
                padding={props.chartType == 'Bar' ? 'gap' : { left: 0, right: 0 }}
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
            />
        </>
    }

    function getStrokeColor(i: number) {
        if(props.chartType === "Line" || props.chartType === "Area"){
            return getColorFromOptions(i, "lineColor");
        }
    }

    function getBaseBarColor(i: number) {
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
        var property = props.options ? (props.options as any)[fieldName] : null;
        if(!!property){
            if (Array.isArray(property)) {
                return property[i];
            }
            return property;
        }

        return "var(--mdhui-color-primary)";
    }

    function getBarColor(value: number, index: number) {
        var thresholds = (props.options as BarChartOptions)?.thresholds;
        if (!thresholds) return `url(#${gradientKey}${index})`;

        let highestThresholdIndex = -1;
        for (var i = 0; i < thresholds?.length; i++) {
            if (value > thresholds[i].value && (highestThresholdIndex == -1 || thresholds[i].value > thresholds[highestThresholdIndex].value)) {
                highestThresholdIndex = i;
            }
        }

        if (highestThresholdIndex == -1) return `url(#${gradientKey}${index})`;
        return `url(#${gradientKey}_threshold${highestThresholdIndex})`;
    }

    const keys = props.dataKeys || ["value"];

    let dataToDisplay: any[] | undefined;
    if(props.data && props.expectedDataInterval) {
        dataToDisplay = [];
        for(var i = 0; i < props.data.length-1; ++i) {
            dataToDisplay.push(props.data[i]);

            var currentPoint = new Date(props.data[i].timestamp);
            var nextPoint = new Date(props.data[i+1].timestamp);
            var nextExpectedPoint = add(currentPoint, props.expectedDataInterval);
            if( nextExpectedPoint < nextPoint) {
                var nullValue = {
                    timestamp: props.data[i].timestamp + 1
                }
                dataToDisplay.push(nullValue);
            }
        }
        dataToDisplay.push(props.data[props.data.length-1])
    }else{
        dataToDisplay = props.data;
    }

    return <div className="mdhui-daily-data-chart" ref={props.innerRef}>
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
                    <ResponsiveContainer width="100%" height={150}>
                        <LineChart width={400} height={400} data={dataToDisplay} syncId="DailyDataChart">
                            {standardChartComponents()}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            }
            {props.chartHasData && props.chartType == "Line" &&
                <ResponsiveContainer width="100%" height={150}>
                    <LineChart width={400} height={400} data={dataToDisplay} syncId="DailyDataChart" margin={{left: 5, top: 5, bottom: 5, right: 40}}>
                        {standardChartComponents()}
                        {keys.map((dk, i) =>
                                <Line connectNulls={(props.options as LineChartOptions)?.connectNulls} strokeWidth={2} key={`line-${dk}`} type="monotone" dataKey={dk} stroke={getStrokeColor(i)} />
                            )
                        }
                    </LineChart>
                </ResponsiveContainer>
            }
            {props.chartHasData && props.chartType == "Bar" &&
                <ResponsiveContainer width="100%" height={150}>
                    <BarChart width={400} height={400} data={dataToDisplay} syncId="DailyDataChart" margin={{left: 5, top: 5, bottom: 5, right: 40}} >
                        <defs>
                            {keys.map((dk, i) =>
                                <linearGradient key={`lg-${dk}`} id={`${gradientKey}${i}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={resolveColor(layoutContext.colorScheme, getBaseBarColor(i)) || "var(--mdhui-color-primary)"} stopOpacity={1.0} />
                                    <stop offset="100%" stopColor={resolveColor(layoutContext.colorScheme, getBaseBarColor(i)) || "var(--mdhui-color-primary)"} stopOpacity={0.7} />
                                </linearGradient>
                            )}
                            {(props.options as BarChartOptions)?.thresholds?.map((threshold, index) =>
                                <linearGradient key={`lg_thresh_${threshold}`} id={gradientKey + "_threshold" + index} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={resolveColor(layoutContext.colorScheme, threshold.overThresholdBarColor) || "var(--mdhui-color-warning)"} stopOpacity={1.0} />
                                    <stop offset="100%" stopColor={resolveColor(layoutContext.colorScheme, threshold.overThresholdBarColor) || "var(--mdhui-color-warning)"} stopOpacity={0.7} />
                                </linearGradient>
                            )}
                        </defs>
                        {(props.options as BarChartOptions)?.thresholds?.filter(t=>t.referenceLineColor)?.map((threshold, index) =>
                            <ReferenceLine y={threshold.value} stroke={resolveColor(layoutContext.colorScheme, threshold.referenceLineColor)} />
                        )}
                        {standardChartComponents()}
                        {keys.map((dk, i) =>
                                <Bar key={`line-${dk}`} type="monotone" dataKey={dk} fill={`url(#${gradientKey}${i})`} radius={[2, 2, 0, 0]} >
                                    {dataToDisplay!.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={getBarColor(entry.value, i)} />
                                    ))}
                                </Bar>
                            )
                        }
                    </BarChart>
                </ResponsiveContainer>
            }
            {props.chartHasData && props.chartType == "Area" &&
                <ResponsiveContainer width="100%" height={150}>
                    <AreaChart width={400} height={400} data={dataToDisplay} syncId="DailyDataChart" margin={{left: 5, top: 5, bottom: 5, right: 40}}>
                        <defs>
                            {keys.map((dk, i) =>
                            <linearGradient key={`lg-${dk}`} id={`${gradientKey}${i}`} x1="0" y1="0" x2="0" y2="1">
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