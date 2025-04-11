import { DeviceDataNamespace, DeviceDataPoint, DeviceDataV2Namespace, DeviceDataV2Point } from "@careevolution/mydatahelps-js";
import getDayKey from "../get-day-key";
import queryAllDeviceData from "./query-all-device-data";
import { add, compareDesc, endOfDay, Interval, isWithinInterval, startOfDay } from "date-fns";
import { DailyDataQueryResult } from "../query-daily-data";
import queryAllDeviceDataV2 from "../query-all-device-data-v2";
import { parseISOWithoutOffset } from "../date-helpers";

const self = module.exports as typeof import('./daily-data');

export type DailyDataDateFunction = (dataPoint: DeviceDataPoint | DeviceDataV2Point) => string | Date | undefined;
export const getStartDate: DailyDataDateFunction = dataPoint => dataPoint.startDate;
export const getObservationDate: DailyDataDateFunction = dataPoint => dataPoint.observationDate;
export const getSleepDate: DailyDataDateFunction = dataPoint => {
    return dataPoint.observationDate ? add(parseISOWithoutOffset(dataPoint.observationDate), { hours: 6 }) : undefined;
};

export type DailyDataValueFunction = (dataPoint: DeviceDataPoint | DeviceDataV2Point) => number;
export const getFloatValue: DailyDataValueFunction = dataPoint => parseFloat(dataPoint.value);
export const getIntValue: DailyDataValueFunction = dataPoint => parseInt(dataPoint.value);

export type DailyData = Record<string, DeviceDataPoint[]>;
export type DailyDataV2 = Record<string, DeviceDataV2Point[]>;

export async function queryForDailyData(
    namespace: DeviceDataNamespace,
    type: string | string[],
    startDate: Date,
    endDate: Date,
    dateFn: DailyDataDateFunction
): Promise<DailyData> {
    const dataPoints = await self.queryForDailyDataPoints(namespace, type, startDate, endDate, dateFn);
    return dataPoints.reduce((dailyData, dataPoint) => {
        const dayKey = getDayKey(dateFn(dataPoint)!);
        if (!dailyData[dayKey]) {
            dailyData[dayKey] = [];
        }
        dailyData[dayKey].push(dataPoint);
        return dailyData;
    }, {} as DailyData);
}

export async function queryForDailyDataPoints(
    namespace: DeviceDataNamespace,
    type: string | string[],
    startDate: Date,
    endDate: Date,
    dateFn?: DailyDataDateFunction
): Promise<DeviceDataPoint[]> {
    const dataPoints = await queryAllDeviceData({
        namespace: namespace,
        type: type,
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return dataPoints.filter(dataPoint => !dateFn || self.dailyDataDateFilter(dateFn(dataPoint), startDate, endDate));
}

export async function queryForDailyDataV2(
    namespace: DeviceDataV2Namespace,
    type: string,
    startDate: Date,
    endDate: Date,
    dateFn: DailyDataDateFunction
): Promise<DailyDataV2> {
    const dataPoints = await self.queryForDailyDataPointsV2(namespace, type, startDate, endDate, dateFn);
    return dataPoints.reduce((dailyData, dataPoint) => {
        const dayKey = getDayKey(dateFn(dataPoint)!);
        if (!dailyData[dayKey]) {
            dailyData[dayKey] = [];
        }
        dailyData[dayKey].push(dataPoint);
        return dailyData;
    }, {} as DailyDataV2);
}

export async function queryForDailyDataPointsV2(
    namespace: DeviceDataV2Namespace,
    type: string,
    startDate: Date,
    endDate: Date,
    dateFn?: DailyDataDateFunction
): Promise<DeviceDataV2Point[]> {
    const dataPoints = await queryAllDeviceDataV2({
        namespace: namespace,
        type: type,
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return dataPoints.filter(dataPoint => !dateFn || self.dailyDataDateFilter(dateFn(dataPoint), startDate, endDate));
}

export function dailyDataDateFilter(dateStrOrDate: string | Date | undefined, startDate: Date, endDate: Date): boolean {
    if (!dateStrOrDate) return false;

    const date = typeof dateStrOrDate === 'string' ? parseISOWithoutOffset(dateStrOrDate) : dateStrOrDate;
    const interval: Interval<Date, Date> = {
        start: startOfDay(startDate),
        end: endOfDay(endDate)
    };

    return isWithinInterval(date, interval);
}

export const buildMostRecentValueResult = (dailyData: DailyData | DailyDataV2, valueFn: DailyDataValueFunction = getFloatValue): DailyDataQueryResult => {
    const result: DailyDataQueryResult = {};

    Object.keys(dailyData).forEach(dayKey => {
        const dayValues = dailyData[dayKey].sort((a, b) => compareDesc(a.modifiedDate, b.modifiedDate)).map(valueFn).filter(value => value > 0);
        if (dayValues.length > 0) {
            result[dayKey] = dayValues[0];
        }
    });

    return result;
};

export const buildMaxValueResult = (dailyData: DailyData | DailyDataV2, valueFn: DailyDataValueFunction = getFloatValue): DailyDataQueryResult => {
    const result: DailyDataQueryResult = {};

    Object.keys(dailyData).forEach(dayKey => {
        const dayValues = dailyData[dayKey].map(valueFn);
        const maxValue = Math.max(...dayValues);
        if (maxValue > 0) {
            result[dayKey] = maxValue;
        }
    });

    return result;
};

export const buildTotalValueResult = (dailyData: DailyData | DailyDataV2, valueFn: DailyDataValueFunction = getFloatValue): DailyDataQueryResult => {
    const result: DailyDataQueryResult = {};

    Object.keys(dailyData).forEach(dayKey => {
        const dayValues = dailyData[dayKey].map(valueFn);
        const totalValue = dayValues.reduce((a, b) => a + b, 0);
        if (totalValue > 0) {
            result[dayKey] = totalValue;
        }
    });

    return result;
}

export const buildAverageValueResult = (dailyData: DailyData | DailyDataV2, valueFn: DailyDataValueFunction = getFloatValue): DailyDataQueryResult => {
    const result: DailyDataQueryResult = {};

    Object.keys(dailyData).forEach(dayKey => {
        const dayValues = dailyData[dayKey].map(valueFn).filter(value => value > 0);
        const totalValue = dayValues.reduce((a, b) => a + b, 0);
        if (totalValue > 0) {
            result[dayKey] = totalValue / dayValues.length
        }
    });

    return result;
}

export function combineResultsUsingFirstValue(startDate: Date, endDate: Date, resultsToCombine: DailyDataQueryResult[]): DailyDataQueryResult {
    return combineResults(startDate, endDate, resultsToCombine, values => values[0]);
}

export function combineResultsUsingMaxValue(startDate: Date, endDate: Date, resultsToCombine: DailyDataQueryResult[]): DailyDataQueryResult {
    return combineResults(startDate, endDate, resultsToCombine, values => Math.max(...values));
}

export function combineResultsUsingRoundedAverageValue(startDate: Date, endDate: Date, resultsToCombine: DailyDataQueryResult[]): DailyDataQueryResult {
    return combineResults(startDate, endDate, resultsToCombine, values => Math.round(values.reduce((a, b) => a + b) / values.length));
}

function combineResults(startDate: Date, endDate: Date, resultsToCombine: DailyDataQueryResult[], computeValue: (values: number[]) => number): DailyDataQueryResult {
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