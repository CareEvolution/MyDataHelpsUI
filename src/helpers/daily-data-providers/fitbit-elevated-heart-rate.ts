import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult, DailyData, getStartDate, queryForDailyData } from "./daily-data";

async function queryHeartMinutes(startDate: Date, endDate: Date, zone?: string): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("Fitbit", "HeartRateZone", startDate, endDate, getStartDate);

    const filteredDailyData = Object.keys(dailyData).reduce((filteredDailyData, dayKey) => {
        const filteredDataPoints = dailyData[dayKey].filter(dataPoint => {
            return dataPoint.value !== "Out of Range" && (!zone || dataPoint.value === zone);
        });
        if (filteredDataPoints.length > 0) {
            filteredDailyData[dayKey] = filteredDataPoints;
        }
        return filteredDailyData;
    }, {} as DailyData);

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