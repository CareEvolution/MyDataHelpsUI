import { SurveyAnswer } from "@careevolution/mydatahelps-js";
import { add } from "date-fns";
import { getDayKey } from "../../../helpers";
import { predictableRandomNumber } from "../../../helpers/predictableRandomNumber";
import { SurveyAnswerAreaChartSeries, SurveyAnswerChartSeries } from "./SurveyAnswerChart";

export async function generateSurveyResponse(date: Date, resultIdentifier: string, surveyName: string, rangeStart: number, rangeEnd: number): Promise<SurveyAnswer> {
    var answer = await predictableRandomNumber(getDayKey(date) + resultIdentifier);
    return {
        "id": "00000000-0000-0000-0000-000000000000",
        "surveyID": "00000000-0000-0000-0000-000000000000",
        "surveyResultID": "00000000-0000-0000-0000-000000000000",
        "surveyVersion": 0,
        "surveyName": surveyName,
        "surveyDisplayName": surveyName,
        "date": date.toISOString(),
        "stepIdentifier": resultIdentifier,
        "resultIdentifier": resultIdentifier,
        "answers": [
            (answer % (rangeEnd - rangeStart) + rangeStart).toString()
        ],
        "insertedDate": date.toISOString()
    };
}

export const getDefaultPreviewData = async(start: Date, end: Date, series: SurveyAnswerChartSeries[] | SurveyAnswerAreaChartSeries[]) => {
    const standardData: SurveyAnswer[][] = [];
    series.forEach(s => standardData.push([]));

    let currentDate = new Date(start);
    while (currentDate < end) {
        for(let i = 0; i < series.length; ++i){
            var v = await generateSurveyResponse(currentDate, "TestResult"+i, "TestSurvey", 10, 100);
            standardData[i].push(v);
            
        };
        currentDate = add(currentDate, { months: 1 });
    }
    return standardData;
}