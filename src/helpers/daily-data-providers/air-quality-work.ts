import { DailyDataQueryResult } from '../query-daily-data';
import queryAllDeviceData from './query-all-device-data';
import { add } from 'date-fns';
import { collateMaxValueDataPointsByDate } from './shared';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceData({
        namespace: 'AirNowApi',
        type: 'WorkAirQuality',
        observedAfter: add(startDate, {days: -1}).toISOString(),
        observedBefore: add(endDate, {days: 1}).toISOString()
    });
    return collateMaxValueDataPointsByDate(dataPoints);
}
