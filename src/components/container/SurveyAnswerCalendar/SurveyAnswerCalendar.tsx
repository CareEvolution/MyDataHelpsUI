import { Calendar, CalendarDay, CalendarDayStateConfiguration, DateRangeContext } from '../../presentational';
import React, { useContext, useMemo, useState } from 'react';
import { add, isAfter, isSameDay, startOfMonth } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { getDayKey, useInitializeView } from '../../../helpers';
import { computePreviewState, generatePreviewLogEntries } from './SurveyAnswerCalendar.previewData';
import { enterSurveyAnswerLog, loadLogEntries, SurveyAnswerLog } from '../../../helpers/survey-answer';

export interface SurveyAnswerCalendarProps {
    previewState?: 'default';
    surveyName: string;
    stateConfiguration?: CalendarDayStateConfiguration;
    computeState?: (date: Date, surveyAnswers: SurveyAnswer[]) => string | undefined;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerCalendar(props: SurveyAnswerCalendarProps) {
    const dateRangeContext = useContext(DateRangeContext);
    const [logEntries, setLogEntries] = useState<Partial<Record<string, SurveyAnswerLog>>>({});

    const intervalStart = useMemo<Date>(
        () => startOfMonth(dateRangeContext?.intervalStart ?? new Date()),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    useInitializeView(() => {
        const startDate = add(startOfMonth(intervalStart), { days: -1 });
        const endDate = add(startDate, { months: 1, days: 1 });

        if (props.previewState) {
            generatePreviewLogEntries(props.stateConfiguration, startDate, endDate).then(setLogEntries);
            return;
        }

        loadLogEntries(props.surveyName, startDate, endDate).then(setLogEntries);
    }, [], [props.previewState, props.surveyName, props.stateConfiguration, intervalStart]);

    const stateConfiguration: CalendarDayStateConfiguration = {
        'future': {
            style: {
                cursor: 'default'
            }
        },
        ...props.stateConfiguration
    };

    const computeStateForDay = (date: Date): string | undefined => {
        const surveyAnswers = logEntries[getDayKey(date)]?.surveyAnswers ?? [];

        const state = props.previewState
            ? computePreviewState(props.stateConfiguration, surveyAnswers)
            : props.computeState?.(date, surveyAnswers);

        if (state) return state;
        if (isSameDay(date, new Date())) return 'today';
        if (isAfter(date, new Date())) return 'future';
        return 'no-data';
    };

    const onDayClicked = (date: Date): void => {
        if (props.previewState || isAfter(date, new Date())) return;
        enterSurveyAnswerLog(props.surveyName, date, logEntries[getDayKey(date)]);
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

    return <div ref={props.innerRef} className="mdhui-survey-answer-calendar">
        <Calendar year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />
    </div>;
}