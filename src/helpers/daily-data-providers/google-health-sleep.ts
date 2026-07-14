import { DailyDataQueryResult } from "../query-daily-data";
import { googleHealthSleepTotal } from "./google-health-common";

export function totalSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthSleepTotal("sleep-list-session-asleep", startDate, endDate);
}

export function lightSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthSleepTotal("sleep-list-stages-summary-light-minutes", startDate, endDate);
}

export function remSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthSleepTotal("sleep-list-stages-summary-rem-minutes", startDate, endDate);
}

export function deepSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthSleepTotal("sleep-list-stages-summary-deep-minutes", startDate, endDate);
}
