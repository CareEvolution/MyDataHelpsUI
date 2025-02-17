import { add, startOfToday } from 'date-fns';
import { describe, it } from '@jest/globals';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { buildMinutesResultFromDailyTimeRanges, computeDailyTimeRanges, DailyTimeRanges } from '../../src/helpers/time-range';
import getDayKey from '../../src/helpers/get-day-key';

describe('TimeRange - Helper Function Tests', () => {
    const someDay = add(startOfToday(), { days: -5 });
    const priorDay = add(someDay, { days: -1 });
    const nextDay = add(someDay, { days: 1 });

    describe('Compute Daily Time Ranges', () => {
        it('Should return a single time range when the start and observation dates are from the same day.', async () => {
            const startDate = add(someDay, { hours: 2 });
            const observationDate = add(someDay, { hours: 10 });

            const dataPoint: DeviceDataPoint = {
                startDate: startDate.toISOString(),
                observationDate: observationDate.toISOString()
            } as DeviceDataPoint;

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

            const dataPoint: DeviceDataPoint = {
                startDate: startDate.toISOString(),
                observationDate: observationDate.toISOString()
            } as DeviceDataPoint;

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

            const dataPoint: DeviceDataPoint = {
                startDate: startDate.toISOString(),
                observationDate: observationDate.toISOString()
            } as DeviceDataPoint;

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

            const dataPoint: DeviceDataPoint = {
                startDate: startDate.toISOString(),
                observationDate: observationDate.toISOString()
            } as DeviceDataPoint;

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

            const dataPoint: DeviceDataPoint = {
                startDate: startDate.toISOString(),
                observationDate: observationDate.toISOString()
            } as DeviceDataPoint;

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint], -6);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(2);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(startDate);
            expect(ranges[0].endTime).toEqual(add(someDay, { hours: 18 }));

            const nextDayRanges = dailyTimeRanges[getDayKey(nextDay)];
            expect(nextDayRanges).toHaveLength(1);
            expect(nextDayRanges[0].startTime).toEqual(add(someDay, { hours: 18 }));
            expect(nextDayRanges[0].endTime).toEqual(observationDate);
        });

        it('Should merge ranges when the tail of the first range overlaps the start of the second range.', async () => {
            const startDate1 = add(someDay, { hours: 1 });
            const observationDate1 = add(someDay, { hours: 2 });
            const dataPoint1: DeviceDataPoint = {
                startDate: startDate1.toISOString(),
                observationDate: observationDate1.toISOString()
            } as DeviceDataPoint;

            const startDate2 = add(someDay, { hours: 2 });
            const observationDate2 = add(someDay, { hours: 3 });
            const dataPoint2: DeviceDataPoint = {
                startDate: startDate2.toISOString(),
                observationDate: observationDate2.toISOString()
            } as DeviceDataPoint;

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(1);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(startDate1);
            expect(ranges[0].endTime).toEqual(observationDate2);
        });

        it('Should merge ranges when the tail of the second range overlaps the start of the first range.', async () => {
            const startDate1 = add(someDay, { hours: 2 });
            const observationDate1 = add(someDay, { hours: 3 });
            const dataPoint1: DeviceDataPoint = {
                startDate: startDate1.toISOString(),
                observationDate: observationDate1.toISOString()
            } as DeviceDataPoint;

            const startDate2 = add(someDay, { hours: 1 });
            const observationDate2 = add(someDay, { hours: 2 });
            const dataPoint2: DeviceDataPoint = {
                startDate: startDate2.toISOString(),
                observationDate: observationDate2.toISOString()
            } as DeviceDataPoint;

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(1);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(startDate2);
            expect(ranges[0].endTime).toEqual(observationDate1);
        });

        it('Should merge ranges when the first range falls completely within the second range.', async () => {
            const startDate1 = add(someDay, { hours: 2 });
            const observationDate1 = add(someDay, { hours: 3 });
            const dataPoint1: DeviceDataPoint = {
                startDate: startDate1.toISOString(),
                observationDate: observationDate1.toISOString()
            } as DeviceDataPoint;

            const startDate2 = add(someDay, { hours: 1 });
            const observationDate2 = add(someDay, { hours: 4 });
            const dataPoint2: DeviceDataPoint = {
                startDate: startDate2.toISOString(),
                observationDate: observationDate2.toISOString()
            } as DeviceDataPoint;

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(1);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(startDate2);
            expect(ranges[0].endTime).toEqual(observationDate2);
        });

        it('Should merge ranges when the second range falls completely within the first range.', async () => {
            const startDate1 = add(someDay, { hours: 1 });
            const observationDate1 = add(someDay, { hours: 4 });
            const dataPoint1: DeviceDataPoint = {
                startDate: startDate1.toISOString(),
                observationDate: observationDate1.toISOString()
            } as DeviceDataPoint;

            const startDate2 = add(someDay, { hours: 2 });
            const observationDate2 = add(someDay, { hours: 3 });
            const dataPoint2: DeviceDataPoint = {
                startDate: startDate2.toISOString(),
                observationDate: observationDate2.toISOString()
            } as DeviceDataPoint;

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(1);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(1);
            expect(ranges[0].startTime).toEqual(startDate1);
            expect(ranges[0].endTime).toEqual(observationDate1);
        });

        it('Should not merge ranges when there is no overlap at all.', async () => {
            const startDate1 = add(someDay, { hours: 1 });
            const observationDate1 = add(someDay, { hours: 2 });
            const dataPoint1: DeviceDataPoint = {
                startDate: startDate1.toISOString(),
                observationDate: observationDate1.toISOString()
            } as DeviceDataPoint;

            const startDate2 = add(someDay, { hours: 3 });
            const observationDate2 = add(someDay, { hours: 4 });
            const dataPoint2: DeviceDataPoint = {
                startDate: startDate2.toISOString(),
                observationDate: observationDate2.toISOString()
            } as DeviceDataPoint;

            const dailyTimeRanges = computeDailyTimeRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dailyTimeRanges)).toHaveLength(1);

            const ranges = dailyTimeRanges[getDayKey(someDay)];
            expect(ranges).toHaveLength(2);
            expect(ranges[0].startTime).toEqual(startDate1);
            expect(ranges[0].endTime).toEqual(observationDate1);
            expect(ranges[1].startTime).toEqual(startDate2);
            expect(ranges[1].endTime).toEqual(observationDate2);
        });
    });

    describe('Build Minutes Result From Daily Time Ranges', () => {
        it('Should return a result, keyed by day, with computed values in minutes.', async () => {
            const today = startOfToday();

            const eightDaysAgo = add(today, { days: -8 });
            const sevenDaysAgo = add(today, { days: -7 });
            const fiveDaysAgo = add(today, { days: -5 });
            const threeDaysAgo = add(today, { days: -3 });

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

            const result = buildMinutesResultFromDailyTimeRanges(sevenDaysAgo, today, dailyTimeRanges);

            expect(Object.keys(result)).toHaveLength(2);

            expect(result[getDayKey(fiveDaysAgo)]).toBe(146);
            expect(result[getDayKey(threeDaysAgo)]).toBe(147);
        });
    });
});
