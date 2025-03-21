import { add } from 'date-fns';
import queryAllDeviceDataV2 from '../query-all-device-data-v2';
import { DeviceDataV2Namespace } from '@careevolution/mydatahelps-js';
import { buildMinutesResultFromDailyTimeRanges, computeDailyTimeRanges } from '../time-range';
import { DailyDataQueryResult } from '../query-daily-data';

export async function querySleepMinutesV2(namespace: DeviceDataV2Namespace, type: string, startDate: Date, endDate: Date, levels: string[]): Promise<DailyDataQueryResult> {
    try {
        const dataPoints = await queryAllDeviceDataV2({
            namespace: namespace,
            type: type,
            observedAfter: add(startDate, { days: -1 }).toISOString(),
            observedBefore: add(endDate, { days: 1 }).toISOString()
        });

        // An offset of -6 hours is used here to shift the day boundary back 6 hours. When computing daily
        // sleep values, we include sleep time from the prior day after 6pm as part of the value for the
        // current day.  Put another way, today's sleep value will include all sleep time starting from
        // yesterday at 6pm through today at 6pm.
        const dailyTimeRanges = computeDailyTimeRanges(dataPoints.filter(dataPoint => levels.includes(dataPoint.value)), -6);
        return buildMinutesResultFromDailyTimeRanges(startDate, endDate, dailyTimeRanges);
    } catch {
        return {};
    }
}