import { add, differenceInMinutes, formatISO, parseISO } from "date-fns";
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import queryAllDeviceData from "./query-all-device-data";

interface DateRange {
	startDate: Date;
	endDate: Date;
}

function rangesHaveOverlap(range1: DateRange, range2: DateRange) {
	return (range2.startDate >= range1.startDate && range2.startDate <= range1.endDate) ||
		(range2.endDate >= range1.startDate && range2.endDate <= range1.endDate) ||
		(range1.startDate >= range2.startDate && range1.startDate <= range2.endDate) ||
		(range1.endDate >= range2.startDate && range1.endDate <= range2.endDate);
}

function combineRanges(range1: DateRange, range2: DateRange) {
	var start = range1.startDate;
	if (range2.startDate < start) {
		start = range2.startDate;
	}
	var end = range1.endDate;
	if (range2.endDate > end) {
		end = range2.endDate;
	}
	return { startDate: start, endDate: end };
}

function splitSleepSampleIntoRanges(dataPoint: DeviceDataPoint) {
	var result: { startDate: Date, endDate: Date }[] = [];
	var startDate = parseISO(dataPoint.startDate!);
	var observationDate = parseISO(dataPoint.observationDate!);
	var dayCutoff = add(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 18, 0, 0, 0), { days: -1 });
	while (dayCutoff < observationDate) {
		var nextDayCutoff = add(dayCutoff, { days: 1 });
		if (nextDayCutoff > startDate) {
			var sampleStart = new Date(dayCutoff);
			var sampleEnd = new Date(nextDayCutoff);
			if (startDate >= dayCutoff && startDate < nextDayCutoff) {
				sampleStart = startDate;
			}
			if (observationDate >= dayCutoff && observationDate < nextDayCutoff) {
				sampleEnd = observationDate;
			}
			result.push({ startDate: sampleStart, endDate: sampleEnd });
		}
		dayCutoff = nextDayCutoff;
	}
	return result;
}

function calculateSleepTime(ranges: DateRange[]) {
	ranges = ranges.sort(
		(a, b) => a.startDate.getTime() - b.startDate.getTime(),
	);

	var finalRanges: DateRange[] = [];
	var currentMergedRange: DateRange | null = ranges[0];
	for (var i = 1; i < ranges.length; i++) {
		if (rangesHaveOverlap(currentMergedRange, ranges[i])) {
			currentMergedRange = combineRanges(currentMergedRange, ranges[i]);
		} else {
			finalRanges.push(currentMergedRange);
			currentMergedRange = ranges[i];
		}
	}
	finalRanges.push(currentMergedRange);

	var totalTime = 0;
	finalRanges.forEach((r) => {
		totalTime += differenceInMinutes(r.endDate, r.startDate);
	});
	return totalTime;
}

type SleepType = "Asleep" | "InBed" | "AsleepCore" | "AsleepREM" | "AsleepDeep";

function coreSleep(startDate: Date, endDate: Date, value: SleepType) {
	return coreSleepMultiValues(startDate, endDate, [ value ]);
}

function coreSleepMultiValues(startDate: Date, endDate: Date, values: SleepType[]) {
	return queryAllDeviceData({
		namespace: "AppleHealth",
		type: "SleepAnalysisInterval",
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}).then(function (ddp) {
		//calculates hours slept per day using a 6pm cutoff time
		var dayAsleepRanges: { [key: string]: DateRange[] } = {};

		ddp.forEach((d) => {
			if (!d.observationDate || !d.startDate) { return; }
			if (!values.find(x => x == d.value) ) { return; }
			var ranges = splitSleepSampleIntoRanges(d);
			for (var i = 0; i < ranges.length; i++) {
				var anchorDate = add(ranges[i].startDate, { hours: 6 });
				var day = formatISO(anchorDate).substring(0, 10);
				if (!dayAsleepRanges[day]) {
					dayAsleepRanges[day] = [];
				}
				dayAsleepRanges[day].push(ranges[i]);
			}
		});

		var data: { [key: string]: number } = {};
		while (startDate < endDate) {
			var dayKey = startDate.toISOString().substr(0, 10);
			var ranges = dayAsleepRanges[dayKey];
			if (ranges) {
				data[dayKey] = calculateSleepTime(ranges);
			}
			startDate = add(startDate, { days: 1 });
		}
		return data;
	});
}

export function inBedTime(startDate: Date, endDate: Date) {
	return coreSleep(startDate, endDate, "InBed");
}

export function asleepCoreTime(startDate: Date, endDate: Date) {
	return coreSleep(startDate, endDate, "AsleepCore");
}

export function asleepRemTime(startDate: Date, endDate: Date) {
	return coreSleep(startDate, endDate, "AsleepREM");
}

export function asleepDeepTime(startDate: Date, endDate: Date) {
	return coreSleep(startDate, endDate, "AsleepDeep");
}

export function asleepTime(startDate: Date, endDate: Date) {
	return coreSleepMultiValues(startDate, endDate, [ "AsleepCore", "AsleepREM", "AsleepDeep", "Asleep" ]);
}