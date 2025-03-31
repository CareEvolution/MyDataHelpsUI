import { DeviceDataV2Namespace } from '@careevolution/mydatahelps-js';
import { buildMinutesResultFromDailyTimeRanges, computeDailyTimeRanges } from '../time-range';
import { DailyDataQueryResult } from '../query-daily-data';
import { queryForDailyDataPointsV2 } from "./daily-data";

export async function querySleepMinutesV2(namespace: DeviceDataV2Namespace, type: string, startDate: Date, endDate: Date, levels: string[]): Promise<DailyDataQueryResult> {
    const dataPoints = await queryForDailyDataPointsV2(namespace, type, startDate, endDate);
    // An offset of -6 hours is used here to shift the day boundary back 6 hours. When computing daily
    // sleep values, we include sleep time from the prior day after 6pm as part of the value for the
    // current day.  Put another way, today's sleep value will include all sleep time starting from
    // yesterday at 6pm through today at 6pm.
    const dailyTimeRanges = computeDailyTimeRanges(dataPoints.filter(dataPoint => levels.includes(dataPoint.value)), -6);
    return buildMinutesResultFromDailyTimeRanges(startDate, endDate, dailyTimeRanges);
}