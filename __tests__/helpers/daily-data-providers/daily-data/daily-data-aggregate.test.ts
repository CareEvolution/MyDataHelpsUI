import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleStartDate } from '../../../fixtures/daily-data-providers';
import { DeviceDataV2Aggregate, DeviceDataV2AggregateQuery } from '@careevolution/mydatahelps-js';
import { add, format } from 'date-fns';
import getDayKey from '../../../../src/helpers/get-day-key';
import * as queryAllDeviceDataV2AggregatesModule from '../../../../src/helpers/query-all-device-data-v2-aggregates';
import { queryAggregateDailyData } from '../../../../src/helpers/daily-data-providers/daily-data/daily-data-aggregate';

describe('Daily Data Aggregate Tests', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe('queryAggregateDailyData', () => {
        it('Should query for device data aggregates and return a result with the positive valued aggregates keyed by date.', async () => {
            jest.spyOn(queryAllDeviceDataV2AggregatesModule, 'default').mockImplementation((query: DeviceDataV2AggregateQuery): Promise<DeviceDataV2Aggregate[]> => {
                if (query.namespace !== 'AppleHealth') return Promise.reject();
                if (query.type !== 'Blood Glucose') return Promise.reject();
                if (query.observedAfter !== add(sampleStartDate, { days: -1 }).toISOString()) return Promise.reject();
                if (query.observedBefore !== add(sampleEndDate, { days: 1 }).toISOString()) return Promise.reject();
                if (query.intervalAmount !== 1) return Promise.reject();
                if (query.intervalType !== 'Days') return Promise.reject();
                if (query.aggregateFunctions.length !== 1 || query.aggregateFunctions[0] !== 'avg') return Promise.reject();

                return Promise.resolve([
                    {
                        date: format(sampleStartDate, 'yyyy-MM-dd\'T\'HH:mm:ss'),
                        statistics: { 'avg': 100 } as { [key: string]: number }
                    },
                    {
                        date: format(add(sampleStartDate, { days: 3 }), 'yyyy-MM-dd\'T\'HH:mm:ss'),
                        statistics: { 'avg': 0 } as { [key: string]: number }
                    },
                    {
                        date: format(sampleEndDate, 'yyyy-MM-dd\'T\'HH:mm:ss'),
                        statistics: { 'avg': 110 } as { [key: string]: number }
                    }
                ] as DeviceDataV2Aggregate[]);
            });

            const result = await queryAggregateDailyData('AppleHealth', 'Blood Glucose', sampleStartDate, sampleEndDate, 'avg');

            expect(Object.keys(result)).toHaveLength(2);
            expect(result[getDayKey(sampleStartDate)]).toBe(100);
            expect(result[getDayKey(sampleEndDate)]).toBe(110);
        });

        it('Should support a scale factor for returned values.', async () => {
            jest.spyOn(queryAllDeviceDataV2AggregatesModule, 'default').mockImplementation((query: DeviceDataV2AggregateQuery): Promise<DeviceDataV2Aggregate[]> => {
                if (query.namespace !== 'HealthConnect') return Promise.reject();
                if (query.type !== 'blood-glucose') return Promise.reject();
                if (query.observedAfter !== add(sampleStartDate, { days: -1 }).toISOString()) return Promise.reject();
                if (query.observedBefore !== add(sampleEndDate, { days: 1 }).toISOString()) return Promise.reject();
                if (query.intervalAmount !== 1) return Promise.reject();
                if (query.intervalType !== 'Days') return Promise.reject();
                if (query.aggregateFunctions.length !== 1 || query.aggregateFunctions[0] !== 'avg') return Promise.reject();

                return Promise.resolve([
                    {
                        date: format(sampleStartDate, 'yyyy-MM-dd\'T\'HH:mm:ss'),
                        statistics: { 'avg': 100 / 18 } as { [key: string]: number }
                    },
                    {
                        date: format(add(sampleStartDate, { days: 3 }), 'yyyy-MM-dd\'T\'HH:mm:ss'),
                        statistics: { 'avg': 0 } as { [key: string]: number }
                    },
                    {
                        date: format(sampleEndDate, 'yyyy-MM-dd\'T\'HH:mm:ss'),
                        statistics: { 'avg': 110 / 18 } as { [key: string]: number }
                    }
                ] as DeviceDataV2Aggregate[]);
            });

            const result = await queryAggregateDailyData('HealthConnect', 'blood-glucose', sampleStartDate, sampleEndDate, 'avg', 18);

            expect(Object.keys(result)).toHaveLength(2);
            expect(result[getDayKey(sampleStartDate)]).toBe(100);
            expect(result[getDayKey(sampleEndDate)]).toBe(110);
        });
    });
});
