import { DailyDataQueryResult } from "../query-daily-data";
import { googleHealthDailyValue } from "./google-health-common";

export default function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("dailyRestingHeartRate-list-beatsPerMinute", startDate, endDate);
}
