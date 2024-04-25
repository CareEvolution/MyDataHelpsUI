import { format } from 'date-fns'
import { LayoutContext } from '..'
import { CartesianGrid, Line, LineChart as ReChartsLineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import "./LineChart.css"
import { ColorDefinition, resolveColor } from '../../../helpers/colors'
import { useContext } from 'react'
import React from 'react'

export type LineChartPreviewState = "Default";

export interface LineChartThreshold {
    value: number
    referenceLineColor?: ColorDefinition
    overThresholdLineColor?: ColorDefinition
}

export interface LineChartDataPoint {
    value: number,
    date: Date
}

export interface LineChartAxis {
    yRange?: number[]
    yIncrement: number;
    xRange?: number[];
    xIncrement: number;
}

export interface LineChartProps {
    data: LineChartDataPoint[],
    axis?: LineChartAxis,
    lineColor?: ColorDefinition,
    thresholds?: LineChartThreshold[],
    innerRef?: React.Ref<HTMLDivElement>
}

export default function MdhLineChart(props: LineChartProps) {
    const thresholdKey = "_threshold";
    const data: LineChartDataPoint[] = props.data;
    let layoutContext = useContext(LayoutContext);
    const defaultLineColor = resolveColor(layoutContext.colorScheme, props.lineColor) || '#bbb';

    var axis: LineChartAxis = props.axis ?? { yRange: [0, 100], yIncrement: 5, xRange: [0, 100], xIncrement: 1 }
    if (!props.axis || (props.axis && !props.axis.yRange)) {
        const yValues: number[] = data.map(d => d.value);
        const yMax = Math.max(...yValues);
        axis.yRange = [0, yMax];
    }
    if (!props.axis || (props.axis && !props.axis?.xRange)) {
        const xValues: any[] = data.map(d => d.date.getTime());
        const xMax = Math.max(...xValues);
        const xMin = Math.min(...xValues);
        axis.xRange = [xMin, xMax];
    }

    const GraphToolTip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="mdhui-line-tooltip">
                    <div className="mdhui-line-tooltip-value">{`${Math.round(payload[0].value)}`}</div>
                    <div className="mdhui-line-tooltip-date">{format(payload[0].payload.date, "hh:mm:ss aaa")}</div>
                </div>
            );
        }
        return null;
    };

    const XAxisTick = ({ x, y, stroke, payload }: any) => {
        var displayX = format(payload.value, "h aaa");
        return <text fill="var(--mdhui-text-color-2)" x={x} y={y + 15} textAnchor="middle" fontSize="12">{displayX}</text>;
    }

    const YAxisTick = ({ x, y, stroke, payload }: any) => {
        var display = Math.round(payload.value);
        return <text fill="var(--mdhui-text-color-3)" x={x - 5} y={y + 5} textAnchor="end" fontSize="12">{display}</text>;
    }

    function getPercent(numerator: number): number {
        const denominator = axis?.yRange ? axis.yRange[1] : 100;
        return (numerator / denominator) * 100;
    }

    function createStopsFromThresholds() {
        const y = axis?.yRange ? axis.yRange[1] : 100;
        let stops: any = [];
        var lineColor: string = defaultLineColor;
        var thresholds = props.thresholds ?? [];

        stops.push(<stop offset="0%" stopColor={lineColor} />);
        for (var i = 0; i < thresholds.length; i++) {
            if (y >= thresholds[i].value) {
                lineColor = resolveColor(layoutContext.colorScheme, thresholds[i].overThresholdLineColor) || defaultLineColor;
                var offSet = getPercent(thresholds[i].value);
                stops.push(<stop offset={`${offSet}%`} stopColor={lineColor} />);
            }
        }
        stops.push(<stop offset="100%" stopColor={lineColor} />);

        return stops;
    }

    function standardChartComponents() {
        return <>
            <defs>
                {props.thresholds &&
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
            <YAxis tick={YAxisTick} type='number' domain={axis?.yRange ?? [0,100]} />
            <XAxis tick={XAxisTick} axisLine={true} dataKey="date" tickMargin={0} minTickGap={0} tickCount={24}
                type='number' domain={axis?.xRange ?? [0,100]} />
        </>
    }

    return <div className="mdhui-line-chart" ref={props.innerRef}>
        <div className="chart-container">
            <ResponsiveContainer width="100%" height={150}>
                <ReChartsLineChart width={400} height={400} data={data}>
                    {standardChartComponents()}
                    <Line dot={false} strokeWidth={3} key="line" type="monotone" dataKey="value" stroke={`url(#${props.thresholds ? 'thresholds' : 'gradient'})`}></Line>
                </ReChartsLineChart>
            </ResponsiveContainer>
        </div>
    </div>
}