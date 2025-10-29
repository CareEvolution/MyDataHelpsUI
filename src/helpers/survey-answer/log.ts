import { getDayKey } from '../index';
import MyDataHelps, { SurveyAnswer } from '@careevolution/mydatahelps-js';
import queryAllSurveyAnswers from '../query-all-survey-answers';

export interface SurveyAnswerLog {
    resultId: string;
    surveyAnswers: SurveyAnswer[];
    event?: string;
}

export function enterSurveyAnswerLog(surveyName: string, date: Date, priorSurveyAnswerLog?: SurveyAnswerLog) {
    if (priorSurveyAnswerLog) {
        if (priorSurveyAnswerLog.event) {
            MyDataHelps.startSurvey(surveyName, { event: priorSurveyAnswerLog.event });
        } else {
            MyDataHelps.startSurvey(surveyName, { editResultID: priorSurveyAnswerLog.resultId });
        }
    } else {
        MyDataHelps.startSurvey(surveyName, { event: getDayKey(date) });
    }
}

export async function loadSurveyAnswerLog(surveyName: string, date: Date): Promise<SurveyAnswerLog | undefined> {
    const surveyAnswerLogs = await loadSurveyAnswerLogs(surveyName);
    return surveyAnswerLogs[getDayKey(date)];
}

export async function loadSurveyAnswerLogs(surveyName: string): Promise<Partial<Record<string, SurveyAnswerLog>>> {
    const allSurveyAnswers = (await queryAllSurveyAnswers({ surveyName: surveyName })).sort((a, b) => b.date.localeCompare(a.date));

    const latestResultIdsByDate = allSurveyAnswers.reduce((latestResultIdsByDate, surveyAnswer) => {
        const dayKey = getSurveyAnswerDayKey(surveyAnswer);
        latestResultIdsByDate[dayKey] ??= surveyAnswer.surveyResultID.toString();
        return latestResultIdsByDate;
    }, {} as Record<string, string>);

    const latestResultIds = Object.values(latestResultIdsByDate);
    const latestSurveyAnswers = allSurveyAnswers.filter(surveyAnswer => latestResultIds.includes(surveyAnswer.surveyResultID.toString()));

    return latestSurveyAnswers.reduce((surveyAnswerLogs, surveyAnswer) => {
        const dayKey = getSurveyAnswerDayKey(surveyAnswer);
        surveyAnswerLogs[dayKey] ??= {
            resultId: surveyAnswer.surveyResultID.toString(),
            surveyAnswers: [],
            event: surveyAnswer.event
        };
        surveyAnswerLogs[dayKey].surveyAnswers.push(surveyAnswer);
        return surveyAnswerLogs;
    }, {} as Record<string, SurveyAnswerLog>);
}

export function getSurveyAnswerDayKey(surveyAnswer: SurveyAnswer): string {
    return surveyAnswer.event ?? getDayKey(surveyAnswer.date);
}