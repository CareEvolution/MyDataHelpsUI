import { Calendar, CalendarDay, CalendarDayState, Card, DateRangeContext, LayoutContext, LoadingIndicator, SurveyAnswerLogSummary } from '../../presentational';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { add, compareDesc, isAfter, startOfDay, startOfMonth } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { enterSurveyAnswerLog, getDayKey, loadSurveyAnswerLogs, resolveColor, SurveyAnswerLog, SurveyAnswerRenderingConfiguration, useInitializeView } from '../../../helpers';
import './SurveyAnswerLogCalendar.css';
import { generatePreviewSurveyAnswerLogs } from './SurveyAnswerLogCalendar.previewData';

export interface SurveyAnswerLogCalendarProps {
    previewState?: 'loading' | 'reloading' | 'default';
    surveyName: string;
    computeStatesForDay: (date: Date, surveyAnswers: SurveyAnswer[]) => CalendarDayState[];
    multiStateStartAngle?: number;
    showLegend?: boolean;
    answerRenderingConfigurations?: SurveyAnswerRenderingConfiguration[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogCalendar(props: SurveyAnswerLogCalendarProps) {
    const layoutContext = useContext(LayoutContext);
    const dateRangeContext = useContext(DateRangeContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [surveyAnswerLogs, setSurveyAnswerLogs] = useState<Partial<Record<string, SurveyAnswerLog>>>({});
    const [statesRendered, setStatesRendered] = useState<Record<string, CalendarDayState>>({});

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
    }, [], [props.previewState, props.surveyName, props.answerRenderingConfigurations, getDayKey(new Date())]);

    const intervalStart = useMemo<Date>(
        () => startOfMonth(dateRangeContext?.intervalStart ?? new Date()),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    const intervalEnd = useMemo<Date>(
        () => add(intervalStart, { months: 1 }),
        [intervalStart]
    );

    useEffect(() => {
        if (Object.keys(statesRendered).length > 0) {
            setStatesRendered({});
        }
    }, [intervalStart, props.computeStatesForDay]);

    const currentSurveyAnswerLogs = Object.values(surveyAnswerLogs as Record<string, SurveyAnswerLog>)
        .filter(surveyAnswerLog => surveyAnswerLog.date >= intervalStart && surveyAnswerLog.date < intervalEnd)
        .sort((a, b) => compareDesc(a.date, b.date));

    const computeStatesForDay = (date: Date): CalendarDayState[] => {
        const surveyAnswers = surveyAnswerLogs[getDayKey(date)]?.surveyAnswers ?? [];
        const calendarDayStates = props.computeStatesForDay(date, surveyAnswers);
        if (calendarDayStates.length > 0) {
            queueMicrotask(() => setStatesRendered(previousStatesRendered => {
                const newStates = calendarDayStates.filter(state => state.label && !previousStatesRendered[state.label]);
                if (newStates.length > 0) {
                    return { ...previousStatesRendered, ...Object.fromEntries(newStates.map(state => [state.label, state])) };
                }
                return previousStatesRendered;
            }));
            return calendarDayStates;
        }
        if (isAfter(date, new Date())) return [{ style: { cursor: 'default' } }];
        return [];
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
            multiStateStartAngle={props.multiStateStartAngle}
        />;
    };

    const onEnterLog = (priorSurveyAnswerLog: SurveyAnswerLog): void => {
        if (props.previewState) return;
        enterSurveyAnswerLog(props.surveyName, priorSurveyAnswerLog);
    };

    return <div ref={props.innerRef} className="mdhui-sa-log-calendar">
        <Card>
            <Calendar year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />
            {props.showLegend && Object.keys(statesRendered).length > 0 &&
                <div className="mdhui-sa-log-calendar-legend">
                    {Object.values(statesRendered).sort((a, b) => a.label!.localeCompare(b.label!)).map(state => {
                        const backgroundColor = resolveColor(layoutContext.colorScheme, state.backgroundColor) ?? 'var(--mdhui-border-color-2)';
                        const borderColor = resolveColor(layoutContext.colorScheme, state.borderColor) ?? backgroundColor;

                        return <div key={state.label} className="mdhui-sa-log-calendar-legend-entry">
                            <div className="mdhui-sa-log-calendar-legend-entry-color" style={{
                                background: backgroundColor,
                                border: `2px solid ${borderColor}`,
                                ...state.style
                            }}>&nbsp;</div>
                            <div className="mdhui-sa-log-calendar-legend-entry-label">{state.label}</div>
                        </div>;
                    })}
                </div>
            }
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
                    answerRenderingConfigurations={props.answerRenderingConfigurations!}
                />
                {loading && <div className="mdhui-sa-log-calendar-loading-indicator-overlay" />}
            </Card>;
        })}
    </div>;
}