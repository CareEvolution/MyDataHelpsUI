import { appleHealthRestingHeartRateDataProvider, fitbitRestingHeartRateDataProvider, garminRestingHeartRateDataProvider, ouraRestingHeartRateDataProvider } from ".";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { DailyDataQueryResult } from "../query-daily-data";
import { combineResultsUsingRoundedAverageValue } from "./daily-data";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    const settings = await MyDataHelps.getDataCollectionSettings();
    if (settings.fitbitEnabled) {
        providers.push(fitbitRestingHeartRateDataProvider(startDate, endDate));
    }
    if (settings.garminEnabled) {
        providers.push(garminRestingHeartRateDataProvider(startDate, endDate));
    }
    if (settings.ouraEnabled) {
        providers.push(ouraRestingHeartRateDataProvider(startDate, endDate));
    }
    if (settings.queryableDeviceDataTypes.find(s => s.namespace == "AppleHealth" && s.type == "RestingHeartRate")) {
        providers.push(appleHealthRestingHeartRateDataProvider(startDate, endDate));
    }

    return providers.length ? combineResultsUsingRoundedAverageValue(startDate, endDate, await Promise.all(providers)) : {};
}
