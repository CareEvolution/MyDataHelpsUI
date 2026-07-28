import { DailyDataQueryResult } from "../query-daily-data";
import { googleHealthDailyValue, googleHealthDailyTotalOfTypes } from "./google-health-common";

// sedentaryPeriod-daily is a summed duration in seconds; convert to minutes to match the Fitbit sedentary type.
export function sedentaryMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("sedentaryPeriod-daily", startDate, endDate, dataPoint => parseFloat(dataPoint.value) / 60);
}

export function totalActiveMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyTotalOfTypes(["activeMinutes-daily-light", "activeMinutes-daily-moderate", "activeMinutes-daily-vigorous"], startDate, endDate);
}

export function lightlyActiveMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeMinutes-daily-light", startDate, endDate);
}

export function fairlyActiveMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeMinutes-daily-moderate", startDate, endDate);
}

export function veryActiveMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeMinutes-daily-vigorous", startDate, endDate);
}
