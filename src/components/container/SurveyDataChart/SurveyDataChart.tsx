import React, { useState, useEffect, useRef, useContext } from 'react'
import { DateRangeContext } from '../../presentational/DateRangeCoordinator/DateRangeCoordinator'
import { DailyDataProvider, DailyDataQueryResult, checkDailyDataAvailability, queryDailyData } from '../../../helpers/query-daily-data'
import { add, format, parseISO } from 'date-fns'
import MyDataHelps, { SurveyAnswer, SurveyAnswersPage } from '@careevolution/mydatahelps-js'
import getDayKey from '../../../helpers/get-day-key'
import { WeekStartsOn, getMonthStart, getWeekStart } from '../../../helpers/get-interval-start'
import DataChart, { AreaChartOptions, BarChartOptions, LineChartOptions } from '../../presentational/DataChart/DataChart'

export interface SurveyAnswerChartLine {
	label: string;
	surveyName: string;
	stepIdentifier: string;
	resultIdentifier: string;
	valueConverter?: Function;
	stroke: string;
}

export interface SurveyDataChartProps {
    title?: string
    intervalType?: "Week" | "Month"
    weekStartsOn?: WeekStartsOn
    lines: SurveyAnswerChartLine[],
    valueConverter?(value: number): number
    valueFormatter?(value: number): string
    chartType: "Line" | "Bar" | "Area"
    options?: LineChartOptions | BarChartOptions | AreaChartOptions
    hideIfNoData?: boolean
    previewDataProvider?: (startDate: Date, endDate: Date) => Promise<SurveyAnswersPage[]>
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

export default function SurveyDataChart(props:SurveyDataChartProps) {
    let [currentData, setCurrentData] = useState<{ [key: string]: SurveyAnswersPage } | null>(null);
    let [hasAnyData, setHasAnyData] = useState(false);

    const dateRangeContext = useContext<DateRangeContext | null>(DateRangeContext);
    let intervalType = props.intervalType || "Month";
    let intervalStart: Date;

    if (dateRangeContext) {
        intervalType = dateRangeContext.intervalType;
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
                    setCurrentData(processPages(data));
                });
            return;
        }

        var dataRequests = props.lines.map(l => MyDataHelps.querySurveyAnswers({
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

	function getDataKey(line: SurveyAnswerChartLine) {
		return `${line.surveyName}-${line.stepIdentifier}-${line.resultIdentifier}`;
	}

    function processPages(pages: SurveyAnswersPage[]) {
        var newDailyData: { [key: string]: SurveyAnswersPage } = {};
        for (var i = 0; i < props.lines.length; i++) {
            newDailyData[getDataKey(props.lines[i])] = pages[i];
        }

        return newDailyData;
    }

    useEffect(() => {
        function checkAvailability() {
            if (props.previewDataProvider) {
                setHasAnyData(true);
                return;
            }
            setHasAnyData(true);
        }
        checkAvailability();
        MyDataHelps.on("applicationDidBecomeVisible", checkAvailability);
        MyDataHelps.on("externalAccountSyncComplete", checkAvailability);
        return () => {
            MyDataHelps.off("applicationDidBecomeVisible", checkAvailability);
            MyDataHelps.off("externalAccountSyncComplete", checkAvailability);
        }
    }, [props.lines]);

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
		props.lines.forEach((line) => {
			var dataKey = getDataKey(line);
			currentData[dataKey].surveyAnswers.forEach((answer) => {
				var day = parseISO(answer.date).toLocaleDateString();
				var dataDay = data.find(d => d.day === day);
				if (!dataDay) {
					dataDay = {
						day
					};
					data.push(dataDay);
				}
				dataDay[line.label] = parseFloat(answer.answers[0]);
				//dataDay['value'] = parseFloat(answer.answers[0]);
				chartHasData = true;
			});
		});

		data.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());

        /*
		if (data.length === 1) {
			showBarGraph = true;
			var newData: any[] = [];
			var keys = Object.keys(data[0]).filter(k => k !== 'day');
			keys.forEach(key => newData.push({
				key,
				value: data[0][key]
			}));
			data = newData;
		}
        */
	}

	const GraphToolTip = ({ active, payload }: any) => {
		if (active && payload && payload.length) {
			return (
				<div className="graph-tooltip">
					<div className="graph-date">{payload[0].payload.day}</div>
					<table className="payload-values">
						<tbody>
							{payload.map((p: any) =>
								<tr key={p.dataKey}>
									<th style={{color: p.stroke}}>{p.dataKey}</th>
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

    return <DataChart 
        title={props.title} 
        intervalType={props.intervalType} 
        intervalStart={intervalStart}
        data={data}
        dataKeys={props.lines.map((l) => l.label)}
        hasAnyData={hasAnyData} 
        tooltip={GraphToolTip}
        chartType={props.chartType}
        options={props.options}
        hideIfNoData={props.hideIfNoData}
        />
}