import { SurveyAnswer } from '@careevolution/mydatahelps-js';

export interface FormattedSurveyAnswer {
    sortIndex: number;
    displayName: string;
    displayValue: string;
}

export type SurveyAnswerFormatter = (surveyAnswer: SurveyAnswer) => FormattedSurveyAnswer;

export const asIsSurveyAnswerFormatter: SurveyAnswerFormatter = surveyAnswer => {
    return { sortIndex: 0, displayName: surveyAnswer.resultIdentifier, displayValue: surveyAnswer.answers.join(', ') };
};