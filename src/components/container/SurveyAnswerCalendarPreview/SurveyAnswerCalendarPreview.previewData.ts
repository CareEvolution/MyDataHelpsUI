import { add } from 'date-fns';
import { generateSurveyAnswers, SurveyAnswerLogEntry } from '../../../helpers/survey-answer';
import { v4 as uuid } from 'uuid';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { FormattedSurveyAnswer } from './SurveyAnswerCalendarPreview';

export type SurveyAnswerCalendarPreviewPreviewState = 'without log' | 'with log';

export async function generatePreviewLogEntry(previewState: SurveyAnswerCalendarPreviewPreviewState, date: Date): Promise<SurveyAnswerLogEntry | undefined> {
    if (previewState === 'without log') return undefined;
    const surveyAnswers = (await generateSurveyAnswers(date, add(date, { days: 1 }), ['activity', 'hidden', 'sleep'], 0, 2, { days: 1 })).flat();
    return { resultId: uuid(), surveyAnswers: surveyAnswers };
}

export function createPreviewSurveyAnswerFilter(): ((surveyAnswer: SurveyAnswer) => boolean) {
    return surveyAnswer => surveyAnswer.resultIdentifier !== 'hidden';
}

export function createPreviewSurveyAnswerFormatter(): ((surveyAnswer: SurveyAnswer) => FormattedSurveyAnswer) {
    return surveyAnswer => {
        const displayName = surveyAnswer.resultIdentifier === 'activity' ? 'Activity' : 'Sleep';
        const displayValue = surveyAnswer.answers[0] === '1' ? 'Yes' : 'No';
        return { sortIndex: 0, displayName, displayValue };
    };
}