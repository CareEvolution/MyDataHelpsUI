import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult, getStartDate, queryForDailyData } from "./daily-data";

async function queryHeartMinutes(startDate: Date, endDate: Date, zone?: string): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("Fitbit", "HeartRateZone", startDate, endDate, getStartDate);

    const filteredDailyData = Object.fromEntries(
        Object.entries(dailyData).map(([dayKey, dataPoints]) => [
            dayKey,
            dataPoints.filter(dataPoint => dataPoint.value !== "Out of Range" && (!zone || dataPoint.value === zone))
        ]).filter(([_, filteredDataPoints]) => filteredDataPoints.length > 0)
    );

    return buildTotalValueResult(filteredDailyData, dataPoint => parseInt(dataPoint.properties?.["Minutes"] ?? "0"));
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