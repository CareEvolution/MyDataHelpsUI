import MyDataHelps from '@careevolution/mydatahelps-js';
import { Reading } from './types';

export async function fitbitHalfHourlySleepDataProvider(date: Date): Promise<Reading[]> {
    return [];
}

export async function garminHalfHourlySleepDataProvider(date: Date): Promise<Reading[]> {
    return [];
}

export async function appleHealthHalfHourlySleepDataProvider(date: Date): Promise<Reading[]> {
    return [];
}

export async function getSleep(date: Date): Promise<Reading[]> {
    let providers: Promise<Reading[]>[] = [];

    return MyDataHelps.getDataCollectionSettings().then((settings) => {
        if (settings.fitbitEnabled) {
            providers.push(fitbitHalfHourlySleepDataProvider(date));
        }
        if (settings.garminEnabled) {
            providers.push(garminHalfHourlySleepDataProvider(date));
        }
        if (settings.queryableDeviceDataTypes.find(s => s.namespace == "AppleHealth" && s.type == "HalfHourlySleep")) {
            providers.push(appleHealthHalfHourlySleepDataProvider(date));
        }

        if (!providers.length) {
            return [];
        }

        return Promise.all(providers).then(results => {
            let readings: Reading[] = [];
            results.forEach(result => {
                result.forEach(reading => {
                    let existingReading = readings.find(r => r.timestamp === reading.timestamp);
                    if (!existingReading) {
                        readings.push(reading);
                    }
                });
            });
            return readings;
        });
    });
}