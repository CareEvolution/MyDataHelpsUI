import { add, differenceInMinutes, formatISO } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import { combineRanges, DateRange, rangesHaveOverlap, splitSampleIntoRanges } from "../date-range";

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
			var ranges = splitSampleIntoRanges(d, -6);
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