import { appleHealthRestingHeartRateDataProvider, fitbitRestingHeartRateDataProvider, garminRestingHeartRateDataProvider, healthConnectRestingHeartRateDataProvider, ouraRestingHeartRateDataProvider } from ".";
import { getCombinedDataCollectionSettings } from "./combined-data-collection-settings";
import { DailyDataQueryResult } from "../query-daily-data";
import { combineResultsUsingRoundedAverageValue } from "./daily-data";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    const { settings, deviceDataV2Types } = await getCombinedDataCollectionSettings(true);

    if (settings.fitbitEnabled) {
        providers.push(fitbitRestingHeartRateDataProvider(startDate, endDate));
    }
    if (settings.garminEnabled) {
        providers.push(garminRestingHeartRateDataProvider(startDate, endDate));
    }
    if (settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(ddt => ddt.namespace === "AppleHealth" && ddt.type === "RestingHeartRate")) {
        providers.push(appleHealthRestingHeartRateDataProvider(startDate, endDate));
    }
    if (settings.healthConnectEnabled && deviceDataV2Types.some(ddt => ddt.namespace === "HealthConnect" && ddt.type === "resting-heart-rate")) {
        providers.push(healthConnectRestingHeartRateDataProvider(startDate, endDate));
    }
    if (settings.ouraEnabled && deviceDataV2Types.some(ddt => ddt.namespace === "Oura" && ddt.type === "sleep")) {
        providers.push(ouraRestingHeartRateDataProvider(startDate, endDate));
    }

    if (providers.length === 0) return {};
    if (providers.length === 1) return providers[0];

    return combineResultsUsingRoundedAverageValue(startDate, endDate, await Promise.all(providers));
}
