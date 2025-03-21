import { add } from 'date-fns';
import queryAllDeviceData from './query-all-device-data';
import { DailyDataQueryResult } from '../query-daily-data';
import { isSilverCloudCbtDataPoint } from './common-mindful-and-therapy';
import { buildMinutesResultFromDailyTimeRanges, computeDailyTimeRanges } from '../time-range';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceData({
        namespace: 'AppleHealth',
        type: 'MindfulSession',
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    const dailyTimeRanges = computeDailyTimeRanges(dataPoints.filter(dataPoint => !isSilverCloudCbtDataPoint(dataPoint)));
    return buildMinutesResultFromDailyTimeRanges(startDate, endDate, dailyTimeRanges);
}