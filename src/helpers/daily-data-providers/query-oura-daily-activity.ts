import { DailyDataQueryResult } from "../query-daily-data";
import { buildMostRecentValueResult, getObservationDate, queryForDailyDataV2 } from "./daily-data";

export default async function (startDate: Date, endDate: Date, type: string): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyDataV2("Oura", "daily-activity", startDate, endDate, getObservationDate);
    return buildMostRecentValueResult(dailyData, dataPoint => {
        return Math.round(parseFloat(dataPoint.properties?.[type] ?? "0"));
    });
}