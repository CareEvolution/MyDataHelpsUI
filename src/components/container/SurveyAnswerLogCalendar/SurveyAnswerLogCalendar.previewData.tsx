import { parseISO, startOfToday } from 'date-fns';
import { fnvPredictableRandomNumber, generateSurveyAnswers, getDayKey, SurveyAnswerLog, SurveyAnswerRenderingConfiguration } from '../../../helpers';
import { v4 as uuid } from 'uuid';
import { CalendarDayStateConfiguration } from '../../presentational';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';

export async function generatePreviewSurveyAnswerLogs(answerRenderingConfigurations: SurveyAnswerRenderingConfiguration[] | undefined, startDate: Date): Promise<Partial<Record<string, SurveyAnswerLog>>> {
    const resultIdentifiers = answerRenderingConfigurations?.map(configuration => configuration.resultIdentifier) ?? ['result1', 'result2', 'result3', 'result4'];
    const surveyAnswers = (await generateSurveyAnswers(startDate, startOfToday(), resultIdentifiers, 0, 5, { days: 1 })).flat();

    return surveyAnswers.reduce((surveyAnswerLogs, surveyAnswer) => {
        const dayKey = getDayKey(surveyAnswer.date);
        if (fnvPredictableRandomNumber(dayKey) % 5 !== 0) {
            surveyAnswerLogs[dayKey] ??= { resultId: uuid(), date: parseISO(dayKey), surveyAnswers: [] };
            if (fnvPredictableRandomNumber(dayKey + '_' + surveyAnswer.resultIdentifier) % 5 !== 0) {
                surveyAnswerLogs[dayKey].surveyAnswers.push(surveyAnswer);
            }
        }
        return surveyAnswerLogs;
    }, {} as Record<string, SurveyAnswerLog>);
}

export function computePreviewStates(stateConfiguration: CalendarDayStateConfiguration | undefined, date: Date, surveyAnswers: SurveyAnswer[]): string[] | undefined {
    if (!stateConfiguration || !surveyAnswers || !surveyAnswers.length) {
        return undefined;
    }

    const stateKeys = Object.keys(stateConfiguration).filter(key => !['today', 'future', 'no-data'].includes(key));
    if (surveyAnswers.some(surveyAnswer => parseInt(surveyAnswer.answers[0]) > 0)) {
        const dayKey = getDayKey(date);
        const stateKeyCount = (fnvPredictableRandomNumber(dayKey + '-state-key-count') % stateKeys.length) + 1;

        const stateKeysToReturn: string[] = [];
        let currentStateIndex = fnvPredictableRandomNumber(dayKey + '-state-key-index') % stateKeys.length;
        while (stateKeysToReturn.length < stateKeyCount) {
            stateKeysToReturn.push(stateKeys[currentStateIndex]);
            currentStateIndex = (currentStateIndex + 1) % stateKeys.length;
        }
        return stateKeysToReturn;
    }

    return undefined;
}

