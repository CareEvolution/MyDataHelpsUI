import getDayKey from '../get-day-key';
import { endOfDay, startOfDay } from 'date-fns';
import { combinedSleepDataProvider } from '../daily-data-providers';

export function getSleepMinutes(date: Date): Promise<number | undefined> {
    return combinedSleepDataProvider(startOfDay(date), endOfDay(date)).then(sleepData => {
        return sleepData[getDayKey(date)];
    }, () => undefined);
}