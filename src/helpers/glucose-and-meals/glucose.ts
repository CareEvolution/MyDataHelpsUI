import { add, parseISO } from 'date-fns';
import { Reading, ReadingRange } from './types';
import { getFirstValueReadings } from './util';
import getDayKey from '../get-day-key';
import { CombinedDataCollectionSettings, getCombinedDataCollectionSettings } from '../daily-data-providers/combined-data-collection-settings';
import { checkForReadings, checkForV2Readings, queryForReadings, queryForV2Readings } from './readings';

export async function checkForGlucoseReadings(combinedDataCollectionSettings?: CombinedDataCollectionSettings): Promise<boolean> {
    const { settings, deviceDataV2Types } = combinedDataCollectionSettings ?? await getCombinedDataCollectionSettings(true);

    const checks: Promise<boolean>[] = [];
    if (settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(type => type.namespace === 'AppleHealth' && type.type === 'BloodGlucose')) {
        checks.push(checkForReadings('AppleHealth', 'BloodGlucose'));
    }
    if (settings.googleFitEnabled && settings.queryableDeviceDataTypes.some(type => type.namespace === 'GoogleFit' && type.type === 'BloodGlucose')) {
        checks.push(checkForReadings('GoogleFit', 'BloodGlucose'));
    }
    if (settings.healthConnectEnabled && deviceDataV2Types.some(type => type.namespace === 'HealthConnect' && type.type === 'blood-glucose')) {
        checks.push(checkForV2Readings('HealthConnect', 'blood-glucose'));
    }

    return checks.length > 0 ? (await Promise.all(checks)).includes(true) : false;
}

export async function getGlucoseReadings(startDate: Date, endDate?: Date, combinedDataCollectionSettings?: CombinedDataCollectionSettings): Promise<Reading[]> {
    const { settings, deviceDataV2Types } = combinedDataCollectionSettings ?? await getCombinedDataCollectionSettings(true);

    const queries: Promise<Reading[]>[] = [];
    if (settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(type => type.namespace === 'AppleHealth' && type.type === 'BloodGlucose')) {
        queries.push(queryForReadings('AppleHealth', 'BloodGlucose', startDate, endDate ?? startDate));
    }
    if (settings.googleFitEnabled && settings.queryableDeviceDataTypes.some(type => type.namespace === 'GoogleFit' && type.type === 'BloodGlucose')) {
        queries.push(queryForReadings('GoogleFit', 'BloodGlucose', startDate, endDate ?? startDate));
    }
    if (settings.healthConnectEnabled && deviceDataV2Types.some(type => type.namespace === 'HealthConnect' && type.type === 'blood-glucose')) {
        queries.push(queryForV2Readings('HealthConnect', 'blood-glucose', startDate, endDate ?? startDate));
    }

    return queries.length > 0 ? getFirstValueReadings(queries) : [];
}

export function computeBestFitGlucoseValue(observationDate: Date, readings: Reading[]) {
    let reading1 = readings[0];
    let reading2 = readings[readings.length - 1];

    for (const reading of readings) {
        if (reading.timestamp > observationDate) {
            reading2 = reading;
            break;
        }
        reading1 = reading;
    }

    if (reading1.timestamp === reading2.timestamp) {
        return reading1.value;
    }

    const x1 = reading1.timestamp.getTime();
    const y1 = reading1.value;
    const x2 = reading2.timestamp.getTime();
    const y2 = reading2.value;
    const slope = (y2 - y1) / (x2 - x1);
    const deltaX = observationDate.getTime() - x1;

    return y1 + (slope * deltaX);
}

export function computeGlucoseReadingRanges(readings: Reading[]): ReadingRange[] {
    const readingsLookup: Record<string, number[]> = readings.reduce((lookup, reading) => {
        const dayKey = getDayKey(reading.timestamp);
        lookup[dayKey] = lookup[dayKey] ?? [];
        lookup[dayKey].push(reading.value);
        return lookup;
    }, {} as Record<string, number[]>);

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