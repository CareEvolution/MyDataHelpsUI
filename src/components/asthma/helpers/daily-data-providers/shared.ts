import { DeviceDataNamespace, DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { DailyDataQueryResult } from '../../../../helpers/query-daily-data';
import { add, isAfter, parseISO } from 'date-fns';
import getDayKey from '../../../../helpers/get-day-key';
import queryAllDeviceData from '../../../../helpers/daily-data-providers/query-all-device-data';

export const collateLatestDataPoints = (dataPoints: DeviceDataPoint[]): DailyDataQueryResult => {
    let result: DailyDataQueryResult = {};
    let observationDates: { [key: string]: Date } = {};

    dataPoints.forEach((dataPoint) => {
        if (!dataPoint.observationDate) return;

        let observationDate = parseISO(dataPoint.observationDate);
        let dayKey = getDayKey(observationDate);
        if (!result[dayKey] || isAfter(observationDates[dayKey], observationDate)) {
            result[dayKey] = parseFloat(dataPoint.value);
            observationDates[dayKey] = observationDate;
        }
    });

    return result;
};

export const collateMaxValueDataPoints = (dataPoints: DeviceDataPoint[]): DailyDataQueryResult => {
    let result: DailyDataQueryResult = {};

    dataPoints.forEach((dataPoint) => {
        if (!dataPoint.observationDate) return;

        let observationDate = parseISO(dataPoint.observationDate);
        let dayKey = getDayKey(observationDate);
        let value = parseFloat(dataPoint.value);
        if (!result[dayKey] || value > result[dayKey]) {
            result[dayKey] = value;
        }
    });

    return result;
};

export const queryAsthmaDeviceData = (namespace: DeviceDataNamespace, type: string, startDate: Date, endDate: Date, collateFunction: (dataPoints: DeviceDataPoint[]) => DailyDataQueryResult): Promise<DailyDataQueryResult> => {
    return queryAllDeviceData({
        namespace: namespace,
        type: type,
        observedAfter: add(startDate, {days: -1}).toISOString(),
        observedBefore: add(endDate, {days: 1}).toISOString()
    }).then(collateFunction);
};

export const randomDataProvider = (start: Date, end: Date, min: number, max: number): Promise<DailyDataQueryResult> => {
    let result: DailyDataQueryResult = {};

    let currentDate = new Date(start);
    while (currentDate < end) {
        let dayKey = getDayKey(currentDate);
        result[dayKey] = Math.floor(Math.random() * (max - min) + min);
        currentDate = add(currentDate, {days: 1});
    }

    return Promise.resolve(result);
};