import React, { useState, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { add, format, startOfDay } from 'date-fns'
import { LayoutContext, LoadingIndicator } from '../../presentational'
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import "./IntradayHeartRateChart.css"
import { HalfDayData, FullDayData } from "./IntradayHeartRateChart.data"
import { ColorDefinition, resolveColor } from '../../../helpers/colors'
import { useInitializeView } from '../../../helpers/Initialization'
import { DeviceDataV2AggregateQuery, DeviceDataV2Namespace } from '@careevolution/mydatahelps-js'
import { hrIntradayDataProvider } from '../../../helpers/heart-rate-data-providers'
import { DeviceDataV2AggregateReduced } from '../../../helpers/heart-rate-data-providers/intraday-aggregates'
import { Axis } from '../../presentational/DumbbellChart/DumbbellChart'

export type AggregationOption = "avg" | "count" | "min" | "max" | "sum";
export type IntradayHeartRatePreviewState = "Default" | "CompleteDataWithThresholds" | "PartialDataWithThresholds" | "NoData";

export interface IntradayChartThreshold {
    value: number
    referenceLineColor?: ColorDefinition
    overThresholdLineColor?: ColorDefinition
}

export interface IntradayHeartRateChartProps {
    previewState?: IntradayHeartRatePreviewState,
    dataSource: DeviceDataV2Namespace,
    aggregationOption: AggregationOption,
    aggregationIntervalAmount: number,
    aggregationIntervalType: "Hours" | "Minutes",
    lineColor?: ColorDefinition,
    thresholds?: IntradayChartThreshold[],
    innerRef?: React.Ref<HTMLDivElement>
}

export default function IntradayHeartRateChart(props: IntradayHeartRateChartProps) {
    const testThresholdKey = "_threshold";
    const [data, setData] = useState<any[] | undefined>(undefined);
    const [axis, setAxis] = useState<Axis>({ yRange: { values: [0, 120] }, yIncrement: 30, xIncrement: props.aggregationIntervalAmount });
    const dateRangeContext = useContext(DateRangeContext);
    let intervalStart = startOfDay(dateRangeContext?.intervalStart ?? new Date());
    let intervalEnd = add(intervalStart, { days: 1 });
    let layoutContext = useContext(LayoutContext);
    const defaultLineColor = resolveColor(layoutContext.colorScheme, props.lineColor) || '#bbb';

    function initialize() {
        if (props.previewState) {
            var data: DeviceDataV2AggregateReduced[] = [];
            switch (props.previewState) {
                case "Default":
                case "CompleteDataWithThresholds":
                    data = FullDayData;
                    break;
                case "PartialDataWithThresholds":
                    data = HalfDayData;
                    break;
            }

            extractStateData(data);
        } else {

            const params: DeviceDataV2AggregateQuery = {
                type: props.dataSource === "Fitbit" ? "activities-heart-intraday" : "Heart Rate",
                namespace: props.dataSource,
                observedAfter: intervalStart.toISOString(),
                observedBefore: intervalEnd.toISOString(),
                intervalAmount: props.aggregationIntervalAmount ?? 1,
                intervalType: props.aggregationIntervalType,
                aggregateFunctions: [props.aggregationOption]
            };

            hrIntradayDataProvider(params).then(function (data: DeviceDataV2AggregateReduced[]) {
                extractStateData(data);
            }).catch(function (error) {
                console.log("error");
                console.log(error);
            });
        }
    }

    function extractStateData(data: DeviceDataV2AggregateReduced[]) {
        let axis: Axis = { yRange: { values: [0, 120] }, yIncrement: 30, xIncrement: props.aggregationIntervalAmount ?? 3 };
        let yValues: number[] = data.map(d => d.statisticValue);
        let yMax = Math.max(...yValues);
        let yRange = { values: [0, yMax] };
        axis.yRange = yRange;
        setAxis(axis);
        setData(data);
    }

    const GraphToolTip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="mdhui-intraday-hrv-tooltip">
                    <div className="mdhui-intraday-hrv-tooltip-value">{`${Math.round(payload[0].value)} bpm`}
                    </div>
                    <div className="mdhui-intraday-hrv-tooltip-date">{format(payload[0].payload.date, "hh:mm:ss aaa")}</div>
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
        const denominator = axis?.yRange.values[1];
        return (numerator / denominator) * 100;
    }

    function createStopsFromThresholds() {
        let stops: any = [];
        var lineColor: string = defaultLineColor;
        var thresholds = props.thresholds ?? [];

        stops.push(<stop offset="0%" stopColor={lineColor} />);
        for (var i = 0; i < thresholds.length; i++) {
            if (axis.yRange.values[1] >= thresholds[i].value) {
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
                    <linearGradient id="thresholds" key={testThresholdKey} x1="0%" y1="100%" x2="0%" y2="0%">
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
            <YAxis tick={YAxisTick} type='number' domain={axis?.yRange.values} />
            <XAxis tick={XAxisTick} axisLine={true} dataKey="date" tickMargin={0} minTickGap={0} tickCount={24}
                type='number' domain={[intervalStart.getTime(), intervalEnd.getTime()]} />
        </>
    }

    useInitializeView(initialize, [], [props.previewState, props.dataSource, dateRangeContext?.intervalStart]);

    return <div className="mdhui-intraday-hrv-chart" ref={props.innerRef}>
        {!data && <LoadingIndicator />}
        {data &&
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={150}>
                    <LineChart width={400} height={400} data={data}>
                        {standardChartComponents()}
                        <Line dot={false} strokeWidth={3} key="line" type="monotone" dataKey="statisticValue" stroke={`url(#${props.thresholds ? 'thresholds' : 'gradient'})`}></Line>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        }
    </div>
}