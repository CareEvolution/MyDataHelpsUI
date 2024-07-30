import MyDataHelps, { DeviceDataV2Point, DeviceDataV2Query } from '@careevolution/mydatahelps-js';
import { Reading } from './types';
import { getMaxValueReadings } from './util';
import { add, differenceInMilliseconds, endOfDay, isEqual, max, min, parseISO, startOfDay } from 'date-fns';
import queryAllDeviceDataV2 from '../query-all-device-data-v2';

export async function fitbitHalfHourSleepDataProvider(date: Date): Promise<Reading[]> {
    const params: DeviceDataV2Query = {
        namespace: 'Fitbit',
        type: 'sleep',
        observedAfter: startOfDay(date).toISOString(),
        observedBefore: endOfDay(date).toISOString()
    };

    return queryAllDeviceDataV2(params).then(dataPoints => {
        let readings: Reading[] = [];

        const getMostRecentHalfHour = (date: Date): Date => {
            let interval = 30 * 60 * 1000;
            return new Date(Math.floor(date.getTime() / interval) * interval);
        };

        const getSleepMinutes = (timestamp: Date, dataPoint: DeviceDataV2Point): number => {
            let nextTimestamp = add(timestamp, { minutes: 30 });
            return differenceInMilliseconds(
                min([parseISO(dataPoint.observationDate), nextTimestamp]),
                max([timestamp, parseISO(dataPoint.startDate!)])
            ) / 1000 / 60;
        };

        dataPoints.filter(dataPoint => dataPoint.value !== 'wake').forEach(dataPoint => {
            let startDateTimestamp = getMostRecentHalfHour(parseISO(dataPoint.startDate!))

            let existingReading = readings.find(r => isEqual(r.timestamp, startDateTimestamp));
            if (!existingReading) {
                readings.push({
                    timestamp: startDateTimestamp,
                    value: getSleepMinutes(startDateTimestamp, dataPoint),
                });
            } else {
                existingReading.value += getSleepMinutes(startDateTimestamp, dataPoint);
            }

            let observationDateTimestamp = getMostRecentHalfHour(parseISO(dataPoint.observationDate))
            if (!isEqual(startDateTimestamp, observationDateTimestamp)) {
                existingReading = readings.find(r => isEqual(r.timestamp, observationDateTimestamp));
                if (!existingReading) {
                    readings.push({
                        timestamp: observationDateTimestamp,
                        value: getSleepMinutes(observationDateTimestamp, dataPoint),
                    });
                } else {
                    existingReading.value += getSleepMinutes(observationDateTimestamp, dataPoint);
                }
            }
        });

        readings.forEach(r => r.timestamp = add(r.timestamp, { minutes: 15 }));

        return readings;
    }, () => []);
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