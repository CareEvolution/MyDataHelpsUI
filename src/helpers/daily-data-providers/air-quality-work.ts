import { add, parseISO } from 'date-fns';
import getDayKey from '../get-day-key';
import queryAllDeviceData from './query-all-device-data';

export default function (startDate: Date, endDate: Date) {
    return queryAllDeviceData({
        namespace: 'AirNowApi',
        type: 'WorkAirQuality',
        observedAfter: add(startDate, {days: -1}).toISOString(),
        observedBefore: add(endDate, {days: 1}).toISOString()
    }).then(function (dataPoints) {
        let data: { [key: string]: number } = {};

        dataPoints.forEach((dataPoint) => {
            if (!dataPoint.observationDate) return;

            let dayKey = getDayKey(parseISO(dataPoint.observationDate));
            let value = parseFloat(dataPoint.value);
            if (!data[dayKey] || value > data[dayKey]) {
                data[dayKey] = value;
            }
        });

        return data;
    });
}
