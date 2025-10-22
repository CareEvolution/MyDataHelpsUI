import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { startOfToday } from 'date-fns';
import { getDayKey } from '../../../helpers';
import { generateSurveyAnswers } from '../../../helpers/survey-answer';
import { CalendarDayStateConfiguration } from '../../presentational';

export async function generatePreviewData(stateConfiguration: CalendarDayStateConfiguration | undefined, resultIdentifiers: string[] | undefined, startDate: Date): Promise<SurveyAnswer[]> {
    if (!stateConfiguration) {
        return [];
    }

    const endDate = startOfToday();
    const maxValue = Math.ceil(Object.keys(stateConfiguration).filter(excludeReservedKeys).length * 4 / 3);

    const surveyAnswers = (await generateSurveyAnswers(startDate, endDate, resultIdentifiers ?? ['any_result_identifier'], 0, maxValue, { days: 1 })).flat();
    // @ts-ignore
    surveyAnswers.forEach(surveyAnswer => surveyAnswer.event = getDayKey(surveyAnswer.date));
    return surveyAnswers;
}

export function computePreviewState(stateConfiguration: CalendarDayStateConfiguration | undefined, surveyAnswers: SurveyAnswer[]): string | undefined {
    if (!stateConfiguration || !surveyAnswers || !surveyAnswers.length) {
        return undefined;
    }
    const answerIndex = parseInt(surveyAnswers[0].answers[0]);
    const states = Object.keys(stateConfiguration).filter(excludeReservedKeys);
    return answerIndex <= states.length - 1 ? states[answerIndex] : undefined;
}

function excludeReservedKeys(key: string): boolean {
    return !['today', 'future', 'no-data'].includes(key);
}