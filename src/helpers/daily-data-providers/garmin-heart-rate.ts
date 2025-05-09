import queryGarminSingleDailyValue from "./query-garmin-single-daily-value";
import { DailyDataQueryResult } from "../query-daily-data";

export function restingHeartRate(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryGarminSingleDailyValue("RestingHeartRateInBeatsPerMinute", startDate, endDate);
}

export function minHeartRate(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryGarminSingleDailyValue("MinHeartRateInBeatsPerMinute", startDate, endDate);
}

export function maxHeartRate(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryGarminSingleDailyValue("MaxHeartRateInBeatsPerMinute", startDate, endDate);
}

export function averageHeartRate(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryGarminSingleDailyValue("AverageHeartRateInBeatsPerMinute", startDate, endDate);
}