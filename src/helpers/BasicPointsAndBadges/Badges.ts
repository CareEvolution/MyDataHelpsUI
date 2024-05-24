import MyDataHelps from "@careevolution/mydatahelps-js";

export async function getCurrentBadges(): Promise<Number> {
    let state = (await MyDataHelps.queryDeviceData({ type: "BasicBadges", namespace: "Project" })).deviceDataPoints;
    if (state.length > 0) {
        return parseInt(state[0].value);
    }
    return 0;
}

export async function persistCurrentBadges(badges: Number) {
    await MyDataHelps.persistDeviceData([{
        type: "BasicBadges",
        value: badges.toString()
    }]);
}
