import { getDayKey } from '../index';
import MyDataHelps, { SurveyAnswer } from '@careevolution/mydatahelps-js';
import queryAllSurveyAnswers from '../query-all-survey-answers';
import { add } from 'date-fns';

export interface SurveyAnswerLogEntry {
    resultId: string;
    surveyAnswers: SurveyAnswer[];
    event?: string;
}

export function enterLogEntry(surveyName: string, date: Date, priorLogEntry?: SurveyAnswerLogEntry) {
    if (priorLogEntry) {
        if (priorLogEntry.event) {
            MyDataHelps.startSurvey(surveyName, { event: priorLogEntry.event });
        } else {
            MyDataHelps.startSurvey(surveyName, { editResultID: priorLogEntry.resultId });
        }
    } else {
        MyDataHelps.startSurvey(surveyName, { event: getDayKey(date) });
    }
}

export async function loadLogEntry(surveyName: string, date: Date): Promise<SurveyAnswerLogEntry | undefined> {
    const logEntries = await loadLogEntries(surveyName, add(date, { days: -1 }), add(date, { days: 2 }));
    return logEntries[getDayKey(date)];
}

export async function loadLogEntries(surveyName: string, startDate: Date, endDate: Date): Promise<Partial<Record<string, SurveyAnswerLogEntry>>> {
    const allSurveyAnswers = (await queryAllSurveyAnswers({
        surveyName: surveyName,
        after: startDate.toISOString(),
        before: endDate.toISOString()
    })).sort((a, b) => b.date.localeCompare(a.date));

    const latestResultIdsByDate = allSurveyAnswers.reduce((latestResultIdsByDate, surveyAnswer) => {
        const dayKey = getSurveyAnswerDayKey(surveyAnswer);
        if (!latestResultIdsByDate[dayKey]) {
            latestResultIdsByDate[dayKey] = surveyAnswer.surveyResultID.toString();
        }
        return latestResultIdsByDate;
    }, {} as Record<string, string>);

    const latestResultIds = Object.values(latestResultIdsByDate);
    const latestSurveyAnswers = allSurveyAnswers.filter(surveyAnswer => latestResultIds.includes(surveyAnswer.surveyResultID.toString()));

    return latestSurveyAnswers.reduce((surveyAnswersByDate, surveyAnswer) => {
        const dayKey = getSurveyAnswerDayKey(surveyAnswer);
        surveyAnswersByDate[dayKey] ??= {
            resultId: surveyAnswer.surveyResultID.toString(),
            surveyAnswers: [],
            // @ts-ignore
            event: surveyAnswer.event
        };
        surveyAnswersByDate[dayKey].surveyAnswers.push(surveyAnswer);
        return surveyAnswersByDate;
    }, {} as Record<string, SurveyAnswerLogEntry>);
}

export function getSurveyAnswerDayKey(surveyAnswer: SurveyAnswer): string {
    // @ts-ignore
    return surveyAnswer.event ?? getDayKey(surveyAnswer.date);
}