import MyDataHelps, { Guid, SurveyAnswer, SurveyAnswersPage, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import { BloodPressureDataPoint } from "./query-blood-pressure";
import { format, parseISO, startOfDay, toDate } from "date-fns";

export interface BloodPressureDataParameters {
    surveyName: string,
    dateOfResultId? : string,
    systolicResultId? : string,
    diastolicResultId? : string
}

export default async function(props : BloodPressureDataParameters) : Promise<BloodPressureDataPoint[]> {
    const resultFilter = [props.dateOfResultId ?? "", props.systolicResultId ?? "", props.diastolicResultId ?? "" ];
    

    const surveyAnswers = await getSurveyAnswers(props.surveyName, resultFilter);
    var sortedAnswers = (surveyAnswers).sort((a, b) => {
            if (parseISO(a.date) > parseISO(b.date)) { return -1; }
            if (parseISO(a.date) < parseISO(b.date)) { return 1; }
            return 0;
    });

    return groupSurveyAnswersByResults(sortedAnswers);


    function groupSurveyAnswersByResults(answers : SurveyAnswer[]){
        let bpDataPoints : BloodPressureDataPoint[] = [];

        if (answers.length > 0){
            let resultIds = [...new Set(answers.map(a => a.surveyResultID ))];
            resultIds.forEach( (resultId) => {
                var resultsForSubmission = answers.filter(a => a.surveyResultID == resultId);
                var bpLogDateResults = resultsForSubmission.find( r => r.resultIdentifier == props.dateOfResultId);
                var bpLogDate =bpLogDateResults?.answers[0];
                var bpSystolicResults = resultsForSubmission.find( r => r.resultIdentifier == props.systolicResultId);
                var bpSystolic = bpSystolicResults?.answers[0];
                var bpDiastolicResults = resultsForSubmission.find( r => r.resultIdentifier == props.diastolicResultId);
                var bpDiastolic = bpDiastolicResults?.answers[0];

                if (bpLogDate){
                    var useDate = startOfDay(parseISO(bpLogDate));
                    var formattedDate = format(useDate, "MM/dd");
                    var newBpEntry : BloodPressureDataPoint = {
                        dateLabel: formattedDate, 
                        date: useDate,
                        systolic : Number(bpSystolic ?? 0), 
                        diastolic: Number(bpDiastolic ?? 0)
                    };

                    bpDataPoints.push(newBpEntry);
                }
            });
        }

        return bpDataPoints;
    }

    async function getSurveyAnswers(surveyName: string, resultId : string[]): Promise<SurveyAnswer[]> {
        let dataPage = await getSurveyDataPage(surveyName, resultId);
        let allData = dataPage.surveyAnswers;
        while (dataPage.nextPageID) {
            dataPage = await getSurveyDataPage(surveyName, resultId, dataPage.nextPageID);
            allData = allData.concat(dataPage.surveyAnswers);
        }
        return allData;
    }

    async function getSurveyDataPage(surveyName: string, resultId : string[], pageID?: Guid): Promise<SurveyAnswersPage> {
        var queryParameters: SurveyAnswersQuery = {
            surveyName
        };

        queryParameters.resultIdentifier = resultId;
        
        if (pageID) {
            queryParameters.pageID = pageID;
        }

        return MyDataHelps.querySurveyAnswers(queryParameters);
    }
}
