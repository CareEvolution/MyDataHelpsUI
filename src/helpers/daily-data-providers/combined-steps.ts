import { appleHealthStepsDataProvider, fitbitStepsDataProvider, garminStepsDataProvider, googleFitStepsDataProvider, ouraStepsDataProvider } from ".";
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
    if (settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(ddt => ddt.namespace == "AppleHealth" && ddt.type == "HourlySteps")) {
        providers.push(appleHealthStepsDataProvider(startDate, endDate));
    }
    if (includeGoogleFit && settings.googleFitEnabled && settings.queryableDeviceDataTypes.some(ddt => ddt.namespace == "GoogleFit" && ddt.type == "Steps")) {
        providers.push(googleFitStepsDataProvider(startDate, endDate));
    }
    if (settings.ouraEnabled && deviceDataV2Types.some(ddt => ddt.namespace === "Oura" && ddt.type === "daily-activity")) {
        providers.push(ouraStepsDataProvider(startDate, endDate));
    }

    return providers.length ? combineResultsUsingMaxValue(startDate, endDate, await Promise.all(providers)) : {};
}
