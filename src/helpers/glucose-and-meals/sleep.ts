import getDayKey from '../get-day-key';
import { endOfDay, startOfDay } from 'date-fns';
import { combinedSleepV2DataProvider } from '../daily-data-providers';

export function getSleepMinutes(date: Date): Promise<number | undefined> {
    return combinedSleepV2DataProvider(startOfDay(date), endOfDay(date)).then(sleepData => {
        let dayKey = getDayKey(date);
        return sleepData.hasOwnProperty(dayKey) ? sleepData[dayKey] : undefined;
    }, () => undefined);
}