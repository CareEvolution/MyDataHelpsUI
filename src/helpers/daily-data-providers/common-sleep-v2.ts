import { add } from 'date-fns';
import queryAllDeviceDataV2 from '../query-all-device-data-v2';
import { DeviceDataV2Namespace, DeviceDataV2Query } from '@careevolution/mydatahelps-js';
import { buildMinutesResultFromDailyTimeRanges, computeDailyTimeRanges } from '../time-range';
import { DailyDataQueryResult } from '../query-daily-data';

export function querySleepMinutesV2(namespace: DeviceDataV2Namespace, type: string, startDate: Date, endDate: Date, levels: string[]): Promise<DailyDataQueryResult> {
    const query: DeviceDataV2Query = {
        namespace: namespace,
        type: type,
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    };
    return queryAllDeviceDataV2(query).then(dataPoints => {
        const dailyTimeRanges = computeDailyTimeRanges(dataPoints.filter(dataPoint => levels.includes(dataPoint.value)), -6);
        return buildMinutesResultFromDailyTimeRanges(startDate, endDate, dailyTimeRanges);
    }, () => ({}));
}