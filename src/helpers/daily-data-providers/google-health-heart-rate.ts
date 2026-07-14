import { DailyDataQueryResult } from "../query-daily-data";
import { googleHealthDailyValue } from "./google-health-common";

export function maxHeartRate(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("heartRate-daily-max", startDate, endDate);
}

export function minHeartRate(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("heartRate-daily-min", startDate, endDate);
}

export function averageHeartRate(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("heartRate-daily-avg", startDate, endDate);
}
