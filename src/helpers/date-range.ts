import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { add, differenceInSeconds, parseISO, startOfDay } from 'date-fns';
import getDayKey from './get-day-key';
import { DailyDataQueryResult } from "./query-daily-data";

export interface DateRange {
    startDate: Date;
    endDate: Date;
}

export function computeDayRanges(dataPoints: DeviceDataPoint[], offsetHours?: number): { [key: string]: DateRange[] } {
    const dayRanges: { [key: string]: DateRange[] } = {};

    dataPoints.forEach(dataPoint => {
        const ranges = splitSampleIntoRanges(dataPoint, offsetHours);
        for (const range of ranges) {
            const anchorDate = add(range.startDate, { hours: -(offsetHours ?? 0) });
            const dayKey = getDayKey(anchorDate);
            if (!dayRanges[dayKey]) {
                dayRanges[dayKey] = [];
            }
            dayRanges[dayKey].push(range);
        }
    });

    Object.keys(dayRanges).forEach(key => {
        const ranges = dayRanges[key].sort(
            (range1, range2) => range1.startDate.getTime() - range2.startDate.getTime(),
        );

        const mergedRanges: DateRange[] = [];
        let currentMergedRange: DateRange = ranges[0];
        for (const range of ranges.slice(1)) {
            if (rangesHaveOverlap(currentMergedRange, range)) {
                currentMergedRange = combineRanges(currentMergedRange, range);
            } else {
                mergedRanges.push(currentMergedRange);
                currentMergedRange = range;
            }
        }
        mergedRanges.push(currentMergedRange);

        dayRanges[key] = mergedRanges;
    });

    return dayRanges;
}

export function computeMinutesResultFromDayRanges(startDate: Date, endDate: Date, dayRanges: { [key: string]: DateRange[] }): DailyDataQueryResult {
    const result: DailyDataQueryResult = {};

    let currentDate = startDate;
    while (currentDate < endDate) {
        const dayKey = getDayKey(currentDate);
        const ranges = dayRanges[dayKey];
        if (ranges) {
            const totalSeconds = ranges.reduce((totalSeconds, range) => totalSeconds + differenceInSeconds(range.endDate, range.startDate), 0);
            result[dayKey] = Math.floor(totalSeconds / 60);
        }
        currentDate = add(currentDate, { days: 1 });
    }

    return result;
}

function splitSampleIntoRanges(dataPoint: DeviceDataPoint, offsetHours?: number): DateRange[] {
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

function rangesHaveOverlap(range1: DateRange, range2: DateRange): boolean {
    return (range2.startDate >= range1.startDate && range2.startDate <= range1.endDate) ||
        (range2.endDate >= range1.startDate && range2.endDate <= range1.endDate) ||
        (range1.startDate >= range2.startDate && range1.startDate <= range2.endDate) ||
        (range1.endDate >= range2.startDate && range1.endDate <= range2.endDate);
}

function combineRanges(range1: DateRange, range2: DateRange): DateRange {
    return {
        startDate: (range2.startDate < range1.startDate) ? range2.startDate : range1.startDate,
        endDate: (range2.endDate > range1.endDate) ? range2.endDate : range1.endDate
    };
}
