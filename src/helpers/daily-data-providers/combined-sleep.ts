import { appleHealthSleepDataProvider, fitbitTotalSleepMinutesDataProvider, garminTotalSleepMinutesDataProvider, ouraSleepMinutesDataProvider } from ".";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { DailyDataQueryResult } from "../query-daily-data";
import { combineResultsUsingMaxValue } from "./daily-data";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    const settings = await MyDataHelps.getDataCollectionSettings();
    if (settings.fitbitEnabled) {
        providers.push(fitbitTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.garminEnabled) {
        providers.push(garminTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.ouraEnabled) {
        providers.push(ouraSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.queryableDeviceDataTypes.find(s => s.namespace == "AppleHealth" && s.type == "SleepAnalysisInterval")) {
        providers.push(appleHealthSleepDataProvider(startDate, endDate));
    }

    return providers.length ? combineResultsUsingMaxValue(startDate, endDate, await Promise.all(providers)) : {};
}
