import getDayKey from '../get-day-key';
import { endOfDay, startOfDay } from 'date-fns';
import { combinedSleepDataProvider } from '../daily-data-providers';
import { CombinedDataCollectionSettings } from '../daily-data-providers/combined-data-collection-settings';

export function getSleepMinutes(date: Date, combinedDataCollectionSettings?: CombinedDataCollectionSettings): Promise<number | undefined> {
    return combinedSleepDataProvider(startOfDay(date), endOfDay(date), combinedDataCollectionSettings).then(sleepData => {
        return sleepData[getDayKey(date)];
    }, () => undefined);
}