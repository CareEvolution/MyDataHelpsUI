import { add } from 'date-fns';
import { generateSurveyAnswers, SurveyAnswerLog } from '../../../helpers/survey-answer';
import { v4 as uuid } from 'uuid';
import { SurveyAnswerRenderingConfiguration } from '../../presentational/SurveyAnswerLogSummary/SurveyAnswerLogSummary';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';
import { getDayKey, predictableRandomNumber } from '../../../helpers';

export type SurveyAnswerLogPreviewPreviewState = 'without log' | 'with log';

export async function generateSurveyAnswerLog(previewState: SurveyAnswerLogPreviewPreviewState, date: Date): Promise<SurveyAnswerLog | undefined> {
    if (previewState === 'without log') return undefined;
    const resultIdentifiers = ['activity', 'hidden', 'sleep', 'swimming', 'cycling'];
    const randomNumber = await predictableRandomNumber(getDayKey(date));
    if (randomNumber % 3 === 0) {
        resultIdentifiers.splice(randomNumber % resultIdentifiers.length, 1);
    }
    const surveyAnswers = (await generateSurveyAnswers(date, add(date, { days: 1 }), resultIdentifiers, 0, 5, { days: 1 })).flat();
    return { resultId: uuid(), surveyAnswers: surveyAnswers };
}

export function createPreviewAnswerRenderingConfigurations(): SurveyAnswerRenderingConfiguration[] {
    return [
        {
            resultIdentifier: 'activity',
            icon: faWalking,
            iconColor: '#3c973c',
            label: 'Activity',
            evaluate: answers => answers[0] !== '0',
            formatDisplayValue: answers => `An activity level of ${answers[0]} was recorded on this day.`
        },
        {
            resultIdentifier: 'sleep',
            icon: faBed,
            iconColor: '#664cda',
            label: 'Sleep',
            evaluate: answers => answers[0] !== '0',
            formatDisplayValue: answers => `A sleep level of ${answers[0]} was recorded on this day.`
        },
        {
            resultIdentifier: 'swimming',
            icon: faSwimmer,
            iconColor: '#976d1e',
            label: 'Swimming',
            evaluate: answers => answers[0] !== '0',
            formatDisplayValue: answers => `A swimming level of ${answers[0]} was recorded on this day.`
        },
        {
            resultIdentifier: 'cycling',
            icon: faBicycle,
            iconColor: '#0877b8',
            label: 'Cycling',
            evaluate: answers => answers[0] !== '0',
            formatDisplayValue: answers => `A cycling level of ${answers[0]} was recorded on this day.`
        }
    ];
}