import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import { min, startOfToday } from 'date-fns';
import { getDayKey } from '../../../helpers';
import { generateSurveyAnswers, SurveyAnswerLog } from '../../../helpers/survey-answer';
import { CalendarDayStateConfiguration } from '../../presentational';
import { v4 as uuid } from 'uuid';

export async function generateSurveyAnswerLogs(stateConfiguration: CalendarDayStateConfiguration | undefined, startDate: Date, endDate: Date): Promise<Partial<Record<string, SurveyAnswerLog>>> {
    if (!stateConfiguration) {
        return {};
    }

    const maxValue = Math.ceil(Object.keys(stateConfiguration).filter(excludeReservedKeys).length * 4 / 3);
    const surveyAnswers = (await generateSurveyAnswers(startDate, min([endDate, startOfToday()]), ['activity'], 0, maxValue, { days: 1 })).flat();

    return surveyAnswers.reduce((logEntries, surveyAnswer) => {
        const dayKey = getDayKey(surveyAnswer.date);
        logEntries[dayKey] ??= { resultId: uuid(), surveyAnswers: [] };
        logEntries[dayKey].surveyAnswers.push(surveyAnswer);
        return logEntries;
    }, {} as Record<string, SurveyAnswerLog>);
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