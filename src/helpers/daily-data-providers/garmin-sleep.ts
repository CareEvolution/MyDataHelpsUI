import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import { DailyDataQueryResult } from "../query-daily-data";
import { buildMaxValueResult, getSleepDate } from "./shared";

async function querySleep(property: string, startDate: Date, endDate: Date, divideBy?: number): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceData({
        namespace: "Garmin",
        type: "Sleep",
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return buildMaxValueResult(dataPoints, dataPoint => getSleepDate(dataPoint.observationDate), startDate, endDate, dataPoint => {
        const value = parseFloat(dataPoint.properties?.[property] ?? "0");
        return divideBy ? (value / divideBy) : value;
    });
}

export function totalSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep("DurationInSeconds", startDate, endDate, 60);
}

export function remSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep("RemSleepInSeconds", startDate, endDate, 60);
}

export function deepSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep("DeepSleepDurationInSeconds", startDate, endDate, 60);
}

export function lightSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep("LightSleepDurationInSeconds", startDate, endDate, 60);
}

export function awakeSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep("AwakeDurationInSeconds", startDate, endDate, 60);
}

export function sleepScore(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep("OverallSleepScore.Value", startDate, endDate);
}