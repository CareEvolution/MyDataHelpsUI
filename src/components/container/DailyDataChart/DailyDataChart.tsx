import React, { useState, useEffect, useRef, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { DailyDataProvider, DailyDataQueryResult, checkDailyDataAvailability, queryDailyData } from '../../../helpers/query-daily-data'
import { add, format } from 'date-fns'
import MyDataHelps from '@careevolution/mydatahelps-js'
import getDayKey from '../../../helpers/get-day-key'
import { WeekStartsOn, getMonthStart, getWeekStart } from '../../../helpers/get-interval-start'
import DataChart, { AreaChartOptions, BarChartOptions, LineChartOptions } from '../../presentational/DataChart/DataChart'

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
    innerRef?: React.Ref<HTMLDivElement>
}

function getDefaultIntervalStart(intervalType: "Week" | "Month", weekStartsOn?: WeekStartsOn) {
    let intervalStart: Date;
    if (intervalType === "Week") {
        intervalStart = getWeekStart(weekStartsOn);
    } else {
        intervalStart = getMonthStart();
    }
    return intervalStart;
}

export default function DailyDataChart(props: DailyDataChartProps) {
    let [currentData, setCurrentData] = useState<DailyDataQueryResult | null>(null);
    let [hasAnyData, setHasAnyData] = useState(false);

    const dateRangeContext = useContext<DateRangeContext | null>(DateRangeContext);
    let intervalType = props.intervalType || "Month";
    let intervalStart: Date;

    if (dateRangeContext) {
        intervalType = dateRangeContext.intervalType === "Day" ? "Week" : dateRangeContext.intervalType;
        intervalStart = dateRangeContext.intervalStart;
    }
    else {
        intervalStart = getDefaultIntervalStart(intervalType, props.weekStartsOn);
    }

    let intervalEnd = intervalType == "Week" ? add(intervalStart, { days: 7 }) : add(intervalStart, { months: 1 });
    function loadCurrentInterval() {
        setCurrentData(null);
        if (props.previewDataProvider) {
            props.previewDataProvider(intervalStart, intervalEnd)
                .then((data) => {
                    setCurrentData(data);
                });
            return;
        }
        queryDailyData(props.dailyDataType, intervalStart, intervalEnd)
            .then((data) => {
                setCurrentData(data);
            });
    }

    useEffect(() => {
        function checkAvailability() {
            if (props.previewDataProvider) {
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

    var currentDate = intervalStart;
    var data: any[] = [];
    var chartHasData: boolean = false;
    if (currentData) {
        while (currentDate < intervalEnd) {
            var dataDay: any = {
                day: currentDate.getDate()
            };
            data.push(dataDay);
            var dayKey = getDayKey(currentDate);
            if (currentData[dayKey] != undefined && currentData[dayKey] != null) {
                dataDay.value = currentData[dayKey];
                dataDay.rawValue = dataDay.value;
                dataDay.date = currentDate;
                if (props.valueConverter) {
                    dataDay.value = props.valueConverter(dataDay.value);
                }
                chartHasData = true;
            }
            currentDate = add(currentDate, { days: 1 });
        }
    }

    const GraphToolTip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            var date = payload[0].payload.date;
            return (
                <div className="mdhui-daily-data-tooltip">
                    <div className="mdhui-daily-data-tooltip-value">
                        {props.valueFormatter ? props.valueFormatter(payload[0].payload.rawValue) : payload[0].payload.value}
                    </div>
                    <div className="mdhui-daily-data-tooltip-date">{format(date, 'MM/dd/yyyy')}</div>
                </div>
            );
        }
        return null;
    };

    return <DataChart 
        title={props.title} 
        intervalType={props.intervalType} 
        intervalStart={intervalStart}
        data={data} 
        hasAnyData={hasAnyData} 
        tooltip={GraphToolTip}
        chartType={props.chartType}
        options={props.options}
        hideIfNoData={props.hideIfNoData}
        />
}