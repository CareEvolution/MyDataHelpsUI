import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { add, startOfToday } from 'date-fns';
import { generateSurveyAnswers } from '../../../helpers/survey-answer';
import { CalendarDayStateConfiguration } from '../../presentational';

export async function generatePreviewData(stateConfiguration: CalendarDayStateConfiguration | undefined, resultIdentifiers: string[] | undefined, startDate: Date): Promise<SurveyAnswer[]> {
    if (!stateConfiguration) {
        return [];
    }

    const endDate = add(startOfToday(), { days: 1 });
    const maxValue = Math.ceil(Object.keys(stateConfiguration).length * 4 / 3);

    return (await generateSurveyAnswers(startDate, endDate, resultIdentifiers ?? ['any_result_identifier'], 0, maxValue, { days: 1 })).flat();
}

export function computePreviewState(stateConfiguration: CalendarDayStateConfiguration | undefined, surveyAnswers: SurveyAnswer[]): string | undefined {
    if (!stateConfiguration || !surveyAnswers || !surveyAnswers.length) {
        return undefined;
    }
    const answerIndex = parseInt(surveyAnswers[0].answers[0]);
    const states = Object.keys(stateConfiguration);
    return answerIndex <= states.length - 1 ? states[answerIndex] : undefined;
}