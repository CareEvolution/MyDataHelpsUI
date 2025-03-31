import { totalSleepMinutes as fitbitTotalSleepMinutesDataProvider } from './fitbit-sleep-v2'
import { totalSleepMinutes as garminTotalSleepMinutesDataProvider } from './garmin-sleep-v2'
import { totalSleepMinutes as appleHealthSleepMinutesDataProvider } from './apple-health-sleep-v2';
import MyDataHelps from '@careevolution/mydatahelps-js';
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
    if (settings.queryableDeviceDataTypes.find(s => s.namespace == "AppleHealth" && s.type == "SleepAnalysisInterval")) {
        providers.push(appleHealthSleepMinutesDataProvider(startDate, endDate));
    }

    return providers.length ? combineResultsUsingMaxValue(startDate, endDate, await Promise.all(providers)) : {};
}
