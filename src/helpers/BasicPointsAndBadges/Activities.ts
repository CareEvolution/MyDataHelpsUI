import MyDataHelps, { ParticipantInfo } from "@careevolution/mydatahelps-js";

export type BasicPointsForBadgesActivityType = "dailyData" | "surveyCompleted" | "connectExternalAccount" | "custom";

export interface BasicPointsForBadgesActivity {
    key: string;
    type: BasicPointsForBadgesActivityType,
    points: number;
}

export interface BasicPointsForBadgesState {
    badges: number[];
    activityStates: { [key: string]: BasicPointsForBadgesActivityState };
}

export interface BasicPointsForBadgesActivityState {
    pointsAwarded: number;
}

export function parsePointsAndBadgesState(customField: string, activities: BasicPointsForBadgesActivity[], participantInfo: ParticipantInfo): BasicPointsForBadgesState {
    let stateString = participantInfo.customFields[customField];
    if (stateString) {
        return JSON.parse(stateString) as BasicPointsForBadgesState;
    }

    let defaultActivityStates: { [key: string]: BasicPointsForBadgesActivityState } = {};
    activities.forEach(activity => defaultActivityStates[activity.key] = { pointsAwarded: 0 });
    return { badges: [], activityStates: defaultActivityStates };
}

export async function persistPointsAndBadgesState(customField: string, state: BasicPointsForBadgesState) {
    // Demographics are erroneously not optional in the MyDataHelps SDK
    // @ts-ignore
    await MyDataHelps.persistParticipantInfo({},
        {
            [customField]: JSON.stringify(state)
        }
    );
}