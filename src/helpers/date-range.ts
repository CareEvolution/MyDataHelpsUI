import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { add, parseISO, startOfDay } from 'date-fns';

export interface DateRange {
	startDate: Date;
	endDate: Date;
}

export function splitSampleIntoRanges(dataPoint: DeviceDataPoint, offsetHours?: number): DateRange[] {
	if (!dataPoint.startDate || !dataPoint.observationDate) {
		return [];
	}

	const startDate = parseISO(dataPoint.startDate!);
	const observationDate = parseISO(dataPoint.observationDate!);

	let dayCutoff = startOfDay(startDate);
	if (offsetHours) {
		dayCutoff = add(dayCutoff, { hours: offsetHours });
	}

	const dateRanges: DateRange[] = [];
	while (dayCutoff < observationDate) {
		const nextDayCutoff = add(dayCutoff, { days: 1 });
		if (nextDayCutoff > startDate) {
			dateRanges.push({
				startDate: (startDate >= dayCutoff) ? startDate : dayCutoff,
				endDate: (observationDate < nextDayCutoff) ? observationDate : nextDayCutoff
			});
		}
		dayCutoff = nextDayCutoff;
	}

	return dateRanges;
}

export function rangesHaveOverlap(range1: DateRange, range2: DateRange): boolean {
	return (range2.startDate >= range1.startDate && range2.startDate <= range1.endDate) ||
		(range2.endDate >= range1.startDate && range2.endDate <= range1.endDate) ||
		(range1.startDate >= range2.startDate && range1.startDate <= range2.endDate) ||
		(range1.endDate >= range2.startDate && range1.endDate <= range2.endDate);
}

export function combineRanges(range1: DateRange, range2: DateRange): DateRange {
	return {
		startDate: (range2.startDate < range1.startDate) ? range2.startDate : range1.startDate,
		endDate: (range2.endDate > range1.endDate) ? range2.endDate : range1.endDate
	};
}
