import queryGarminTotalDailyValues from "./query-garmin-total-daily-values";
import { DailyDataQueryResult } from "../query-daily-data";

export function totalCalories(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryGarminTotalDailyValues(["ActiveKilocalories", "BmrKilocalories"], startDate, endDate);
}