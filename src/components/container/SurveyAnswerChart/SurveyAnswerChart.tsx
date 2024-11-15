import React, { useState, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { add, Duration, parseISO, format } from 'date-fns'
import { SurveyAnswer, SurveyAnswersQuery } from '@careevolution/mydatahelps-js'
import { WeekStartsOn, getDefaultIntervalStart } from '../../../helpers/get-interval-start'
import TimeSeriesChart from '../../presentational/TimeSeriesChart/TimeSeriesChart'
import queryAllSurveyAnswers from '../../../helpers/query-all-survey-answers'
import { useInitializeView } from '../../../helpers/Initialization'
import { AreaChartSeries, ChartSeries, MultiSeriesBarChartOptions, MultiSeriesLineChartOptions } from '../../../helpers/chartOptions'
import { getDefaultPreviewData } from './SurveyAnswerData.previewdata'
import { formatDateForLocale } from '../../../helpers/locale';

export interface SurveyAnswerChartSeries extends ChartSeries {
    surveyName?: string | string[];
    stepIdentifier?: string | string[];
    resultIdentifier: string | string[];
}

export interface SurveyAnswerAreaChartSeries extends AreaChartSeries {
    surveyName?: string | string[];
    stepIdentifier?: string | string[];
    resultIdentifier: string | string[];
}

export interface SurveyAnswerChartProps {
    title?: string
    intervalType?: "Week" | "Month" | "6Month"
    weekStartsOn?: WeekStartsOn
    series: SurveyAnswerChartSeries[] | SurveyAnswerAreaChartSeries[],
    chartType: "Line" | "Bar" | "Area"
    options?: MultiSeriesLineChartOptions| MultiSeriesBarChartOptions,
    expectedDataInterval?: Duration,
    previewDataProvider?: (startDate: Date, endDate: Date) => Promise<SurveyAnswer[][]>
    previewState?: "default"
    innerRef?: React.Ref<HTMLDivElement>
}

export default function SurveyAnswerChart(props:SurveyAnswerChartProps) {
    let [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswer[][] | null>(null);
    
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
    
    let intervalEnd = intervalType === "Week" ? add(intervalStart, { days: 7 }) 
                        : intervalType === "Month" ? add(intervalStart, { months: 1 })
                        : intervalType === "6Month" ? add(intervalStart, { months: 6 }) :
                        intervalStart;
    const loadCurrentInterval = () => {
        setSurveyAnswers(null);
        if (props.previewDataProvider) {
            props.previewDataProvider(intervalStart, intervalEnd)
            .then((data) => {
                setSurveyAnswers(data);
            });
            return;
        }else if(!!props.previewState){
            getDefaultPreviewData(intervalStart, intervalEnd, props.series, props.expectedDataInterval || { days: 1 }).then((data) => {
                setSurveyAnswers(data);
            });
            return;
        }

        var dataRequests = props.series.map(l => {
            var params: SurveyAnswersQuery = {
                after: intervalStart.toISOString(),
                before: intervalEnd.toISOString()
            }
            if(l.surveyName) params.surveyName = l.surveyName;
            if(l.resultIdentifier) params.resultIdentifier = l.resultIdentifier;
            if(l.stepIdentifier) params.stepIdentifier = l.stepIdentifier;

            return queryAllSurveyAnswers(params);
        });
        Promise.all(dataRequests).then((data) => {
            setSurveyAnswers(data);
        })
    }
    
    function getDataKey(line: SurveyAnswerChartSeries | SurveyAnswerAreaChartSeries) {
        return `${line.surveyName}-${line.stepIdentifier}-${line.resultIdentifier}`;
    }
    
    function processPages(pages: SurveyAnswer[][]) {
        var newDailyData: { [key: string]: SurveyAnswer[] } = {};
        for (var i = 0; i < props.series.length; i++) {
            newDailyData[getDataKey(props.series[i])] = pages[i] || [];
        }
        
        return newDailyData;
    }
    
    useInitializeView(() => {
        loadCurrentInterval();
    }, [], [props.intervalType, props.weekStartsOn, dateRangeContext]);

    let currentData = processPages(surveyAnswers || []);
    
    var data: any[] | undefined = undefined;
    var chartHasData: boolean = false;
    if (currentData !== null) {
        data = [];
        props.series.forEach((series) => {
            var dataKey = getDataKey(series);
            currentData![dataKey].forEach((answer) => {
                var answerDate = parseISO(answer.date);
                answerDate.setHours(0,0,0,0);
                var dataDay = data!.find((d) => d.timestamp === answerDate.getTime());
                if(!dataDay) {
                    dataDay = {
                        timestamp: answerDate.getTime()
                    }
                    data!.push(dataDay);
                }
                dataDay[series.dataKey] = parseFloat(answer.answers[0]);
                chartHasData = true;
            });
        });
        data.sort((a, b) => a.timestamp - b.timestamp);
    }
    
    const GraphToolTip = ({ active, payload }: any) => {
        function getHeaderColor(p: any, index: number) {
            function getColorFromOptions(i: number, fieldName: string) {
                var property = props.options ? (props.options as any)[fieldName] : null;
                if(!!property){
                    if (Array.isArray(property)) {
                        return property[i];
                    }
                    return property;
                }
        
                return "var(--mdhui-color-primary)";
            }            

            return p.stroke || getColorFromOptions(index, 'barColor');
        }

        if (active && payload && payload.length) {
            if(payload.length === 1){
                return (
                    <div className="mdhui-time-series-tooltip">
                        <div className="mdhui-single-value-tooltip-value">
                            {parseFloat(payload[0].value).toFixed(2)}
                        </div>
                        <div className="mdhui-time-series-tooltip-date">{formatDateForLocale(new Date(payload[0].payload.timestamp), 'MM/dd/yyyy')}</div>
                    </div>
                );
            }
            return (
                <div className="mdhui-time-series-tooltip">
                    <table className="mdhui-multiple-value-tooltip">
                        <tbody>
                            {payload.map((p: any, index: number) =>
                                <tr key={p.dataKey}>
                                    <th style={{ color: getHeaderColor(p,index) }}>{p.dataKey}</th>
                                    <td>{parseFloat(p.value).toFixed(2)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="mdhui-time-series-tooltip-date">{formatDateForLocale(new Date(payload[0].payload.timestamp), 'MM/dd/yyyy')}</div>
                </div>
            );
        }

        return null;
    };

    return <TimeSeriesChart
        title={props.title}
        intervalType={intervalType}
        intervalStart={intervalStart}
        data={data}
        expectedDataInterval={props.expectedDataInterval}
        series={props.series.map(series => {
            const newSeries: any = {
                dataKey: series.dataKey,
                color: series.color
            };
            if("areaColor" in series) {
                newSeries.areaColor = series.areaColor;
            }

            return newSeries;
        })}
        chartHasData={chartHasData}
        tooltip={GraphToolTip}
        chartType={props.chartType}
        options={props.options}
        innerRef={props.innerRef}
    />
}

