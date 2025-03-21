import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult } from "./shared";

async function queryHeartMinutes(startDate: Date, endDate: Date, zone?: string): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceData({
        namespace: "Fitbit",
        type: "HeartRateZone",
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    const filteredDataPoints = dataPoints.filter(dataPoint => dataPoint.value !== "Out of Range" && (!zone || dataPoint.value === zone));
    return buildTotalValueResult(filteredDataPoints, dataPoint => dataPoint.startDate, startDate, endDate, dataPoint => parseInt(dataPoint.properties?.["Minutes"] ?? "0"));
}

export function totalElevatedHeartRateMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryHeartMinutes(startDate, endDate);
}

export function peakMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryHeartMinutes(startDate, endDate, "Peak");
}

export function cardioMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryHeartMinutes(startDate, endDate, "Cardio");
}

export function fatBurnMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryHeartMinutes(startDate, endDate, "Fat Burn");
}