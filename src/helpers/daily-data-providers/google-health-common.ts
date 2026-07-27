import { DeviceDataV2Namespace } from "@careevolution/mydatahelps-js";
import { DailyDataQueryResult } from "../query-daily-data";
import { buildMostRecentValueResult, buildTotalValueResult, DailyDataV2, DailyDataValueFunction, getSleepDate, getStartDate, queryForDailyDataV2 } from "./daily-data";

/**
 * Shared query helpers for the Google Health daily data providers. All Google Health data is
 * served through the V2 device data API under the "GoogleHealth" namespace; the V2 type
 * strings match the names the Google Health back-end writes.
 */

export const googleHealthNamespace: DeviceDataV2Namespace = "GoogleHealth";

// One value per day (daily rollup "*-daily" or daily list "*-list-*"). An optional valueFn
// can convert the raw value (e.g. millimeters -> meters) as it is read.
export async function googleHealthDailyValue(type: string, startDate: Date, endDate: Date, valueFn?: DailyDataValueFunction): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyDataV2(googleHealthNamespace, type, startDate, endDate, getStartDate);
    return buildMostRecentValueResult(dailyData, valueFn);
}

// Sleep session/stage minutes summed per day. Sleep is dated by getSleepDate (the session end
// time shifted +6h, since Google Health sets a sleep point's observationDate to the session's
// end time), so a night's sleep is attributed to the wake-up day - matching how Fitbit, Apple
// Health, Health Connect and Oura sleep are attributed.
export async function googleHealthSleepTotal(type: string, startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyDataV2(googleHealthNamespace, type, startDate, endDate, getSleepDate);
    return buildTotalValueResult(dailyData);
}

// Multiple session/stage metrics summed together per day (e.g. total active minutes across levels).
export async function googleHealthDailyTotalOfTypes(types: string[], startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const perType = await Promise.all(types.map(type => queryForDailyDataV2(googleHealthNamespace, type, startDate, endDate, getStartDate)));
    const merged: DailyDataV2 = {};
    perType.forEach(dailyData => {
        Object.keys(dailyData).forEach(dayKey => {
            merged[dayKey] = (merged[dayKey] ?? []).concat(dailyData[dayKey]);
        });
    });
    return buildTotalValueResult(merged);
}
