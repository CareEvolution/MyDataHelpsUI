﻿import { add, parseISO } from 'date-fns';
import getDayKey from '../get-day-key';
import queryAllDeviceData from './query-all-device-data';
import { DailyDataQueryResult } from '../query-daily-data';
import queryAllDeviceDataV2Aggregates from '../query-all-device-data-v2-aggregates';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const watchDates = await queryAllDeviceDataV2Aggregates({
        namespace: 'AppleHealth',
        type: 'Steps',
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString(),
        dataSource: { deviceModel: 'Watch' },
        intervalAmount: 1,
        intervalType: 'Days',
        aggregateFunctions: ['sum']
    }).then(aggregates => aggregates.reduce((dates, aggregate) => {
        const dayKey = getDayKey(parseISO(aggregate.date));
        if (!dates.includes(dayKey) && aggregate.statistics['sum'] > 0) {
            dates.push(dayKey);
        }
        return dates;
    }, [] as string[]));

    const hourlyStepsDataPoints = await queryAllDeviceData({
        namespace: 'AppleHealth',
        type: 'HourlySteps',
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    }).then(dataPoints => dataPoints.filter(dataPoint => dataPoint.startDate && parseInt(dataPoint.value) > 0));

    const result: DailyDataQueryResult = {};
    hourlyStepsDataPoints.forEach(dataPoint => {
        const dayKey = getDayKey(parseISO(dataPoint.startDate!));
        if (watchDates.includes(dayKey)) {
            result[dayKey] = (result[dayKey] ?? 0) + parseInt(dataPoint.value);
        }
    });
    return result;
}
