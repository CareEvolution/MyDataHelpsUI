import { appleHealthStepsDataProvider, fitbitStepsDataProvider, garminStepsDataProvider, googleFitStepsDataProvider, healthConnectStepsDataProvider, ouraStepsDataProvider } from ".";
import { DailyDataQueryResult } from "../query-daily-data";
import { getCombinedDataCollectionSettings } from "./combined-data-collection-settings";
import { combineResultsUsingMaxValue } from "./daily-data";

export default async function (startDate: Date, endDate: Date, includeGoogleFit?: boolean): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    const { settings, deviceDataV2Types } = await getCombinedDataCollectionSettings(true);

    if (settings.fitbitEnabled) {
        providers.push(fitbitStepsDataProvider(startDate, endDate));
    }
    if (settings.garminEnabled) {
        providers.push(garminStepsDataProvider(startDate, endDate));
    }
    if (settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(ddt => ddt.namespace === "AppleHealth" && ddt.type === "HourlySteps")) {
        providers.push(appleHealthStepsDataProvider(startDate, endDate));
    }
    if (settings.healthConnectEnabled && deviceDataV2Types.some(ddt => ddt.namespace === "HealthConnect" && ddt.type === "steps-daily")) {
        providers.push(healthConnectStepsDataProvider(startDate, endDate));
    }
    if (includeGoogleFit && settings.googleFitEnabled && settings.queryableDeviceDataTypes.some(ddt => ddt.namespace === "GoogleFit" && ddt.type === "Steps")) {
        providers.push(googleFitStepsDataProvider(startDate, endDate));
    }
    if (settings.ouraEnabled && deviceDataV2Types.some(ddt => ddt.namespace === "Oura" && ddt.type === "daily-activity")) {
        providers.push(ouraStepsDataProvider(startDate, endDate));
    }

    if (providers.length === 0) return {};
    if (providers.length === 1) return providers[0];

    return combineResultsUsingMaxValue(startDate, endDate, await Promise.all(providers));
}
