import React, { useState, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { add, eachMinuteOfInterval, format, startOfDay } from 'date-fns'
import { LoadingIndicator } from '../../presentational'
import { HalfDayData, FullDayData, MissingMidDayData } from "./IntradayHeartRateChart.previewdata"
import { ColorDefinition, resolveColor } from '../../../helpers/colors'
import { useInitializeView } from '../../../helpers/Initialization'
import { DeviceDataV2Namespace } from '@careevolution/mydatahelps-js'
import { ChartThreshold, MultiSeriesLineChartOptions, combinedIntradayHeartRateDataProvider } from '../../..'
import { IntradayHeartRateAggregationOption, IntradayHeartRateData } from '../../../helpers/heart-rate-data-providers/combined-intraday-heart-rate-providers'
import TimeSeriesChart from '../../presentational/TimeSeriesChart'

export type IntradayHeartRatePreviewState = "Default" | "CompleteDataWithThresholds" | "MissingMidDayDataThresholds" | "PartialDataWithThresholds" | "NoData";

export interface IntradayHeartRateChartProps {
    previewState?: IntradayHeartRatePreviewState,
    dataSources: DeviceDataV2Namespace[],
    aggregationIntervalOption?: IntradayHeartRateAggregationOption,
    aggregationIntervalMinutes: number,
    lineColor?: ColorDefinition,
    thresholds?: ChartThreshold[],
    innerRef?: React.Ref<HTMLDivElement>
}

export interface IntradayDataPoint {
    timestamp: number
    date: Date
    value?: number
}

export default function (props: IntradayHeartRateChartProps) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<IntradayDataPoint[] | undefined>(undefined);
    const [options, setOptions] = useState<MultiSeriesLineChartOptions | undefined>(undefined);
    const dateRangeContext = useContext(DateRangeContext);
    const intervalStart = dateRangeContext?.intervalStart ?? startOfDay(new Date());
    const intervalEnd = startOfDay(add(intervalStart, { days: 1 }));

    function initialize() {
        setLoading(true);
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
                props.aggregationIntervalOption ?? "max",
                props.aggregationIntervalMinutes
            ).then((data: IntradayHeartRateData) => {
                transformToChartData(data);
            });
        }
    }

    function transformToChartData(data: IntradayHeartRateData) {
        const start = intervalStart;
        const end = intervalEnd;
        const interval: Interval = { start, end };
        var expectedIntervals = eachMinuteOfInterval(interval, { step: 5 });
        var chartData: IntradayDataPoint[] = expectedIntervals.map(date => transformToDataPoint(date, data));

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
        const dataKey = date.getTime();
        let intradayDataPoint: IntradayDataPoint = { timestamp: dataKey, date: date };
        if (data[dataKey]) {
            intradayDataPoint.value = data[dataKey];
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
        {loading && <LoadingIndicator />}
        {!loading && data &&
            <>
                <TimeSeriesChart intervalType='Day' intervalStart={intervalStart} data={data}
                    chartHasData={(!loading && (options?.domainMax ?? 0) > 0)}
                    chartType="Line" series={[{ dataKey: 'value', color: props.lineColor }]} tooltip={IntradayHrToolTip}
                    options={options} />
            </>
        }
    </div>
}