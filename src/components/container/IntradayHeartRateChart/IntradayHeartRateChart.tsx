import React, { useState, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { add, eachMinuteOfInterval, startOfDay } from 'date-fns'
import { LayoutContext, LoadingIndicator } from '../../presentational'
import { HalfDayData, FullDayData, MissingMidDayData } from "./IntradayHeartRateChart.data"
import { ColorDefinition, resolveColor } from '../../../helpers/colors'
import { useInitializeView } from '../../../helpers/Initialization'
import { DeviceDataV2Namespace } from '@careevolution/mydatahelps-js'
import IntradayLineChart, { IntradayChartThreshold, IntradayDataPoint } from '../../presentational/IntradayLineChart/IntradayLineChart'
import { IntradayHeartRateAggregationOption, combinedIntradayHeartRateDataProvider, getDayKey, queryAllDeviceDataV2 } from '../../..'
import { IntradayHeartRateData } from '../../../helpers/heart-rate-data-providers/combined-intraday-heart-rate-providers'

export type IntradayHeartRatePreviewState = "Default" | "CompleteDataWithThresholds" | "MissingMidDayDataThresholds" | "PartialDataWithThresholds" | "NoData";

export interface IntradayHeartRateChartProps {
    previewState?: IntradayHeartRatePreviewState,
    dataSources: DeviceDataV2Namespace[],
    aggregationOption: IntradayHeartRateAggregationOption,
    aggregationIntervalMinutes: number,
    lineColor?: ColorDefinition,
    thresholds?: IntradayChartThreshold[],
    innerRef?: React.Ref<HTMLDivElement>
}

export default function IntradayHeartRateChart(props: IntradayHeartRateChartProps) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IntradayDataPoint[]>([]);
    const dateRangeContext = useContext(DateRangeContext);
    const intervalStart = startOfDay(dateRangeContext?.intervalStart ?? new Date());
    const intervalEnd = startOfDay(add(intervalStart, { days: 1 }));
    let layoutContext = useContext(LayoutContext);
    const lineColor = resolveColor(layoutContext.colorScheme, props.lineColor) || '#bbb';

    function initialize() {
        if (props.previewState) {
            var data: IntradayHeartRateData = {};
            switch (props.previewState) {
                case "Default":
                case "CompleteDataWithThresholds":
                    data = FullDayData;
                    break;
                case "PartialDataWithThresholds":
                    data = HalfDayData;
                    break;
                case "MissingMidDayDataThresholds":
                    data = MissingMidDayData;
                    break;
            }

            transformToChartData(data);
        } else {
            combinedIntradayHeartRateDataProvider(
                props.dataSources,
                intervalStart,
                intervalEnd,
                props.aggregationOption,
                props.aggregationIntervalMinutes
            ).then(function (data: IntradayHeartRateData) {
                transformToChartData(data);
            }).catch(function (error: any) {
                console.log("error");
                console.log(error);
            });
        }
    }

    function transformToChartData(data: IntradayHeartRateData) {
        const start = intervalStart;
        const end = intervalEnd;
        const interval: Interval = { start, end };
        const options: any = { step: 5 };
        var expectedIntervals = eachMinuteOfInterval(interval, options);
        var chartData: IntradayDataPoint[] = expectedIntervals.map((date) => transformToDataPoint(date, data));
        setData(chartData);
        setLoading(false);
    }

    function transformToDataPoint(date: Date, data: IntradayHeartRateData) {
        var dayKey = date.getTime();
        var intradayDataPoint: IntradayDataPoint = { date: date, value: undefined }
        if (data[dayKey]) {
            intradayDataPoint.value = (data[dayKey]).statistics[`${props.aggregationOption}`];
        }
        return intradayDataPoint;
    }

    useInitializeView(initialize, [], [props.previewState, props.dataSources, dateRangeContext?.intervalStart]);

    return <div ref={props.innerRef}>
        {loading && <LoadingIndicator></LoadingIndicator>}
        {!loading && <IntradayLineChart data={data} lineColor={lineColor} xDomain={[intervalStart, intervalEnd]}
            thresholds={props.thresholds} toolTipText="bpm" innerRef={props.innerRef}></IntradayLineChart>}
    </div>
}