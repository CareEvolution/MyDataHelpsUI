import MyDataHelps from "@careevolution/mydatahelps-js";

export async function getCurrentBadges(): Promise<number[]> {
    let state = (await MyDataHelps.queryDeviceData({ type: "BasicBadges", namespace: "Project" })).deviceDataPoints;
    if (state.length > 0) {
        return JSON.parse(state[0].value);
    }
    return [];
}

export async function persistCurrentBadges(badges: number[]) {
    await MyDataHelps.persistDeviceData([{
        type: "BasicBadges",
        value: JSON.stringify(badges)
    }]);
}
