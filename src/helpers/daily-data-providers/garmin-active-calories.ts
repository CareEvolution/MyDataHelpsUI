import queryGarminSingleDailyValue from "./query-garmin-single-daily-value";
import { DailyDataQueryResult } from "../query-daily-data";

export function activeCalories(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryGarminSingleDailyValue("ActiveKilocalories", startDate, endDate);
}