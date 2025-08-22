import { appleHealthSleepDataProvider, fitbitTotalSleepMinutesDataProvider, garminTotalSleepMinutesDataProvider, healthConnectTotalSleepMinutesDataProvider, ouraSleepMinutesDataProvider } from ".";
import { CombinedDataCollectionSettings, getCombinedDataCollectionSettings } from "./combined-data-collection-settings";
import { DailyDataQueryResult } from "../query-daily-data";
import { combineResultsUsingMaxValue } from "./daily-data";

export default async function (startDate: Date, endDate: Date, combinedDataCollectionSettings?: CombinedDataCollectionSettings): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    const { settings, deviceDataV2Types } = combinedDataCollectionSettings ?? await getCombinedDataCollectionSettings(true);

    if (settings.fitbitEnabled) {
        providers.push(fitbitTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.garminEnabled) {
        providers.push(garminTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(ddt => ddt.namespace === "AppleHealth" && ddt.type === "SleepAnalysisInterval")) {
        providers.push(appleHealthSleepDataProvider(startDate, endDate));
    }
    if (settings.healthConnectEnabled && deviceDataV2Types.some(ddt => ddt.namespace === "HealthConnect" && ddt.type === "sleep")) {
        providers.push(healthConnectTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.ouraEnabled && deviceDataV2Types.some(ddt => ddt.namespace === "Oura" && ddt.type === "sleep")) {
        providers.push(ouraSleepMinutesDataProvider(startDate, endDate));
    }

    if (providers.length === 0) return {};
    if (providers.length === 1) return providers[0];

    return combineResultsUsingMaxValue(startDate, endDate, await Promise.all(providers));
}
