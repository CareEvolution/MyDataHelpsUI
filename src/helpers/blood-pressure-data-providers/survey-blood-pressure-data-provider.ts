import MyDataHelps, { Guid, SurveyAnswer, SurveyAnswersPage, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import { parseISO, startOfDay } from "date-fns";

export interface SurveyBloodPressureDataParameters {
    surveyName: string,
    dateResultIdentifier: string,
    systolicResultIdentifier: string,
    diastolicResultIdentifier: string,
    hideDeviceData?: boolean
}

export interface BloodPressureDataPoint {
    date: Date,
    systolic: number,
    diastolic: number
};

export default async function (props: SurveyBloodPressureDataParameters): Promise<BloodPressureDataPoint[]> {

    function groupSurveyAnswersByResults(answers: SurveyAnswer[]) {
        let bpDataPoints: BloodPressureDataPoint[] = [];

        if (answers.length > 0) {
            let resultIds = [...new Set(answers.map(a => a.surveyResultID))];
            resultIds.forEach((resultId) => {
                var resultsForSubmission = answers.filter(a => a.surveyResultID == resultId);
                var bpLogDateResults = resultsForSubmission.find(r => r.resultIdentifier == props.dateResultIdentifier);
                var bpLogDate = bpLogDateResults && bpLogDateResults.answers ? bpLogDateResults.answers[0] : "";
                var bpSystolicResults = resultsForSubmission.find(r => r.resultIdentifier == props.systolicResultIdentifier);
                var bpSystolic = bpSystolicResults && bpSystolicResults.answers ? bpSystolicResults.answers[0] : "";
                var bpDiastolicResults = resultsForSubmission.find(r => r.resultIdentifier == props.diastolicResultIdentifier);
                var bpDiastolic = bpDiastolicResults && bpDiastolicResults.answers ? bpDiastolicResults.answers[0] : "";

                if (!Number.isNaN(Date.parse(bpLogDate)) &&
                    !Number.isNaN(bpSystolic) &&
                    !Number.isNaN(bpDiastolic)) {
                    var useDate = startOfDay(parseISO(bpLogDate));
                    var newBpEntry: BloodPressureDataPoint = {
                        date: useDate,
                        systolic: Number(bpSystolic),
                        diastolic: Number(bpDiastolic)
                    };

                    bpDataPoints.push(newBpEntry);
                }
            });
        }

        return bpDataPoints;
    }

    async function getSurveyAnswers(): Promise<SurveyAnswer[]> {
        let dataPage = await getSurveyDataPage();
        let allData = dataPage.surveyAnswers;
        while (dataPage.nextPageID) {
            dataPage = await getSurveyDataPage(dataPage.nextPageID);
            allData = allData.concat(dataPage.surveyAnswers);
        }
        return allData;
    }

    async function getSurveyDataPage(pageID?: Guid): Promise<SurveyAnswersPage> {
        const surveyName: string = props.surveyName;
        var queryParameters: SurveyAnswersQuery = {
            surveyName
        };

        queryParameters.resultIdentifier = resultFilter;

        if (pageID) {
            queryParameters.pageID = pageID;
        }

        return MyDataHelps.querySurveyAnswers(queryParameters);
    }

    const resultFilter = [props.dateResultIdentifier, props.systolicResultIdentifier, props.diastolicResultIdentifier];
    const surveyAnswers = await getSurveyAnswers();
    var sortedAnswers = (surveyAnswers).sort((a, b) => {
        if (parseISO(a.date) > parseISO(b.date)) { return -1; }
        if (parseISO(a.date) < parseISO(b.date)) { return 1; }
        return 0;
    });

    return groupSurveyAnswersByResults(sortedAnswers);
}
