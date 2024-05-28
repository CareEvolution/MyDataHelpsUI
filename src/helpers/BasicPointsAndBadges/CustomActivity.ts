import MyDataHelps, { ParticipantInfo } from "@careevolution/mydatahelps-js";
import { BasicPointsForBadgesActivity, BasicPointsForBadgesActivityState } from "./Activities";

export interface CustomActivity extends BasicPointsForBadgesActivity {
    type: "custom";
    customField: string;
}

export async function awardCustomActivityPoints(activity: CustomActivity, activityState: BasicPointsForBadgesActivityState, participantInfo: ParticipantInfo) {
    let customField = participantInfo.customFields[activity.customField];
    let activityCompletions = customField ? JSON.parse(customField) : 0;
    let newPoints = activityCompletions * activity.points;
    let newActivityState = { pointsAwarded: activityState.pointsAwarded + newPoints };
    return newActivityState;
}
