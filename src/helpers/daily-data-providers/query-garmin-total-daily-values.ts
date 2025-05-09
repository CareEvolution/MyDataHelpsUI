import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult, getStartDate, queryForDailyData } from "./daily-data";

export default async function (types: string[], startDate: Date, endDate: Date, divideBy?: number): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("Garmin", "Daily", startDate, endDate, getStartDate);
    return buildTotalValueResult(dailyData, dataPoint => {
        const value = types.reduce((total: number, type: string) => {
            const typeValue = parseFloat(dataPoint.properties?.[type] ?? "0");
            return total + (divideBy ? (typeValue / divideBy) : typeValue);
        }, 0);
        return Math.round(value);
    });
}
