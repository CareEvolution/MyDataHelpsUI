import { DailyDataQueryResult } from "../query-daily-data";
import { buildAverageValueResult, getStartDate, queryForDailyData } from "./daily-data";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("AppleHealth", "RestingHeartRate", startDate, endDate, getStartDate);
    return buildAverageValueResult(dailyData);
}