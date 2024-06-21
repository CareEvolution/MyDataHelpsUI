import React, { useState, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { add, eachMinuteOfInterval, format, startOfDay } from 'date-fns'
import { LayoutContext, LoadingIndicator } from '../../presentational'
import { HalfDayData, FullDayData, MissingMidDayData } from "./IntradayHeartRateChart.data"
import { ColorDefinition, resolveColor } from '../../../helpers/colors'
import { useInitializeView } from '../../../helpers/Initialization'
import { DeviceDataV2Namespace } from '@careevolution/mydatahelps-js'
import { ChartThreshold, IntradayHeartRateAggregationOption, MultiSeriesLineChartOptions, combinedIntradayHeartRateDataProvider } from '../../..'
import { IntradayHeartRateData } from '../../../helpers/heart-rate-data-providers/combined-intraday-heart-rate-providers'
import TimeSeriesChart from '../../presentational/TimeSeriesChart'
import { isNumber } from 'lodash'

export type IntradayHeartRatePreviewState = "Default" | "CompleteDataWithThresholds" | "MissingMidDayDataThresholds" | "PartialDataWithThresholds" | "NoData";

export interface IntradayHeartRateChartProps {
    previewState?: IntradayHeartRatePreviewState,
    dataSources: DeviceDataV2Namespace[],
    aggregationOption: IntradayHeartRateAggregationOption,
    aggregationIntervalMinutes: number,
    lineColor?: ColorDefinition,
    thresholds?: ChartThreshold[],
    innerRef?: React.Ref<HTMLDivElement>
}

export interface IntradayDataPoint {
    timestamp: number 
    date: Date
    value?: number
    rawValue?: number
}

export default function IntradayHeartRateChart(props: IntradayHeartRateChartProps) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IntradayDataPoint[] | undefined>(undefined);
    const [options, setOptions] = useState<MultiSeriesLineChartOptions | undefined>(undefined);
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
        var chartData: any[] = expectedIntervals.map((date) => transformToDataPoint(date, data));

        var yDomain: number[] = [];
        Object.values(chartData).forEach(dataPoint => {
            dataPoint.value !== undefined && yDomain.push(dataPoint.value);
        });

        const yMaxValue = Math.max(...yDomain);
        const yMinValue = Math.min(...yDomain);

        setOptions({ domainMin: yMinValue, domainMax: yMaxValue, thresholds: props.thresholds, connectNulls: false });
        setData(chartData);
        setLoading(false);
    }

    function transformToDataPoint(date: Date, data: IntradayHeartRateData) {
        var dayKey = date.getTime();
        var intradayDataPoint: IntradayDataPoint = { timestamp: dayKey, date: date };
        if (data[dayKey]) {
            intradayDataPoint.value = (data[dayKey]).statistics[`${props.aggregationOption}`];
            intradayDataPoint.rawValue = intradayDataPoint.value;
        }

        return intradayDataPoint;
    }

    const IntradayHrToolTip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="mdhui-time-series-tooltip">
                    <div className="mdhui-single-value-tooltip-value">{`${Math.round(payload[0].value)} bpm`}</div>
                    <div className="mdhui-time-series-tooltip-date">{format(payload[0].payload.date, "h:mm aaa")}</div>
                </div>
            );
        }
        return null;
    };

    useInitializeView(initialize, [], [props.previewState, props.dataSources, dateRangeContext?.intervalStart]);

    return <div ref={props.innerRef}>
        {loading && <LoadingIndicator></LoadingIndicator>}
        {!loading &&
            <>
                {data && <TimeSeriesChart intervalType='Day' intervalStart={intervalStart} data={data}
                    chartHasData={(!loading && isNumber(options?.domainMax) && options?.domainMax > 0)} 
                    chartType={"Line"} series={[{ dataKey: 'value', color: lineColor }]} tooltip={IntradayHrToolTip}
                    options={options}  ></TimeSeriesChart>}
            </>
        }
    </div>
}