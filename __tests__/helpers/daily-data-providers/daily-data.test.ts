import { describe, expect, it } from '@jest/globals';
import { getV1DateString, getV2DateString, sampleEndDate, sampleStartDate, setupDailyDataPoints, setupDailyDataPointsV2 } from '../../fixtures/daily-data-providers';
import * as queryAllDeviceDataModule from '../../../src/helpers/daily-data-providers/query-all-device-data';
import * as queryAllDeviceDataV2Module from '../../../src/helpers/query-all-device-data-v2';
import { DeviceDataPoint, DeviceDataPointQuery, DeviceDataV2Point, DeviceDataV2Query } from '@careevolution/mydatahelps-js';
import * as dailyDataFunctions from '../../../src/helpers/daily-data-providers/daily-data';
import {
    buildAverageValueResult,
    buildMaxValueResult,
    buildMostRecentValueResult,
    buildTotalValueResult,
    combineResultsUsingFirstValue,
    combineResultsUsingMaxValue,
    combineResultsUsingRoundedAverageValue,
    DailyData,
    dailyDataDateFilter,
    DailyDataDateFunction,
    DailyDataV2,
    queryForDailyData,
    queryForDailyDataPoints,
    queryForDailyDataPointsV2,
    queryForDailyDataV2
} from '../../../src/helpers/daily-data-providers/daily-data';
import { add, endOfDay, isEqual, startOfDay } from 'date-fns';
import { parseISOWithoutOffset } from '../../../src/helpers/date-helpers';
import getDayKey from '../../../src/helpers/get-day-key';
import { DailyDataQueryResult } from '../../../src';

describe('Daily Data Tests', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe('Data Querying Functions', () => {
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
                jest.spyOn(dailyDataFunctions, 'dailyDataDateFilter').mockImplementation(
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
                jest.spyOn(dailyDataFunctions, 'dailyDataDateFilter').mockImplementation(
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
    });

    describe('Data Filtering Functions', () => {
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

    describe.each([{
        name: 'DailyData',
        create: (modifiedDate: Date, value: string): DeviceDataPoint => {
            return {
                modifiedDate: getV1DateString(modifiedDate),
                value: value
            } as DeviceDataPoint;
        }
    }, {
        name: 'DailyDataV2',
        create: (modifiedDate: Date, value: string): DeviceDataV2Point => {
            return {
                modifiedDate: getV2DateString(modifiedDate),
                value: value
            } as DeviceDataV2Point;
        }
    }])('Result Building Functions', (dataPointFactory) => {
        const dailyData = {
            [getDayKey(sampleStartDate)]: [
                dataPointFactory.create(add(sampleStartDate, { hours: 5 }), '50.99'),
                dataPointFactory.create(add(sampleStartDate, { hours: 7 }), '60.99'),
                dataPointFactory.create(add(sampleStartDate, { hours: 8 }), '0.00'),
                dataPointFactory.create(add(sampleStartDate, { hours: 6 }), '70.99')
            ],
            [getDayKey(add(sampleStartDate, { days: 1 }))]: [
                dataPointFactory.create(add(sampleStartDate, { hours: 8 }), '0.00')
            ],
            [getDayKey(sampleEndDate)]: [
                dataPointFactory.create(add(sampleEndDate, { hours: 5 }), '55.99'),
                dataPointFactory.create(add(sampleEndDate, { hours: 7 }), '65.99'),
                dataPointFactory.create(add(sampleEndDate, { hours: 8 }), '0.00'),
                dataPointFactory.create(add(sampleEndDate, { hours: 6 }), '75.99'),
            ]
        } as DailyData | DailyDataV2;

        describe(`${dataPointFactory.name} - buildMostRecentValueResult`, () => {
            it('Should return a result, keyed by day, that returns the float value of the most recently modified data point with a value > 0 for each day.', () => {
                const result = buildMostRecentValueResult(dailyData);

                expect(Object.keys(result)).toHaveLength(2);
                expect(result[getDayKey(sampleStartDate)]).toBe(60.99);
                expect(result[getDayKey(sampleEndDate)]).toBe(65.99);
            });

            it('Should use the custom value function when provided.', () => {
                const result = buildMostRecentValueResult(dailyData, dataPoint => parseInt(dataPoint.value));

                expect(Object.keys(result)).toHaveLength(2);
                expect(result[getDayKey(sampleStartDate)]).toBe(60);
                expect(result[getDayKey(sampleEndDate)]).toBe(65);
            });
        });

        describe(`${dataPointFactory.name} - buildMaxValueResult`, () => {
            it('Should return a result, keyed by day, that returns the max value from all data points with a value > 0 for each day.', () => {
                const result = buildMaxValueResult(dailyData);

                expect(Object.keys(result)).toHaveLength(2);
                expect(result[getDayKey(sampleStartDate)]).toBe(70.99);
                expect(result[getDayKey(sampleEndDate)]).toBe(75.99);
            });

            it('Should use the custom value function when provided.', () => {
                const result = buildMaxValueResult(dailyData, dataPoint => parseInt(dataPoint.value));

                expect(Object.keys(result)).toHaveLength(2);
                expect(result[getDayKey(sampleStartDate)]).toBe(70);
                expect(result[getDayKey(sampleEndDate)]).toBe(75);
            });
        });

        describe(`${dataPointFactory.name} - buildTotalValueResult`, () => {
            it('Should return a result, keyed by day, that returns the total value from all data points with a value > 0 for each day.', () => {
                const result = buildTotalValueResult(dailyData);

                expect(Object.keys(result)).toHaveLength(2);
                expect(result[getDayKey(sampleStartDate)]).toBe(182.97);
                expect(result[getDayKey(sampleEndDate)]).toBe(197.97);
            });

            it('Should use the custom value function when provided.', () => {
                const result = buildTotalValueResult(dailyData, dataPoint => parseInt(dataPoint.value));

                expect(Object.keys(result)).toHaveLength(2);
                expect(result[getDayKey(sampleStartDate)]).toBe(180);
                expect(result[getDayKey(sampleEndDate)]).toBe(195);
            });
        });

        describe(`${dataPointFactory.name} - buildAverageValueResult`, () => {
            it('Should return a result, keyed by day, that returns the average value from all data points with a value > 0 for each day.', () => {
                const result = buildAverageValueResult(dailyData);

                expect(Object.keys(result)).toHaveLength(2);
                expect(result[getDayKey(sampleStartDate)]).toBe(60.99);
                expect(result[getDayKey(sampleEndDate)]).toBe(65.99);
            });

            it('Should use the custom value function when provided.', () => {
                const result = buildAverageValueResult(dailyData, dataPoint => parseInt(dataPoint.value));

                expect(Object.keys(result)).toHaveLength(2);
                expect(result[getDayKey(sampleStartDate)]).toBe(60);
                expect(result[getDayKey(sampleEndDate)]).toBe(65);
            });
        });
    });

    describe('Result Combining Functions', () => {
        const resultsToCombine: DailyDataQueryResult[] = [
            {
                [getDayKey(sampleStartDate)]: 1.0,
                [getDayKey(add(sampleStartDate, { days: 1 }))]: 1.1
            },
            {
                [getDayKey(sampleStartDate)]: 2.0,
                [getDayKey(sampleEndDate)]: 2.2
            },
            {
                [getDayKey(add(sampleStartDate, { days: 1 }))]: 3.1,
                [getDayKey(sampleEndDate)]: 3.2
            }
        ];

        describe('combineResultsUsingFirstValue', () => {
            it('Should return a result, keyed by day, that returns the value from the first result that has one for each day.', () => {
                const result = combineResultsUsingFirstValue(sampleStartDate, sampleEndDate, resultsToCombine);

                expect(Object.keys(result)).toHaveLength(3);
                expect(result[getDayKey(sampleStartDate)]).toBe(1.0);
                expect(result[getDayKey(add(sampleStartDate, { days: 1 }))]).toBe(1.1);
                expect(result[getDayKey(sampleEndDate)]).toBe(2.2);
            });
        });

        describe('combineResultsUsingMaxValue', () => {
            it('Should return a result, keyed by day, that returns the max value from all results for each day.', () => {
                const result = combineResultsUsingMaxValue(sampleStartDate, sampleEndDate, resultsToCombine);

                expect(Object.keys(result)).toHaveLength(3);
                expect(result[getDayKey(sampleStartDate)]).toBe(2.0);
                expect(result[getDayKey(add(sampleStartDate, { days: 1 }))]).toBe(3.1);
                expect(result[getDayKey(sampleEndDate)]).toBe(3.2);
            });
        });

        describe('combineResultsUsingAverageValue', () => {
            it('Should return a result, keyed by day, that returns the rounded average value from all results for each day.', () => {
                const result = combineResultsUsingRoundedAverageValue(sampleStartDate, sampleEndDate, resultsToCombine);

                expect(Object.keys(result)).toHaveLength(3);
                expect(result[getDayKey(sampleStartDate)]).toBe(2);
                expect(result[getDayKey(add(sampleStartDate, { days: 1 }))]).toBe(2);
                expect(result[getDayKey(sampleEndDate)]).toBe(3);
            });
        });
    });
});
