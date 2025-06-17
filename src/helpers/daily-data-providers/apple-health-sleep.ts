import { buildMinutesResultFromDailyTimeRanges, computeDailyTimeRanges } from "../time-range";
import { DailyDataQueryResult } from "../query-daily-data";
import { queryForDailyDataPoints } from "./daily-data";

type SleepType = "Asleep" | "InBed" | "AsleepCore" | "AsleepREM" | "AsleepDeep";

async function coreSleep(startDate: Date, endDate: Date, values: SleepType[]): Promise<DailyDataQueryResult> {
    const dataPoints = await queryForDailyDataPoints("AppleHealth", "SleepAnalysisInterval", startDate, endDate);
    const dailyTimeRanges = computeDailyTimeRanges(dataPoints.filter(dataPoint => values.includes(dataPoint.value as SleepType)), -6);
    return buildMinutesResultFromDailyTimeRanges(startDate, endDate, dailyTimeRanges);
}

export function inBedTime(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return coreSleep(startDate, endDate, ["InBed"]);
}

export function asleepCoreTime(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return coreSleep(startDate, endDate, ["AsleepCore"]);
}

export function asleepRemTime(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return coreSleep(startDate, endDate, ["AsleepREM"]);
}

export function asleepDeepTime(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return coreSleep(startDate, endDate, ["AsleepDeep"]);
}

export function asleepTime(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return coreSleep(startDate, endDate, ["AsleepCore", "AsleepREM", "AsleepDeep", "Asleep"]);
}