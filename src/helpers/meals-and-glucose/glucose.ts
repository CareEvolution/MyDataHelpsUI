import MyDataHelps, { DeviceDataPointQuery } from '@careevolution/mydatahelps-js';
import { endOfDay, parseISO, startOfDay } from 'date-fns';
import queryAllDeviceData from '../daily-data-providers/query-all-device-data';
import { Reading } from './types';
import { readingTimestampSort } from './util';

export async function appleHealthBloodGlucoseDataProvider(date: Date): Promise<Reading[]> {
    const params: DeviceDataPointQuery = {
        namespace: 'AppleHealth',
        type: 'BloodGlucose',
        observedAfter: startOfDay(date).toISOString(),
        observedBefore: endOfDay(date).toISOString(),
    };

    return queryAllDeviceData(params).then(dataPoints => {
        return dataPoints.map(dataPoint => {
            return {
                timestamp: parseISO(dataPoint.observationDate!),
                value: parseInt(dataPoint.value)
            };
        }).sort(readingTimestampSort);
    });
}

export async function googleFitBloodGlucoseDataProvider(date: Date): Promise<Reading[]> {
    const params: DeviceDataPointQuery = {
        namespace: 'GoogleFit',
        type: 'BloodGlucose',
        observedAfter: startOfDay(date).toISOString(),
        observedBefore: endOfDay(date).toISOString(),
    };

    return queryAllDeviceData(params).then(dataPoints => {
        return dataPoints.map(dataPoint => {
            return {
                timestamp: parseISO(dataPoint.observationDate!),
                value: parseInt(dataPoint.value)
            };
        }).sort(readingTimestampSort);
    });
}

export async function getGlucoseReadings(date: Date): Promise<Reading[]> {
    let providers: Promise<Reading[]>[] = [];

    return MyDataHelps.getDataCollectionSettings().then((settings) => {
        if (settings.queryableDeviceDataTypes.find(dt => dt.namespace == "AppleHealth" && dt.type == "BloodGlucose")) {
            providers.push(appleHealthBloodGlucoseDataProvider(date));
        }
        if (settings.queryableDeviceDataTypes.find(dt => dt.namespace == "GoogleFit" && dt.type == "BloodGlucose")) {
            providers.push(googleFitBloodGlucoseDataProvider(date));
        }

        if (providers.length === 0) return [];

        return Promise.all(providers).then(results => {
            let readings: Reading[] = [];
            results.forEach(result => {
                result.forEach(reading => {
                    if (!readings.find(r => r.timestamp === reading.timestamp)) {
                        readings.push(reading);
                    }
                });
            });
            return readings;
        });
    });
}

export function computeBestFitGlucoseValue(observationDate: Date, readings: Reading[]) {
    let reading1 = readings[0];
    let reading2 = readings[readings.length - 1];

    for (let reading of readings) {
        if (reading.timestamp > observationDate) {
            reading2 = reading;
            break;
        }
        reading1 = reading;
    }

    if (reading1.timestamp === reading2.timestamp) {
        return reading1.value;
    }

    let x1 = reading1.timestamp.getTime();
    let y1 = reading1.value;
    let x2 = reading2.timestamp.getTime();
    let y2 = reading2.value;
    let d = observationDate.getTime() - x1
    let D = Math.sqrt((Math.pow(x2 - x1, 2) + (Math.pow(y2 - y1, 2))))

    return y1 + ((d / D) * (y2 - y1));
}