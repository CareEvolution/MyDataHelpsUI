import { describe, expect, it } from '@jest/globals';
import { getV1DateString, getV2DateString, sampleEndDate, sampleStartDate, setupDailyDataPoints, setupDailyDataPointsV2 } from '../../../fixtures/daily-data-providers';
import * as queryAllDeviceDataModule from '../../../../src/helpers/daily-data-providers/query-all-device-data';
import * as queryAllDeviceDataV2Module from '../../../../src/helpers/query-all-device-data-v2';
import { DeviceDataPoint, DeviceDataPointQuery, DeviceDataV2Point, DeviceDataV2Query } from '@careevolution/mydatahelps-js';
import * as dailyDataQueryFunctions from '../../../../src/helpers/daily-data-providers/daily-data/daily-data-query';
import { dailyDataDateFilter, DailyDataDateFunction, queryForDailyData, queryForDailyDataPoints, queryForDailyDataPointsV2, queryForDailyDataV2 } from '../../../../src/helpers/daily-data-providers/daily-data';
import { add, endOfDay, isEqual, startOfDay } from 'date-fns';
import { parseISOWithoutOffset } from '../../../../src/helpers/date-helpers';
import getDayKey from '../../../../src/helpers/get-day-key';

describe('Daily Data Query Tests', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe('queryForDailyData', () => {
        it('Should query for data points and group them by day using the provided date function.', async () => {
            const dataPoint1 = { startDate: getV1DateString(sampleStartDate) } as DeviceDataPoint;
            const dataPoint2 = { startDate: getV1DateString(sampleEndDate) } as DeviceDataPoint;
            const dateFunction: DailyDataDateFunction = dataPoint => dataPoint.startDate;

            setupDailyDataPoints('Fitbit', ['Type1', 'Type2'], sampleStartDate, sampleEndDate, dateFunction, [dataPoint1, dataPoint2]);

            const dailyData = await queryForDailyData('Fitbit', ['Type1', 'Type2'], sampleStartDate, sampleEndDate, dateFunction);

            expect(Object.keys(dailyData)).toHaveLength(2);
            expect(dailyData[getDayKey(sampleStartDate)]).toHaveLength(1);
            expect(dailyData[getDayKey(sampleStartDate)][0]).toBe(dataPoint1);
            expect(dailyData[getDayKey(sampleEndDate)]).toHaveLength(1);
            expect(dailyData[getDayKey(sampleEndDate)][0]).toBe(dataPoint2);
        });
    });

    describe('queryForDailyDataPoints', () => {
        const dataPoint1 = { startDate: getV1DateString(sampleStartDate) } as DeviceDataPoint;
        const dataPoint2 = { startDate: getV1DateString(sampleEndDate) } as DeviceDataPoint;
        const dateFunction: DailyDataDateFunction = dataPoint => dataPoint.startDate;

        beforeEach(() => {
            jest.spyOn(queryAllDeviceDataModule, 'default').mockImplementation((query: DeviceDataPointQuery): Promise<DeviceDataPoint[]> => {
                if (query.namespace !== 'Fitbit') return Promise.reject();
                if (JSON.stringify(query.type) !== JSON.stringify(['Type1', 'Type2'])) return Promise.reject();
                if (query.observedAfter !== add(sampleStartDate, { days: -1 }).toISOString()) return Promise.reject();
                if (query.observedBefore !== add(sampleEndDate, { days: 1 }).toISOString()) return Promise.reject();

                return Promise.resolve([dataPoint1, dataPoint2]);
            });
        });

        it('Should query for and return data points.', async () => {
            const dataPoints = await queryForDailyDataPoints('Fitbit', ['Type1', 'Type2'], sampleStartDate, sampleEndDate);

            expect(dataPoints).toHaveLength(2);
            expect(dataPoints[0]).toBe(dataPoint1);
            expect(dataPoints[1]).toBe(dataPoint2);
        });

        it('Should filter data points if a date function is provided.', async () => {
            jest.spyOn(dailyDataQueryFunctions, 'dailyDataDateFilter').mockImplementation(
                (
                    actualDateStrOrDate: string | Date | undefined,
                    actualStartDate: Date,
                    actualEndDate: Date
                ) => {
                    if (actualDateStrOrDate !== getV1DateString(sampleStartDate) && actualDateStrOrDate !== getV1DateString(sampleEndDate)) return false;
                    if (!isEqual(actualStartDate, sampleStartDate)) return false;
                    if (!isEqual(actualEndDate, sampleEndDate)) return false;
                    return actualDateStrOrDate === getV1DateString(sampleEndDate);
                }
            );

            const dataPoints = await queryForDailyDataPoints('Fitbit', ['Type1', 'Type2'], sampleStartDate, sampleEndDate, dateFunction);

            expect(dataPoints).toHaveLength(1);
            expect(dataPoints[0]).toBe(dataPoint2);
        });
    });

    describe('queryForDailyDataV2', () => {
        it('Should query for data points and group them by day using the provided date function.', async () => {
            const dataPoint1 = { startDate: getV2DateString(sampleStartDate) } as DeviceDataV2Point;
            const dataPoint2 = { startDate: getV2DateString(sampleEndDate) } as DeviceDataV2Point;
            const dateFunction: DailyDataDateFunction = dataPoint => dataPoint.startDate;

            setupDailyDataPointsV2('Fitbit', 'Type', sampleStartDate, sampleEndDate, dateFunction, [dataPoint1, dataPoint2]);

            const dailyData = await queryForDailyDataV2('Fitbit', 'Type', sampleStartDate, sampleEndDate, dateFunction);

            expect(Object.keys(dailyData)).toHaveLength(2);
            expect(dailyData[getDayKey(sampleStartDate)]).toHaveLength(1);
            expect(dailyData[getDayKey(sampleStartDate)][0]).toBe(dataPoint1);
            expect(dailyData[getDayKey(sampleEndDate)]).toHaveLength(1);
            expect(dailyData[getDayKey(sampleEndDate)][0]).toBe(dataPoint2);
        });
    });

    describe('queryForDailyDataPointsV2', () => {
        const dataPoint1 = { startDate: getV2DateString(sampleStartDate) } as DeviceDataV2Point;
        const dataPoint2 = { startDate: getV2DateString(sampleEndDate) } as DeviceDataV2Point;
        const dateFunction: DailyDataDateFunction = dataPoint => dataPoint.startDate;

        beforeEach(() => {
            jest.spyOn(queryAllDeviceDataV2Module, 'default').mockImplementation((query: DeviceDataV2Query): Promise<DeviceDataV2Point[]> => {
                if (query.namespace !== 'Fitbit') return Promise.reject();
                if (query.type !== 'Type') return Promise.reject();
                if (query.observedAfter !== add(sampleStartDate, { days: -1 }).toISOString()) return Promise.reject();
                if (query.observedBefore !== add(sampleEndDate, { days: 1 }).toISOString()) return Promise.reject();

                return Promise.resolve([dataPoint1, dataPoint2]);
            });
        });

        it('Should query for and return data points.', async () => {
            const dataPoints = await queryForDailyDataPointsV2('Fitbit', 'Type', sampleStartDate, sampleEndDate);

            expect(dataPoints).toHaveLength(2);
            expect(dataPoints[0]).toBe(dataPoint1);
            expect(dataPoints[1]).toBe(dataPoint2);
        });

        it('Should filter data points if a date function is provided.', async () => {
            jest.spyOn(dailyDataQueryFunctions, 'dailyDataDateFilter').mockImplementation(
                (
                    actualDateStrOrDate: string | Date | undefined,
                    actualStartDate: Date,
                    actualEndDate: Date
                ) => {
                    if (actualDateStrOrDate !== getV2DateString(sampleStartDate) && actualDateStrOrDate !== getV2DateString(sampleEndDate)) return false;
                    if (!isEqual(actualStartDate, sampleStartDate)) return false;
                    if (!isEqual(actualEndDate, sampleEndDate)) return false;
                    return actualDateStrOrDate === getV2DateString(sampleEndDate);
                }
            );

            const dataPoints = await queryForDailyDataPointsV2('Fitbit', 'Type', sampleStartDate, sampleEndDate, dateFunction);

            expect(dataPoints).toHaveLength(1);
            expect(dataPoints[0]).toBe(dataPoint2);
        });
    });

    describe('dailyDataDateFilter', () => {
        test.each([
            { title: 'Date Missing', dateStr: undefined, expected: false },
            { title: 'Before Start Of Range', dateStr: getV1DateString(endOfDay(add(sampleStartDate, { days: -1 }))), expected: false },
            { title: 'At Start Of Range', dateStr: getV1DateString(startOfDay(sampleStartDate)), expected: true },
            { title: 'At End Of Range', dateStr: getV1DateString(endOfDay(sampleEndDate)), expected: true },
            { title: 'After End Of Range', dateStr: getV1DateString(startOfDay(add(sampleEndDate, { days: 1 }))), expected: false }
        ])('$title - Should return "$expected".', ({ dateStr, expected }) => {
            expect(dailyDataDateFilter(dateStr, sampleStartDate, sampleEndDate)).toBe(expected);
            if (dateStr) {
                expect(dailyDataDateFilter(parseISOWithoutOffset(dateStr), sampleStartDate, sampleEndDate)).toBe(expected);
            }
        });
    });
});
