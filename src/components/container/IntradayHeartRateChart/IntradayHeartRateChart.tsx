import React, { useState, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { add, eachMinuteOfInterval, format, startOfDay } from 'date-fns'
import { HalfDayData, FullDayData, MissingMidDayData } from "./IntradayHeartRateChart.previewdata"
import { ColorDefinition } from '../../../helpers/colors'
import { useInitializeView } from '../../../helpers/Initialization'
import { DeviceDataV2Namespace } from '@careevolution/mydatahelps-js'
import { ChartThreshold, IntradayHeartRateAggregationOption, IntradayHeartRateData, combinedIntradayHeartRateDataProvider } from '../../..'
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
    const [data, setData] = useState<IntradayHeartRateData | null>(null);
    const dateRangeContext = useContext(DateRangeContext);
    const intervalStart = dateRangeContext?.intervalStart ?? startOfDay(new Date());
    const intervalEnd = startOfDay(add(intervalStart, { days: 1 }));

    function initialize() {
        if (props.previewState) {
            var useData: IntradayHeartRateData = {};
            switch (props.previewState) {
                case "Default":
                case "CompleteDataWithThresholds":
                    useData = FullDayData;
                    break;
                case "PartialDataWithThresholds":
                    useData = HalfDayData;
                    break;
                case "MissingMidDayDataThresholds":
                    useData = MissingMidDayData;
                    break;
            }
            setData(useData);
        } else {
            combinedIntradayHeartRateDataProvider(
                props.dataSources,
                intervalStart,
                intervalEnd,
                props.aggregationIntervalOption ?? "max",
                props.aggregationIntervalMinutes
            ).then((data: IntradayHeartRateData) => {
                setData(data);
            });
        }
    }

    function transformToDataPoint(date: Date, data: IntradayHeartRateData | null) {
        const dataKey = date.getTime();
        let intradayDataPoint: IntradayDataPoint = { timestamp: dataKey, date: date };
        if (data && data[dataKey]) {
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

    useInitializeView(initialize, [], [dateRangeContext?.intervalStart]);

    var iHrData: { timestamp: number, value?: number, rawValue?: number, date?: Date }[] | undefined = [];
    const interval: Interval = { start: intervalStart, end: intervalEnd };
    var expectedIntervals = eachMinuteOfInterval(interval, { step: 5 });
    let yMaxValue = 0;
    let yMinValue = 0;

    if (data) {
        iHrData = expectedIntervals.map(date => transformToDataPoint(date, data));

        var yDomain: number[] = [];
        Object.values(iHrData).forEach(dataPoint => {
            dataPoint.value !== undefined && yDomain.push(dataPoint.value);
        });

        yMaxValue = Math.max(...yDomain);
        yMinValue = Math.min(...yDomain);
    } else {
        iHrData = undefined;
    }

    const options = { domainMin: yMinValue, domainMax: yMaxValue, thresholds: props.thresholds, connectNulls: false };

    return <div ref={props.innerRef}>
        <TimeSeriesChart
            intervalType='Day'
            intervalStart={intervalStart}
            data={iHrData}
            expectedDataInterval={{ days: 1 }}
            chartHasData={options?.domainMax > 0}
            chartType="Line"
            series={[{ dataKey: 'value', color: props.lineColor }]}
            tooltip={IntradayHrToolTip}
            options={options} />
    </div>
}