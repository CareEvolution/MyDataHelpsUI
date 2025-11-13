import { Calendar, CalendarDay, CalendarDayState, Card, DateRangeContext, LayoutContext, LoadingIndicator, SurveyAnswerLogBadgeConfiguration, SurveyAnswerLogSummary } from '../../presentational';
import React, { useContext, useMemo, useState } from 'react';
import { add, compareDesc, isAfter, startOfMonth } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { enterSurveyAnswerLog, getDayKey, loadSurveyAnswerLogs, resolveColor, SurveyAnswerLog, useInitializeView } from '../../../helpers';
import './SurveyAnswerLogCalendar.css';
import { generatePreviewSurveyAnswerLogs } from './SurveyAnswerLogCalendar.previewData';

export interface SurveyAnswerLogCalendarProps {
    previewState?: 'loading' | 'loaded' | 'reloading';
    surveyName: string;
    computeStatesForDay: (date: Date, surveyAnswers: SurveyAnswer[]) => CalendarDayState[];
    multiStateStartAngle?: number;
    legend?: CalendarDayState[];
    badgeConfigurations?: SurveyAnswerLogBadgeConfiguration[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogCalendar(props: SurveyAnswerLogCalendarProps) {
    const layoutContext = useContext(LayoutContext);
    const dateRangeContext = useContext(DateRangeContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [surveyAnswerLogs, setSurveyAnswerLogs] = useState<Partial<Record<string, SurveyAnswerLog>>>({});

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
        .sort((surveyAnswerLog1, surveyAnswerLog2) => compareDesc(surveyAnswerLog1.date, surveyAnswerLog2.date));

    const applyPreviewState = (previewState: 'loading' | 'loaded' | 'reloading') => {
        setSurveyAnswerLogs({});
        if (previewState === 'loading') return;
        generatePreviewSurveyAnswerLogs(props.badgeConfigurations, intervalStart, intervalEnd).then(surveyAnswerLogs => {
            setSurveyAnswerLogs(surveyAnswerLogs);
            if (previewState !== 'reloading') {
                setLoading(false);
            }
        });
    };

    const loadState = () => {
        loadSurveyAnswerLogs(props.surveyName, intervalStart, intervalEnd).then(surveyAnswerLogs => {
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
    }, [], [props.previewState, props.surveyName, props.badgeConfigurations, intervalStart, intervalEnd]);

    const computeStatesForDay = (date: Date): CalendarDayState[] => {
        const surveyAnswers = surveyAnswerLogs[getDayKey(date)]?.surveyAnswers ?? [];
        const calendarDayStates = props.computeStatesForDay(date, surveyAnswers);
        if (calendarDayStates.length > 0) return calendarDayStates;
        if (isAfter(date, new Date())) return [{ style: { cursor: 'default' } }];
        return [];
    };

    const onDayClicked = (date: Date): void => {
        if (props.previewState || loading || isAfter(date, new Date())) return;
        setLoading(true);
        enterSurveyAnswerLog(props.surveyName, date);
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

    const onEditLog = (surveyAnswerLog: SurveyAnswerLog): void => {
        if (props.previewState || loading) return;
        setLoading(true);
        enterSurveyAnswerLog(props.surveyName, surveyAnswerLog.date);
    };

    return <div ref={props.innerRef} className="mdhui-sa-log-calendar">
        <Card>
            <Calendar year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />
            {(loading || props.legend && props.legend.length > 0) &&
                <div className="mdhui-sa-log-calendar-footer">
                    <div className="mdhui-sa-log-calendar-legend">
                        {props.legend && props.legend.length > 0 && props.legend.map(state => {
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
                    {loading && <LoadingIndicator className="mdhui-sa-log-calendar-loading-indicator" />}
                </div>
            }
        </Card>
        {props.badgeConfigurations && currentSurveyAnswerLogs.sort((a, b) => compareDesc(a.date, b.date)).map((surveyAnswerLog, index) => {
            return <Card key={index}>
                <SurveyAnswerLogSummary
                    surveyAnswerLog={surveyAnswerLog}
                    onEdit={() => onEditLog(surveyAnswerLog)}
                    badgeConfigurations={props.badgeConfigurations!}
                    loading={loading}
                />
            </Card>;
        })}
    </div>;
}