import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult, getStartDate, queryForDailyDataV2 } from "./daily-data";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyDataV2("AppleHealth", "Hourly Steps", startDate, endDate, getStartDate);
    return buildTotalValueResult(dailyData);
}
