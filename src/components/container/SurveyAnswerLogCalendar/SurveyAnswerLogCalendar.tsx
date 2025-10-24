import { Calendar, CalendarDay, CalendarDayStateConfiguration, DateRangeContext } from '../../presentational';
import React, { useContext, useMemo, useState } from 'react';
import { add, isAfter, isSameDay, startOfMonth } from 'date-fns';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { getDayKey, useInitializeView } from '../../../helpers';
import { computePreviewState, generateSurveyAnswerLogs } from './SurveyAnswerLogCalendar.previewData';
import { enterSurveyAnswerLog, loadSurveyAnswerLogs, SurveyAnswerLog } from '../../../helpers/survey-answer';

export interface SurveyAnswerLogCalendarProps {
    previewState?: 'default';
    surveyName: string;
    stateConfiguration?: CalendarDayStateConfiguration;
    computeState?: (date: Date, surveyAnswers: SurveyAnswer[]) => string | undefined;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerLogCalendar(props: SurveyAnswerLogCalendarProps) {
    const dateRangeContext = useContext(DateRangeContext);
    const [surveyAnswerLogs, setSurveyAnswerLogs] = useState<Partial<Record<string, SurveyAnswerLog>>>({});

    const intervalStart = useMemo<Date>(
        () => startOfMonth(dateRangeContext?.intervalStart ?? new Date()),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    useInitializeView(() => {
        const startDate = add(startOfMonth(intervalStart), { days: -1 });
        const endDate = add(startDate, { months: 1, days: 1 });

        const load = props.previewState
            ? () => generateSurveyAnswerLogs(props.stateConfiguration, startDate, endDate)
            : () => loadSurveyAnswerLogs(props.surveyName, startDate, endDate);

        load().then(setSurveyAnswerLogs);
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
        const surveyAnswers = surveyAnswerLogs[getDayKey(date)]?.surveyAnswers ?? [];

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
        enterSurveyAnswerLog(props.surveyName, date, surveyAnswerLogs[getDayKey(date)]);
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
        <Calendar year={intervalStart.getFullYear()} month={intervalStart.getMonth()} dayRenderer={renderDay} />
    </div>;
}