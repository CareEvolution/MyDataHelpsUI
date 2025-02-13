import { add } from 'date-fns';
import queryAllDeviceData from './query-all-device-data';
import { DailyDataQueryResult } from '../query-daily-data';
import { DeviceDataPointQuery } from '@careevolution/mydatahelps-js';
import { computeDayRanges, computeMinutesResultFromDayRanges } from '../date-range';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const parameters: DeviceDataPointQuery = {
        namespace: 'GoogleFit',
        type: 'SilverCloudSession',
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    };

    const dataPoints = await queryAllDeviceData(parameters);
    const dayRanges = computeDayRanges(dataPoints);
    return computeMinutesResultFromDayRanges(startDate, endDate, dayRanges);
}