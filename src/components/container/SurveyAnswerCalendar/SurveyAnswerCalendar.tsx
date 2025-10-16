import { Calendar, CalendarDay, CalendarDayStateConfiguration, DateRangeContext } from '../../presentational';
import React, { useContext, useMemo, useState } from 'react';
import { add, formatISO, isAfter, isSameDay, startOfMonth } from 'date-fns';
import MyDataHelps, { SurveyAnswer, SurveyAnswersQuery } from '@careevolution/mydatahelps-js';
import { getDayKey, useInitializeView } from '../../../helpers';
import queryAllSurveyAnswers from '../../../helpers/query-all-survey-answers';
import { computePreviewState, generatePreviewData } from './SurveyAnswerCalendar.previewData';

export interface SurveyAnswerCalendarProps {
    previewState?: 'default';
    surveyName: string;
    resultIdentifiers?: string[];
    stateConfiguration?: CalendarDayStateConfiguration;
    computeState?: (date: Date, surveyAnswers: SurveyAnswer[]) => string | undefined;
    eventPrefix?: string;
    intervalStart?: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerCalendar(props: SurveyAnswerCalendarProps) {
    const dateRangeContext = useContext(DateRangeContext);
    const [surveyAnswersByDate, setSurveyAnswersByDate] = useState<Record<string, SurveyAnswer[]>>({});

    const intervalStart = useMemo<Date>(
        () => startOfMonth(dateRangeContext?.intervalStart ?? props.intervalStart ?? new Date()),
        [dateRangeContext?.intervalStart, props.intervalStart, getDayKey(new Date())]
    );

    useInitializeView(() => {
        const loadSurveyAnswers = props.previewState
            ? (startDate: Date) => generatePreviewData(props.stateConfiguration, props.resultIdentifiers, startDate)
            : (startDate: Date) => queryAllSurveyAnswers({ surveyName: props.surveyName, after: startDate.toISOString() } as SurveyAnswersQuery);

        const startDate = add(startOfMonth(intervalStart), { days: -1 });

        loadSurveyAnswers(startDate).then(surveyAnswers => {
            setSurveyAnswersByDate(surveyAnswers.reduce((surveyAnswersByDate, surveyAnswer) => {
                if (!props.resultIdentifiers || props.resultIdentifiers.includes(surveyAnswer.resultIdentifier)) {
                    const dayKey = getDayKey(surveyAnswer.date);
                    surveyAnswersByDate[dayKey] ??= [];
                    surveyAnswersByDate[dayKey].push(surveyAnswer);
                }
                return surveyAnswersByDate;
            }, {} as Record<string, SurveyAnswer[]>));
        });
    }, [], [props.previewState, props.resultIdentifiers, props.stateConfiguration, intervalStart]);

    const stateConfiguration: CalendarDayStateConfiguration = {
        'future': {
            style: {
                cursor: 'default'
            }
        },
        ...props.stateConfiguration
    };

    const computeStateForDay = (date: Date): string | undefined => {
        const surveyAnswersForDay = surveyAnswersByDate[getDayKey(date)];

        const state = props.previewState
            ? computePreviewState(props.stateConfiguration, surveyAnswersForDay)
            : props.computeState?.(date, surveyAnswersForDay);

        if (state) return state;
        if (isSameDay(date, new Date())) return 'today';
        if (isAfter(date, new Date())) return 'future';
        return 'no-data';
    };

    const onDayClicked = (date: Date): void => {
        if (props.previewState || isAfter(date, new Date())) return;
        MyDataHelps.startSurvey(props.surveyName, { event: (props.eventPrefix ?? '') + formatISO(date, { representation: 'date' }) });
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