import { DailyDataQueryResult } from "../query-daily-data";
import { buildMostRecentValueResult, buildTotalValueResult, DailyDataV2, getStartDate, queryForDailyDataV2 } from "./daily-data";
import { googleHealthNamespace } from "./google-health-namespace";

/**
 * Google Health daily data providers.
 *
 * All data is served through the V2 device data API under the "GoogleHealth" namespace.
 * The V2 type strings are the back-end realtimedb type names (see
 * Consumers/Mogul/Code/CfhrFramework/GoogleHealth). Two shapes are used here:
 *  - Daily rollups / daily lists produce one value per day -> take the most recent.
 *  - Sleep is session-based (0..n sessions per day) -> sum per day.
 */

// One value per day (daily rollup "*-daily" or daily list "*-list-*").
async function googleHealthDailyValue(type: string, startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyDataV2(googleHealthNamespace, type, startDate, endDate, getStartDate);
    return buildMostRecentValueResult(dailyData);
}

// Session metric summed per day (e.g. minutes asleep across all sleep sessions in a day).
async function googleHealthDailyTotal(type: string, startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyDataV2(googleHealthNamespace, type, startDate, endDate, getStartDate);
    return buildTotalValueResult(dailyData);
}

// Multiple session/stage metrics summed together per day (e.g. total active minutes across levels).
async function googleHealthDailyTotalOfTypes(types: string[], startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const perType = await Promise.all(types.map(type => queryForDailyDataV2(googleHealthNamespace, type, startDate, endDate, getStartDate)));
    const merged: DailyDataV2 = {};
    perType.forEach(dailyData => {
        Object.keys(dailyData).forEach(dayKey => {
            merged[dayKey] = (merged[dayKey] ?? []).concat(dailyData[dayKey]);
        });
    });
    return buildTotalValueResult(merged);
}

export function googleHealthStepsDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("steps-daily", startDate, endDate);
}

export function googleHealthRestingHeartRateDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("dailyRestingHeartRate-list-beatsPerMinute", startDate, endDate);
}

export function googleHealthActiveCaloriesBurnedDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeEnergyBurned-daily", startDate, endDate);
}

export function googleHealthCaloriesBurnedDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("totalCalories-daily", startDate, endDate);
}

export function googleHealthFloorsDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("floors-daily", startDate, endDate);
}

export function googleHealthWearMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("wearTime-daily", startDate, endDate);
}

export function googleHealthBreathingRateDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("dailyRespiratoryRate-list-breathsPerMinute", startDate, endDate);
}

export function googleHealthHrvDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("dailyHeartRateVariability-list-averageRmssd", startDate, endDate);
}

export function googleHealthSpO2DataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("dailyOxygenSaturation-list-avg", startDate, endDate);
}

export function googleHealthMaxHeartRateDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("heartRate-daily-max", startDate, endDate);
}

export function googleHealthMinHeartRateDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("heartRate-daily-min", startDate, endDate);
}

export function googleHealthAverageHeartRateDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("heartRate-daily-avg", startDate, endDate);
}

export function googleHealthLightlyActiveMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeMinutes-daily-light", startDate, endDate);
}

export function googleHealthFairlyActiveMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeMinutes-daily-moderate", startDate, endDate);
}

export function googleHealthVeryActiveMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeMinutes-daily-vigorous", startDate, endDate);
}

export function googleHealthTotalActiveMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyTotalOfTypes(["activeMinutes-daily-light", "activeMinutes-daily-moderate", "activeMinutes-daily-vigorous"], startDate, endDate);
}

export function googleHealthFatBurnMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeZoneMinutes-daily-fat-burn", startDate, endDate);
}

export function googleHealthCardioMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeZoneMinutes-daily-cardio", startDate, endDate);
}

export function googleHealthPeakMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyValue("activeZoneMinutes-daily-peak", startDate, endDate);
}

export function googleHealthElevatedHeartRateMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyTotalOfTypes(["activeZoneMinutes-daily-fat-burn", "activeZoneMinutes-daily-cardio", "activeZoneMinutes-daily-peak"], startDate, endDate);
}

export function googleHealthTotalSleepMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyTotal("sleep-list-session-asleep", startDate, endDate);
}

export function googleHealthLightSleepMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyTotal("sleep-list-stages-summary-light-minutes", startDate, endDate);
}

export function googleHealthRemSleepMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyTotal("sleep-list-stages-summary-rem-minutes", startDate, endDate);
}

export function googleHealthDeepSleepMinutesDataProvider(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return googleHealthDailyTotal("sleep-list-stages-summary-deep-minutes", startDate, endDate);
}
