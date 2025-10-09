import { describe, expect, it } from '@jest/globals';
import { getV1DateString, getV2DateString, sampleEndDate, sampleStartDate } from '../../../fixtures/daily-data-providers';
import { DeviceDataPoint, DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { buildAverageValueResult, buildMaxValueResult, buildMostRecentValueResult, buildTotalValueResult, combineResultsUsingFirstValue, combineResultsUsingMaxValue, combineResultsUsingRoundedAverageValue, DailyData, DailyDataV2 } from '../../../../src/helpers/daily-data-providers/daily-data';
import { add } from 'date-fns';
import getDayKey from '../../../../src/helpers/get-day-key';
import { DailyDataQueryResult } from '../../../../src';

describe('Daily Data Result Tests', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
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
