import {
    appleHealthTherapyMinutesDataProvider,
    googleFitTherapyMinutesDataProvider
} from ".";
import { DailyDataQueryResult } from "../query-daily-data";
import { combineResults } from "./common-mindful-and-therapy";
import { getCombinedDataCollectionSettings } from "./combined-data-collection-settings";

export default async function (
    startDate: Date,
    endDate: Date
): Promise<DailyDataQueryResult> {
    const useV2 = false;
    const providers: Promise<DailyDataQueryResult>[] = [];

    const combinedSettings = await getCombinedDataCollectionSettings(useV2);
    const { settings } = combinedSettings;
    if (
        settings.appleHealthEnabled &&
        settings.queryableDeviceDataTypes.find(
            type =>
                type.namespace == "AppleHealth" && type.type == "MindfulSession"
        )
    ) {
        providers.push(
            appleHealthTherapyMinutesDataProvider(startDate, endDate)
        );
    }
    if (
        settings.googleFitEnabled &&
        settings.queryableDeviceDataTypes.find(
            type =>
                type.namespace == "GoogleFit" &&
                type.type == "SilverCloudSession"
        )
    ) {
        providers.push(googleFitTherapyMinutesDataProvider(startDate, endDate));
    }

    return providers.length
        ? combineResults(startDate, endDate, await Promise.all(providers))
        : {};
}
