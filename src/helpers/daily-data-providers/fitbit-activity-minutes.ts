import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult, getIntValue, getStartDate, queryForDailyData } from "./daily-data";

async function queryActivity(startDate: Date, endDate: Date, types: string[]): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("Fitbit", types, startDate, endDate, getStartDate);
    return buildTotalValueResult(dailyData, getIntValue);
}

export function sedentaryMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryActivity(startDate, endDate, ["MinutesSedentary"]);
}

export function totalActiveMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryActivity(startDate, endDate, ["MinutesVeryActive", "MinutesFairlyActive", "MinutesLightlyActive"]);
}

export function lightlyActiveMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryActivity(startDate, endDate, ["MinutesLightlyActive"]);
}

export function fairlyActiveMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryActivity(startDate, endDate, ["MinutesFairlyActive"]);
}

export function veryActiveMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryActivity(startDate, endDate, ["MinutesVeryActive"]);
}