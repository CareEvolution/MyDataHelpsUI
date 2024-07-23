import MyDataHelps from '@careevolution/mydatahelps-js';
import { Reading } from './types';
import { getMaxValueReadings } from './util';

export async function fitbitHalfHourSleepDataProvider(date: Date): Promise<Reading[]> {
    return [];
}

export async function appleHealthHalfHourSleepDataProvider(date: Date): Promise<Reading[]> {
    return [];
}

export async function getSleep(date: Date): Promise<Reading[]> {
    let providers: Promise<Reading[]>[] = [];

    return MyDataHelps.getDataCollectionSettings().then((settings) => {
        if (settings.fitbitEnabled) {
            providers.push(fitbitHalfHourSleepDataProvider(date));
        }
        if (settings.queryableDeviceDataTypes.find(s => s.namespace == 'AppleHealth' && s.type == 'SleepAnalysisInterval')) {
            providers.push(appleHealthHalfHourSleepDataProvider(date));
        }
        return providers.length > 0 ? getMaxValueReadings(providers) : [];
    });
}