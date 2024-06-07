import MyDataHelps, { DeviceDataPointQuery } from '@careevolution/mydatahelps-js';
import { compareAsc, endOfDay, parseISO, startOfDay } from 'date-fns';
import queryAllDeviceData from '../daily-data-providers/query-all-device-data';

export type GlucoseReading = {
    observationDate: Date;
    value: number;
    source?: string;
}

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
        let reading: GlucoseReading = {
            observationDate: parseISO(dataPoint.observationDate!),
            value: parseFloat(dataPoint.value)
        };

        let properties = dataPoint.source?.properties ?? {};
        if ('SourceIdentifier' in properties) {
            reading.source = properties['SourceIdentifier'];
        } else if ('OriginalDataSourceAppPackageName' in properties) {
            reading.source = properties['OriginalDataSourceAppPackageName'];
        }

        return reading;
    }).sort((a, b) => compareAsc(a.observationDate, b.observationDate));
}

export function computeBestFitGlucoseValue(observationDate: Date, glucoseReadings: GlucoseReading[]) {
    let reading1 = glucoseReadings[0];
    let reading2 = glucoseReadings[glucoseReadings.length - 1];

    for (let reading of glucoseReadings) {
        if (reading.observationDate > observationDate) {
            reading2 = reading;
            break;
        }
        reading1 = reading;
    }

    if (reading1.observationDate === reading2.observationDate) {
        return reading1.value;
    }

    let x1 = reading1.observationDate.getTime();
    let y1 = reading1.value;
    let x2 = reading2.observationDate.getTime();
    let y2 = reading2.value;
    let d = observationDate.getTime() - x1
    let D = Math.sqrt((Math.pow(x2 - x1, 2) + (Math.pow(y2 - y1, 2))))

    return y1 + ((d / D) * (y2 - y1));
}