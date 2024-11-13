import React, { useState, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { add, startOfDay } from 'date-fns'
import { HalfDayData, FullDayData, MissingMidDayData } from "./IntradayHeartRateChart.previewdata"
import { ColorDefinition } from '../../../helpers/colors'
import { useInitializeView } from '../../../helpers/Initialization'
import { DeviceDataV2Namespace } from '@careevolution/mydatahelps-js'
import { ChartThreshold, IntradayHeartRateAggregationOption, IntradayHeartRateData, MultiSeriesLineChartOptions, combinedIntradayHeartRateDataProvider } from '../../..'
import TimeSeriesChart from '../../presentational/TimeSeriesChart'
import { formatDateForLocale } from '../../../helpers/locale';

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

    let iHrData: { timestamp: number, value?: number, rawValue?: number, date?: Date }[] | undefined = [];
    let chartHasData: boolean = false;

    function initialize() {
        setData(null);
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

    const IntradayHrToolTip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="mdhui-time-series-tooltip">
                    <div className="mdhui-single-value-tooltip-value">{`${Math.round(payload[0].value)} bpm`}</div>
                    <div className="mdhui-time-series-tooltip-date">{formatDateForLocale(payload[0].payload.date, "h:mm aaa")}</div>
                </div>
            );
        }
        return null;
    };

    useInitializeView(initialize, [], [dateRangeContext?.intervalStart]);

    if (data) {

        Object.keys(data).forEach(k => {
            let key = parseInt(k);
            iHrData?.push({ timestamp: key, date: new Date(key), value: data[key] });
            chartHasData = true;
        });
    } else {
        iHrData = undefined;
    }

    const options: MultiSeriesLineChartOptions = {
        thresholds: props.thresholds,
        yAxisOptions: {
            domain: [0, 'auto']
        },
        lineOptions: {
            connectNulls: false,
            dot: false
        }
    };

    return <div ref={props.innerRef}>
        <TimeSeriesChart
            intervalType='Day'
            intervalStart={intervalStart}
            data={iHrData}
            expectedDataInterval={{ minutes: 5 }}
            chartHasData={chartHasData}
            chartType="Line"
            series={[{ dataKey: 'value', color: props.lineColor }]}
            tooltip={IntradayHrToolTip}
            options={options} />
    </div>
}