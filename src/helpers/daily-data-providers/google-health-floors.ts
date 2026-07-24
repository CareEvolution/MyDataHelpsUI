import { DailyDataQueryResult } from "../query-daily-data";
import { googleHealthDailyValue } from "./google-health-common";

export default function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("floors-daily", startDate, endDate);
}
