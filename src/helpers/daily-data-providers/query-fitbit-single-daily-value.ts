import { DailyDataQueryResult } from "../query-daily-data";
import { buildMostRecentValueResult, getStartDate, queryForDailyData } from "./daily-data";

export default async function (type: string, startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("Fitbit", type, startDate, endDate, getStartDate);
    return buildMostRecentValueResult(dailyData, dataPoint => Math.round(parseFloat(dataPoint.value)));
}
