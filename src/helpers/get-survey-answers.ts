import MyDataHelps, { Guid, SurveyAnswer, SurveyAnswersPage, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import {parseISO} from "date-fns";

export default async function(props : SurveyAnswersQuery) : Promise<SurveyAnswer[]> {

    const results = await getSurveyAnswers();
    var sortedResults = (results).sort((a, b) => {
            if (parseISO(a.date) > parseISO(b.date)) { return -1; }
            if (parseISO(a.date) < parseISO(b.date)) { return 1; }
            return 0;
    });

    return sortedResults; 

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
        var queryParameters: SurveyAnswersQuery = props;
        if (pageID) {
            queryParameters.pageID = pageID;
        }

        return MyDataHelps.querySurveyAnswers(queryParameters);
    }
}