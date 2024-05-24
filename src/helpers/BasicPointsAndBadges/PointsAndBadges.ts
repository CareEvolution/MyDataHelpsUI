import { BasicPointsForBadgesActivity, BasicPointsForBadgesActivityState, getActivityState, storeActivityState } from "./Activities";
import { ConnectExternalAccountActivity, awardConnectExternalAccountActivityPoints } from "./ConnectExternalAccountActivity";
import { DailyDataActivity, awardDailyDataActivityPoints } from "./DailyDataActivity";
import { SurveyCompletionActivity, awardSurveyCompletionActivityPoints } from "./SurveyCompletionActivity";

export function getActivityStates(activities: BasicPointsForBadgesActivity[]) {
    let promises = activities.map(activity => getActivityState(activity.key));
    let states: { [key: string]: BasicPointsForBadgesActivityState } = {};
    Promise.all(promises).then((activityStates) => {
        activityStates.forEach((state, index) => {
            states[activities[index].key] = state;
        });
    });
    return states;
}

export async function awardPointsForActivities(activities: BasicPointsForBadgesActivity[], activityStates: { [key: string]: BasicPointsForBadgesActivityState }) {
    let awardPointsPromises = activities.map((activity) => awardPointsForActivity(activity, activityStates[activity.key]));
    let updatedActivityStates: { [key: string]: BasicPointsForBadgesActivityState } = {};
    await Promise.all(awardPointsPromises).then((newActivityStatesArray) => {
        newActivityStatesArray.forEach((state, index) => {
            updatedActivityStates[activities[index].key] = state;
        });

    });

    let savePromises: Promise<void>[] = [];
    //persist activity states that have changed
    activities.forEach((activity) => {
        if (activityStates[activity.key] != updatedActivityStates[activity.key]) {
            savePromises.push(storeActivityState(activity.key, updatedActivityStates[activity.key]));
        }
    });
    await Promise.all(savePromises);
    return updatedActivityStates;
}

async function awardPointsForActivity(activity: BasicPointsForBadgesActivity, activityState: BasicPointsForBadgesActivityState) {
    switch (activity.type) {
        case "dailyData":
            return await awardDailyDataActivityPoints(activity as DailyDataActivity, activityState);
        case "surveyCompleted":
            return await awardSurveyCompletionActivityPoints(activity as SurveyCompletionActivity, activityState);
        case "connectExternalAccount":
            return await awardConnectExternalAccountActivityPoints(activity as ConnectExternalAccountActivity, activityState);
    }
}