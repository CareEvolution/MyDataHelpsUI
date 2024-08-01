import MyDataHelps from '@careevolution/mydatahelps-js';
import { getMaxValue } from './util';
import { totalSleepMinutes } from '../daily-data-providers/fitbit-sleep-v2';
import getDayKey from '../get-day-key';
import { asleepTime } from '../daily-data-providers/apple-health-sleep';
import { endOfDay, startOfDay } from 'date-fns';

export function fitbitSleepMinutesProvider(date: Date): Promise<number | undefined> {
    return totalSleepMinutes(startOfDay(date), endOfDay(date)).then(sleepData => {
        let dayKey = getDayKey(date);
        return sleepData.hasOwnProperty(dayKey) ? sleepData[dayKey] : undefined;
    }, () => undefined);
}

export function appleHealthSleepMinutesProvider(date: Date): Promise<number | undefined> {
    return asleepTime(startOfDay(date), endOfDay(date)).then(sleepData => {
        let dayKey = getDayKey(date);
        return sleepData.hasOwnProperty(dayKey) ? sleepData[dayKey] : undefined;
    }, () => undefined);
}

export async function getSleepMinutes(date: Date): Promise<number | undefined> {
    let providers: Promise<number | undefined>[] = [];

    let settings = await MyDataHelps.getDataCollectionSettings();
    if (settings.fitbitEnabled) {
        providers.push(fitbitSleepMinutesProvider(date));
    }
    if (settings.queryableDeviceDataTypes.find(s => s.namespace == 'AppleHealth' && s.type == 'SleepAnalysisInterval')) {
        providers.push(appleHealthSleepMinutesProvider(date));
    }

    return providers.length > 0 ? await getMaxValue(providers) : undefined;
}