import { add } from 'date-fns';
import { generateSurveyAnswers, getDayKey, predictableRandomNumber, SurveyAnswerLog, SurveyAnswerRenderingConfiguration } from '../../../helpers';
import { v4 as uuid } from 'uuid';
import { faBed, faBicycle, faSwimmer, faWalking } from '@fortawesome/free-solid-svg-icons';

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
            hasMetCriteria: answer => answer.answers[0] !== '0',
            formatDisplayValue: answer => `An activity level of ${answer.answers[0]} was recorded on this day.`
        },
        {
            resultIdentifier: 'sleep',
            icon: faBed,
            iconColor: '#664cda',
            label: 'Sleep',
            hasMetCriteria: answer => answer.answers[0] !== '0',
            formatDisplayValue: answer => `A sleep level of ${answer.answers[0]} was recorded on this day.`
        },
        {
            resultIdentifier: 'swimming',
            icon: faSwimmer,
            iconColor: '#976d1e',
            label: 'Swimming',
            hasMetCriteria: answer => answer.answers[0] !== '0',
            formatDisplayValue: answer => `A swimming level of ${answer.answers[0]} was recorded on this day.`
        },
        {
            resultIdentifier: 'cycling',
            icon: faBicycle,
            iconColor: '#0877b8',
            label: 'Cycling',
            hasMetCriteria: answer => answer.answers[0] !== '0',
            formatDisplayValue: answer => `A cycling level of ${answer.answers[0]} was recorded on this day.`
        }
    ];
}