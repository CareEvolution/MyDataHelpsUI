import { Calendar, CalendarDay, CalendarDayStateConfiguration, DateRangeContext, LoadingIndicator, TextBlock } from '../index';
import React, { useContext, useMemo } from 'react';
import { isAfter, isSameDay, startOfMonth } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { enterSurveyAnswerLog, fnvPredictableRandomNumber, getDayKey } from '../../../helpers';
import { SurveyAnswerLogContext } from '../../container';
import './SurveyAnswerLogCalendar.css';

export interface SurveyAnswerLogCalendarProps {
    previewState?: 'default';
    stateConfiguration?: CalendarDayStateConfiguration;
    computeState?: (date: Date, surveyAnswers: SurveyAnswer[]) => string | undefined;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogCalendar(props: SurveyAnswerLogCalendarProps) {
    const surveyAnswerLogContext = useContext(SurveyAnswerLogContext);
    if (!surveyAnswerLogContext) {
        return <TextBlock innerRef={props.innerRef}>Error: SurveyAnswerLogCalendar must be used within a SurveyAnswerLogCoordinator.</TextBlock>;
    }

    const dateRangeContext = useContext(DateRangeContext);

    const intervalStart = useMemo<Date>(
        () => startOfMonth(dateRangeContext?.intervalStart ?? new Date()),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    const stateConfiguration: CalendarDayStateConfiguration = {
        'future': {
            style: {
                cursor: 'default'
            }
        },
        ...props.stateConfiguration
    };

    const computePreviewState = (date: Date, stateConfiguration: CalendarDayStateConfiguration | undefined, surveyAnswers: SurveyAnswer[]): string | undefined => {
        if (!stateConfiguration || !surveyAnswers || !surveyAnswers.length) {
            return undefined;
        }
        if (parseInt(surveyAnswers[0].answers[0]) > 0) {
            const states = Object.keys(stateConfiguration).filter(key => !['today', 'future', 'no-data'].includes(key));
            return states[fnvPredictableRandomNumber(getDayKey(date)) % states.length];
        }
        return undefined;
    };

    const computeStateForDay = (date: Date): string | undefined => {
        const surveyAnswers = surveyAnswerLogContext.surveyAnswerLogs[getDayKey(date)]?.surveyAnswers ?? [];

        const state = props.previewState
            ? computePreviewState(date, props.stateConfiguration, surveyAnswers)
            : props.computeState?.(date, surveyAnswers);

        if (state) return state;
        if (isSameDay(date, new Date())) return 'today';
        if (isAfter(date, new Date())) return 'future';
        return 'no-data';
    };

    const onDayClicked = (date: Date): void => {
        if (props.previewState || isAfter(date, new Date())) return;
        enterSurveyAnswerLog(surveyAnswerLogContext.surveyName, date, surveyAnswerLogContext.surveyAnswerLogs[getDayKey(date)]);
    };

    const renderDay = (year: number, month: number, day?: number): React.JSX.Element => {
        return <CalendarDay
            year={year}
            month={month}
            day={day}
            stateConfiguration={stateConfiguration}
            computeStateForDay={computeStateForDay}
            onClick={onDayClicked}
        />;
    };

    return <div ref={props.innerRef} className="mdhui-sa-log-calendar">
        <div>
            <Calendar year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />
            {surveyAnswerLogContext.loading &&
                <div className="mdhui-sa-log-calendar-loading-indicator-wrapper">
                    <LoadingIndicator className="mdhui-sa-log-calendar-loading-indicator" />
                </div>
            }
        </div>
    </div>;
}