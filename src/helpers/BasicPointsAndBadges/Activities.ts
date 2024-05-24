import MyDataHelps from "@careevolution/mydatahelps-js";

export interface BasicPointsForBadgesActivity {
    key: string;
    type: "dailyData" | "surveyCompleted" | "connectExternalAccount";
    points: number;
}

export interface BasicPointsForBadgesActivityState {
    pointsAwarded: number;
}

export async function storeActivityState(activityKey: string, state: BasicPointsForBadgesActivityState) {
    MyDataHelps.persistDeviceData([{
        type: `BasicActivity_${activityKey}`,
        value: JSON.stringify(state)
    }]);
}

export async function getActivityState(activityKey: string): Promise<BasicPointsForBadgesActivityState> {
    let state = (await MyDataHelps.queryDeviceData({ type: `BasicActivity_${activityKey}`, namespace: "Project" })).deviceDataPoints;
    if (state.length > 0) {
        return JSON.parse(state[0].value);
    }
    return { pointsAwarded: 0 };
}