import { add } from 'date-fns';
import { totalSleepMinutes as fitbitTotalSleepMinutesDataProvider } from './fitbit-sleep-v2'
import { totalSleepMinutes as garminTotalSleepMinutesDataProvider } from './garmin-sleep-v2'
import { totalSleepMinutes as appleHealthSleepMinutesDataProvider } from './apple-health-sleep-v2';
import getDayKey from '../get-day-key';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default async function (startDate: Date, endDate: Date): Promise<{ [key: string]: number }> {
    let providers: Promise<{ [key: string]: number }>[] = [];

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

    const results = providers.length ? await Promise.all(providers) : [];

    let data: { [key: string]: number; } = {};
    let currentDate = startDate;
    while (currentDate < endDate) {
        let dayKey = getDayKey(currentDate);
        let sleepMinutes: number | undefined;
        results.filter(result => result.hasOwnProperty(dayKey)).forEach(result => {
            if (sleepMinutes === undefined || result[dayKey] > sleepMinutes) {
                sleepMinutes = result[dayKey];
            }
        });
        if (sleepMinutes) {
            data[dayKey] = sleepMinutes;
        }
        currentDate = add(currentDate, { days: 1 });
    }

    return data;
}
