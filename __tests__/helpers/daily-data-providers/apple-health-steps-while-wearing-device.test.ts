import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupTotalValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DailyDataV2 } from '../../../src/helpers/daily-data-providers/daily-data';
import getDayKey from '../../../src/helpers/get-day-key';
import { DeviceDataV2Aggregate, DeviceDataV2AggregateQuery, DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { add, format } from 'date-fns';
import * as queryAllDeviceDataV2AggregatesModule from '../../../src/helpers/query-all-device-data-v2-aggregates';
import appleHealthStepsWhileWearingDevice from '../../../src/helpers/daily-data-providers/apple-health-steps-while-wearing-device';

describe('Daily Data Provider - Apple Health Steps While Wearing Device', () => {
    it('Should query for daily data and build a total value result keyed by start date.', async () => {
        const dailyData: DailyDataV2 = {
            [getDayKey(sampleStartDate)]: [
                { identifier: 'Watch Date' } as DeviceDataV2Point
            ],
            [getDayKey(add(sampleStartDate, { days: 1 }))]: [
                { identifier: 'Oura Date' } as DeviceDataV2Point
            ],
            [getDayKey(sampleEndDate)]: [
                { identifier: 'Other Date' } as DeviceDataV2Point
            ]
        };

        const filteredDailyData: DailyDataV2 = {
            [getDayKey(sampleStartDate)]: [
                { identifier: 'Watch Date' } as DeviceDataV2Point
            ],
            [getDayKey(add(sampleStartDate, { days: 1 }))]: [
                { identifier: 'Oura Date' } as DeviceDataV2Point
            ]
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
        setupDailyDataV2('AppleHealth', 'Hourly Steps', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, dailyData);
        setupTotalValueResult(filteredDailyData, sampleResult);
        expect(await appleHealthStepsWhileWearingDevice(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
