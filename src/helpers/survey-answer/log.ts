import { getDayKey } from '../index';
import MyDataHelps, { SurveyAnswer, SurveyAnswersQuery } from '@careevolution/mydatahelps-js';
import queryAllSurveyAnswers from '../query-all-survey-answers';
import { add, eachDayOfInterval, Interval, parseISO } from 'date-fns';

export interface SurveyAnswerLog {
    resultId: string;
    date: Date;
    surveyAnswers: SurveyAnswer[];
}

export function enterSurveyAnswerLog(surveyName: string, date: Date) {
    MyDataHelps.startSurvey(surveyName, { event: getDayKey(date) });
}

export async function loadSurveyAnswerLog(surveyName: string, date: Date): Promise<SurveyAnswerLog | undefined> {
    const dayKey = getDayKey(date);
    const surveyAnswerLogs = await queryAndCompileLogs(surveyName, dayKey);
    return surveyAnswerLogs[dayKey];
}

export function loadSurveyAnswerLogs(surveyName: string, startDate: Date, endDate: Date): Promise<Partial<Record<string, SurveyAnswerLog>>> {
    const event = eachDayOfInterval({ start: startDate, end: add(endDate, { days: -1 }) }).reduce((events, date) => {
        const event = getDayKey(date).substring(0, 8) + '*';
        if (!events.includes(event)) events.push(event);
        return events;
    }, [] as string[]).join(',');
    return queryAndCompileLogs(surveyName, event, { start: startDate, end: endDate });
}

async function queryAndCompileLogs(surveyName: string, event: string, filter?: Interval): Promise<Partial<Record<string, SurveyAnswerLog>>> {
    // @ts-ignore
    const surveyAnswersQuery: SurveyAnswersQuery = { surveyName: surveyName, event: event };
    const allSurveyAnswers = (await queryAllSurveyAnswers(surveyAnswersQuery)).sort((a, b) => b.date.localeCompare(a.date));

    const latestResultIdsByDate = allSurveyAnswers.reduce((latestResultIdsByDate, surveyAnswer) => {
        const dayKey = surveyAnswer.event!;
        latestResultIdsByDate[dayKey] ??= surveyAnswer.surveyResultID.toString();
        return latestResultIdsByDate;
    }, {} as Record<string, string>);

    const latestResultIds = Object.values(latestResultIdsByDate);
    const latestSurveyAnswers = allSurveyAnswers.filter(surveyAnswer => latestResultIds.includes(surveyAnswer.surveyResultID.toString()));

    return latestSurveyAnswers.reduce((surveyAnswerLogs, surveyAnswer) => {
        const date = parseISO(surveyAnswer.event!);
        if (!filter || (date >= filter.start && date < filter.end)) {
            const dayKey = getDayKey(date);
            surveyAnswerLogs[dayKey] ??= {
                resultId: surveyAnswer.surveyResultID.toString(),
                date: parseISO(dayKey),
                surveyAnswers: []
            };
            surveyAnswerLogs[dayKey].surveyAnswers.push(surveyAnswer);
        }
        return surveyAnswerLogs;
    }, {} as Record<string, SurveyAnswerLog>);
}