import { SurveyAnswerRenderingConfiguration } from '../../presentational';
import { fnvPredictableRandomNumber, generateSurveyAnswers, getDayKey, SurveyAnswerLog } from '../../../helpers';
import { add } from 'date-fns';
import { v4 as uuid } from 'uuid';

export type SurveyAnswerLogPreviewPreviewState = 'without log' | 'with log';

export async function generateSurveyAnswerLog(previewState: SurveyAnswerLogPreviewPreviewState, answerRenderingConfigurations: SurveyAnswerRenderingConfiguration[] | undefined, date: Date): Promise<SurveyAnswerLog | undefined> {
    if (previewState === 'without log') return undefined;

    if (!answerRenderingConfigurations) return { resultId: uuid(), date: date, surveyAnswers: [] };

    const resultIdentifiers = [...answerRenderingConfigurations.map(configuration => configuration.resultIdentifier), 'hidden'];
    const randomNumber = fnvPredictableRandomNumber(getDayKey(date));
    if (randomNumber % 3 === 0) {
        resultIdentifiers.splice(randomNumber % resultIdentifiers.length, 1);
    }
    const surveyAnswers = (await generateSurveyAnswers(date, add(date, { days: 1 }), resultIdentifiers, 0, 5, { days: 1 })).flat();
    return { resultId: uuid(), date: date, surveyAnswers: surveyAnswers };
}