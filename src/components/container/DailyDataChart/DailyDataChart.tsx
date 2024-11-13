import React, { useState, useEffect, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { DailyDataProvider, DailyDataQueryResult, checkDailyDataAvailability, getDailyDataTypeDefinition, queryDailyData } from '../../../helpers/query-daily-data'
import { add, startOfDay } from 'date-fns'
import MyDataHelps from '@careevolution/mydatahelps-js'
import getDayKey from '../../../helpers/get-day-key'
import { WeekStartsOn, getDefaultIntervalStart } from '../../../helpers/get-interval-start'
import TimeSeriesChart from '../../presentational/TimeSeriesChart/TimeSeriesChart'
import { AreaChartOptions, AreaChartSeries, BarChartOptions, ChartSeries, LineChartOptions, MultiSeriesBarChartOptions, MultiSeriesLineChartOptions } from '../../../helpers/chartOptions'
import { formatDateForLocale } from '../../../helpers/locale';

export interface DailyDataChartProps {
    title?: string
    intervalType?: "Week" | "Month"
    weekStartsOn?: WeekStartsOn
    dailyDataType: string
    valueConverter?(value: number): number
    valueFormatter?(value: number): string
    chartType: "Line" | "Bar" | "Area"
    options?: LineChartOptions | BarChartOptions | AreaChartOptions
    hideIfNoData?: boolean
    previewDataProvider?: DailyDataProvider
    previewState?: "default"
    innerRef?: React.Ref<HTMLDivElement>
}

export default function DailyDataChart(props: DailyDataChartProps) {
    let [currentData, setCurrentData] = useState<DailyDataQueryResult | null>(null);
    let [hasAnyData, setHasAnyData] = useState(false);

    const dateRangeContext = useContext<DateRangeContext | null>(DateRangeContext);
    let intervalType = props.intervalType || "Month";
    let intervalStart: Date;

    if (dateRangeContext) {
        if (dateRangeContext.intervalType === "6Month") {
            intervalType = "Month";
        } else if (dateRangeContext.intervalType === "Day") {
            intervalType = "Week";
        } else {
            intervalType = dateRangeContext.intervalType;
        }
        intervalStart = dateRangeContext.intervalStart;
    }
    else {
        intervalStart = startOfDay(getDefaultIntervalStart(intervalType, props.weekStartsOn));
    }

    let intervalEnd = intervalType === "Week" ? add(intervalStart, { days: 7 })
        : intervalType === "Month" ? add(intervalStart, { months: 1 })
            : intervalStart;
    function loadCurrentInterval() {
        setCurrentData(null);
        if (props.previewDataProvider) {
            props.previewDataProvider(intervalStart, intervalEnd)
                .then((data) => {
                    setCurrentData(data);
                });
            return;
        }
        queryDailyData(props.dailyDataType, intervalStart, intervalEnd, !!props.previewState)
            .then((data) => {
                setCurrentData(data);
            });
    }

    useEffect(() => {
        function checkAvailability() {
            if (props.previewDataProvider || props.previewState === "default") {
                setHasAnyData(true);
                return;
            }
            checkDailyDataAvailability(props.dailyDataType).then(function (hasData) {
                setHasAnyData(hasData);
            });
        }
        checkAvailability();
        MyDataHelps.on("applicationDidBecomeVisible", checkAvailability);
        MyDataHelps.on("externalAccountSyncComplete", checkAvailability);
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", checkAvailability);
            MyDataHelps.off("externalAccountSyncComplete", checkAvailability);
        }
    }, [props.dailyDataType]);

    useEffect(() => {
        loadCurrentInterval();
        MyDataHelps.on("applicationDidBecomeVisible", loadCurrentInterval);
        MyDataHelps.on("externalAccountSyncComplete", loadCurrentInterval);

        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", loadCurrentInterval);
            MyDataHelps.off("externalAccountSyncComplete", loadCurrentInterval);
        }
    }, [props.intervalType, props.weekStartsOn, dateRangeContext]);

    var data: { timestamp: number, value?: number, rawValue?: number, date?: Date }[] | undefined = [];
    var chartHasData: boolean = false;

    let currentDate = intervalStart;
    if (currentData) {
        while (currentDate < intervalEnd) {
            let dayKey = getDayKey(currentDate);
            let dataDay: any = {
                timestamp: currentDate.setHours(0,0,0,0)
            };

            if(currentData[dayKey] !== undefined && currentData[dayKey] !== null){
                dataDay.value = currentData![dayKey];
                dataDay.rawValue = dataDay.value;
                dataDay.date = currentDate;
                if (props.valueConverter) {
                    dataDay.value = props.valueConverter(dataDay.value);
                } else {
                    let defaultConverter = getDailyDataTypeDefinition(props.dailyDataType).yAxisConverter;
                    if (defaultConverter) {
                        dataDay.value = defaultConverter(dataDay.value);
                    }
                }
                chartHasData = true;
            };

            data!.push(dataDay);
            currentDate = add(currentDate, { days: 1 });
        }
    } else {
        data = undefined;
    }

    const GraphToolTip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            var date = payload[0].payload.date;
            let formatter = props.valueFormatter || getDailyDataTypeDefinition(props.dailyDataType).formatter;
            return (
                <div className="mdhui-time-series-tooltip">
                    <div className="mdhui-single-value-tooltip-value">
                        {formatter ? formatter(payload[0].payload.rawValue) : payload[0].payload.value}
                    </div>
                    <div className="mdhui-time-series-tooltip-date">{formatDateForLocale(date, 'MM/dd/yyyy')}</div>
                </div>
            );
        }
        return null;
    };

    if (!hasAnyData && props.hideIfNoData) {
        return null;
    }

    function generateSeriesAndOptions(): [ChartSeries[] | AreaChartSeries[], MultiSeriesLineChartOptions | MultiSeriesBarChartOptions | undefined] {
        if (props.chartType === "Line") {
            const lineOptions = props.options as LineChartOptions;
            const multiSeriesLineChartOptions : MultiSeriesLineChartOptions = {
                yAxisOptions: {
                    domain: [lineOptions?.domainMin === "Auto" ? 'auto' : lineOptions?.domainMin ?? "auto", "auto"]
                }
            };
            return [
                [{
                    dataKey: 'value',
                    color: lineOptions?.lineColor
                }],
                multiSeriesLineChartOptions
            ];
        }
        else if (props.chartType === "Area") {
            const areaOptions = props.options as AreaChartOptions;
            return [
                [{
                    dataKey: 'value',
                    color: areaOptions?.lineColor,
                    areaColor: areaOptions?.areaColor
                }],
                undefined
            ];
        }
        else if (props.chartType === "Bar") {
            const barOptions = props.options as BarChartOptions;
            return [
                [{
                    dataKey: 'value',
                    color: barOptions?.barColor
                }],
                {
                    thresholds: barOptions?.thresholds?.map((t) => { return { value: t.value, overThresholdColor: t.overThresholdBarColor, referenceLineColor: t.referenceLineColor }; })
                }
            ];
        }

        return [[], undefined];
    }

    const [series, options] = generateSeriesAndOptions();

    return <TimeSeriesChart
        title={props.title}
        intervalType={intervalType}
        intervalStart={intervalStart}
        data={data}
        expectedDataInterval={{ days: 1 }}
        chartHasData={chartHasData}
        series={series}
        tooltip={GraphToolTip}
        chartType={props.chartType}
        options={options}
        syncId="DailyDataChart"
        innerRef={props.innerRef}
    />
}