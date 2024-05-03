import { eachHourOfInterval, format } from 'date-fns'
import { LayoutContext } from '..'
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import "./IntradayLineChart.css"
import { ColorDefinition, resolveColor } from '../../../helpers/colors'
import { useContext } from 'react'
import React from 'react'

export interface IntradayChartThreshold {
    value: number
    referenceLineColor?: ColorDefinition
    overThresholdLineColor?: ColorDefinition
}

export interface IntradayDataPoint {
    value: number | undefined
    date: Date
}

export interface IntradayLineChartProps {
    data: IntradayDataPoint[]
    lineColor?: ColorDefinition
    thresholds?: IntradayChartThreshold[]
    xDomain: Date[]
    toolTipText: string
    innerRef?: React.Ref<HTMLDivElement>
}

export default function IntradayLineChart(props: IntradayLineChartProps) {
    const thresholdKey = "_threshold";
    const data: IntradayDataPoint[] = props.data;
    let layoutContext = useContext(LayoutContext);
    const defaultLineColor = resolveColor(layoutContext.colorScheme, props.lineColor) || '#bbb';

    var yMaxValue = 0;
    var hasData = false;
    if (props.data) {
        var yDomain: number[] = [];
        Object.values(data).forEach(dataPoint => {
            dataPoint.value !== undefined && yDomain.push(dataPoint.value);
        });

        hasData = yDomain.length > 0;
        yMaxValue = Math.max(...yDomain);
    }

    const GraphToolTip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="mdhui-line-tooltip">
                    <div className="mdhui-line-tooltip-value">{`${Math.round(payload[0].value)} ${props.toolTipText}`}</div>
                    <div className="mdhui-line-tooltip-date">{format(payload[0].payload.date, "h:mm aaa")}</div>
                </div>
            );
        }
        return null;
    };

    const XAxisTickFormatter = (tick: any) => {
        const display = format(tick, "h aaa");
        if (display === '12 am') return "";
        return display;
    }

    const YAxisTick = ({ x, y, stroke, payload }: any) => {
        var display = Math.round(payload.value);
        return <text fill="var(--mdhui-text-color-3)" x={x - 5} y={y + 5} textAnchor="end" fontSize="12">{display}</text>;
    }

    function getPercent(numerator: number): number {
        return (numerator / yMaxValue) * 100;
    }

    function createStopsFromThresholds() {
        let stops: any = [];
        var lineColor: string = defaultLineColor;
        var thresholds = props.thresholds ?? [];

        stops.push(<stop offset="0%" stopColor={lineColor} />);
        for (var i = 0; i < thresholds.length; i++) {
            if (yMaxValue >= thresholds[i].value) {
                lineColor = resolveColor(layoutContext.colorScheme, thresholds[i].overThresholdLineColor) || defaultLineColor;
                var offSet = getPercent(thresholds[i].value);
                stops.push(<stop offset={`${offSet}%`} stopColor={lineColor} />);
            }
        }
        stops.push(<stop offset="100%" stopColor={lineColor} />);

        return stops;
    }

    function standardChartComponents() {
        const start = props.xDomain[0];
        const end = props.xDomain[1];
        const interval: Interval = { start, end };
        const options: any = { step: 3 };
        const ticks = eachHourOfInterval(interval, options).map((date) => date.getTime());

        return <>
            <defs>
                {props.thresholds && data.length > 0 &&
                    <linearGradient id="thresholds" key={thresholdKey} x1="0%" y1="100%" x2="0%" y2="0%">
                        {createStopsFromThresholds()}
                    </linearGradient>
                }

                {!props.thresholds &&
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
                        <stop offset="0%" stopColor={defaultLineColor} />
                        <stop offset="100%" stopColor={defaultLineColor} />
                    </linearGradient>
                }
            </defs>
            <Tooltip wrapperStyle={{ outline: "none" }} content={<GraphToolTip />} />
            <CartesianGrid vertical strokeDasharray="2 4" />
            {(props.thresholds)?.filter(t => t.referenceLineColor)?.map((threshold, index) =>
                <ReferenceLine key={`threshref_${index}`} y={threshold.value} stroke={resolveColor(layoutContext.colorScheme, threshold.referenceLineColor)} />
            )}
            <YAxis tick={YAxisTick} axisLine={false} interval={0} tickLine={false} width={32} domain={[0, 'dataMax']} />
            <XAxis dataKey='date' domain={ticks} scale='time' type='number' ticks={ticks} tickFormatter={XAxisTickFormatter}
                axisLine={false} tickMargin={0} minTickGap={0} tickLine={false} />
        </>
    }

    return <div className="mdhui-line-chart" ref={props.innerRef}>
        <div className="chart-container">
            {!hasData && <div className="no-data-label">No Data</div>}
            <ResponsiveContainer width="100%" height={150}>
                <LineChart width={400} height={400} data={data}>
                    {standardChartComponents()}
                    <Line dot={false} strokeWidth={2} type="monotone" dataKey="value" stroke={`url(#${props.thresholds ? 'thresholds' : 'gradient'})`}></Line>
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
}