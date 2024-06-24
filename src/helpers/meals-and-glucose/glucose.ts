import MyDataHelps, { DeviceDataPointQuery } from '@careevolution/mydatahelps-js';
import { compareAsc, endOfDay, parseISO, startOfDay } from 'date-fns';
import queryAllDeviceData from '../daily-data-providers/query-all-device-data';
import { Reading } from './types';

export async function getGlucoseReadings(date: Date) {
    let deviceInfo = await MyDataHelps.getDeviceInfo();

    let queryParameters: DeviceDataPointQuery = {
        namespace: deviceInfo.platform === 'iOS' ? 'AppleHealth' : 'GoogleFit',
        type: 'BloodGlucose',
        observedAfter: startOfDay(date).toISOString(),
        observedBefore: endOfDay(date).toISOString()
    };
    let dataPoints = await queryAllDeviceData(queryParameters);

    return dataPoints.map(dataPoint => {
        let reading: Reading = {
            timestamp: parseISO(dataPoint.observationDate!),
            value: parseFloat(dataPoint.value)
        };

        let properties = dataPoint.source?.properties ?? {};
        if ('SourceIdentifier' in properties) {
            reading.source = properties['SourceIdentifier'];
        } else if ('OriginalDataSourceAppPackageName' in properties) {
            reading.source = properties['OriginalDataSourceAppPackageName'];
        }

        return reading;
    }).sort((a, b) => compareAsc(a.timestamp, b.timestamp));
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