import { add } from 'date-fns';
import { generateSurveyAnswers, SurveyAnswerFilter, SurveyAnswerFormatter, SurveyAnswerLog } from '../../../helpers/survey-answer';
import { v4 as uuid } from 'uuid';

export type SurveyAnswerLogPreviewPreviewState = 'without log' | 'with log';

export async function generateSurveyAnswerLog(previewState: SurveyAnswerLogPreviewPreviewState, date: Date): Promise<SurveyAnswerLog | undefined> {
    if (previewState === 'without log') return undefined;
    const surveyAnswers = (await generateSurveyAnswers(date, add(date, { days: 1 }), ['activity', 'filterable', 'sleep'], 0, 2, { days: 1 })).flat();
    return { resultId: uuid(), surveyAnswers: surveyAnswers };
}

export function createPreviewSurveyAnswerFilter(): SurveyAnswerFilter {
    return surveyAnswer => surveyAnswer.resultIdentifier !== 'filterable';
}

export function createPreviewSurveyAnswerFormatter(): SurveyAnswerFormatter {
    return surveyAnswer => {
        const displayName = surveyAnswer.resultIdentifier.charAt(0).toUpperCase() + surveyAnswer.resultIdentifier.slice(1);
        const displayValue = surveyAnswer.answers[0] === '1' ? 'Yes' : 'No';
        return { sortIndex: 0, displayName, displayValue };
    };
}