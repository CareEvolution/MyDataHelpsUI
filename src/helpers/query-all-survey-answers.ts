import MyDataHelps, { Guid, SurveyAnswer, SurveyAnswersPage, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";

export default async function (props: SurveyAnswersQuery): Promise<SurveyAnswer[]> {

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

    return await getSurveyAnswers();
}