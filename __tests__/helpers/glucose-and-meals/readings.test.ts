import { beforeEach, describe, expect, it } from '@jest/globals';
import { add, endOfDay, startOfDay, startOfToday } from 'date-fns';
import * as queryAllDeviceDataModule from '../../../src/helpers/daily-data-providers/query-all-device-data';
import * as queryAllDeviceDataV2Module from '../../../src/helpers/query-all-device-data-v2';
import { DeviceDataPoint, DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { getV1DateString, getV2DateString } from '../../fixtures/daily-data-providers';
import { queryForReadings, queryForV2Readings } from '../../../src/helpers/glucose-and-meals/readings';

describe('Readings Helper Function Tests', () => {
    const startDate = add(startOfToday(), { days: -7 });
    const endDate = startOfToday();

    const queryAllDeviceDataMock = jest.spyOn(queryAllDeviceDataModule, 'default');
    const queryAllDeviceDataV2Mock = jest.spyOn(queryAllDeviceDataV2Module, 'default');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('queryForReadings', () => {
        it('Should query for and return the appropriate readings.', async () => {
            queryAllDeviceDataMock.mockImplementation(async (query): Promise<DeviceDataPoint[]> => {
                if (query.namespace !== 'AppleHealth') return [];
                if (query.type !== 'BloodGlucose') return [];
                if (query.observedAfter !== startOfDay(startDate).toISOString()) return [];
                if (query.observedBefore !== endOfDay(endDate).toISOString()) return [];
                return [
                    { observationDate: getV1DateString(add(startDate, { hours: 12 })), value: '101' } as DeviceDataPoint,
                    { observationDate: getV1DateString(add(startDate, { hours: 14 })), value: '102' } as DeviceDataPoint
                ];
            });

            const readings = await queryForReadings('AppleHealth', 'BloodGlucose', startDate, endDate);

            expect(readings).toEqual([
                { timestamp: add(startDate, { hours: 12 }), value: 101 },
                { timestamp: add(startDate, { hours: 14 }), value: 102 }
            ]);
        });
    });

    describe('queryForV2Readings', () => {
        it('Should query for and return the appropriate readings.', async () => {
            queryAllDeviceDataV2Mock.mockImplementation(async (query): Promise<DeviceDataV2Point[]> => {
                if (query.namespace !== 'HealthConnect') return [];
                if (query.type !== 'blood-glucose') return [];
                if (query.observedAfter !== startOfDay(startDate).toISOString()) return [];
                if (query.observedBefore !== endOfDay(endDate).toISOString()) return [];
                return [
                    { observationDate: getV2DateString(add(startDate, { hours: 12 })), value: '101' } as DeviceDataV2Point,
                    { observationDate: getV2DateString(add(startDate, { hours: 14 })), value: '102' } as DeviceDataV2Point
                ];
            });

            const readings = await queryForV2Readings('HealthConnect', 'blood-glucose', startDate, endDate);

            expect(readings).toEqual([
                { timestamp: add(startDate, { hours: 12 }), value: 101 },
                { timestamp: add(startDate, { hours: 14 }), value: 102 }
            ]);
        });
    });
});
