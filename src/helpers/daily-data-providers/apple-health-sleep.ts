import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import { computeDayRanges, computeMinutesResultFromDayRanges } from "../date-range";
import { DailyDataQueryResult } from "../query-daily-data";
import { DeviceDataPointQuery } from "@careevolution/mydatahelps-js";

type SleepType = "Asleep" | "InBed" | "AsleepCore" | "AsleepREM" | "AsleepDeep";

async function coreSleep(startDate: Date, endDate: Date, values: SleepType[]): Promise<DailyDataQueryResult> {
    const parameters: DeviceDataPointQuery = {
        namespace: "AppleHealth",
        type: "SleepAnalysisInterval",
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    };

    const dataPoints = await queryAllDeviceData(parameters);
    const dayRanges = computeDayRanges(dataPoints.filter(dataPoint => values.includes(dataPoint.value as SleepType)), -6);
    return computeMinutesResultFromDayRanges(startDate, endDate, dayRanges);
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