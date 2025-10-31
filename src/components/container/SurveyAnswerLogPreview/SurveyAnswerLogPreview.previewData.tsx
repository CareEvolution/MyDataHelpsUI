import { add } from 'date-fns';
import { generateSurveyAnswers, getDayKey, predictableRandomNumber, SurveyAnswerLog, SurveyAnswerRenderingConfiguration } from '../../../helpers';
import { v4 as uuid } from 'uuid';
import React from 'react';

export type SurveyAnswerLogPreviewPreviewState = 'without log' | 'with log';

export async function generateSurveyAnswerLog(previewState: SurveyAnswerLogPreviewPreviewState, answerRenderingConfigurations: SurveyAnswerRenderingConfiguration[] | undefined, date: Date): Promise<SurveyAnswerLog | undefined> {
    if (previewState === 'without log') return undefined;

    if (!answerRenderingConfigurations) return { resultId: uuid(), date: date, surveyAnswers: [] };

    const resultIdentifiers = [...answerRenderingConfigurations.map(configuration => configuration.resultIdentifier), 'hidden'];
    const randomNumber = await predictableRandomNumber(getDayKey(date));
    if (randomNumber % 3 === 0) {
        resultIdentifiers.splice(randomNumber % resultIdentifiers.length, 1);
    }
    const surveyAnswers = (await generateSurveyAnswers(date, add(date, { days: 1 }), resultIdentifiers, 0, 5, { days: 1 })).flat();
    return { resultId: uuid(), date: date, surveyAnswers: surveyAnswers };
}

export function createPreviewAnswerRenderingConfigurations(answerRenderingConfigurations: SurveyAnswerRenderingConfiguration[] | undefined): SurveyAnswerRenderingConfiguration[] {
    return answerRenderingConfigurations?.map(configuration => ({
        ...configuration,
        shouldHighlight: configuration.shouldHighlight ? surveyAnswer => surveyAnswer.answers[0] !== '0' : undefined,
        formatDisplayValue: configuration.formatDisplayValue
            ? () => <i>Expression formatted value will appear here.</i>
            : () => <i>Raw value will appear here.</i>
    })) ?? [];
}