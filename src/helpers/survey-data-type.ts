import { DailyDataProvider, DailyDataQueryResult } from './query-daily-data';
import { SurveyAnswer } from '@careevolution/mydatahelps-js';
import queryLatestSurveyAnswersByDate from './query-latest-survey-answers-by-date';

export interface SurveyDataType {
    surveyName: string;
    stepIdentifier?: string;
    resultIdentifier?: string;
    useEventAsDate?: boolean;
}

export function isSurveyDataType(dataType: string | SurveyDataType): dataType is SurveyDataType {
    return !!dataType && (dataType as any).surveyName !== undefined;
}

export function getSurveyDataProvider(dataType: SurveyDataType): DailyDataProvider {
    return async (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> => {

        const latestSurveyAnswersByDate = await queryLatestSurveyAnswersByDate(
            startDate,
            endDate,
            dataType.surveyName,
            dataType.stepIdentifier,
            dataType.resultIdentifier,
            dataType.useEventAsDate
        );

        return Object.entries(latestSurveyAnswersByDate as Record<string, SurveyAnswer[]>).reduce((result, [dayKey, surveyAnswersForDay]) => {
            const parsedAnswer = parseInt(surveyAnswersForDay[0].answers[0]);
            if (!Number.isNaN(parsedAnswer)) {
                result[dayKey] = parsedAnswer;
            }
            return result;
        }, {} as DailyDataQueryResult);
    };
}
