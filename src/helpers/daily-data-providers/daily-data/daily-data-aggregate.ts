import queryAllDeviceDataV2Aggregates from '../../query-all-device-data-v2-aggregates';
import { add } from 'date-fns';
import getDayKey from '../../get-day-key';
import { DailyDataQueryResult } from '../../query-daily-data';
import { DeviceDataV2Namespace } from '@careevolution/mydatahelps-js';

export type AggregateFunction = 'sum' | 'avg' | 'min' | 'max' | 'count';

export async function queryAggregateDailyData(namespace: DeviceDataV2Namespace, type: string, startDate: Date, endDate: Date, aggregateFn: AggregateFunction, scaleFactor?: number): Promise<DailyDataQueryResult> {
    const aggregates = await queryAllDeviceDataV2Aggregates({
        namespace: namespace,
        type: type,
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString(),
        intervalAmount: 1,
        intervalType: 'Days',
        aggregateFunctions: [aggregateFn]
    });
    return aggregates.reduce((result, aggregate) => {
        const aggregateValue = aggregate.statistics[aggregateFn] * (scaleFactor ?? 1);
        if (aggregateValue > 0) {
            result[getDayKey(aggregate.date)] = aggregateValue;
        }
        return result;
    }, {} as DailyDataQueryResult);
}