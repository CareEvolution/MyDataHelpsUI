import { totalSleepMinutes as fitbitTotalSleepMinutesDataProvider } from "./fitbit-sleep-v2";
import { totalSleepMinutes as garminTotalSleepMinutesDataProvider } from "./garmin-sleep-v2";
import { totalSleepMinutes as appleHealthSleepMinutesDataProvider } from "./apple-health-sleep-v2";
import { totalSleepMinutes as healthConnectTotalSleepMinutesDataProvider } from "./health-connect-sleep";
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
        providers.push(appleHealthSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.healthConnectEnabled && deviceDataV2Types.some(ddt => ddt.namespace === "HealthConnect" && ddt.type === "sleep")) {
        providers.push(healthConnectTotalSleepMinutesDataProvider(startDate, endDate));
    }

    return providers.length ? combineResultsUsingMaxValue(startDate, endDate, await Promise.all(providers)) : {};
}
