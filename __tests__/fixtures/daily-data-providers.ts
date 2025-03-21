import * as dailyDataFunctions from '../../src/helpers/daily-data-providers/daily-data';
import { DailyData, DailyDataDateFunction, DailyDataV2, DailyDataValueFunction } from '../../src/helpers/daily-data-providers/daily-data';
import * as timeRangeFunctions from '../../src/helpers/time-range';
import { DailyTimeRanges, TimeRange } from '../../src/helpers/time-range';
import { DeviceDataNamespace, DeviceDataPoint, DeviceDataV2Namespace, DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { DailyDataQueryResult } from '../../src';
import { add, formatISO, isEqual, startOfToday } from 'date-fns';
import { parseISOWithoutOffset } from "../../src/helpers/date-helpers";

const today = startOfToday();
export const sampleStartDate = add(today, { days: -6 });
export const sampleEndDate = today;

export const sampleDailyData: DailyData = {
    'SomeDate': [{} as DeviceDataPoint]
};

export const sampleDailyDataV2: DailyDataV2 = {
    'SomeDate': [{} as DeviceDataV2Point]
};

export const sampleDataPoints: DeviceDataPoint[] = [
    {} as DeviceDataPoint
];

export const sampleResult: DailyDataQueryResult = {
    'SomeDate': 100
};

export const sampleTimeRanges: DailyTimeRanges = {
    'SomeDate': [{} as TimeRange],
};

export const startDateFunctionEvaluator = (dateFn: DailyDataDateFunction): boolean => {
    const someDate = formatISO(sampleStartDate);
    return dateFn({} as DeviceDataV2Point) === undefined
        && dateFn({ startDate: someDate } as DeviceDataV2Point) === someDate;
}

export const observationDateFunctionEvaluator = (dateFn: DailyDataDateFunction): boolean => {
    const someDate = formatISO(sampleStartDate);
    return dateFn({} as DeviceDataV2Point) === undefined
        && dateFn({ observationDate: someDate } as DeviceDataV2Point) === someDate;
}

export const sleepDateFunctionEvaluator = (dateFn: DailyDataDateFunction): boolean => {
    const someDate = formatISO(sampleStartDate);
    return dateFn({} as DeviceDataV2Point) === undefined
        && isEqual(dateFn({ observationDate: someDate } as DeviceDataV2Point)!, add(parseISOWithoutOffset(someDate), { hours: 6 }));
}

export function setupDailyData(
    namespace: DeviceDataNamespace,
    type: string | string[],
    startDate: Date,
    endDate: Date,
    dateFunctionEvaluator: (dateFn: DailyDataDateFunction) => boolean,
    dailyData: DailyData
): void {
    jest.spyOn(dailyDataFunctions, 'queryForDailyData').mockImplementation((...args): Promise<DailyData> => {
        if (args[0] !== namespace) return Promise.reject();
        if (JSON.stringify(args[1]) !== JSON.stringify(type)) return Promise.reject();
        if (!isEqual(args[2], startDate)) return Promise.reject();
        if (!isEqual(args[3], endDate)) return Promise.reject();
        if (!dateFunctionEvaluator(args[4])) return Promise.reject();
        return Promise.resolve(dailyData);
    });
}

export function setupDailyDataV2(
    namespace: DeviceDataV2Namespace,
    type: string,
    startDate: Date,
    endDate: Date,
    dateFunctionEvaluator: (dateFn: DailyDataDateFunction) => boolean,
    dailyData: DailyDataV2
): void {
    jest.spyOn(dailyDataFunctions, 'queryForDailyDataV2').mockImplementation((...args): Promise<DailyDataV2> => {
        if (args[0] !== namespace) return Promise.reject();
        if (args[1] !== type) return Promise.reject();
        if (!isEqual(args[2], startDate)) return Promise.reject();
        if (!isEqual(args[3], endDate)) return Promise.reject();
        if (!dateFunctionEvaluator(args[4])) return Promise.reject();
        return Promise.resolve(dailyData);
    });
}

export function setupMaxValueResult(
    dailyData: DailyData | DailyDataV2,
    result: DailyDataQueryResult,
    valueFunctionEvaluator?: (valueFn: DailyDataValueFunction | undefined) => boolean
): void {
    setupResult('buildMaxValueResult', dailyData, result, valueFunctionEvaluator ?? (valueFn => !valueFn));
}

export function setupTotalValueResult(
    dailyData: DailyData | DailyDataV2,
    result: DailyDataQueryResult,
    valueFunctionEvaluator?: (valueFn: DailyDataValueFunction | undefined) => boolean
): void {
    setupResult('buildTotalValueResult', dailyData, result, valueFunctionEvaluator ?? (valueFn => !valueFn));
}

export function setupAverageValueResult(
    dailyData: DailyData | DailyDataV2,
    result: DailyDataQueryResult,
    valueFunctionEvaluator?: (valueFn: DailyDataValueFunction | undefined) => boolean
): void {
    setupResult('buildAverageValueResult', dailyData, result, valueFunctionEvaluator ?? (valueFn => !valueFn));
}

export function setupMostRecentValueResult(
    dailyData: DailyData | DailyDataV2,
    result: DailyDataQueryResult,
    valueFunctionEvaluator?: (valueFn: DailyDataValueFunction | undefined) => boolean
): void {
    setupResult('buildMostRecentValueResult', dailyData, result, valueFunctionEvaluator ?? (valueFn => !valueFn));
}

function setupResult(
    functionName: 'buildMaxValueResult' | 'buildTotalValueResult' | 'buildAverageValueResult' | 'buildMostRecentValueResult',
    dailyData: DailyData | DailyDataV2,
    result: DailyDataQueryResult,
    valueFunctionEvaluator: (valueFn: DailyDataValueFunction | undefined) => boolean
): void {
    jest.spyOn(dailyDataFunctions, functionName).mockImplementation((...args): DailyDataQueryResult => {
        if (JSON.stringify(args[0]) !== JSON.stringify(dailyData)) return {};
        if (!valueFunctionEvaluator(args[1])) return {};
        return result;
    });
}

export function setupDailyDataPoints(
    namespace: DeviceDataNamespace,
    type: string | string[],
    startDate: Date,
    endDate: Date,
    dataPoints: DeviceDataPoint[]
): void {
    jest.spyOn(dailyDataFunctions, 'queryForDailyDataPoints').mockImplementation((...args): Promise<DeviceDataPoint[]> => {
        if (args[0] !== namespace) return Promise.reject();
        if (JSON.stringify(args[1]) !== JSON.stringify(type)) return Promise.reject();
        if (!isEqual(args[2], startDate)) return Promise.reject();
        if (!isEqual(args[3], endDate)) return Promise.reject();
        return Promise.resolve(dataPoints);
    });
}

export function setupDailyDataPointsV2(
    namespace: DeviceDataV2Namespace,
    type: string,
    startDate: Date,
    endDate: Date,
    dataPoints: DeviceDataV2Point[]
): void {
    jest.spyOn(dailyDataFunctions, 'queryForDailyDataPointsV2').mockImplementation((...args): Promise<DeviceDataV2Point[]> => {
        if (args[0] !== namespace) return Promise.reject();
        if (JSON.stringify(args[1]) !== JSON.stringify(type)) return Promise.reject();
        if (!isEqual(args[2], startDate)) return Promise.reject();
        if (!isEqual(args[3], endDate)) return Promise.reject();
        return Promise.resolve(dataPoints);
    });
}

export function setupDailyTimeRanges(dataPoints: (DeviceDataPoint | DeviceDataV2Point)[], timeRanges: DailyTimeRanges, offset?: number): void {
    jest.spyOn(timeRangeFunctions, 'computeDailyTimeRanges').mockImplementation((...args): DailyTimeRanges => {
        if (JSON.stringify(args[0]) !== JSON.stringify(dataPoints)) return {};
        if (args[1] !== offset) return {}
        return timeRanges;
    });
}

export function setupMinutesResult(startDate: Date, endDate: Date, timeRanges: DailyTimeRanges, result: DailyDataQueryResult): void {
    jest.spyOn(timeRangeFunctions, 'buildMinutesResultFromDailyTimeRanges').mockImplementation((...args): DailyDataQueryResult => {
        if (!isEqual(args[0], startDate)) return {};
        if (!isEqual(args[1], endDate)) return {};
        if (JSON.stringify(args[2]) !== JSON.stringify(timeRanges)) return {};
        return result;
    });
}

export function setupCombinedFirstValueResult(
    startDate: Date,
    endDate: Date,
    allResults: DailyDataQueryResult[],
    result: DailyDataQueryResult
): void {
    jest.spyOn(dailyDataFunctions, 'combineResultsUsingFirstValue').mockImplementation((...args): DailyDataQueryResult => {
        if (!isEqual(args[0], startDate)) return {};
        if (!isEqual(args[1], endDate)) return {};
        if (JSON.stringify(args[2]) !== JSON.stringify(allResults)) return {};
        return result;
    });
}