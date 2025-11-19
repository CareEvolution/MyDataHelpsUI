import { add, eachDayOfInterval, Interval, isToday, min, parseISO, startOfToday } from 'date-fns';
import { fnvPredictableRandomNumber, getDayKey, queryDailyData, SurveyLog } from '../index';
import { SurveyAnswersQuery } from '@careevolution/mydatahelps-js';
import queryAllSurveyAnswers from '../query-all-survey-answers';
import { SurveyLogDataPoint, SurveyLogSurveyAnswer } from './types';
import { generateSurveyAnswers } from '../survey-answer';

export type SurveyLogPreviewState = 'loaded' | 'reloading' | 'loaded with today' | 'reloading with today';

export async function loadSurveyLogs(logSurveyName: string | undefined, dailyDataTypes: string[], startDate: Date, endDate: Date, previewState: SurveyLogPreviewState | undefined): Promise<Partial<Record<string, SurveyLog>>> {
    const surveyNames: string[] = [];
    if (logSurveyName) surveyNames.push(logSurveyName);

    const [surveyAnswers, dataPoints] = await Promise.all([
        loadSurveyAnswers(surveyNames, startDate, endDate, previewState),
        loadDataPoints(dailyDataTypes, startDate, endDate, !!previewState)
    ]);

    const surveyLogs: Partial<Record<string, SurveyLog>> = {};

    let currentDate = startDate;
    while (currentDate < endDate) {
        const dayKey = getDayKey(currentDate);
        surveyLogs[dayKey] = { date: parseISO(dayKey), surveyAnswers: surveyAnswers[dayKey] ?? [], dataPoints: dataPoints[dayKey] ?? [] };
        currentDate = add(currentDate, { days: 1 });
    }

    return surveyLogs;
}

async function loadSurveyAnswers(surveyNames: string[], startDate: Date, endDate: Date, previewState: SurveyLogPreviewState | undefined): Promise<Partial<Record<string, SurveyLogSurveyAnswer[]>>> {
    if (surveyNames.length === 0) return {};

    if (previewState) return generatePreviewSurveyAnswers(surveyNames[0], startDate, endDate, previewState.endsWith('with today'));

    const event = eachDayOfInterval({ start: startDate, end: add(endDate, { days: -1 }) }).reduce((events, date) => {
        const event = getDayKey(date).substring(0, 8) + '*';
        if (!events.includes(event)) events.push(event);
        return events;
    }, [] as string[]).join(',');
    return queryAndCompileSurveyAnswers(surveyNames, event, { start: startDate, end: endDate });
}

function generatePreviewSurveyAnswers(surveyName: string, startDate: Date, endDate: Date, ensureTodayHasLog: boolean): Partial<Record<string, SurveyLogSurveyAnswer[]>> {
    const resultIdentifiers = Array.from({ length: 10 }, (_, index) => `result${index + 1}`);
    const surveyAnswers = generateSurveyAnswers(startDate, min([add(startOfToday(), { days: ensureTodayHasLog ? 1 : 0 }), endDate]), resultIdentifiers, 0, 5, { days: 1 }).flat();
    return surveyAnswers.reduce((sparseSurveyAnswers, surveyAnswer) => {
        const dayKey = getDayKey(surveyAnswer.date);
        const forceAdd = ensureTodayHasLog && isToday(surveyAnswer.date);
        if (forceAdd || (fnvPredictableRandomNumber(dayKey) % 3 !== 0 && fnvPredictableRandomNumber(dayKey + '_' + surveyAnswer.resultIdentifier) % 3 !== 0)) {
            sparseSurveyAnswers[dayKey] ??= [];
            sparseSurveyAnswers[dayKey].push({
                surveyName: surveyName,
                stepIdentifier: surveyAnswer.stepIdentifier,
                resultIdentifier: surveyAnswer.resultIdentifier,
                answers: forceAdd && surveyAnswer.answers[0] === '0' ? ['1'] : surveyAnswer.answers
            });
        }
        return sparseSurveyAnswers;
    }, {} as Record<string, SurveyLogSurveyAnswer[]>);
}

async function queryAndCompileSurveyAnswers(surveyNames: string[], event: string, filter?: Interval): Promise<Partial<Record<string, SurveyLogSurveyAnswer[]>>> {
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
            surveyAnswersByDate[dayKey].push({
                surveyName: surveyAnswer.surveyName,
                stepIdentifier: surveyAnswer.stepIdentifier,
                resultIdentifier: surveyAnswer.resultIdentifier,
                answers: surveyAnswer.answers
            });
        }
        return surveyAnswersByDate;
    }, {} as Record<string, SurveyLogSurveyAnswer[]>);
}

async function loadDataPoints(dailyDataTypes: string[], startDate: Date, endDate: Date, preview: boolean): Promise<Partial<Record<string, SurveyLogDataPoint[]>>> {
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
    }, {} as Record<string, SurveyLogDataPoint[]>);
}