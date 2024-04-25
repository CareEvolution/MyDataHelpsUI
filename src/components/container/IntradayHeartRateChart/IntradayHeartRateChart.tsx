import React, { useState, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { add, startOfDay } from 'date-fns'
import { LayoutContext, LoadingIndicator } from '../../presentational'
import { HalfDayData, FullDayData } from "./IntradayHeartRateChart.data"
import { ColorDefinition, resolveColor } from '../../../helpers/colors'
import { useInitializeView } from '../../../helpers/Initialization'
import { DeviceDataV2Aggregate, DeviceDataV2AggregateQuery, DeviceDataV2Namespace } from '@careevolution/mydatahelps-js'
import { hrIntradayDataProvider } from '../../../helpers/heart-rate-data-providers'
import LineChart, { LineChartAxis, LineChartDataPoint } from '../../presentational/LineChart/LineChart'

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
    const [data, setData] = useState<LineChartDataPoint[]>([]);
    const [axis, setAxis] = useState<LineChartAxis>({ yRange: [0, 200], yIncrement: 30, xIncrement: props.aggregationIntervalAmount });
    const dateRangeContext = useContext(DateRangeContext);
    let intervalStart = startOfDay(dateRangeContext?.intervalStart ?? new Date());
    let intervalEnd = add(intervalStart, { days: 1 });
    let layoutContext = useContext(LayoutContext);
    const defaultLineColor = resolveColor(layoutContext.colorScheme, props.lineColor) || '#bbb';

    function initialize() {
        if (props.previewState) {
            var data: DeviceDataV2Aggregate[] = [];
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

            hrIntradayDataProvider(params).then(function (data: DeviceDataV2Aggregate[]) {
                extractStateData(data);
            }).catch(function (error) {
                console.log("error");
                console.log(error);
            });
        }
    }

    function extractStateData(data: DeviceDataV2Aggregate[]) {
        let axis: LineChartAxis = { yRange: [0, 200], yIncrement: 30, xIncrement: props.aggregationIntervalAmount ?? 3 };
        let dataPoints : LineChartDataPoint[] = data.map(transformToDeviceDataV2AggregateReduced);
        dataPoints = dataPoints.sort((a, b) => a.date.getTime() - b.date.getTime());

        if (dataPoints.length){
            let yValues: number[] = dataPoints.map(d => d.value);
            let yMax = Math.max(...yValues);
            let yRange = [0, yMax];
            axis.yRange = yRange;
        }

        axis.xRange = [intervalStart.getTime(), intervalEnd.getTime()];
        setAxis(axis);
        setData(dataPoints);
    }

    function transformToDeviceDataV2AggregateReduced( data: DeviceDataV2Aggregate){
        return { date: new Date(data.date), value: data.statistics[`${props.aggregationOption}`] }
    }

    useInitializeView(initialize, [], [props.previewState, props.dataSource, dateRangeContext?.intervalStart]);

    return <div ref={props.innerRef}>
        <LineChart data={data} axis={axis} lineColor ={defaultLineColor} 
                 thresholds ={props.thresholds} innerRef={props.innerRef}></LineChart>
    </div>
}