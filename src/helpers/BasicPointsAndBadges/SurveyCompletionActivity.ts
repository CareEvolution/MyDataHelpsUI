import { SurveyAnswersQuery } from "@careevolution/mydatahelps-js";
import { BasicPointsForBadgesActivity, BasicPointsForBadgesActivityState } from "./Activities";
import queryAllSurveyAnswers from "../query-all-survey-answers";

export interface SurveyCompletionActivity extends BasicPointsForBadgesActivity {
    type: "surveyCompleted";
    surveyName: string;
    limit?: number;
}

export interface SurveyCompletionActivityState extends BasicPointsForBadgesActivityState {
    countCompleted?: number;
    lastQueryDate?: string;
}

export async function awardSurveyCompletionActivityPoints(activity: SurveyCompletionActivity, activityState: SurveyCompletionActivityState) {
    let countCompleted = activityState.countCompleted || 0;

    var parameters: SurveyAnswersQuery = {
        surveyName: activity.surveyName
    };

    if (activityState.lastQueryDate) {
        parameters.insertedAfter = activityState.lastQueryDate;
    }

    if (activity.limit !== undefined && countCompleted >= activity.limit) {
        return activityState;
    }

    // inserted after is really "inserted on or after"
    let answers = (await queryAllSurveyAnswers(parameters)).filter(answer => answer.insertedDate != activityState.lastQueryDate);

    //sort by latest inserteddate first
    answers.sort((a, b) => new Date(b.insertedDate).getTime() - new Date(a.insertedDate).getTime());

    let newUniqueResults = answers.map(answer => answer.surveyResultID).filter((value, index, self) => self.indexOf(value) === index);
    if (activity.limit != undefined && newUniqueResults.length + countCompleted > activity.limit) {
        newUniqueResults = newUniqueResults.slice(0, activity.limit - countCompleted);
    }

    if (newUniqueResults.length > 0) {
        let newState: SurveyCompletionActivityState = {
            countCompleted: countCompleted + newUniqueResults.length,
            lastQueryDate: answers[0].insertedDate,
            pointsAwarded: activityState.pointsAwarded + newUniqueResults.length * activity.points
        };
        return newState;
    }
    return activityState;
}