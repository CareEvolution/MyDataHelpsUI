import queryGarminSingleDailyValue from "./query-garmin-single-daily-value";
import { DailyDataQueryResult } from "../query-daily-data";

export function restingCalories(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryGarminSingleDailyValue("BmrKilocalories", startDate, endDate);
}