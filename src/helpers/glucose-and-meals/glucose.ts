import { DeviceDataPointQuery, DeviceDataV2Query } from '@careevolution/mydatahelps-js';
import { add, endOfDay, parseISO, startOfDay } from 'date-fns';
import queryAllDeviceData from '../daily-data-providers/query-all-device-data';
import { Reading, ReadingRange } from './types';
import { getFirstValueReadings } from './util';
import { getDayKey } from "../index";
import queryAllDeviceDataV2 from '../query-all-device-data-v2';
import { getCombinedDataCollectionSettings  } from '../daily-data-providers/combined-data-collection-settings';

export async function appleHealthBloodGlucoseDataProvider(startDate: Date, endDate: Date): Promise<Reading[]> {
    const params: DeviceDataPointQuery = {
        namespace: 'AppleHealth',
        type: 'BloodGlucose',
        observedAfter: startOfDay(startDate).toISOString(),
        observedBefore: endOfDay(endDate).toISOString()
    };

    return queryAllDeviceData(params).then(dataPoints => {
        return dataPoints.map(dataPoint => {
            return {
                timestamp: parseISO(dataPoint.observationDate!),
                value: parseInt(dataPoint.value)
            };
        });
    });
}

export async function googleFitBloodGlucoseDataProvider(startDate: Date, endDate: Date): Promise<Reading[]> {
    const params: DeviceDataPointQuery = {
        namespace: 'GoogleFit',
        type: 'BloodGlucose',
        observedAfter: startOfDay(startDate).toISOString(),
        observedBefore: endOfDay(endDate).toISOString()
    };

    return queryAllDeviceData(params).then(dataPoints => {
        return dataPoints.map(dataPoint => {
            return {
                timestamp: parseISO(dataPoint.observationDate!),
                value: parseInt(dataPoint.value)
            };
        });
    });
}

export async function healthConnectBloodGlucoseDataProvider(startDate: Date, endDate: Date): Promise<Reading[]> {
    const query: DeviceDataV2Query = {
        namespace: "HealthConnect",
        type: "blood-glucose",
        observedAfter: startOfDay(startDate).toISOString(),
        observedBefore: endOfDay(endDate).toISOString()
    };

    const dataPoints = await queryAllDeviceDataV2(query);
    return dataPoints.map(dataPoint => {
        return {
            timestamp: parseISO(dataPoint.observationDate!),
            value: parseInt(dataPoint.value)
        };
    });
}

export async function getGlucoseReadings(startDate: Date, endDate?: Date): Promise<Reading[]> {
    let providers: Promise<Reading[]>[] = [];

    endDate = endDate ?? startDate;

    const combinedSettings = await getCombinedDataCollectionSettings();
    const { settings, deviceDataV2Types } = combinedSettings;
    if (settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(type => type.namespace === "AppleHealth" && type.type === "BloodGlucose")) {
        providers.push(appleHealthBloodGlucoseDataProvider(startDate, endDate!));
    }
    if (settings.googleFitEnabled && settings.queryableDeviceDataTypes.some(type => type.namespace === "GoogleFit" && type.type === "BloodGlucose")) {
        providers.push(googleFitBloodGlucoseDataProvider(startDate, endDate!));
    }
    if (settings.healthConnectEnabled && deviceDataV2Types.some(type => type.namespace === "HealthConnect", "blood-glucose")) {
        providers.push(healthConnectBloodGlucoseDataProvider(startDate, endDate!));
    }
    return providers.length > 0 ? getFirstValueReadings(providers) : [];
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

export function computeGlucoseReadingRanges(readings: Reading[]): ReadingRange[] {
    const readingsLookup: { [key: string]: number[] } = readings.reduce((lookup, reading) => {
        let dayKey = getDayKey(reading.timestamp);
        if (!lookup.hasOwnProperty(dayKey)) {
            lookup[dayKey] = [];
        }
        lookup[dayKey].push(reading.value);
        return lookup;
    }, {} as { [key: string]: number[] });

    return Object.keys(readingsLookup).map(dayKey => {
        const readings = readingsLookup[dayKey];
        return {
            date: parseISO(dayKey),
            min: Math.min(...readings),
            max: Math.max(...readings),
            average: readings.reduce((total, current) => total + current, 0) / readings.length
        };
    });
}

export function computeGlucoseReadingRecentAverage(readings: Reading[], endDate: Date, pastDayCount: number = 7): number | undefined {
    const startDate = add(endDate, { days: pastDayCount * -1 });

    const relevantReadings = readings.filter(reading => reading.timestamp >= startDate && reading.timestamp < endDate);
    if (relevantReadings.length === 0) return undefined;

    return relevantReadings.reduce((total, reading) => total + reading.value, 0) / relevantReadings.length;
}