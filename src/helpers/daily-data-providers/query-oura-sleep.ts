import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult, DailyDataV2, queryForDailyDataV2 } from "./daily-data";

export type OuraSleepType = "long_sleep" | "sleep" | "late_nap" | "deleted" | "rest";

export default async function (startDate: Date, endDate: Date, dataType: string, sleepTypesToInclude: OuraSleepType[], divideBy?: number): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyDataV2("Oura", "sleep", startDate, endDate, dataPoint => dataPoint.properties?.["day"]);

    const filteredDailyData = Object.keys(dailyData).reduce((filteredDailyData, dayKey) => {
        const filteredDataPoints = dailyData[dayKey].filter(dataPoint => {
            return sleepTypesToInclude.length === 0 || sleepTypesToInclude.includes(dataPoint.properties?.["type"] as OuraSleepType);
        });
        if (filteredDataPoints.length > 0) {
            filteredDailyData[dayKey] = filteredDataPoints;
        }
        return filteredDailyData;
    }, {} as DailyDataV2);

    return buildTotalValueResult(filteredDailyData, dataPoint => {
        const value = parseFloat(dataPoint.properties?.[dataType] ?? "0");
        return Math.round(divideBy ? (value / divideBy) : value);
    });
}