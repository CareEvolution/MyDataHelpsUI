import MyDataHelps, { Guid, SurveyAnswer, SurveyAnswersPage, SurveyAnswersQuery } from "@careevolution/mydatahelps-js";

export default async function (props: SurveyAnswersQuery): Promise<SurveyAnswer[]> {

    async function getSurveyAnswers(): Promise<SurveyAnswer[]> {
        let dataPage = await getSurveyAnswersPage();
        let allAnswers = dataPage.surveyAnswers;
        while (dataPage.nextPageID) {
            dataPage = await getSurveyAnswersPage(dataPage.nextPageID);
            allAnswers = allAnswers.concat(dataPage.surveyAnswers);
        }
        return allAnswers;
    }

    async function getSurveyAnswersPage(pageID?: Guid): Promise<SurveyAnswersPage> {
        if (pageID) {
            props.pageID = pageID;
        }

        return MyDataHelps.querySurveyAnswers(props);
    }

    return await getSurveyAnswers();
}