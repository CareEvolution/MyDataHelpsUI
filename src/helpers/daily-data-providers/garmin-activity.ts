import queryGarminSingleDailyValue from "./query-garmin-single-daily-value";
import { DailyDataQueryResult } from "../query-daily-data";

export function activeMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryGarminSingleDailyValue("ActiveTimeInSeconds", startDate, endDate, 60);
}