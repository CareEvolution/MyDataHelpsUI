import { DailyDataQueryResult } from "../query-daily-data";
import { googleHealthDailyValue, googleHealthDailyTotalOfTypes } from "./google-health-common";

export function totalElevatedHeartRateMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyTotalOfTypes(["activeZoneMinutes-daily-fat-burn", "activeZoneMinutes-daily-cardio", "activeZoneMinutes-daily-peak"], startDate, endDate);
}

export function fatBurnMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeZoneMinutes-daily-fat-burn", startDate, endDate);
}

export function cardioMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeZoneMinutes-daily-cardio", startDate, endDate);
}

export function peakMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeZoneMinutes-daily-peak", startDate, endDate);
}
