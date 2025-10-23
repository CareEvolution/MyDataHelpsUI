import { SurveyAnswer } from '@careevolution/mydatahelps-js';

export type SurveyAnswerFilter = (surveyAnswer: SurveyAnswer) => boolean;

export const alwaysTrueSurveyAnswerFilter: SurveyAnswerFilter = () => true;