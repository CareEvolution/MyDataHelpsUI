import queryOuraSleep from "./query-oura-sleep";
import { DailyDataQueryResult } from "../query-daily-data";

export default function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    // Total sleep is in seconds.  Past a divideBy value of 60 to convert to minutes.
    return queryOuraSleep(startDate, endDate, "total_sleep_duration", ["long_sleep"], 60);
}
