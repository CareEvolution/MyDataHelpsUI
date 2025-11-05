import { Calendar, CalendarDay, CalendarDayState, CalendarDayStateConfiguration, Card, DateRangeContext, LayoutContext, LoadingIndicator, SurveyAnswerLogSummary } from '../../presentational';
import React, { useContext, useMemo, useState } from 'react';
import { add, isAfter, isSameDay, startOfDay, startOfMonth } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { enterSurveyAnswerLog, getDayKey, loadSurveyAnswerLogs, SurveyAnswerLog, SurveyAnswerRenderingConfiguration, useInitializeView } from '../../../helpers';
import './SurveyAnswerLogCalendar.css';
import { computePreviewStates, generatePreviewSurveyAnswerLogs } from './SurveyAnswerLogCalendar.previewData';

export interface SurveyAnswerLogCalendarProps {
    previewState?: 'loading' | 'reloading' | 'default';
    surveyName: string;
    stateConfiguration?: Partial<Record<string, CalendarDayState>>;
    computeStates?: (date: Date, surveyAnswers: SurveyAnswer[]) => string[] | undefined;
    answerRenderingConfigurations?: SurveyAnswerRenderingConfiguration[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogCalendar(props: SurveyAnswerLogCalendarProps) {
    const layoutContext = useContext(LayoutContext);
    const dateRangeContext = useContext(DateRangeContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [surveyAnswerLogs, setSurveyAnswerLogs] = useState<Partial<Record<string, SurveyAnswerLog>>>({});

    const applyPreviewState = (previewState: 'loading' | 'reloading' | 'default') => {
        setSurveyAnswerLogs({});
        if (previewState === 'loading') return;
        generatePreviewSurveyAnswerLogs(props.answerRenderingConfigurations, startOfDay(add(new Date(), { months: -3 }))).then(surveyAnswerLogs => {
            setSurveyAnswerLogs(surveyAnswerLogs);
            if (previewState !== 'reloading') {
                setLoading(false);
            }
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

    const stateConfiguration: CalendarDayStateConfiguration = {
        'future': {
            style: {
                cursor: 'default'
            }
        },
        ...(props.stateConfiguration && {
            ...Object.fromEntries(Object.entries(props.stateConfiguration).map(([state, stateConfiguration]) => {
                if (['today', 'future', 'no-data'].includes(state)) {
                    return [state, stateConfiguration];
                }
                return [state, { ...stateConfiguration, streakIdentifier: state }];
            }))
        })
    };

    const computeStatesForDay = (date: Date): CalendarDayState[] => {
        const surveyAnswers = surveyAnswerLogs[getDayKey(date)]?.surveyAnswers ?? [];

        const stateKeys = props.previewState
            ? computePreviewStates(props.stateConfiguration, date, surveyAnswers)
            : props.computeStates?.(date, surveyAnswers);

        if (stateKeys) return stateKeys.map(stateKey => stateConfiguration[stateKey]).filter(state => !!state) as CalendarDayState[];
        if (isSameDay(date, new Date()) && stateConfiguration['today']) return [stateConfiguration['today']];
        if (isAfter(date, new Date()) && stateConfiguration['future']) return [stateConfiguration['future']];
        return stateConfiguration['no-data'] ? [stateConfiguration['no-data']] : [];
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
            computeStatesForDay={computeStatesForDay}
            onClick={onDayClicked}
        />;
    };

    const onEnterLog = (priorSurveyAnswerLog: SurveyAnswerLog): void => {
        if (props.previewState) return;
        enterSurveyAnswerLog(props.surveyName, priorSurveyAnswerLog);
    };

    return <div ref={props.innerRef} className="mdhui-sa-log-calendar">
        <Card>
            <Calendar year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />
            {loading &&
                <div className="mdhui-sa-log-calendar-loading-indicator-overlay">
                    <LoadingIndicator className="mdhui-sa-log-calendar-loading-indicator" />
                </div>
            }
        </Card>
        {props.answerRenderingConfigurations && currentSurveyAnswerLogs.map((surveyAnswerLog, index) => {
            return <Card key={index}>
                <SurveyAnswerLogSummary
                    surveyAnswerLog={surveyAnswerLog}
                    onEdit={() => onEnterLog(surveyAnswerLog)}
                    answerRenderingConfigurations={props.answerRenderingConfigurations}
                />
                {loading &&
                    <div className="mdhui-sa-log-calendar-loading-indicator-overlay" />
                }
            </Card>;
        })}
    </div>;
}