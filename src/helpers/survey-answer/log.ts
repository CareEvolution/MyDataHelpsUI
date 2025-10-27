import { ColorDefinition, getDayKey } from '../index';
import MyDataHelps, { SurveyAnswer } from '@careevolution/mydatahelps-js';
import queryAllSurveyAnswers from '../query-all-survey-answers';
import { add } from 'date-fns';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { CSSProperties, ReactNode } from 'react';

export interface SurveyAnswerLog {
    resultId: string;
    surveyAnswers: SurveyAnswer[];
    event?: string;
}

export interface SurveyAnswerLogAnswerRenderingConfiguration {
    resultIdentifier: string;
    icon: IconDefinition;
    iconColor: ColorDefinition;
    label: string;
    hasMetCriteria: (answer: SurveyAnswer) => boolean;
    hasMetCriteriaStyling?: CSSProperties;
    formatDisplayValue?: (answer: SurveyAnswer) => ReactNode;
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
    const surveyAnswerLogs = await loadSurveyAnswerLogs(surveyName, add(date, { days: -1 }), add(date, { days: 2 }));
    return surveyAnswerLogs[getDayKey(date)];
}

export async function loadSurveyAnswerLogs(surveyName: string, startDate: Date, endDate: Date): Promise<Partial<Record<string, SurveyAnswerLog>>> {
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

    return latestSurveyAnswers.reduce((surveyAnswerLogs, surveyAnswer) => {
        const dayKey = getSurveyAnswerDayKey(surveyAnswer);
        surveyAnswerLogs[dayKey] ??= {
            resultId: surveyAnswer.surveyResultID.toString(),
            surveyAnswers: [],
            // @ts-ignore
            event: surveyAnswer.event
        };
        surveyAnswerLogs[dayKey].surveyAnswers.push(surveyAnswer);
        return surveyAnswerLogs;
    }, {} as Record<string, SurveyAnswerLog>);
}

export function getSurveyAnswerDayKey(surveyAnswer: SurveyAnswer): string {
    // @ts-ignore
    return surveyAnswer.event ?? getDayKey(surveyAnswer.date);
}