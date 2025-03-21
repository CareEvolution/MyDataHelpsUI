import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult, getSleepDate } from "./shared";

async function querySleep(startDate: Date, endDate: Date, types: string[]): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceData({
        namespace: "Fitbit",
        type: types,
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return buildTotalValueResult(dataPoints, dataPoint => getSleepDate(dataPoint.observationDate), startDate, endDate);
}

export function totalSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep(startDate, endDate, ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"]);
}

export function remSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep(startDate, endDate, ["SleepLevelRem"]);
}

export function lightSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep(startDate, endDate, ["SleepLevelLight"]);
}

export function deepSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep(startDate, endDate, ["SleepLevelDeep"]);
}