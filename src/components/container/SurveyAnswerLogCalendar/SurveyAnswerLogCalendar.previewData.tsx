import { SurveyAnswerLogBadgeConfiguration } from '../../presentational';
import { fnvPredictableRandomNumber, generateSurveyAnswers, getDayKey, SurveyAnswerLog } from '../../../helpers';
import { min, parseISO, startOfToday } from 'date-fns';
import { v4 as uuid } from 'uuid';

export async function generatePreviewSurveyAnswerLogs(badgeConfigurations: SurveyAnswerLogBadgeConfiguration[] | undefined, startDate: Date, endDate: Date): Promise<Partial<Record<string, SurveyAnswerLog>>> {
    const resultIdentifiers = badgeConfigurations?.map(configuration => configuration.identifier) ?? ['result1', 'result2', 'result3', 'result4'];
    const surveyAnswers = (await generateSurveyAnswers(startDate, min([startOfToday(), endDate]), resultIdentifiers, 0, 5, { days: 1 })).flat();

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
