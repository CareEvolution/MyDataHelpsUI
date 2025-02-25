import { add } from 'date-fns';
import { totalSleepMinutes as fitbitTotalSleepMinutesDataProvider } from './fitbit-sleep-v2'
import { totalSleepMinutes as garminTotalSleepMinutesDataProvider } from './garmin-sleep-v2'
import { totalSleepMinutes as appleHealthSleepMinutesDataProvider } from './apple-health-sleep-v2';
import { totalSleepMinutes as healthConnectTotalSleepMinutesDataProvider } from './health-connect-sleep';
import getDayKey from '../get-day-key';
import { DataCollectionSettings } from './data-collection-settings';

export default async function (startDate: Date, endDate: Date): Promise<Record<string, number>> {
    const settings = await DataCollectionSettings.create();
    const providers: Promise<Record<string, number>>[] = [];

    if (settings.isFitbitEnabled()) {
        providers.push(fitbitTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.isGarminEnabled()) {
        providers.push(garminTotalSleepMinutesDataProvider(startDate, endDate));
    }
    if (settings.isAppleHealthEnabled("SleepAnalysisInterval")) {
        providers.push(appleHealthSleepMinutesDataProvider(startDate, endDate));
    }
    if (await settings.isHealthConnectEnabled("sleep")) {
        providers.push(healthConnectTotalSleepMinutesDataProvider(startDate, endDate));
    }

    const results = providers.length ? await Promise.all(providers) : [];

    const data: Record<string, number> = {};
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
