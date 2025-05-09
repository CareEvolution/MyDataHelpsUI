import { DailyDataQueryResult } from "../query-daily-data";
import { buildMaxValueResult, getSleepDate, queryForDailyData } from "./daily-data";

async function querySleep(property: string, startDate: Date, endDate: Date, divideBy: number = 1): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("Garmin", "Sleep", startDate, endDate, getSleepDate);
    return buildMaxValueResult(dailyData, dataPoint => {
        const value = parseFloat(dataPoint.properties?.[property] ?? "0");
        return value / divideBy;
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