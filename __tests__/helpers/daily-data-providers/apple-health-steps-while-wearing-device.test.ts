import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleStartDate, setupAggregateDailyData } from '../../fixtures/daily-data-providers';
import getDayKey from '../../../src/helpers/get-day-key';
import { DeviceDataV2Aggregate, DeviceDataV2AggregateQuery } from '@careevolution/mydatahelps-js';
import { add, format } from 'date-fns';
import * as queryAllDeviceDataV2AggregatesModule from '../../../src/helpers/query-all-device-data-v2-aggregates';
import appleHealthStepsWhileWearingDevice from '../../../src/helpers/daily-data-providers/apple-health-steps-while-wearing-device';
import { DailyDataQueryResult } from '../../../src';

describe('Daily Data Provider - Apple Health Steps While Wearing Device', () => {
    it('Should query for aggregate daily data and return the sum of values keyed by date.', async () => {
        const result: DailyDataQueryResult = {
            [getDayKey(sampleStartDate)]: 500,
            [getDayKey(add(sampleStartDate, { days: 1 }))]: 600,
            [getDayKey(sampleEndDate)]: 400
        };

        const filteredResult: DailyDataQueryResult = {
            [getDayKey(sampleStartDate)]: 500,
            [getDayKey(add(sampleStartDate, { days: 1 }))]: 600
        };

        jest.spyOn(queryAllDeviceDataV2AggregatesModule, 'default').mockImplementation((query: DeviceDataV2AggregateQuery): Promise<DeviceDataV2Aggregate[]> => {
            if (query.namespace !== 'AppleHealth') return Promise.reject();
            if (query.type !== 'Steps') return Promise.reject();
            if (query.observedAfter !== add(sampleStartDate, { days: -1 }).toISOString()) return Promise.reject();
            if (query.observedBefore !== add(sampleEndDate, { days: 1 }).toISOString()) return Promise.reject();
            if (query.dataSource?.deviceModel !== 'Watch' && query.dataSource?.sourceIdentifier !== 'com.ouraring.oura') return Promise.reject();
            if (query.intervalAmount !== 1) return Promise.reject();
            if (query.intervalType !== 'Days') return Promise.reject();
            if (query.aggregateFunctions.length !== 1 || query.aggregateFunctions[0] !== 'sum') return Promise.reject();

            const aggregateDate = query.dataSource?.deviceModel === 'Watch' ? sampleStartDate : add(sampleStartDate, { days: 1 });
            return Promise.resolve([
                {
                    date: format(aggregateDate, 'yyyy-MM-dd\'T\'HH:mm:ss'),
                    statistics: { 'sum': 100 } as { [key: string]: number }
                },
                {
                    date: format(sampleEndDate, 'yyyy-MM-dd\'T\'HH:mm:ss'),
                    statistics: { 'sum': 0 } as { [key: string]: number }
                }
            ] as DeviceDataV2Aggregate[]);
        });
        setupAggregateDailyData('AppleHealth', 'Hourly Steps', sampleStartDate, sampleEndDate, 'sum', result);
        expect(await appleHealthStepsWhileWearingDevice(sampleStartDate, sampleEndDate)).toEqual(filteredResult);
    });
});
