import queryFitbitSingleDailyValue from "./query-fitbit-single-daily-value";
import { DailyDataQueryResult } from "../query-daily-data";

export default function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryFitbitSingleDailyValue("Calories", startDate, endDate);
}
