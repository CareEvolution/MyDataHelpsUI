import { add } from "date-fns";
import {
    appleHealthStepsDataProvider,
    fitbitStepsDataProvider,
    garminStepsDataProvider,
    googleFitStepsDataProvider,
} from ".";
import getDayKey from "../get-day-key";
import { DailyDataQueryResult } from "../query-daily-data";
import { getCombinedDataCollectionSettings } from "./combined-data-collection-settings";

export default async function (startDate: Date, endDate: Date, includeGoogleFit?: boolean) {
    const combinedSettings = await getCombinedDataCollectionSettings();
    const { settings } = combinedSettings;

    const providers: Promise<DailyDataQueryResult>[] = [];

    if (settings.fitbitEnabled) {
        providers.push(fitbitStepsDataProvider(startDate, endDate));
    }
    if (settings.garminEnabled) {
        providers.push(garminStepsDataProvider(startDate, endDate));
    }
    if (settings.queryableDeviceDataTypes.find(s => s.namespace == "AppleHealth" && s.type == "HourlySteps")) {
        providers.push(appleHealthStepsDataProvider(startDate, endDate));
    }
    if (includeGoogleFit && settings.queryableDeviceDataTypes.find(s => s.namespace == "GoogleFit" && s.type == "Steps")) {
        providers.push(googleFitStepsDataProvider(startDate, endDate));
    }

    if (!providers.length) {
        return {};
    }

    const providerResults = await Promise.all(providers);
    const result: DailyDataQueryResult = {};

    let currentDate = startDate;
    while (currentDate < endDate) {
        const dayKey = getDayKey(currentDate);
        providerResults.forEach(providerResult => {
            if (providerResult[dayKey] && (!result[dayKey] || result[dayKey] < providerResult[dayKey])) {
                result[dayKey] = providerResult[dayKey];
            }
        });
        currentDate = add(currentDate, { days: 1 });
    }

    return result;
}