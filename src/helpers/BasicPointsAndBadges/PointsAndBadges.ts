import { BasicPointsForBadgesActivity, BasicPointsForBadgesActivityState, BasicPointsForBadgesState } from "./Activities";
import { ConnectExternalAccountActivity, awardConnectExternalAccountActivityPoints } from "./ConnectExternalAccountActivity";
import { DailyDataActivity, awardDailyDataActivityPoints } from "./DailyDataActivity";
import { SurveyCompletionActivity, awardSurveyCompletionActivityPoints } from "./SurveyCompletionActivity";

export async function awardPointsAndBadges(activities: BasicPointsForBadgesActivity[], state: BasicPointsForBadgesState, pointsPerBadge: number): Promise<BasicPointsForBadgesState> {
    let awardPointsPromises = activities.map((activity) => awardPointsForActivity(activity, state.activityStates[activity.key]));
    let updatedActivityStates: { [key: string]: BasicPointsForBadgesActivityState } = {};
    await Promise.all(awardPointsPromises).then((newActivityStatesArray) => {
        newActivityStatesArray.forEach((state, index) => {
            updatedActivityStates[activities[index].key] = state;
        });
    });


    let newPointTotal = activities.reduce((sum, activity) => sum + updatedActivityStates[activity.key].pointsAwarded, 0);
    let lastBadge = state.badges.length ? Math.max(...state.badges) : 0;
    let nextBadge = lastBadge + pointsPerBadge;
    let newBadges = [...state.badges];
    while (newPointTotal >= nextBadge) {
        newBadges = [...newBadges, nextBadge]
        nextBadge = nextBadge + pointsPerBadge;
    }

    return { badges: newBadges, activityStates: updatedActivityStates };
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