import { DailyDataQueryResult } from "../query-daily-data";
import { buildMostRecentValueResult, getStartDate, queryForDailyData } from "./daily-data";

export default async function (type: string, startDate: Date, endDate: Date, divideBy?: number): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("Garmin", "Daily", startDate, endDate, getStartDate);
    return buildMostRecentValueResult(dailyData, dataPoint => {
        const value = parseFloat(dataPoint.properties?.[type] ?? "0");
        return Math.round(divideBy ? (value / divideBy) : value);
    });
}
