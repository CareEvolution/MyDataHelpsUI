import { compareAsc, isEqual } from 'date-fns';
import { Reading } from './types';

export function timestampSortAsc(a: { timestamp: Date }, b: { timestamp: Date }) {
    return compareAsc(a.timestamp, b.timestamp);
}

export async function getFirstValueReadings(providers: Promise<Reading[]>[]) {
    let readings: Reading[] = [];

    let results = await Promise.all(providers);
    results.forEach(result => {
        result.forEach(reading => {
            if (!readings.find(r => isEqual(r.timestamp, reading.timestamp))) {
                readings.push(reading);
            }
        });
    });

    return readings.sort(timestampSortAsc);
}

export async function getMaxValueReadings(providers: Promise<Reading[]>[]) {
    let readings: Reading[] = [];

    let results = await Promise.all(providers);
    results.forEach(result => {
        result.forEach(reading => {
            let existingReading = readings.find(r => isEqual(r.timestamp, reading.timestamp));
            if (!existingReading) {
                readings.push(reading);
            } else if (existingReading.value < reading.value) {
                existingReading.value = reading.value;
            }
        });
    });

    return readings.sort(timestampSortAsc);
}

export async function getMaxValue(providers: Promise<number | undefined>[]) {
    let maxValue: number | undefined;

    let results = await Promise.all(providers);
    results.forEach(result => {
        if (result !== undefined && (maxValue === undefined || result > maxValue)) {
            maxValue = result;
        }
    });

    return maxValue;
}