import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { DailyDataQueryResult } from '../query-daily-data';
import { differenceInMinutes, parseISO } from 'date-fns';
import getDayKey from '../get-day-key';

export function isSilverCloudCbtDataPoint(dataPoint: DeviceDataPoint): boolean {
    return dataPoint.source?.properties?.['SourceIdentifier'] == 'com.silvercloudhealth.SilverCloud'
        && dataPoint.source.properties['Metadata_sub-type'] == 'CBT';
}

export function collateMindfulMinutesDataPoints(dataPoints: DeviceDataPoint[]) {
    const result: DailyDataQueryResult = {};

    const filteredDataPoints = dataPoints.filter(dataPoint => dataPoint.startDate && dataPoint.observationDate);

    filteredDataPoints.forEach(dataPoint => {
        const startDate = parseISO(dataPoint.startDate!);
        const observationDate = parseISO(dataPoint.observationDate!);
        const dayKey = getDayKey(observationDate);

        result[dayKey] = (result[dayKey] ?? 0) + differenceInMinutes(observationDate, startDate);
    });

    return result;
}