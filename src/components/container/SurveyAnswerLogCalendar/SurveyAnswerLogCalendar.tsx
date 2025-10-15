import { Calendar, CalendarDay, CalendarDayStateConfiguration, Card, DateRangeContext, LoadingIndicator, SurveyAnswerLogSummary } from '../../presentational';
import React, { useContext, useMemo, useState } from 'react';
import { add, isAfter, isSameDay, startOfDay, startOfMonth } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { enterSurveyAnswerLog, getDayKey, loadSurveyAnswerLogs, SurveyAnswerLog, SurveyAnswerRenderingConfiguration, useInitializeView } from '../../../helpers';
import './SurveyAnswerLogCalendar.css';
import { computePreviewState, generatePreviewSurveyAnswerLogs } from './SurveyAnswerLogCalendar.previewData';

export interface SurveyAnswerLogCalendarProps {
    previewState?: 'loading' | 'default';
    surveyName: string;
    stateConfiguration?: CalendarDayStateConfiguration;
    computeState?: (date: Date, surveyAnswers: SurveyAnswer[]) => string | undefined;
    answerRenderingConfigurations?: SurveyAnswerRenderingConfiguration[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogCalendar(props: SurveyAnswerLogCalendarProps) {
    const dateRangeContext = useContext(DateRangeContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [surveyAnswerLogs, setSurveyAnswerLogs] = useState<Partial<Record<string, SurveyAnswerLog>>>({});

    const applyPreviewState = (previewState: 'loading' | 'default') => {
        if (previewState === 'loading') return;
        generatePreviewSurveyAnswerLogs(props.answerRenderingConfigurations, startOfDay(add(new Date(), { months: -3 }))).then(surveyAnswerLogs => {
            setSurveyAnswerLogs(surveyAnswerLogs);
            setLoading(false);
        });
    };

    const loadState = () => {
        loadSurveyAnswerLogs(props.surveyName).then(surveyAnswerLogs => {
            setSurveyAnswerLogs(surveyAnswerLogs);
            setLoading(false);
        });
    };

    useInitializeView(() => {
        setLoading(true);
        if (props.previewState) {
            applyPreviewState(props.previewState);
            return;
        }
        loadState();
    }, [], [props.previewState, props.surveyName, props.stateConfiguration, getDayKey(new Date())]);

    const intervalStart = useMemo<Date>(
        () => startOfMonth(dateRangeContext?.intervalStart ?? new Date()),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    const intervalEnd = useMemo<Date>(
        () => add(intervalStart, { months: 1 }),
        [intervalStart]
    );

    const currentSurveyAnswerLogs = Object.values(surveyAnswerLogs as Record<string, SurveyAnswerLog>)
        .filter(surveyAnswerLog => surveyAnswerLog.date >= intervalStart && surveyAnswerLog.date < intervalEnd)
        .reverse();

    const computeStateForDay = (date: Date): string | undefined => {
        const surveyAnswers = surveyAnswerLogs[getDayKey(date)]?.surveyAnswers ?? [];

        const state = props.previewState
            ? computePreviewState(props.stateConfiguration, date, surveyAnswers)
            : props.computeState?.(date, surveyAnswers);

        if (state) return state;
        if (isSameDay(date, new Date())) return 'today';
        if (isAfter(date, new Date())) return 'future';
        return 'no-data';
    };

    const onDayClicked = (date: Date): void => {
        if (props.previewState || isAfter(date, new Date())) return;
        enterSurveyAnswerLog(props.surveyName, surveyAnswerLogs[getDayKey(date)], date);
    };

    const renderDay = (year: number, month: number, day?: number): React.JSX.Element => {
        return <CalendarDay
            year={year}
            month={month}
            day={day}
            stateConfiguration={{
                'future': {
                    style: {
                        cursor: 'default'
                    }
                },
                ...props.stateConfiguration
            }}
            computeStateForDay={computeStateForDay}
            onClick={onDayClicked}
        />;
    };

    const onEnterLog = (priorSurveyAnswerLog: SurveyAnswerLog): void => {
        if (props.previewState) return;
        enterSurveyAnswerLog(props.surveyName, priorSurveyAnswerLog);
    };

    return <div ref={props.innerRef} className="mdhui-sa-log-calendar">
        <Card>
            {loading &&
                <div className="mdhui-sa-log-calendar-loading-indicator-wrapper">
                    <LoadingIndicator className="mdhui-sa-log-calendar-loading-indicator" />
                </div>
            }
            <Calendar year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />
        </Card>
        {!loading && props.answerRenderingConfigurations && currentSurveyAnswerLogs.map((surveyAnswerLog, index) => {
            return <Card key={index}>
                <SurveyAnswerLogSummary
                    log={surveyAnswerLog}
                    onEdit={() => onEnterLog(surveyAnswerLog)}
                    answerRenderingConfigurations={props.answerRenderingConfigurations}
                />
            </Card>;
        })}
    </div>;
}