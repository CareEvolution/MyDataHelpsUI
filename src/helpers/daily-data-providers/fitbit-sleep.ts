import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult, getSleepDate, queryForDailyData } from "./daily-data";

async function querySleep(startDate: Date, endDate: Date, types: string[]): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("Fitbit", types, startDate, endDate, getSleepDate);
    return buildTotalValueResult(dailyData);
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