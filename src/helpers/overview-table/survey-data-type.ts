import { DailyDataType } from "../daily-data-types";
import { DailyDataProvider, DailyDataQueryResult } from "../query-daily-data";
import { SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import getDayKey from "../get-day-key";
import { add, isSameDay, parseISO } from "date-fns";
import queryAllSurveyAnswers from "../query-all-survey-answers";

export interface SurveyDataType {
    surveyName: string;
    stepIdentifier: string;
    resultIdentifier?: string;
}

export function isSurveyDataType(dataType: DailyDataType | SurveyDataType): dataType is SurveyDataType {
    return dataType && (dataType as any).surveyName !== undefined;
}

export function getSurveyDataProvider(dataType: SurveyDataType): DailyDataProvider {
    return async (startDate: Date, endDate: Date) => {
        const query: SurveyAnswersQuery = {
            surveyName: dataType.surveyName,
            stepIdentifier: dataType.stepIdentifier,
            resultIdentifier: dataType.resultIdentifier,
            after: add(startDate, { days: -1 }).toISOString(),
            before: add(endDate, { days: 1 }).toISOString()
        };

        let answers = await queryAllSurveyAnswers(query);

        let result: DailyDataQueryResult = {};

        let currentDate = startDate;
        while (currentDate <= endDate) {
            let currentDayKey = getDayKey(currentDate);
            let answerForDate = answers.find(answer => isSameDay(parseISO(answer.date), currentDate));
            if (answerForDate) {
                result[currentDayKey] = parseInt(answerForDate.answers[0]);
            }
            currentDate = add(currentDate, { days: 1 });
        }

        return result;
    }
}
