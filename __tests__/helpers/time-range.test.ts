import { add, startOfToday } from 'date-fns';
import { describe, it } from '@jest/globals';
import { DeviceDataPoint, DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { buildMinutesResultFromDailyTimeRanges, computeDailyTimeRanges, DailyTimeRanges } from '../../src/helpers/time-range';
import getDayKey from '../../src/helpers/get-day-key';
import { getV1DateString, getV2DateString } from '../fixtures/daily-data-providers';

describe('TimeRange - Helper Function Tests', () => {
    const someDay = add(startOfToday(), { days: -5 });
    const priorDay = add(someDay, { days: -1 });
    const nextDay = add(someDay, { days: 1 });

    interface DataPointFactory<Type extends DeviceDataPoint | DeviceDataV2Point> {
        name: string;
        create: (startDate: Date, observationDate: Date) => Type;
    }

    const deviceDataPointsFactory: DataPointFactory<DeviceDataPoint> = {
        name: 'DeviceDataPoint',
        create: (startDate: Date, observationDate: Date): DeviceDataPoint => {
            return {
                startDate: getV1DateString(startDate),
                observationDate: getV1DateString(observationDate)
            } as DeviceDataPoint;
        }
    };

    const deviceDataV2PointsFactory: DataPointFactory<DeviceDataV2Point> = {
        name: 'DeviceDataV2Point',
        create: (startDate: Date, observationDate: Date): DeviceDataV2Point => {
            return {
                startDate: getV2DateString(startDate),
                observationDate: getV2DateString(observationDate)
            } as DeviceDataV2Point;
        }
    };

    const dataPointFactories = [deviceDataPointsFactory, deviceDataV2PointsFactory];
    describe.each(dataPointFactories)('Compute Daily Time Ranges ($name)', (dataPointFactory: DataPointFactory<DeviceDataPoint | DeviceDataV2Point>) => {
        it('Should return a single time range when the start and observation dates are from the same day.', async () => {
            const startDate = add(someDay, { hours: 4 });
            const observationDate = add(someDay, { hours: 10 });

            const dataPoint = dataPointFactory.create(startDate, observationDate);

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(1);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges.length).toBe(1);
            expect(ranges[0].startTime).toEqual(startDate);
            expect(ranges[0].endTime).toEqual(observationDate);
        });

        it('Should return a time range for each day when the start date is from the prior day.', async () => {
            const startDate = add(priorDay, { hours: 22 });
            const observationDate = add(someDay, { hours: 10 });

            const dataPoint = dataPointFactory.create(startDate, observationDate);

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(2);

            const priorDayRanges = dailyTimeRanges[getDayKey(priorDay)];
            expect(priorDayRanges).toHaveLength(1);
            expect(priorDayRanges[0].startTime).toEqual(startDate);
            expect(priorDayRanges[0].endTime).toEqual(someDay);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(someDay);
            expect(ranges[0].endTime).toEqual(observationDate);
        });

        it('Should return a time range for each day when the observation date is from the next day.', async () => {
            const startDate = add(someDay, { hours: 22 });
            const observationDate = add(nextDay, { hours: 10 });

            const dataPoint = dataPointFactory.create(startDate, observationDate);

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(2);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(startDate);
            expect(ranges[0].endTime).toEqual(nextDay);

            const nextDayRanges = dailyTimeRanges[getDayKey(nextDay)];
            expect(nextDayRanges).toHaveLength(1);
            expect(nextDayRanges[0].startTime).toEqual(nextDay);
            expect(nextDayRanges[0].endTime).toEqual(observationDate);
        });

        it('Should return a time range for each day when the start date is from the prior day and the observation date is from the next day.', async () => {
            const startDate = add(priorDay, { hours: 22 });
            const observationDate = add(nextDay, { hours: 10 });

            const dataPoint = dataPointFactory.create(startDate, observationDate);

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(3);

            const priorDayRanges = dailyTimeRanges[getDayKey(priorDay)];
            expect(priorDayRanges).toHaveLength(1);
            expect(priorDayRanges[0].startTime).toEqual(startDate);
            expect(priorDayRanges[0].endTime).toEqual(someDay);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(someDay);
            expect(ranges[0].endTime).toEqual(nextDay);

            const nextDayRanges = dailyTimeRanges[getDayKey(nextDay)];
            expect(nextDayRanges).toHaveLength(1);
            expect(nextDayRanges[0].startTime).toEqual(nextDay);
            expect(nextDayRanges[0].endTime).toEqual(observationDate);
        });

        it('Should shift the day boundary when an offset is specified.', async () => {
            const startDate = add(priorDay, { hours: 22 });
            const observationDate = add(nextDay, { hours: 10 });

            const dataPoint = dataPointFactory.create(startDate, observationDate);

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint], -6);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(2);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(startDate);
            expect(ranges[0].endTime).toEqual(add(someDay, { hours: 18, minutes: nextDay.getTimezoneOffset() - someDay.getTimezoneOffset() }));

            const nextDayRanges = dailyTimeRanges[getDayKey(nextDay)];
            expect(nextDayRanges).toHaveLength(1);
            expect(nextDayRanges[0].startTime).toEqual(add(someDay, { hours: 18, minutes: nextDay.getTimezoneOffset() - someDay.getTimezoneOffset() }));
            expect(nextDayRanges[0].endTime).toEqual(observationDate);
        });

        it('Should merge ranges when the tail of the first range overlaps the start of the second range.', async () => {
            const startDate1 = add(someDay, { hours: 4 });
            const observationDate1 = add(someDay, { hours: 5 });
            const dataPoint1 = dataPointFactory.create(startDate1, observationDate1);

            const startDate2 = add(someDay, { hours: 5 });
            const observationDate2 = add(someDay, { hours: 6 });
            const dataPoint2 = dataPointFactory.create(startDate2, observationDate2);

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(1);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(startDate1);
            expect(ranges[0].endTime).toEqual(observationDate2);
        });

        it('Should merge ranges when the tail of the second range overlaps the start of the first range.', async () => {
            const startDate1 = add(someDay, { hours: 5 });
            const observationDate1 = add(someDay, { hours: 6 });
            const dataPoint1 = dataPointFactory.create(startDate1, observationDate1);

            const startDate2 = add(someDay, { hours: 4 });
            const observationDate2 = add(someDay, { hours: 5 });
            const dataPoint2 = dataPointFactory.create(startDate2, observationDate2);

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(1);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(startDate2);
            expect(ranges[0].endTime).toEqual(observationDate1);
        });

        it('Should merge ranges when the first range falls completely within the second range.', async () => {
            const startDate1 = add(someDay, { hours: 5 });
            const observationDate1 = add(someDay, { hours: 6 });
            const dataPoint1 = dataPointFactory.create(startDate1, observationDate1);

            const startDate2 = add(someDay, { hours: 4 });
            const observationDate2 = add(someDay, { hours: 7 });
            const dataPoint2 = dataPointFactory.create(startDate2, observationDate2);

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(1);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(startDate2);
            expect(ranges[0].endTime).toEqual(observationDate2);
        });

        it('Should merge ranges when the second range falls completely within the first range.', async () => {
            const startDate1 = add(someDay, { hours: 4 });
            const observationDate1 = add(someDay, { hours: 7 });
            const dataPoint1 = dataPointFactory.create(startDate1, observationDate1);

            const startDate2 = add(someDay, { hours: 5 });
            const observationDate2 = add(someDay, { hours: 6 });
            const dataPoint2 = dataPointFactory.create(startDate2, observationDate2);

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(1);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(startDate1);
            expect(ranges[0].endTime).toEqual(observationDate1);
        });

        it('Should not merge ranges when there is no overlap at all.', async () => {
            const startDate1 = add(someDay, { hours: 4 });
            const observationDate1 = add(someDay, { hours: 5 });
            const dataPoint1 = dataPointFactory.create(startDate1, observationDate1);

            const startDate2 = add(someDay, { hours: 6 });
            const observationDate2 = add(someDay, { hours: 7 });
            const dataPoint2 = dataPointFactory.create(startDate2, observationDate2);

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(1);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(2);
            expect(ranges[0].startTime).toEqual(startDate1);
            expect(ranges[0].endTime).toEqual(observationDate1);
            expect(ranges[1].startTime).toEqual(startDate2);
            expect(ranges[1].endTime).toEqual(observationDate2);
        });

        it('Should return no time ranges if the start date is greater than the observation date.', async () => {
            const startDate = add(someDay, { hours: 6 });
            const observationDate = add(someDay, { hours: 4 });

            const dataPoint = dataPointFactory.create(startDate, observationDate);

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(0);
        });

        it('Should return no time ranges if the start date is equal to the observation date.', async () => {
            const startDate = add(someDay, { hours: 5 });
            const observationDate = add(someDay, { hours: 5 });

            const dataPoint = dataPointFactory.create(startDate, observationDate);

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(0);
        });
    });

    describe('Build Minutes Result From Daily Time Ranges', () => {
        it('Should return a result, keyed by day, with computed values in minutes.', async () => {
            const today = startOfToday();

            const eightDaysAgo = add(today, { days: -8 });
            const sevenDaysAgo = add(today, { days: -7 });
            const fiveDaysAgo = add(today, { days: -5 });
            const threeDaysAgo = add(today, { days: -3 });
            const yesterday = add(today, { days: -1 });

            const dailyTimeRanges: DailyTimeRanges = {};
            dailyTimeRanges[getDayKey(eightDaysAgo)] = [
                {
                    startTime: add(eightDaysAgo, { hours: 8 }),
                    endTime: add(eightDaysAgo, { hours: 8, minutes: 30 })
                }
            ];
            dailyTimeRanges[getDayKey(fiveDaysAgo)] = [
                {
                    startTime: add(fiveDaysAgo, { hours: 8, minutes: 22, seconds: 10 }),
                    endTime: add(fiveDaysAgo, { hours: 8, minutes: 42, seconds: 50 })
                },
                {
                    startTime: add(fiveDaysAgo, { hours: 10, minutes: 10, seconds: 10 }),
                    endTime: add(fiveDaysAgo, { hours: 12, minutes: 15, seconds: 30 })
                }
            ];
            dailyTimeRanges[getDayKey(threeDaysAgo)] = [
                {
                    startTime: add(threeDaysAgo, { hours: 8, minutes: 22, seconds: 10 }),
                    endTime: add(threeDaysAgo, { hours: 8, minutes: 42, seconds: 50 })
                },
                {
                    startTime: add(threeDaysAgo, { hours: 9, minutes: 42, seconds: 10 }),
                    endTime: add(threeDaysAgo, { hours: 9, minutes: 44, seconds: 9 })
                },
                {
                    startTime: add(threeDaysAgo, { hours: 10, minutes: 10, seconds: 10 }),
                    endTime: add(threeDaysAgo, { hours: 12, minutes: 15, seconds: 30 })
                }
            ];
            dailyTimeRanges[getDayKey(yesterday)] = [
                {
                    startTime: add(today, { hours: 6 }),
                    endTime: add(today, { hours: 8, minutes: 20 })
                }
            ];
            dailyTimeRanges[getDayKey(today)] = [
                {
                    startTime: add(today, { hours: 9 }),
                    endTime: add(today, { hours: 9, minutes: 30 })
                }
            ];

            const result = buildMinutesResultFromDailyTimeRanges(sevenDaysAgo, yesterday, dailyTimeRanges);

            expect(Object.keys(result)).toHaveLength(3);

            expect(result[getDayKey(fiveDaysAgo)]).toBe(146);
            expect(result[getDayKey(threeDaysAgo)]).toBe(147);
            expect(result[getDayKey(yesterday)]).toBe(140);
        });
    });
});
