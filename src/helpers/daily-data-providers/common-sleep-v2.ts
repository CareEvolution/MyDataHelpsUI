import { add, differenceInMilliseconds, isSameDay, max, min, parseISO, startOfDay } from 'date-fns';
import getDayKey from '../get-day-key';
import queryAllDeviceDataV2 from '../query-all-device-data-v2';
import { DeviceDataV2Namespace, DeviceDataV2Query } from '@careevolution/mydatahelps-js';

export function querySleepMinutesV2(namespace: DeviceDataV2Namespace, type: string, startDate: Date, endDate: Date, levels: string[]) {
    let query: DeviceDataV2Query = {
        namespace: namespace,
        type: type,
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    };

    return queryAllDeviceDataV2(query).then(dataPoints => {
        let data: { [key: string]: number } = {};

        let filteredDataPoints = dataPoints.filter(dataPoint => {
            return dataPoint.startDate && dataPoint.observationDate && levels.includes(dataPoint.value);
        });

        filteredDataPoints.forEach(dataPoint => {
            let startDate = parseISO(dataPoint.startDate!);
            let observationDate = parseISO(dataPoint.observationDate);

            let startAnchorDate = startOfDay(add(startDate, { hours: 6 }));
            let startDayKey = getDayKey(startAnchorDate);
            let maxObservationDate = add(startAnchorDate, { hours: 18 });
            if (!data.hasOwnProperty(startDayKey)) {
                data[startDayKey] = 0;
            }
            data[startDayKey] += differenceInMilliseconds(min([observationDate, maxObservationDate]), startDate) / 1000 / 60;

            let observationAnchorDate = startOfDay(add(observationDate, { hours: 6 }));
            if (!isSameDay(startAnchorDate, observationAnchorDate)) {
                let observationDayKey = getDayKey(observationAnchorDate);
                let minStartDate = add(observationAnchorDate, { hours: -6 })
                if (!data.hasOwnProperty(observationDayKey)) {
                    data[observationDayKey] = 0;
                }
                data[observationDayKey] += differenceInMilliseconds(observationDate, max([startDate, minStartDate])) / 1000 / 60;
            }
        });

        return data;
    }, () => ({} as { [key: string]: number }));
}