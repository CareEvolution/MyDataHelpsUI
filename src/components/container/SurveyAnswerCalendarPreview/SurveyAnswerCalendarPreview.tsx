import React, { useContext, useMemo, useState } from 'react';
import { Action, Button, Card, DateRangeContext, Title } from '../../presentational';
import { startOfDay } from 'date-fns';
import { getDayKey, useInitializeView } from '../../../helpers';
import { createPreviewSurveyAnswerFilter, createPreviewSurveyAnswerFormatter, generatePreviewLogEntry, SurveyAnswerCalendarPreviewPreviewState } from './SurveyAnswerCalendarPreview.previewData';
import './SurveyAnswerCalendarPreview.css';
import { enterLogEntry, loadLogEntry, SurveyAnswerLogEntry } from '../../../helpers/survey-answer';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { noop } from '../../../helpers/functions';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';

export interface FormattedSurveyAnswer {
    sortIndex: number;
    displayName: string;
    displayValue: string;
}

export type SurveyAnswerFilter = (surveyAnswer: SurveyAnswer) => boolean;
export type SurveyAnswerFormatter = (surveyAnswer: SurveyAnswer) => FormattedSurveyAnswer;

export interface SurveyAnswerCalendarPreviewProps {
    previewState?: SurveyAnswerCalendarPreviewPreviewState;
    surveyName: string;
    filter?: SurveyAnswerFilter;
    formatter?: SurveyAnswerFormatter;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function SurveyAnswerCalendarPreview(props: SurveyAnswerCalendarPreviewProps) {
    const dateRangeContext = useContext(DateRangeContext);

    const [loading, setLoading] = useState<boolean>(true);
    const [logEntry, setLogEntry] = useState<SurveyAnswerLogEntry>();

    const currentDate = useMemo<Date>(
        () => startOfDay(dateRangeContext?.intervalStart ?? new Date()),
        [dateRangeContext?.intervalStart, getDayKey(new Date())]
    );

    useInitializeView(() => {
        setLoading(true);
        const load = props.previewState
            ? () => generatePreviewLogEntry(props.previewState!, currentDate)
            : () => loadLogEntry(props.surveyName, currentDate);
        load().then(logEntry => {
            setLogEntry(logEntry);
            setLoading(false);
        });
    }, [], [props.previewState, props.surveyName, currentDate]);

    if (loading) return null;

    if (!logEntry) {
        return <div className="mdhui-sa-cal-preview" ref={props.innerRef}>
            <Card variant="highlight">
                <Action
                    title="Add Log Entry"
                    onClick={() => enterLogEntry(props.surveyName, currentDate)}
                    indicatorIcon={faPlus}
                />
            </Card>
        </div>;
    }

    const filter = props.previewState
        ? createPreviewSurveyAnswerFilter()
        : props.filter ?? (_ => true);

    const defaultFormatter: SurveyAnswerFormatter = surveyAnswer => {
        return { sortIndex: 0, displayName: surveyAnswer.resultIdentifier, displayValue: surveyAnswer.answers.join(', ') };
    };
    const formatter = props.previewState
        ? createPreviewSurveyAnswerFormatter()
        : props.formatter ?? defaultFormatter;

    const filteredSurveyAnswers = logEntry.surveyAnswers.filter(filter);
    const formattedSurveyAnswers = filteredSurveyAnswers.map(formatter);
    const sortedFormattedSurveyAnswers = formattedSurveyAnswers.sort((a, b) => a.sortIndex - b.sortIndex);

    return <div className="mdhui-sa-cal-preview" ref={props.innerRef}>
        <Card>
            <div className="mdhui-sa-cal-preview-log-entry-detail">
                <Title order={3} accessory={<Button fullWidth={false} onClick={noop}>Edit</Button>}>Log Entry</Title>
                {sortedFormattedSurveyAnswers.map((formattedSurveyAnswer, index) => {
                    return <div key={index} className="mdhui-sa-cal-preview-log-entry-detail-result">
                        <div>{formattedSurveyAnswer.displayName}</div>
                        <div>-</div>
                        <div>{formattedSurveyAnswer.displayValue}</div>
                    </div>;
                })}
            </div>
        </Card>
    </div>;
}