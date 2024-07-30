import { add, differenceInMilliseconds, max, min, parseISO } from 'date-fns';
import getDayKey from '../get-day-key';
import queryAllDeviceDataV2 from '../query-all-device-data-v2';

type FitbitSleepV2Type = 'light' | 'rem' | 'deep';

async function querySleep(startDate: Date, endDate: Date, types: FitbitSleepV2Type[]) {
    let data: { [key: string]: number } = {};

    let dataPoints = await queryAllDeviceDataV2({
        namespace: "Fitbit",
        type: 'sleep',
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });

    let filteredDataPoints = dataPoints.filter(dataPoint => {
        return dataPoint.startDate && dataPoint.observationDate && types.includes(dataPoint.value as FitbitSleepV2Type);
    });

    filteredDataPoints.forEach(dataPoint => {
        let observationDate = parseISO(dataPoint.observationDate);
        let dayKey = getDayKey(add(observationDate, { hours: 6 }));
        if (!data.hasOwnProperty(dayKey)) {
            data[dayKey] = 0;
        }
        data[dayKey] += differenceInMilliseconds(
            min([parseISO(dataPoint.observationDate), endDate]),
            max([startDate, parseISO(dataPoint.startDate!)])
        ) / 1000 / 60;
    });

    return data;
}

export function totalSleepMinutes(startDate: Date, endDate: Date) {
    return querySleep(startDate, endDate, ['rem', 'light', 'deep']);
}

export function remSleepMinutes(startDate: Date, endDate: Date) {
    return querySleep(startDate, endDate, ['rem']);
}

export function lightSleepMinutes(startDate: Date, endDate: Date) {
    return querySleep(startDate, endDate, ['light']);
}

export function deepSleepMinutes(startDate: Date, endDate: Date) {
    return querySleep(startDate, endDate, ['deep']);
}