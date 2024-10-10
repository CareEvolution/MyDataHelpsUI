import MyDataHelps, { ParticipantInfo } from "@careevolution/mydatahelps-js";
import { BasicPointsForBadgesActivity, BasicPointsForBadgesActivityState } from "./Activities";

export interface CustomActivity extends BasicPointsForBadgesActivity {
    type: "custom";
    customField: string;
}

export async function awardCustomActivityPoints(activity: CustomActivity, activityState: BasicPointsForBadgesActivityState, participantInfo: ParticipantInfo) {
    const customField = participantInfo.customFields[activity.customField];
    const activityCompletions = customField ? JSON.parse(customField) : 0;
    const newPoints = activityCompletions * activity.points;
    const newActivityState = { pointsAwarded: newPoints };
    return newActivityState;
}
