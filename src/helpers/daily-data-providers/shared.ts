import { DeviceDataPoint, DeviceDataV2Point } from "@careevolution/mydatahelps-js";
import { DailyDataQueryResult } from "../query-daily-data";
import { add, endOfDay, Interval, isWithinInterval, startOfDay } from "date-fns";
import getDayKey from "../get-day-key";
import { parseISOWithoutOffset } from "../device-data";

export function dailyDataDateFilter(dateStrOrDate: string | Date | undefined, startDate: Date, endDate: Date): boolean {
    if (!dateStrOrDate) return false;

    const date = typeof dateStrOrDate === 'string' ? parseISOWithoutOffset(dateStrOrDate) : dateStrOrDate;
    const interval: Interval<Date, Date> = {
        start: startOfDay(startDate),
        end: endOfDay(endDate)
    };

    return isWithinInterval(date, interval);
}

export const buildFirstValueResult = (
    dataPoints: (DeviceDataPoint | DeviceDataV2Point)[],
    getDate: (dataPoint: DeviceDataPoint | DeviceDataV2Point) => string | Date | undefined,
    startDate: Date,
    endDate: Date,
    parseValue?: (dataPoint: DeviceDataPoint | DeviceDataV2Point) => number
): DailyDataQueryResult => {
    const dateFilteredDataPoints = dataPoints.filter(dataPoint => dailyDataDateFilter(getDate(dataPoint), startDate, endDate));

    const result: DailyDataQueryResult = {};
    dateFilteredDataPoints.forEach((dataPoint) => {
        const dayKey = getDayKey(getDate(dataPoint)!);
        const value = parseValue ? parseValue(dataPoint) : parseFloat(dataPoint.value);
        if (value > 0 && !result[dayKey]) {
            result[dayKey] = value;
        }
    });

    return result;
};

export const buildMaxValueResult = (
    dataPoints: (DeviceDataPoint | DeviceDataV2Point)[],
    getDate: (dataPoint: DeviceDataPoint | DeviceDataV2Point) => string | Date | undefined,
    startDate: Date,
    endDate: Date,
    parseValue?: (dataPoint: DeviceDataPoint | DeviceDataV2Point) => number
): DailyDataQueryResult => {
    const dateFilteredDataPoints = dataPoints.filter(dataPoint => dailyDataDateFilter(getDate(dataPoint), startDate, endDate));

    const result: DailyDataQueryResult = {};
    dateFilteredDataPoints.forEach((dataPoint) => {
        const dayKey = getDayKey(getDate(dataPoint)!);
        const value = parseValue ? parseValue(dataPoint) : parseFloat(dataPoint.value);
        if (value > 0 && (!result[dayKey] || value > result[dayKey])) {
            result[dayKey] = value;
        }
    });

    return result;
};

export const buildTotalValueResult = (
    dataPoints: (DeviceDataPoint | DeviceDataV2Point)[],
    getDate: (dataPoint: DeviceDataPoint | DeviceDataV2Point) => string | Date | undefined,
    startDate: Date,
    endDate: Date,
    parseValue?: (dataPoint: DeviceDataPoint | DeviceDataV2Point) => number
): DailyDataQueryResult => {
    const dateFilteredDataPoints = dataPoints.filter(dataPoint => dailyDataDateFilter(getDate(dataPoint), startDate, endDate));

    const result: DailyDataQueryResult = {};
    dateFilteredDataPoints.forEach(dataPoint => {
        const dayKey = getDayKey(getDate(dataPoint)!);
        const value = parseValue ? parseValue(dataPoint) : parseFloat(dataPoint.value);
        if (value > 0) {
            result[dayKey] = (result[dayKey] ?? 0) + value;
        }
    });

    return result;
}

export const buildAverageValueResult = (
    dataPoints: (DeviceDataPoint | DeviceDataV2Point)[],
    getDate: (dataPoint: DeviceDataPoint | DeviceDataV2Point) => string | Date | undefined,
    startDate: Date,
    endDate: Date,
    parseValue?: (dataPoint: DeviceDataPoint | DeviceDataV2Point) => number
): DailyDataQueryResult => {
    const dateFilteredDataPoints = dataPoints.filter(dataPoint => dailyDataDateFilter(getDate(dataPoint), startDate, endDate));

    const dayValues: Record<string, number[]> = {};
    dateFilteredDataPoints.forEach(dataPoint => {
        const dayKey = getDayKey(getDate(dataPoint)!);
        const value = parseValue ? parseValue(dataPoint) : parseFloat(dataPoint.value);
        if (value > 0) {
            if (!dayValues[dayKey]) {
                dayValues[dayKey] = [];
            }
            dayValues[dayKey].push(value);
        }
    });

    const result: DailyDataQueryResult = {};
    Object.keys(dayValues).forEach(dayKey => {
        const dayData = dayValues[dayKey];
        result[dayKey] = dayData.reduce((a, b) => a + b) / dayData.length;
    });

    return result;
}

export function combineResultsUsingFirstValue(startDate: Date, endDate: Date, resultsToCombine: DailyDataQueryResult[]): DailyDataQueryResult {
    return combineResults(startDate, endDate, resultsToCombine, values => values[0]);
}

export function combineResultsUsingMaxValue(startDate: Date, endDate: Date, resultsToCombine: DailyDataQueryResult[]): DailyDataQueryResult {
    return combineResults(startDate, endDate, resultsToCombine, values => Math.max(...values));
}

export function combineResultsUsingAverageValue(startDate: Date, endDate: Date, resultsToCombine: DailyDataQueryResult[]): DailyDataQueryResult {
    return combineResults(startDate, endDate, resultsToCombine, values => Math.round(values.reduce((a, b) => a + b) / values.length));
}

function combineResults(
    startDate: Date,
    endDate: Date,
    resultsToCombine: DailyDataQueryResult[],
    computeValue: (values: number[]) => number
): DailyDataQueryResult {
    const combinedResult: DailyDataQueryResult = {};

    let currentDate = startDate;
    while (currentDate <= endDate) {
        const dayKey = getDayKey(currentDate);
        const values = resultsToCombine.filter(result => result[dayKey]).map(result => result[dayKey]);
        if (values.length > 0) {
            combinedResult[dayKey] = computeValue(values);
        }
        currentDate = add(currentDate, { days: 1 });
    }

    return combinedResult;
}

export function getSleepDate(dateStrOrDate: string | Date | undefined): Date | undefined {
    if (!dateStrOrDate) return undefined;

    const originalDate = typeof dateStrOrDate === "string" ? parseISOWithoutOffset(dateStrOrDate) : dateStrOrDate;

    return add(originalDate, { hours: 6 });
}

export const randomDataProvider = (start: Date, end: Date, min: number, max: number, wholeNumbersOnly: boolean = true): Promise<DailyDataQueryResult> => {
    const result: DailyDataQueryResult = {};

    let currentDate = new Date(start);
    while (currentDate < end) {
        let dayKey = getDayKey(currentDate);
        let value = Math.random() * (max - min) + min;
        result[dayKey] = wholeNumbersOnly ? Math.floor(value) : value;
        currentDate = add(currentDate, { days: 1 });
    }

    return Promise.resolve(result);
};