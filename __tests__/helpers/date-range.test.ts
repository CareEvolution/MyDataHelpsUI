import { add, startOfToday } from 'date-fns';
import { describe, it } from '@jest/globals';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { computeDayRanges, computeMinutesResultFromDayRanges, DateRange } from '../../src/helpers/date-range';
import getDayKey from '../../src/helpers/get-day-key';

describe('DateRange - Helper Function Tests', () => {
    const today = startOfToday();
    const yesterday = add(today, { days: -1 });
    const tomorrow = add(today, { days: 1 });

    describe('Compute Day Ranges', () => {
        it('Should return a single day range when the start and observation dates are from the same day.', async () => {
            const startDate = add(today, { hours: 2 });
            const observationDate = add(today, { hours: 10 });

            const dataPoint: DeviceDataPoint = {
                startDate: startDate.toISOString(),
                observationDate: observationDate.toISOString()
            } as DeviceDataPoint;

            const dayRanges = computeDayRanges([dataPoint]);

            expect(Object.keys(dayRanges)).toHaveLength(1);

            const todayRanges = dayRanges[getDayKey(today)];
            expect(todayRanges.length).toBe(1);
            expect(todayRanges[0].startDate).toEqual(startDate);
            expect(todayRanges[0].endDate).toEqual(observationDate);
        });

        it('Should return two day ranges when the start date is from the prior day.', async () => {
            const startDate = add(yesterday, { hours: 22 });
            const observationDate = add(today, { hours: 10 });

            const dataPoint: DeviceDataPoint = {
                startDate: startDate.toISOString(),
                observationDate: observationDate.toISOString()
            } as DeviceDataPoint;

            const dayRanges = computeDayRanges([dataPoint]);

            expect(Object.keys(dayRanges)).toHaveLength(2);

            const yesterdayRanges = dayRanges[getDayKey(yesterday)];
            expect(yesterdayRanges).toHaveLength(1);
            expect(yesterdayRanges[0].startDate).toEqual(startDate);
            expect(yesterdayRanges[0].endDate).toEqual(today);

            const todayRanges = dayRanges[getDayKey(today)];
            expect(todayRanges).toHaveLength(1);
            expect(todayRanges[0].startDate).toEqual(today);
            expect(todayRanges[0].endDate).toEqual(observationDate);
        });

        it('Should return two day ranges when the observation date is from the next day.', async () => {
            const startDate = add(today, { hours: 22 });
            const observationDate = add(tomorrow, { hours: 10 });

            const dataPoint: DeviceDataPoint = {
                startDate: startDate.toISOString(),
                observationDate: observationDate.toISOString()
            } as DeviceDataPoint;

            const dayRanges = computeDayRanges([dataPoint]);

            expect(Object.keys(dayRanges)).toHaveLength(2);

            const todayRanges = dayRanges[getDayKey(today)];
            expect(todayRanges).toHaveLength(1);
            expect(todayRanges[0].startDate).toEqual(startDate);
            expect(todayRanges[0].endDate).toEqual(tomorrow);

            const tomorrowRanges = dayRanges[getDayKey(tomorrow)];
            expect(tomorrowRanges).toHaveLength(1);
            expect(tomorrowRanges[0].startDate).toEqual(tomorrow);
            expect(tomorrowRanges[0].endDate).toEqual(observationDate);
        });

        it('Should return three day ranges when the start and observation dates include more than two days.', async () => {
            const startDate = add(yesterday, { hours: 22 });
            const observationDate = add(tomorrow, { hours: 10 });

            const dataPoint: DeviceDataPoint = {
                startDate: startDate.toISOString(),
                observationDate: observationDate.toISOString()
            } as DeviceDataPoint;

            const dayRanges = computeDayRanges([dataPoint]);

            expect(Object.keys(dayRanges)).toHaveLength(3);

            const yesterdayRanges = dayRanges[getDayKey(yesterday)];
            expect(yesterdayRanges).toHaveLength(1);
            expect(yesterdayRanges[0].startDate).toEqual(startDate);
            expect(yesterdayRanges[0].endDate).toEqual(today);

            const todayRanges = dayRanges[getDayKey(today)];
            expect(todayRanges).toHaveLength(1);
            expect(todayRanges[0].startDate).toEqual(today);
            expect(todayRanges[0].endDate).toEqual(tomorrow);

            const tomorrowRanges = dayRanges[getDayKey(tomorrow)];
            expect(tomorrowRanges).toHaveLength(1);
            expect(tomorrowRanges[0].startDate).toEqual(tomorrow);
            expect(tomorrowRanges[0].endDate).toEqual(observationDate);
        });

        it('Should shift the day boundary when an offset is specified.', async () => {
            const startDate = add(yesterday, { hours: 22 });
            const observationDate = add(tomorrow, { hours: 10 });

            const dataPoint: DeviceDataPoint = {
                startDate: startDate.toISOString(),
                observationDate: observationDate.toISOString()
            } as DeviceDataPoint;

            const dayRanges = computeDayRanges([dataPoint], -6);

            expect(Object.keys(dayRanges)).toHaveLength(2);

            const todayRanges = dayRanges[getDayKey(today)];
            expect(todayRanges).toHaveLength(1);
            expect(todayRanges[0].startDate).toEqual(startDate);
            expect(todayRanges[0].endDate).toEqual(add(today, { hours: 18 }));

            const tomorrowRanges = dayRanges[getDayKey(tomorrow)];
            expect(tomorrowRanges).toHaveLength(1);
            expect(tomorrowRanges[0].startDate).toEqual(add(today, { hours: 18 }));
            expect(tomorrowRanges[0].endDate).toEqual(observationDate);
        });

        it('Should merge ranges when the tail of the first range overlaps the start of the second range.', async () => {
            const startDate1 = add(today, { hours: 1 });
            const observationDate1 = add(today, { hours: 2 });
            const dataPoint1: DeviceDataPoint = {
                startDate: startDate1.toISOString(),
                observationDate: observationDate1.toISOString()
            } as DeviceDataPoint;

            const startDate2 = add(today, { hours: 2 });
            const observationDate2 = add(today, { hours: 3 });
            const dataPoint2: DeviceDataPoint = {
                startDate: startDate2.toISOString(),
                observationDate: observationDate2.toISOString()
            } as DeviceDataPoint;

            const dayRanges = computeDayRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dayRanges)).toHaveLength(1);

            const todayRanges = dayRanges[getDayKey(today)];
            expect(todayRanges).toHaveLength(1);
            expect(todayRanges[0].startDate).toEqual(startDate1);
            expect(todayRanges[0].endDate).toEqual(observationDate2);
        });

        it('Should merge ranges when the tail of the second range overlaps the start of the first range.', async () => {
            const startDate1 = add(today, { hours: 2 });
            const observationDate1 = add(today, { hours: 3 });
            const dataPoint1: DeviceDataPoint = {
                startDate: startDate1.toISOString(),
                observationDate: observationDate1.toISOString()
            } as DeviceDataPoint;

            const startDate2 = add(today, { hours: 1 });
            const observationDate2 = add(today, { hours: 2 });
            const dataPoint2: DeviceDataPoint = {
                startDate: startDate2.toISOString(),
                observationDate: observationDate2.toISOString()
            } as DeviceDataPoint;

            const dayRanges = computeDayRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dayRanges)).toHaveLength(1);

            const todayRanges = dayRanges[getDayKey(today)];
            expect(todayRanges).toHaveLength(1);
            expect(todayRanges[0].startDate).toEqual(startDate2);
            expect(todayRanges[0].endDate).toEqual(observationDate1);
        });

        it('Should merge ranges when the first range falls completely within the second range.', async () => {
            const startDate1 = add(today, { hours: 2 });
            const observationDate1 = add(today, { hours: 3 });
            const dataPoint1: DeviceDataPoint = {
                startDate: startDate1.toISOString(),
                observationDate: observationDate1.toISOString()
            } as DeviceDataPoint;

            const startDate2 = add(today, { hours: 1 });
            const observationDate2 = add(today, { hours: 4 });
            const dataPoint2: DeviceDataPoint = {
                startDate: startDate2.toISOString(),
                observationDate: observationDate2.toISOString()
            } as DeviceDataPoint;

            const dayRanges = computeDayRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dayRanges)).toHaveLength(1);

            const todayRanges = dayRanges[getDayKey(today)];
            expect(todayRanges).toHaveLength(1);
            expect(todayRanges[0].startDate).toEqual(startDate2);
            expect(todayRanges[0].endDate).toEqual(observationDate2);
        });

        it('Should merge ranges when the second range falls completely within the first range.', async () => {
            const startDate1 = add(today, { hours: 1 });
            const observationDate1 = add(today, { hours: 4 });
            const dataPoint1: DeviceDataPoint = {
                startDate: startDate1.toISOString(),
                observationDate: observationDate1.toISOString()
            } as DeviceDataPoint;

            const startDate2 = add(today, { hours: 2 });
            const observationDate2 = add(today, { hours: 3 });
            const dataPoint2: DeviceDataPoint = {
                startDate: startDate2.toISOString(),
                observationDate: observationDate2.toISOString()
            } as DeviceDataPoint;

            const dayRanges = computeDayRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dayRanges)).toHaveLength(1);

            const todayRanges = dayRanges[getDayKey(today)];
            expect(todayRanges).toHaveLength(1);
            expect(todayRanges[0].startDate).toEqual(startDate1);
            expect(todayRanges[0].endDate).toEqual(observationDate1);
        });

        it('Should not merge ranges when there is no overlap at all.', async () => {
            const startDate1 = add(today, { hours: 1 });
            const observationDate1 = add(today, { hours: 2 });
            const dataPoint1: DeviceDataPoint = {
                startDate: startDate1.toISOString(),
                observationDate: observationDate1.toISOString()
            } as DeviceDataPoint;

            const startDate2 = add(today, { hours: 3 });
            const observationDate2 = add(today, { hours: 4 });
            const dataPoint2: DeviceDataPoint = {
                startDate: startDate2.toISOString(),
                observationDate: observationDate2.toISOString()
            } as DeviceDataPoint;

            const dayRanges = computeDayRanges([dataPoint1, dataPoint2]);

            expect(Object.keys(dayRanges)).toHaveLength(1);

            const todayRanges = dayRanges[getDayKey(today)];
            expect(todayRanges).toHaveLength(2);
            expect(todayRanges[0].startDate).toEqual(startDate1);
            expect(todayRanges[0].endDate).toEqual(observationDate1);
            expect(todayRanges[1].startDate).toEqual(startDate2);
            expect(todayRanges[1].endDate).toEqual(observationDate2);
        });
    });

    describe('Compute Minutes Result From Day Ranges', () => {
        it('Should return a result, keyed by day, with computed values in minutes.', async () => {
            const eightDaysAgo = add(today, { days: -8 });
            const sevenDaysAgo = add(today, { days: -7 });
            const fiveDaysAgo = add(today, { days: -5 });
            const threeDaysAgo = add(today, { days: -3 });

            const dayRanges: { [key: string]: DateRange[] } = {};
            dayRanges[getDayKey(eightDaysAgo)] = [
                {
                    startDate: add(eightDaysAgo, { hours: 8 }),
                    endDate: add(eightDaysAgo, { hours: 8, minutes: 30 })
                }
            ];
            dayRanges[getDayKey(fiveDaysAgo)] = [
                {
                    startDate: add(fiveDaysAgo, { hours: 8, minutes: 22, seconds: 10 }),
                    endDate: add(fiveDaysAgo, { hours: 8, minutes: 42, seconds: 50 })
                },
                {
                    startDate: add(fiveDaysAgo, { hours: 10, minutes: 10, seconds: 10 }),
                    endDate: add(fiveDaysAgo, { hours: 12, minutes: 15, seconds: 30 })
                }
            ];
            dayRanges[getDayKey(threeDaysAgo)] = [
                {
                    startDate: add(threeDaysAgo, { hours: 8, minutes: 22, seconds: 10 }),
                    endDate: add(threeDaysAgo, { hours: 8, minutes: 42, seconds: 50 })
                },
                {
                    startDate: add(threeDaysAgo, { hours: 9, minutes: 42, seconds: 10 }),
                    endDate: add(threeDaysAgo, { hours: 9, minutes: 44, seconds: 9 })
                },
                {
                    startDate: add(threeDaysAgo, { hours: 10, minutes: 10, seconds: 10 }),
                    endDate: add(threeDaysAgo, { hours: 12, minutes: 15, seconds: 30 })
                }
            ];

            const result = computeMinutesResultFromDayRanges(sevenDaysAgo, today, dayRanges);

            expect(Object.keys(result)).toHaveLength(2);

            expect(result[getDayKey(fiveDaysAgo)]).toBe(146);
            expect(result[getDayKey(threeDaysAgo)]).toBe(147);
        });
    });
});
