import { Calendar, CalendarDay, CalendarDayState, Card, DateRangeContext, LayoutContext, LoadingIndicator, SurveyLogStateContext, TextBlock } from '../index';
import React, { useContext, useMemo } from 'react';
import { isAfter, startOfMonth } from 'date-fns';
import { getDayKey, resolveColor } from '../../../helpers';
import './SurveyLogCalendar.css';
import { SurveyLogContext } from '../../container';

export interface SurveyLogCalendarProps {
    multiStateStartAngle?: number;
    legend?: CalendarDayState[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyLogCalendar(props: SurveyLogCalendarProps) {
    const layoutContext = useContext(LayoutContext);
    const dateRangeContext = useContext(DateRangeContext);
    const surveyLogContext = useContext(SurveyLogContext);
    const surveyLogStateContext = useContext(SurveyLogStateContext);

    if (!surveyLogContext) {
        return <TextBlock innerRef={props.innerRef}>Error: SurveyLogCalendar must be used within a SurveyLogCoordinator.</TextBlock>;
    }

    const intervalStart = useMemo<Date>(
        () => startOfMonth(dateRangeContext?.intervalStart ?? new Date()),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    const computeStatesForDay = (date: Date): CalendarDayState[] => {
        const surveyLog = surveyLogContext.surveyLogs[getDayKey(date)];
        const calendarDayStates = surveyLogStateContext?.computeStatesForDay(date, surveyLog) ?? [];
        if (calendarDayStates.length > 0) return calendarDayStates;
        if (isAfter(date, new Date())) return [{ style: { cursor: 'default' } }];
        return [];
    };

    const onDayClicked = (date: Date): void => {
        if (isAfter(date, new Date())) return;
        surveyLogContext.enterSurveyLog(date);
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

    return <div className="mdhui-survey-log-calendar" ref={props.innerRef}>
        <Card>
            <Calendar year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />
            {(surveyLogContext.loading || props.legend && props.legend.length > 0) &&
                <div className="mdhui-survey-log-calendar-footer">
                    <div className="mdhui-survey-log-calendar-legend">
                        {props.legend && props.legend.length > 0 && props.legend.map(state => {
                            const backgroundColor = resolveColor(layoutContext.colorScheme, state.backgroundColor) ?? 'var(--mdhui-border-color-2)';
                            const borderColor = resolveColor(layoutContext.colorScheme, state.borderColor) ?? backgroundColor;

                            return <div key={state.label} className="mdhui-survey-log-calendar-legend-entry">
                                <div className="mdhui-survey-log-calendar-legend-entry-color" style={{
                                    background: backgroundColor,
                                    border: `2px solid ${borderColor}`,
                                    ...state.style
                                }}>&nbsp;</div>
                                <div className="mdhui-survey-log-calendar-legend-entry-label">{state.label}</div>
                            </div>;
                        })}
                    </div>
                    {surveyLogContext.loading && <LoadingIndicator className="mdhui-survey-log-calendar-loading-indicator" />}
                </div>
            }
        </Card>
    </div>;
}