import React, { useState, useEffect, useRef, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { add, parseISO } from 'date-fns'
import MyDataHelps, { SurveyAnswer, SurveyAnswersPage } from '@careevolution/mydatahelps-js'
import { WeekStartsOn, getMonthStart, getWeekStart } from '../../../helpers/get-interval-start'
import TimeSeriesChart, { AreaChartOptions, BarChartOptions, LineChartOptions } from '../../presentational/TimeSeriesChart/TimeSeriesChart'
import queryAllSurveyAnswers from '../../../helpers/query-all-survey-answers'
import format from 'date-fns/format'

export interface SurveyAnswerChartParameters {
    label: string;
    surveyName?: string | string[];
    stepIdentifier?: string | string[];
    resultIdentifier: string | string[];
}

export interface SurveyDataChartProps {
    title?: string
    intervalType?: "Week" | "Month" | "SixMonth"
    weekStartsOn?: WeekStartsOn
    charts: SurveyAnswerChartParameters[],
    chartType: "Line" | "Bar" | "Area"
    options?: LineChartOptions | BarChartOptions | AreaChartOptions,
    dataGap?: Duration,
    previewDataProvider?: (startDate: Date, endDate: Date) => Promise<SurveyAnswer[][]>
    innerRef?: React.Ref<HTMLDivElement>
}

function getDefaultIntervalStart(intervalType: "Week" | "Month" | "SixMonth", weekStartsOn?: WeekStartsOn) {
    let intervalStart: Date;
    if (intervalType === "Week") {
        intervalStart = getWeekStart(weekStartsOn);
    } else {
        intervalStart = getMonthStart();
    }
    return intervalStart;
}

export default function SurveyDataChart(props:SurveyDataChartProps) {
    let [currentData, setCurrentData] = useState<{ [key: string]: SurveyAnswer[] } | null>(null);
    
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
    
    let intervalEnd = intervalType == "Week" ? add(intervalStart, { days: 7 }) 
                        : intervalType === "Month" ? add(intervalStart, { months: 1 })
                        : intervalType === "SixMonth" ? add(intervalStart, { months: 6 }) :
                        intervalStart;
    function loadCurrentInterval() {
        setCurrentData(null);
        if (props.previewDataProvider) {
            props.previewDataProvider(intervalStart, intervalEnd)
            .then((data) => {
                setCurrentData(processPages(data));
            });
            return;
        }
        
        var dataRequests = props.charts.map(l => queryAllSurveyAnswers({
            surveyName: l.surveyName, 
            stepIdentifier: l.stepIdentifier, 
            resultIdentifier: l.resultIdentifier,
            after: intervalStart.toISOString(),
            before: intervalEnd.toISOString()
        }));
        Promise.all(dataRequests).then(function (data) {
            setCurrentData(processPages(data));
        })
    }
    
    function getDataKey(line: SurveyAnswerChartParameters) {
        return `${line.surveyName}-${line.stepIdentifier}-${line.resultIdentifier}`;
    }
    
    function processPages(pages: SurveyAnswer[][]) {
        var newDailyData: { [key: string]: SurveyAnswer[] } = {};
        for (var i = 0; i < props.charts.length; i++) {
            newDailyData[getDataKey(props.charts[i])] = pages[i];
        }
        
        return newDailyData;
    }
    
    useEffect(() => {
        loadCurrentInterval();
        MyDataHelps.on("applicationDidBecomeVisible", loadCurrentInterval);
        MyDataHelps.on("externalAccountSyncComplete", loadCurrentInterval);
        
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", loadCurrentInterval);
            MyDataHelps.off("externalAccountSyncComplete", loadCurrentInterval);
        }
    }, [props.intervalType, props.weekStartsOn, dateRangeContext]);
    
    var data: any[] = [];
    var chartHasData: boolean = false;
    if (currentData !== null) {
        props.charts.forEach((line) => {
            var dataKey = getDataKey(line);
            currentData![dataKey].forEach((answer) => {
                var answerDate = parseISO(answer.date);
                answerDate.setHours(0,0,0,0);
                var dataDay = data.find((d) => d.day === answerDate.getTime());
                if(!dataDay) {
                    dataDay = {
                        day: answerDate.getTime()
                    }
                    data.push(dataDay);
                }
                dataDay[line.label] = parseFloat(answer.answers[0]);
                chartHasData = true;
            });
        });
        data.sort((a, b) => a.day- b.day);
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
            return (
                <div className="mdhui-daily-data-tooltip">
                    <div className="graph-date">{format(new Date(payload[0].payload.day), 'MM/dd/yyyy')}</div>
                    <table className="payload-values">
                        <tbody>
                            {payload.map((p: any, index: number) =>
                                <tr key={p.dataKey}>
                                    <th style={{ color: getHeaderColor(p,index) }}>{p.dataKey}</th>
                                    <td>{parseFloat(p.value).toFixed(2)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
        dataGap={props.dataGap}
        dataKeys={props.charts.map((l) => l.label)}
        chartHasData={chartHasData}
        tooltip={GraphToolTip}
        chartType={props.chartType}
        options={props.options}
    />
}