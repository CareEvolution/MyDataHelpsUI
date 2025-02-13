import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { DailyDataQueryResult } from '../query-daily-data';
import { add, differenceInMinutes, parseISO } from 'date-fns';
import getDayKey from '../get-day-key';

export function isSilverCloudCbtDataPoint(dataPoint: DeviceDataPoint): boolean {
    return dataPoint.source?.properties?.['SourceIdentifier'] === 'com.silvercloudhealth.SilverCloud'
        && dataPoint.properties?.['Metadata_sub-type'] === 'CBT';
}

export function collateDataPoints(dataPoints: DeviceDataPoint[]) {
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

export function combineResults(startDate: Date, endDate: Date, queryResults: DailyDataQueryResult[]): DailyDataQueryResult {
    const result: DailyDataQueryResult = {};

    let currentDate = startDate;
    while (currentDate < endDate) {
        const dayKey = getDayKey(currentDate);
        queryResults.filter(queryResult => queryResult.hasOwnProperty(dayKey)).forEach(queryResult => {
            result[dayKey] = result[dayKey] ?? queryResult[dayKey];
        });
        currentDate = add(currentDate, { days: 1 });
    }

    return result;
}