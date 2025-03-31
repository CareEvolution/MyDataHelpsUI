import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult, getStartDate, queryForDailyData } from "./daily-data";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("AppleHealth", "AppleStandTime", startDate, endDate, getStartDate);
    return buildTotalValueResult(dailyData);
}
