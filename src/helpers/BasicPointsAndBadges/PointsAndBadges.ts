import { ParticipantInfo } from "@careevolution/mydatahelps-js";
import { BasicPointsForBadgesActivity, BasicPointsForBadgesActivityState, BasicPointsForBadgesState } from "./Activities";
import { ConnectExternalAccountActivity, awardConnectExternalAccountActivityPoints } from "./ConnectExternalAccountActivity";
import { DailyDataActivity, awardDailyDataActivityPoints } from "./DailyDataActivity";
import { SurveyCompletionActivity, awardSurveyCompletionActivityPoints } from "./SurveyCompletionActivity";
import { CustomActivity, awardCustomActivityPoints } from "./CustomActivity";

export async function awardPointsAndBadges(activities: BasicPointsForBadgesActivity[], state: BasicPointsForBadgesState, pointsPerBadge: number, participantInfo: ParticipantInfo): Promise<BasicPointsForBadgesState> {
    const awardPointsPromises = activities.map((activity) => awardPointsForActivity(activity, state.activityStates[activity.key], participantInfo));
    const updatedActivityStates: { [key: string]: BasicPointsForBadgesActivityState } = {};
    await Promise.all(awardPointsPromises).then((newActivityStatesArray) => {
        newActivityStatesArray.forEach((state, index) => {
            updatedActivityStates[activities[index].key] = state;
        });
    });


    const newPointTotal = activities.reduce((sum, activity) => sum + updatedActivityStates[activity.key].pointsAwarded, 0);
    const lastBadge = state.badges.length ? Math.max(...state.badges) : 0;
    let nextBadge = lastBadge + pointsPerBadge;
    let newBadges = [...state.badges];
    while (newPointTotal >= nextBadge) {
        newBadges = [...newBadges, nextBadge]
        nextBadge = nextBadge + pointsPerBadge;
    }

    return { badges: newBadges, activityStates: updatedActivityStates };
}

async function awardPointsForActivity(activity: BasicPointsForBadgesActivity, activityState: BasicPointsForBadgesActivityState, participantInfo: ParticipantInfo) {
    switch (activity.type) {
        case "dailyData":
            return await awardDailyDataActivityPoints(activity as DailyDataActivity, activityState);
        case "surveyCompleted":
            return await awardSurveyCompletionActivityPoints(activity as SurveyCompletionActivity, activityState);
        case "connectExternalAccount":
            return await awardConnectExternalAccountActivityPoints(activity as ConnectExternalAccountActivity, activityState);
        case "custom":
            return await awardCustomActivityPoints(activity as CustomActivity, activityState, participantInfo);
    }
}