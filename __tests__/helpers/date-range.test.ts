import { add, startOfToday } from 'date-fns';
import { describe, it } from '@jest/globals';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { combineRanges, rangesHaveOverlap, splitSampleIntoRanges } from '../../src/helpers/date-range';

describe('DateRange - Helper Function Tests', () => {
	const today = startOfToday();

	describe('Split Sample Into Ranges', () => {
		it('Should return a single date range when the start and observation dates are from the same day.', async () => {
			const startDate = add(today, { hours: 2 });
			const observationDate = add(today, { hours: 10 });

			const dataPoint: DeviceDataPoint = {
				startDate: startDate.toISOString(),
				observationDate: observationDate.toISOString()
			} as DeviceDataPoint;

			const ranges = splitSampleIntoRanges(dataPoint);

			expect(ranges.length).toBe(1);
			expect(ranges[0].startDate).toEqual(startDate);
			expect(ranges[0].endDate).toEqual(observationDate);
		});

		it('Should return two date ranges when the start date is from the prior day.', async () => {
			const startDate = add(today, { hours: -2 });
			const observationDate = add(today, { hours: 8 });

			const dataPoint: DeviceDataPoint = {
				startDate: startDate.toISOString(),
				observationDate: observationDate.toISOString()
			} as DeviceDataPoint;

			const ranges = splitSampleIntoRanges(dataPoint);

			expect(ranges.length).toBe(2);
			expect(ranges[0].startDate).toEqual(startDate);
			expect(ranges[0].endDate).toEqual(today);
			expect(ranges[1].startDate).toEqual(today);
			expect(ranges[1].endDate).toEqual(observationDate);
		});

		it('Should return two date ranges when the observation date is from the next day.', async () => {
			const startDate = add(today, { hours: 14 });
			const observationDate = add(today, { days: 1, hours: 2 });

			const dataPoint: DeviceDataPoint = {
				startDate: startDate.toISOString(),
				observationDate: observationDate.toISOString()
			} as DeviceDataPoint;

			const ranges = splitSampleIntoRanges(dataPoint);

			expect(ranges.length).toBe(2);
			expect(ranges[0].startDate).toEqual(startDate);
			expect(ranges[0].endDate).toEqual(add(today, { days: 1 }));
			expect(ranges[1].startDate).toEqual(add(today, { days: 1 }));
			expect(ranges[1].endDate).toEqual(observationDate);
		});

		it('Should return three date ranges when the start and observation dates include more than two days.', async () => {
			const startDate = add(today, { days: -1, hours: 12 });
			const observationDate = add(today, { days: 1, hours: 2 });

			const dataPoint: DeviceDataPoint = {
				startDate: startDate.toISOString(),
				observationDate: observationDate.toISOString()
			} as DeviceDataPoint;

			const ranges = splitSampleIntoRanges(dataPoint);

			expect(ranges.length).toBe(3);
			expect(ranges[0].startDate).toEqual(startDate);
			expect(ranges[0].endDate).toEqual(today);
			expect(ranges[1].startDate).toEqual(today);
			expect(ranges[1].endDate).toEqual(add(today, { days: 1 }));
			expect(ranges[2].startDate).toEqual(add(today, { days: 1 }));
			expect(ranges[2].endDate).toEqual(observationDate);
		});

		it('Should shift the day boundary when an offset is specified.', async () => {
			const startDate = add(today, { days: -1, hours: 12 });
			const observationDate = add(today, { days: 1, hours: 2 });

			const dataPoint: DeviceDataPoint = {
				startDate: startDate.toISOString(),
				observationDate: observationDate.toISOString()
			} as DeviceDataPoint;

			const ranges = splitSampleIntoRanges(dataPoint, -6);

			expect(ranges.length).toBe(3);
			expect(ranges[0].startDate).toEqual(startDate);
			expect(ranges[0].endDate).toEqual(add(today, { hours: -6 }));
			expect(ranges[1].startDate).toEqual(add(today, { hours: -6 }));
			expect(ranges[1].endDate).toEqual(add(today, { hours: 18 }));
			expect(ranges[2].startDate).toEqual(add(today, { hours: 18 }));
			expect(ranges[2].endDate).toEqual(observationDate);
		});
	});

	describe('Ranges Have Overlap', () => {
		it('Should return true when the tail of the first range overlaps the start of the second range.', async () => {
			const range1 = { startDate: add(today, { hours: 1 }), endDate: add(today, { hours: 2 }) };
			const range2 = { startDate: add(today, { hours: 2 }), endDate: add(today, { hours: 3 }) };

			expect(rangesHaveOverlap(range1, range2)).toBe(true);
		});

		it('Should return true when the tail of the second range overlaps the start of the first range.', async () => {
			const range1 = { startDate: add(today, { hours: 2 }), endDate: add(today, { hours: 3 }) };
			const range2 = { startDate: add(today, { hours: 1 }), endDate: add(today, { hours: 2 }) };

			expect(rangesHaveOverlap(range1, range2)).toBe(true);
		});

		it('Should return true when the first range falls completely within the second range.', async () => {
			const range1 = { startDate: add(today, { hours: 2 }), endDate: add(today, { hours: 3 }) };
			const range2 = { startDate: add(today, { hours: 1 }), endDate: add(today, { hours: 4 }) };

			expect(rangesHaveOverlap(range1, range2)).toBe(true);
		});

		it('Should return true when the second range falls completely within the first range.', async () => {
			const range1 = { startDate: add(today, { hours: 1 }), endDate: add(today, { hours: 4 }) };
			const range2 = { startDate: add(today, { hours: 2 }), endDate: add(today, { hours: 3 }) };

			expect(rangesHaveOverlap(range1, range2)).toBe(true);
		});

		it('Should return false when there is no overlap at all.', async () => {
			const range1 = { startDate: add(today, { hours: 1 }), endDate: add(today, { hours: 2 }) };
			const range2 = { startDate: add(today, { hours: 3 }), endDate: add(today, { hours: 4 }) };

			expect(rangesHaveOverlap(range1, range2)).toBe(false);
		});
	});

	describe('Combine Ranges', () => {
		it('Should return a new range using the minimum start date and maximum end date from across both ranges.', async () => {
			const range1 = { startDate: add(today, { hours: 1 }), endDate: add(today, { hours: 2 }) };
			const range2 = { startDate: add(today, { hours: 2 }), endDate: add(today, { hours: 3 }) };

			const combinedRange1 = combineRanges(range1, range2);
			expect(combinedRange1.startDate).toBe(range1.startDate);
			expect(combinedRange1.endDate).toBe(range2.endDate);

			const combinedRange2 = combineRanges(range2, range1);
			expect(combinedRange2.startDate).toBe(range1.startDate);
			expect(combinedRange2.endDate).toBe(range2.endDate);
		});

		it('Should return a new range using the minimum start date and maximum end date from the same range.', async () => {
			const range1 = { startDate: add(today, { hours: 1 }), endDate: add(today, { hours: 4 }) };
			const range2 = { startDate: add(today, { hours: 2 }), endDate: add(today, { hours: 3 }) };

			const combinedRange1 = combineRanges(range1, range2);
			expect(combinedRange1.startDate).toBe(range1.startDate);
			expect(combinedRange1.endDate).toBe(range1.endDate);

			const combinedRange2 = combineRanges(range2, range1);
			expect(combinedRange2.startDate).toBe(range1.startDate);
			expect(combinedRange2.endDate).toBe(range1.endDate);
		});
	});
});
