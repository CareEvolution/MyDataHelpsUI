import React, { useState, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { add, parseISO } from 'date-fns'
import { SurveyAnswer } from '@careevolution/mydatahelps-js'
import { WeekStartsOn, getMonthStart, getWeekStart, get6MonthStart, getDefaultIntervalStart } from '../../../helpers/get-interval-start'
import TimeSeriesChart from '../../presentational/TimeSeriesChart/TimeSeriesChart'
import queryAllSurveyAnswers from '../../../helpers/query-all-survey-answers'
import format from 'date-fns/format'
import { useInitializeView } from '../../../helpers/Initialization'
import { AreaChartSeries, ChartSeries, MultiSeriesBarChartOptions, MultiSeriesLineChartOptions } from '../../../helpers/chartOptions'
import { predictableRandomNumber } from '../../../helpers/predictableRandomNumber'
import { getDayKey } from '../../../helpers'

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
    options?: MultiSeriesLineChartOptions| MultiSeriesBarChartOptions | MultiSeriesBarChartOptions,
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
            getDefaultPreviewData(intervalStart, intervalEnd, props.series).then((data) => {
                setSurveyAnswers(data);
            });
            return;
        }
        
        var dataRequests = props.series.map(l => queryAllSurveyAnswers({
            surveyName: l.surveyName, 
            stepIdentifier: l.stepIdentifier, 
            resultIdentifier: l.resultIdentifier,
            after: intervalStart.toISOString(),
            before: intervalEnd.toISOString()
        }));
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
                        <div className="mdhui-time-series-tooltip-date">{format(new Date(payload[0].payload.timestamp), 'MM/dd/yyyy')}</div>
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
                    <div className="mdhui-time-series-tooltip-date">{format(new Date(payload[0].payload.timestamp), 'MM/dd/yyyy')}</div>
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

export async function generateSurveyResponse(date: Date, resultIdentifier: string, surveyName: string, rangeStart: number, rangeEnd: number): Promise<SurveyAnswer> {
    var answer = await predictableRandomNumber(getDayKey(date) + resultIdentifier);
    return {
        "id": "00000000-0000-0000-0000-000000000000",
        "surveyID": "00000000-0000-0000-0000-000000000000",
        "surveyResultID": "00000000-0000-0000-0000-000000000000",
        "surveyVersion": 0,
        "surveyName": surveyName,
        "surveyDisplayName": surveyName,
        "date": date.toISOString(),
        "stepIdentifier": resultIdentifier,
        "resultIdentifier": resultIdentifier,
        "answers": [
            (answer % (rangeEnd - rangeStart) + rangeStart).toString()
        ],
        "insertedDate": date.toISOString()
    };
}

const getDefaultPreviewData = async(start: Date, end: Date, series: SurveyAnswerChartSeries[] | SurveyAnswerAreaChartSeries[]) => {
    const standardData: SurveyAnswer[][] = [];
    series.forEach(s => standardData.push([]));

    let currentDate = new Date(start);
    while (currentDate < end) {
        for(let i = 0; i < series.length; ++i){
            var v = await generateSurveyResponse(currentDate, "TestResult"+i, "TestSurvey", 10, 100);
            standardData[i].push(v);
            
        };
        currentDate = add(currentDate, { months: 1 });
    }
    return standardData;
}