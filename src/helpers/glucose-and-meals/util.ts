import { compareAsc, isEqual } from 'date-fns';
import { Reading } from './types';

export function timestampSortAsc(a: { timestamp: Date }, b: { timestamp: Date }) {
    return compareAsc(a.timestamp, b.timestamp);
}

export async function getFirstValueReadings(providers: Promise<Reading[]>[]) {
    const readings: Reading[] = [];

    const results = await Promise.all(providers);
    results.forEach(result => {
        result.forEach(reading => {
            if (!readings.some(r => isEqual(r.timestamp, reading.timestamp))) {
                readings.push(reading);
            }
        });
    });

    return readings.sort(timestampSortAsc);
}

export async function getMaxValueReadings(providers: Promise<Reading[]>[]) {
    const readings: Reading[] = [];

    const results = await Promise.all(providers);
    results.forEach(result => {
        result.forEach(reading => {
            const existingReading = readings.find(r => isEqual(r.timestamp, reading.timestamp));
            if (!existingReading) {
                readings.push(reading);
            } else if (existingReading.value < reading.value) {
                existingReading.value = reading.value;
            }
        });
    });

    return readings.sort(timestampSortAsc);
}