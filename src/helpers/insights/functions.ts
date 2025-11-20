import { add, eachDayOfInterval, Interval, isToday, min, parseISO, startOfToday } from 'date-fns';
import { fnvPredictableRandomNumber, getDayKey, queryDailyData } from '../index';
import { SurveyAnswer, SurveyAnswersQuery } from '@careevolution/mydatahelps-js';
import queryAllSurveyAnswers from '../query-all-survey-answers';
import { DataPoint, InsightsData } from './types';
import { generateSurveyAnswers } from '../survey-answer';

export type InsightsDataPreviewState = 'loaded' | 'reloading' | 'loaded with today' | 'reloading with today';

export async function loadInsightsData(surveyNames: string[], dailyDataTypes: string[], startDate: Date, endDate: Date, previewState: InsightsDataPreviewState | undefined): Promise<Partial<Record<string, InsightsData>>> {
    const [surveyAnswers, dataPoints] = await Promise.all([
        loadSurveyAnswers(surveyNames, startDate, endDate, previewState),
        loadDataPoints(dailyDataTypes, startDate, endDate, !!previewState)
    ]);

    const insightsDataByDate: Partial<Record<string, InsightsData>> = {};

    let currentDate = startDate;
    while (currentDate < endDate) {
        const dayKey = getDayKey(currentDate);
        insightsDataByDate[dayKey] = { date: parseISO(dayKey), surveyAnswers: surveyAnswers[dayKey] ?? [], dataPoints: dataPoints[dayKey] ?? [] };
        currentDate = add(currentDate, { days: 1 });
    }

    return insightsDataByDate;
}

async function loadSurveyAnswers(surveyNames: string[], startDate: Date, endDate: Date, previewState: InsightsDataPreviewState | undefined): Promise<Partial<Record<string, SurveyAnswer[]>>> {
    if (surveyNames.length === 0) return {};

    if (previewState) return generatePreviewSurveyAnswers(surveyNames, startDate, endDate, previewState.endsWith('with today'));

    const event = eachDayOfInterval({ start: startDate, end: add(endDate, { days: -1 }) }).reduce((events, date) => {
        const event = getDayKey(date).substring(0, 8) + '*';
        if (!events.includes(event)) events.push(event);
        return events;
    }, [] as string[]).join(',');
    return queryAndCompileSurveyAnswers(surveyNames, event, { start: startDate, end: endDate });
}

function generatePreviewSurveyAnswers(surveyNames: string[], startDate: Date, endDate: Date, ensureTodayHasLog: boolean): Partial<Record<string, SurveyAnswer[]>> {
    const resultIdentifiers = Array.from({ length: 10 }, (_, index) => `result${index + 1}`);
    const surveyAnswers = surveyNames.reduce((surveyAnswers, surveyName) => {
        const clampedEndDate = min([add(startOfToday(), { days: ensureTodayHasLog ? 1 : 0 }), endDate]);
        generateSurveyAnswers(startDate, clampedEndDate, resultIdentifiers, 0, 5, { days: 1 }).flat().forEach(surveyAnswer => {
            surveyAnswers.push({ ...surveyAnswer, surveyName });
        });
        return surveyAnswers;
    }, [] as SurveyAnswer[]);
    return surveyAnswers.reduce((sparseSurveyAnswers, surveyAnswer) => {
        const dayKey = getDayKey(surveyAnswer.date);
        const forceAdd = ensureTodayHasLog && isToday(surveyAnswer.date);
        const shouldIncludeDay = fnvPredictableRandomNumber(dayKey) % 3 !== 0;
        const shouldIncludeSurveyOnDay = fnvPredictableRandomNumber(dayKey + '_' + surveyAnswer.surveyName) % 3 !== 0;
        const shouldIncludeResultFromSurveyOnDay = fnvPredictableRandomNumber(dayKey + '_' + surveyAnswer.surveyName + '_' + surveyAnswer.resultIdentifier) % 3 !== 0;
        if (forceAdd || (shouldIncludeDay && shouldIncludeSurveyOnDay && shouldIncludeResultFromSurveyOnDay)) {
            sparseSurveyAnswers[dayKey] ??= [];
            sparseSurveyAnswers[dayKey].push({
                ...surveyAnswer,
                answers: forceAdd && surveyAnswer.answers[0] === '0' ? ['1'] : surveyAnswer.answers
            } as SurveyAnswer);
        }
        return sparseSurveyAnswers;
    }, {} as Record<string, SurveyAnswer[]>);
}

async function queryAndCompileSurveyAnswers(surveyNames: string[], event: string, filter?: Interval): Promise<Partial<Record<string, SurveyAnswer[]>>> {
    const surveyAnswersQuery: SurveyAnswersQuery = {
        surveyName: surveyNames,
        // @ts-ignore
        event: event
    };
    const allSurveyAnswers = (await queryAllSurveyAnswers(surveyAnswersQuery)).sort((a, b) => b.date.localeCompare(a.date));

    const latestResultIdsBySurveyAndDate = allSurveyAnswers.reduce((latestResultIdsBySurveyAndDate, surveyAnswer) => {
        const key = `${surveyAnswer.surveyName}-${surveyAnswer.event!}`;
        latestResultIdsBySurveyAndDate[key] ??= surveyAnswer.surveyResultID.toString();
        return latestResultIdsBySurveyAndDate;
    }, {} as Record<string, string>);

    const latestResultIds = Object.values(latestResultIdsBySurveyAndDate);
    const latestSurveyAnswers = allSurveyAnswers.filter(surveyAnswer => latestResultIds.includes(surveyAnswer.surveyResultID.toString()));

    return latestSurveyAnswers.reduce((surveyAnswersByDate, surveyAnswer) => {
        const date = parseISO(surveyAnswer.event!);
        if (!filter || (date >= filter.start && date < filter.end)) {
            const dayKey = getDayKey(date);
            surveyAnswersByDate[dayKey] ??= [];
            surveyAnswersByDate[dayKey].push(surveyAnswer);
        }
        return surveyAnswersByDate;
    }, {} as Record<string, SurveyAnswer[]>);
}

async function loadDataPoints(dailyDataTypes: string[], startDate: Date, endDate: Date, preview: boolean): Promise<Partial<Record<string, DataPoint[]>>> {
    if (dailyDataTypes.length === 0) return {};

    const results = await Promise.all(dailyDataTypes.map(dailyDataType => queryDailyData(dailyDataType, startDate, endDate, preview)));
    return results.reduce((dataPointsByDate, result, index) => {
        Object.entries(result).forEach(([dayKey, value]) => {
            dataPointsByDate[dayKey] ??= [];
            dataPointsByDate[dayKey].push({
                type: dailyDataTypes[index],
                value: value
            });
        });
        return dataPointsByDate;
    }, {} as Record<string, DataPoint[]>);
}