import { DailyDataQueryResult } from "../query-daily-data";
import { buildMostRecentValueResult, getStartDate, queryForDailyData } from "./daily-data";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("Fitbit", "HeartRateIntradayCount", startDate, endDate, getStartDate);
    return buildMostRecentValueResult(dailyData, dataPoint => parseInt(dataPoint.properties?.["MinuteCount"] ?? "0"));
}
