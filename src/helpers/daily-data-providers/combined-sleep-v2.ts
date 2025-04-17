import { totalSleepMinutes as fitbitTotalSleepMinutesDataProvider } from "./fitbit-sleep-v2";
import { totalSleepMinutes as garminTotalSleepMinutesDataProvider } from "./garmin-sleep-v2";
import { totalSleepMinutes as appleHealthTotalSleepMinutesDataProvider } from "./apple-health-sleep-v2";
import { totalSleepMinutes as healthConnectTotalSleepMinutesDataProvider } from "./health-connect-sleep";
import ouraTotalSleepMinutesDataProvider from "./oura-total-sleep";
import { getCombinedDataCollectionSettings } from "./combined-data-collection-settings";
import { DailyDataQueryResult } from "../query-daily-data";
import { combineResultsUsingMaxValue } from "./daily-data";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    const { settings, deviceDataV2Types } = await getCombinedDataCollectionSettings(true);

    if (settings.fitbitEnabled) {
        providers.push(fitbitTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.garminEnabled) {
        providers.push(garminTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(ddt => ddt.namespace === "AppleHealth" && ddt.type === "SleepAnalysisInterval")) {
        providers.push(appleHealthTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.healthConnectEnabled && deviceDataV2Types.some(ddt => ddt.namespace === "HealthConnect" && ddt.type === "sleep")) {
        providers.push(healthConnectTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.ouraEnabled && deviceDataV2Types.some(ddt => ddt.namespace === "Oura" && ddt.type === "sleep")) {
        providers.push(ouraTotalSleepMinutesDataProvider(startDate, endDate));
    }

    if (providers.length === 0) return {};
    if (providers.length === 1) return providers[0];

    return combineResultsUsingMaxValue(startDate, endDate, await Promise.all(providers));
}
