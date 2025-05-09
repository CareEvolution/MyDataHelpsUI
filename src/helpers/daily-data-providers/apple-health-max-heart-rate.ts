import { DailyDataQueryResult } from "../query-daily-data";
import { buildMaxValueResult, getStartDate, queryForDailyData } from "./daily-data";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("AppleHealth", "HourlyMaximumHeartRate", startDate, endDate, getStartDate);
    return buildMaxValueResult(dailyData);
}
