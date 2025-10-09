import queryOuraSleep from "./query-oura-sleep";
import { DailyDataQueryResult } from "../query-daily-data";

// https://support.ouraring.com/hc/en-us/articles/360025588793-Resting-Heart-Rate
// Oura app shows the lowest heart rate during the night as the resting heart rate.
export default function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryOuraSleep(startDate, endDate, "lowest_heart_rate", ["long_sleep"]);
}