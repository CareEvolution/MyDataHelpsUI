import { SurveyAnswer, SurveyAnswersQuery } from '@careevolution/mydatahelps-js';
import queryAllSurveyAnswers from './query-all-survey-answers';
import { getDayKey } from './index';
import { add, eachDayOfInterval, endOfDay, isValid, startOfDay } from 'date-fns';
import { parseISOWithoutOffset } from './date-helpers';
import { generateSurveyAnswers } from './survey-answer';

export default async function queryLatestSurveyAnswersByDate(
    startDate?: Date,
    endDate?: Date,
    surveyName?: string | string[],
    stepIdentifier?: string | string[],
    resultIdentifier?: string | string[],
    useEventAsDate = false,
    preview = false
): Promise<Partial<Record<string, SurveyAnswer[]>>> {

    if (!surveyName && !stepIdentifier && !resultIdentifier) return {};
    if (preview) return generateLatestSurveyAnswersByDate(startDate, endDate, resultIdentifier);

    const query: SurveyAnswersQuery = {};

    if (useEventAsDate) {
        if (startDate && endDate) {
            query.event = eachDayOfInterval({ start: startDate, end: endDate }).reduce((events, date) => {
                const event = getDayKey(date).substring(0, 9) + '*';
                if (!events.includes(event)) events.push(event);
                return events;
            }, [] as string[]);
        }
    } else {
        if (startDate) {
            query.after = add(startDate, { days: -1 }).toISOString();
        }
        if (endDate) {
            query.before = add(endDate, { days: 1 }).toISOString();
        }
    }

    if (surveyName) {
        query.surveyName = surveyName;
    }

    if (stepIdentifier) {
        query.stepIdentifier = stepIdentifier;
    }

    if (resultIdentifier) {
        query.resultIdentifier = resultIdentifier;
    }

    const allSurveyAnswers = (await queryAllSurveyAnswers(query))
        .filter(surveyAnswer => !useEventAsDate || (surveyAnswer.event && isValid(parseISOWithoutOffset(surveyAnswer.event))))
        .sort((a, b) => b.date.localeCompare(a.date));

    const latestResultIdsBySurveyAndDate = allSurveyAnswers.reduce((latestResultIdsBySurveyAndDate, surveyAnswer) => {
        const key = `${surveyAnswer.surveyName}-${useEventAsDate ? surveyAnswer.event! : getDayKey(surveyAnswer.date)}`;
        latestResultIdsBySurveyAndDate[key] ??= surveyAnswer.surveyResultID.toString();
        return latestResultIdsBySurveyAndDate;
    }, {} as Record<string, string>);

    const latestResultIds = Object.values(latestResultIdsBySurveyAndDate);
    const latestSurveyAnswers = allSurveyAnswers.filter(surveyAnswer => latestResultIds.includes(surveyAnswer.surveyResultID.toString()));

    return latestSurveyAnswers.reduce((surveyAnswersByDate, surveyAnswer) => {
        const date = parseISOWithoutOffset(useEventAsDate ? surveyAnswer.event! : surveyAnswer.date);
        if ((!startDate || date >= startOfDay(startDate)) && (!endDate || date <= endOfDay(endDate))) {
            const dayKey = getDayKey(date);
            surveyAnswersByDate[dayKey] ??= [];
            surveyAnswersByDate[dayKey].push(surveyAnswer);
        }
        return surveyAnswersByDate;
    }, {} as Record<string, SurveyAnswer[]>);
}

async function generateLatestSurveyAnswersByDate(startDate?: Date, endDate?: Date, resultIdentifier?: string | string[]): Promise<Partial<Record<string, SurveyAnswer[]>>> {
    const genStartDate = startDate ?? add(new Date(), { days: -7 });
    const genEndDate = endDate ?? new Date();
    const genResultIdentifiers = Array.isArray(resultIdentifier) ? resultIdentifier : resultIdentifier ? [resultIdentifier] : ['result'];
    const surveyAnswers = generateSurveyAnswers(genStartDate, genEndDate, genResultIdentifiers, 0, 10, { days: 1 })[0];
    return surveyAnswers.reduce((surveyAnswersByDate, surveyAnswer) => {
        surveyAnswersByDate[getDayKey(surveyAnswer.date)] = [surveyAnswer];
        return surveyAnswersByDate;
    }, {} as Partial<Record<string, SurveyAnswer[]>>);
}