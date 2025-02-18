import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { add, differenceInSeconds, parseISO, startOfDay } from 'date-fns';
import getDayKey from './get-day-key';
import { DailyDataQueryResult } from './query-daily-data';

export interface TimeRange {
    startTime: Date;
    endTime: Date;
}

export type DailyTimeRanges = Record<string, TimeRange[]>;

export function computeDailyTimeRanges(dataPoints: DeviceDataPoint[], offsetHours: number = 0): DailyTimeRanges {
    const dailyTimeRanges: DailyTimeRanges = {};

    dataPoints.forEach(dataPoint => {
        const ranges = splitSampleIntoRanges(dataPoint, offsetHours);
        for (const range of ranges) {
            const anchorDate = add(range.startTime, { hours: -offsetHours });
            const dayKey = getDayKey(anchorDate);
            if (!dailyTimeRanges[dayKey]) {
                dailyTimeRanges[dayKey] = [];
            }
            dailyTimeRanges[dayKey].push(range);
        }
    });

    Object.keys(dailyTimeRanges).forEach(key => {
        const ranges = dailyTimeRanges[key].sort(
            (range1, range2) => range1.startTime.getTime() - range2.startTime.getTime(),
        );

        const mergedRanges: TimeRange[] = [];
        let currentMergedRange: TimeRange = ranges[0];
        for (const range of ranges.slice(1)) {
            if (rangesHaveOverlap(currentMergedRange, range)) {
                currentMergedRange = combineRanges(currentMergedRange, range);
            } else {
                mergedRanges.push(currentMergedRange);
                currentMergedRange = range;
            }
        }
        mergedRanges.push(currentMergedRange);

        dailyTimeRanges[key] = mergedRanges;
    });

    return dailyTimeRanges;
}

export function buildMinutesResultFromDailyTimeRanges(startDate: Date, endDate: Date, dailyTimeRanges: DailyTimeRanges): DailyDataQueryResult {
    const result: DailyDataQueryResult = {};

    let currentDate = startDate;
    while (currentDate < endDate) {
        const dayKey = getDayKey(currentDate);
        const ranges = dailyTimeRanges[dayKey];
        if (ranges) {
            const totalSeconds = ranges.reduce((totalSeconds, range) => totalSeconds + differenceInSeconds(range.endTime, range.startTime), 0);
            result[dayKey] = Math.floor(totalSeconds / 60);
        }
        currentDate = add(currentDate, { days: 1 });
    }

    return result;
}

function splitSampleIntoRanges(dataPoint: DeviceDataPoint, offsetHours: number): TimeRange[] {
    if (!dataPoint.startDate || !dataPoint.observationDate) {
        return [];
    }

    const startDate = parseISO(dataPoint.startDate!);
    const observationDate = parseISO(dataPoint.observationDate!);

    let dayCutoff = add(startOfDay(startDate), { hours: offsetHours });

    const ranges: TimeRange[] = [];
    while (dayCutoff < observationDate) {
        const nextDayCutoff = add(dayCutoff, { days: 1 });
        if (nextDayCutoff > startDate) {
            ranges.push({
                startTime: (startDate >= dayCutoff) ? startDate : dayCutoff,
                endTime: (observationDate < nextDayCutoff) ? observationDate : nextDayCutoff
            });
        }
        dayCutoff = nextDayCutoff;
    }

    return ranges;
}

function rangesHaveOverlap(range1: TimeRange, range2: TimeRange): boolean {
    return range1.endTime >= range2.startTime && range1.startTime <= range2.endTime;
}

function combineRanges(range1: TimeRange, range2: TimeRange): TimeRange {
    return {
        startTime: (range2.startTime < range1.startTime) ? range2.startTime : range1.startTime,
        endTime: (range2.endTime > range1.endTime) ? range2.endTime : range1.endTime
    };
}
