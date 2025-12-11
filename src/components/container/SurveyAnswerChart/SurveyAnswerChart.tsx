import React, { useContext, useMemo, useState } from 'react';
import { DateRangeContext, LayoutContext } from '../../presentational';
import { add, compareAsc, Duration, parseISO, startOfDay, startOfToday } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { AreaChartSeries, ChartSeries, formatNumberForLocale, getDefaultIntervalStart, MultiSeriesBarChartOptions, MultiSeriesLineChartOptions, resolveColor, useInitializeView, WeekStartsOn } from '../../../helpers';
import TimeSeriesChart, { TimeSeriesDataPoint } from '../../presentational/TimeSeriesChart/TimeSeriesChart';
import { generatePreviewData, getPreviewDataFromProvider, SurveyAnswerChartPreviewState } from './SurveyAnswerChart.previewdata';
import { getShortDateString } from '../../../helpers/date-helpers';
import queryLatestSurveyAnswersByDate from '../../../helpers/query-latest-survey-answers-by-date';

export interface SurveyAnswerChartSeries extends ChartSeries {
    surveyName?: string | string[];
    stepIdentifier?: string | string[];
    resultIdentifier: string | string[];
    useEventAsDate?: boolean;
}

export interface SurveyAnswerAreaChartSeries extends AreaChartSeries {
    surveyName?: string | string[];
    stepIdentifier?: string | string[];
    resultIdentifier: string | string[];
    useEventAsDate?: boolean;
}

export interface SurveyAnswerChartProps {
    title?: string;
    intervalType?: 'Week' | 'Month' | '6Month' | 'Dynamic';
    dynamicIntervalEndType?: 'Today' | 'Last Reading';
    weekStartsOn?: WeekStartsOn;
    series: SurveyAnswerChartSeries[] | SurveyAnswerAreaChartSeries[];
    chartType: 'Line' | 'Bar' | 'Area';
    options?: MultiSeriesLineChartOptions | MultiSeriesBarChartOptions;
    expectedDataInterval?: Duration;
    previewDataProvider?: (startDate: Date, endDate: Date) => Promise<SurveyAnswer[][]>;
    previewState?: SurveyAnswerChartPreviewState;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerChart(props: SurveyAnswerChartProps) {
    const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswer[][]>();

    const layoutContext = useContext<LayoutContext>(LayoutContext);
    const dateRangeContext = useContext<DateRangeContext | null>(DateRangeContext);

    const intervalType = useMemo((): 'Week' | 'Month' | '6Month' | 'Dynamic' => {
        if (dateRangeContext) {
            return dateRangeContext.intervalType === 'Day' ? 'Week' : dateRangeContext.intervalType;
        }
        return props.intervalType ?? 'Month';
    }, [dateRangeContext, props.intervalType]);

    const intervalStart = useMemo((): Date | undefined => {
        if (dateRangeContext) {
            return dateRangeContext.intervalStart;
        }
        if (intervalType === 'Dynamic') {
            return undefined;
        }
        return getDefaultIntervalStart(intervalType, props.weekStartsOn);
    }, [dateRangeContext, intervalType, props.weekStartsOn]);

    const intervalEnd = useMemo((): Date | undefined => {
        if (intervalType === 'Dynamic' || !intervalStart) {
            return undefined;
        }
        if (intervalType === 'Week') {
            return add(intervalStart, { days: 7 });
        }
        if (intervalType === 'Month') {
            return add(intervalStart, { months: 1 });
        }
        return add(intervalStart, { months: 6 });
    }, [intervalType, intervalStart]);

    const initialize = async (): Promise<void> => {
        setSurveyAnswers(undefined);

        if (props.previewDataProvider || props.previewState) {
            const previewStartDate = intervalStart ?? add(startOfToday(), { months: -6 });
            const previewEndDate = intervalEnd ?? add(startOfToday(), { days: -14 });
            const previewDataProvider = props.previewDataProvider
                ? getPreviewDataFromProvider(props.previewState, previewStartDate, previewEndDate, props.previewDataProvider)
                : generatePreviewData(props.previewState, previewStartDate, previewEndDate, props.series.length, props.expectedDataInterval ?? { days: 1 });
            setSurveyAnswers(await previewDataProvider);
            return;
        }

        const surveyAnswerQueries = props.series.map(async series => {
            const latestSurveyAnswersByDate = await queryLatestSurveyAnswersByDate(
                intervalStart,
                intervalEnd,
                series.surveyName,
                series.stepIdentifier,
                series.resultIdentifier,
                series.useEventAsDate
            );
            return Object.entries(latestSurveyAnswersByDate as Record<string, SurveyAnswer[]>).map(([dayKey, surveyAnswers]) => {
                return { date: dayKey, answers: surveyAnswers[0].answers } as SurveyAnswer;
            });
        });
        setSurveyAnswers(await Promise.all(surveyAnswerQueries));
    };

    useInitializeView(initialize, [], [
        props.previewDataProvider,
        props.previewState,
        props.series,
        props.expectedDataInterval,
        intervalStart,
        intervalEnd
    ]);

    const dataByTimestamp: Record<number, TimeSeriesDataPoint> = {};
    props.series.forEach((series, index) => {
        const seriesSurveyAnswers = (surveyAnswers?.[index] ?? []).sort((a, b) => a.date.localeCompare(b.date));
        seriesSurveyAnswers.forEach(answer => {
            const timestamp = startOfDay(parseISO(answer.date)).getTime();
            dataByTimestamp[timestamp] = dataByTimestamp[timestamp] ?? { timestamp };
            dataByTimestamp[timestamp][series.dataKey] = parseFloat(answer.answers[0]);
        });
    });

    const data = Object.values(dataByTimestamp).sort((a, b) => a.timestamp - b.timestamp);

    const graphToolTip = ({ active, payload }: any) => {
        if (!active || !payload || payload.length === 0) return null;

        if (payload.length === 1) {
            return <div className="mdhui-time-series-tooltip">
                <div className="mdhui-single-value-tooltip-value">{formatNumberForLocale(parseFloat(payload[0].value), 2)}</div>
                <div className="mdhui-time-series-tooltip-date">{getShortDateString(new Date(payload[0].payload.timestamp))}</div>
            </div>;
        }

        return <div className="mdhui-time-series-tooltip">
            <table className="mdhui-multiple-value-tooltip">
                <tbody>
                {payload.map((series: any, index: number) => {
                    const seriesColor = resolveColor(layoutContext.colorScheme, props.series[index].color) ?? 'var(--mdhui-color-primary)';
                    return <tr key={series.dataKey}>
                        <th style={{ color: seriesColor }}>{series.dataKey}</th>
                        <td>{formatNumberForLocale(parseFloat(series.value), 2)}</td>
                    </tr>;
                })}
                </tbody>
            </table>
            <div className="mdhui-time-series-tooltip-date">{getShortDateString(new Date(payload[0].payload.timestamp))}</div>
        </div>;
    };

    return <TimeSeriesChart
        title={props.title}
        intervalType={intervalType}
        dynamicIntervalEndType={props.dynamicIntervalEndType}
        intervalStart={intervalStart}
        data={data}
        expectedDataInterval={props.expectedDataInterval}
        series={props.series}
        chartHasData={data.length > 0}
        tooltip={graphToolTip}
        chartType={props.chartType}
        options={props.options}
        innerRef={props.innerRef}
    />;
}