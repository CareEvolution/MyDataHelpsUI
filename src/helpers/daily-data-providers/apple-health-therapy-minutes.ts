import { add } from 'date-fns';
import queryAllDeviceData from './query-all-device-data';
import { DailyDataQueryResult } from '../query-daily-data';
import { DeviceDataPointQuery } from '@careevolution/mydatahelps-js';
import { isSilverCloudCbtDataPoint } from './common-mindful-and-therapy';
import { buildMinutesResultFromDailyTimeRanges, computeDailyTimeRanges } from '../time-range';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const parameters: DeviceDataPointQuery = {
        namespace: 'AppleHealth',
        type: 'MindfulSession',
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    };

    const dataPoints = await queryAllDeviceData(parameters);
    const dailyTimeRanges = computeDailyTimeRanges(dataPoints.filter(dataPoint => isSilverCloudCbtDataPoint(dataPoint)));
    return buildMinutesResultFromDailyTimeRanges(startDate, endDate, dailyTimeRanges);
}