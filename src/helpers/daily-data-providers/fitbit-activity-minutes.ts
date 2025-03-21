import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult } from "./shared";

async function queryActivity(startDate: Date, endDate: Date, types: string[]): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceData({
        namespace: "Fitbit",
        type: types,
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return buildTotalValueResult(dataPoints, dataPoint => dataPoint.startDate, startDate, endDate, dataPoint => parseInt(dataPoint.value));
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