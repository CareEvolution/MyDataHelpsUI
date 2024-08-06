import { ParticipantInfo } from "@careevolution/mydatahelps-js";
import { BasicPointsForBadgesActivity, BasicPointsForBadgesActivityState } from "../../../helpers";

export function previewParticipantInfo(activities: BasicPointsForBadgesActivity[], pointsPerBadge: number, customField: string): ParticipantInfo {
    let previewActivityStates: { [key: string]: BasicPointsForBadgesActivityState } = {};
    activities.forEach((activity, index) => {
        previewActivityStates[activity.key] = { pointsAwarded: index == 0 ? 300 + (2 * pointsPerBadge) : 0 };
    });
    return {
        participantID: "1",
        participantIdentifier: "1",
        //@ts-ignore
        demographics: {},
        customFields: {
            [customField]: JSON.stringify({
                badges: [pointsPerBadge, pointsPerBadge * 2],
                activityStates: previewActivityStates
            })
        }
    }
}