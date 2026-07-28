import { DailyDataQueryResult } from "../query-daily-data";
import { googleHealthDailyValue } from "./google-health-common";

// distance-daily is a summed distance in millimeters; convert to meters to match the other distance sources.
export default function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("distance-daily", startDate, endDate, dataPoint => parseFloat(dataPoint.value) / 1000);
}
