import * as dailyDataFunctions from '../../src/helpers/daily-data-providers/daily-data';
import { DailyData, DailyDataDateFunction, DailyDataV2, DailyDataValueFunction } from '../../src/helpers/daily-data-providers/daily-data';
import * as dataCollectionSettingsFunctions from '../../src/helpers/daily-data-providers/combined-data-collection-settings';
import { CombinedDataCollectionSettings } from '../../src/helpers/daily-data-providers/combined-data-collection-settings';
import * as timeRangeFunctions from '../../src/helpers/time-range';
import { DailyTimeRanges, TimeRange } from '../../src/helpers/time-range';
import { DataCollectionSettings, DeviceDataNamespace, DeviceDataPoint, DeviceDataV2Namespace, DeviceDataV2Point, QueryableDeviceDataType } from '@careevolution/mydatahelps-js';
import { DailyDataQueryResult } from '../../src';
import { add, format, formatISO, isEqual, startOfToday } from 'date-fns';
import { parseISOWithoutOffset } from '../../src/helpers/date-helpers';

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
};

export const observationDateFunctionEvaluator = (dateFn: DailyDataDateFunction): boolean => {
    const someDate = formatISO(sampleStartDate);
    return dateFn({} as DeviceDataV2Point) === undefined
        && dateFn({ observationDate: someDate } as DeviceDataV2Point) === someDate;
};

export const sleepDateFunctionEvaluator = (dateFn: DailyDataDateFunction): boolean => {
    const someDate = formatISO(sampleStartDate);
    return dateFn({} as DeviceDataV2Point) === undefined
        && isEqual(dateFn({ observationDate: someDate } as DeviceDataV2Point)!, add(parseISOWithoutOffset(someDate), { hours: 6 }));
};

export function setupDailyData(
    expectedNamespace: DeviceDataNamespace,
    expectedType: string | string[],
    expectedStartDate: Date,
    expectedEndDate: Date,
    dateFunctionEvaluator: (dateFn: DailyDataDateFunction) => boolean,
    dailyData: DailyData
): void {
    jest.spyOn(dailyDataFunctions, 'queryForDailyData').mockImplementation(
        (
            actualNamespace: DeviceDataNamespace,
            actualType: string | string[],
            actualStartDate: Date,
            actualEndDate: Date,
            actualDateFn: DailyDataDateFunction
        ): Promise<DailyData> => {
            if (actualNamespace !== expectedNamespace) return Promise.reject();
            if (JSON.stringify(actualType) !== JSON.stringify(expectedType)) return Promise.reject();
            if (!isEqual(actualStartDate, expectedStartDate)) return Promise.reject();
            if (!isEqual(actualEndDate, expectedEndDate)) return Promise.reject();
            if (!dateFunctionEvaluator(actualDateFn)) return Promise.reject();
            return Promise.resolve(dailyData);
        }
    );
}

export function setupDailyDataV2(
    expectedNamespace: DeviceDataV2Namespace,
    expectedType: string,
    expectedStartDate: Date,
    expectedEndDate: Date,
    dateFunctionEvaluator: (dateFn: DailyDataDateFunction) => boolean,
    dailyData: DailyDataV2
): void {
    jest.spyOn(dailyDataFunctions, 'queryForDailyDataV2').mockImplementation(
        (
            actualNamespace: DeviceDataV2Namespace,
            actualType: string,
            actualStartDate: Date,
            actualEndDate: Date,
            actualDateFn: DailyDataDateFunction
        ): Promise<DailyDataV2> => {
            if (actualNamespace !== expectedNamespace) return Promise.reject();
            if (actualType !== expectedType) return Promise.reject();
            if (!isEqual(actualStartDate, expectedStartDate)) return Promise.reject();
            if (!isEqual(actualEndDate, expectedEndDate)) return Promise.reject();
            if (!dateFunctionEvaluator(actualDateFn)) return Promise.reject();
            return Promise.resolve(dailyData);
        }
    );
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
    expectedDailyData: DailyData | DailyDataV2,
    result: DailyDataQueryResult,
    valueFunctionEvaluator: (valueFn: DailyDataValueFunction | undefined) => boolean
): void {
    jest.spyOn(dailyDataFunctions, functionName).mockImplementation(
        (
            actualDailyData: DailyData | DailyDataV2,
            actualValueFn?: DailyDataValueFunction
        ): DailyDataQueryResult => {
            if (JSON.stringify(actualDailyData) !== JSON.stringify(expectedDailyData)) return {};
            if (!valueFunctionEvaluator(actualValueFn)) return {};
            return result;
        }
    );
}

export function setupDailyDataPoints(
    expectedNamespace: DeviceDataNamespace,
    expectedType: string | string[],
    expectedStartDate: Date,
    expectedEndDate: Date,
    expectedDateFn: DailyDataDateFunction | undefined,
    dataPoints: DeviceDataPoint[]
): void {
    jest.spyOn(dailyDataFunctions, 'queryForDailyDataPoints').mockImplementation(
        (
            actualNamespace: DeviceDataNamespace,
            actualType: string | string[],
            actualStartDate: Date,
            actualEndDate: Date,
            actualDateFn?: DailyDataDateFunction
        ): Promise<DeviceDataPoint[]> => {
            if (actualNamespace !== expectedNamespace) return Promise.reject();
            if (JSON.stringify(actualType) !== JSON.stringify(expectedType)) return Promise.reject();
            if (!isEqual(actualStartDate, expectedStartDate)) return Promise.reject();
            if (!isEqual(actualEndDate, expectedEndDate)) return Promise.reject();
            if (actualDateFn !== expectedDateFn) return Promise.reject();
            return Promise.resolve(dataPoints);
        }
    );
}

export function setupDailyDataPointsV2(
    expectedNamespace: DeviceDataV2Namespace,
    expectedType: string,
    expectedStartDate: Date,
    expectedEndDate: Date,
    expectedDateFn: DailyDataDateFunction | undefined,
    dataPoints: DeviceDataV2Point[]
): void {
    jest.spyOn(dailyDataFunctions, 'queryForDailyDataPointsV2').mockImplementation(
        (
            actualNamespace: DeviceDataV2Namespace,
            actualType: string,
            actualStartDate: Date,
            actualEndDate: Date,
            actualDateFn?: DailyDataDateFunction
        ): Promise<DeviceDataV2Point[]> => {
            if (actualNamespace !== expectedNamespace) return Promise.reject();
            if (actualType !== expectedType) return Promise.reject();
            if (!isEqual(actualStartDate, expectedStartDate)) return Promise.reject();
            if (!isEqual(actualEndDate, expectedEndDate)) return Promise.reject();
            if (actualDateFn !== expectedDateFn) return Promise.reject();
            return Promise.resolve(dataPoints);
        }
    );
}

export function setupDailyTimeRanges(
    expectedDataPoints: (DeviceDataPoint | DeviceDataV2Point)[],
    timeRanges: DailyTimeRanges,
    expectedOffset?: number
): void {
    jest.spyOn(timeRangeFunctions, 'computeDailyTimeRanges').mockImplementation(
        (
            actualDataPoints: (DeviceDataPoint | DeviceDataV2Point)[],
            actualOffsetHours?: number
        ): DailyTimeRanges => {
            if (JSON.stringify(actualDataPoints) !== JSON.stringify(expectedDataPoints)) return {};
            if (actualOffsetHours !== expectedOffset) return {}
            return timeRanges;
        }
    );
}

export function setupMinutesResult(
    expectedStartDate: Date,
    expectedEndDate: Date,
    expectedDailyTimeRanges: DailyTimeRanges,
    result: DailyDataQueryResult
): void {
    jest.spyOn(timeRangeFunctions, 'buildMinutesResultFromDailyTimeRanges').mockImplementation(
        (
            actualStartDate: Date,
            actualEndDate: Date,
            actualDailyTimeRanges: DailyTimeRanges
        ): DailyDataQueryResult => {
            if (!isEqual(actualStartDate, expectedStartDate)) return {};
            if (!isEqual(actualEndDate, expectedEndDate)) return {};
            if (JSON.stringify(actualDailyTimeRanges) !== JSON.stringify(expectedDailyTimeRanges)) return {};
            return result;
        }
    );
}

export function createEmptyCombinedDataCollectionSettings(): CombinedDataCollectionSettings {
    return {
        settings: {
            queryableDeviceDataTypes: [] as QueryableDeviceDataType[]
        } as DataCollectionSettings,
        deviceDataV2Types: []
    };
}

export function setupCombinedDataCollectionSettings(expectedUseV2: boolean, settings: CombinedDataCollectionSettings): void {
    jest.spyOn(dataCollectionSettingsFunctions, 'getCombinedDataCollectionSettings').mockImplementation(
        async (actualUseV2: boolean = false): Promise<CombinedDataCollectionSettings> => {
            return actualUseV2 === expectedUseV2 ? settings : {} as CombinedDataCollectionSettings;
        }
    );
}

export function createMockResult(): DailyDataQueryResult {
    return { 'SomeDate': Math.random() * 10000 };
}

export function setupDailyDataProvider(mock: jest.Mock, expectedStartDate: Date, expectedEndDate: Date, result: DailyDataQueryResult): void {
    mock.mockImplementation(async (actualStartDate: Date, actualEndDate: Date): Promise<DailyDataQueryResult> => {
        if (!isEqual(actualStartDate, expectedStartDate)) return {};
        if (!isEqual(actualEndDate, expectedEndDate)) return {};
        return result;
    });
}

export function setupCombinedFirstValueResult(
    expectedStartDate: Date,
    expectedEndDate: Date,
    expectedResultsToCombine: DailyDataQueryResult[],
    result: DailyDataQueryResult
): void {
    setupCombinedResult('combineResultsUsingFirstValue', expectedStartDate, expectedEndDate, expectedResultsToCombine, result);
}

export function setupCombinedMaxValueResult(
    expectedStartDate: Date,
    expectedEndDate: Date,
    expectedResultsToCombine: DailyDataQueryResult[],
    result: DailyDataQueryResult
): void {
    setupCombinedResult('combineResultsUsingMaxValue', expectedStartDate, expectedEndDate, expectedResultsToCombine, result);
}

export function setupCombinedRoundedAverageValueResult(
    expectedStartDate: Date,
    expectedEndDate: Date,
    expectedResultsToCombine: DailyDataQueryResult[],
    result: DailyDataQueryResult
): void {
    setupCombinedResult('combineResultsUsingRoundedAverageValue', expectedStartDate, expectedEndDate, expectedResultsToCombine, result);
}

export function setupCombinedResult(
    functionName: 'combineResultsUsingFirstValue' | 'combineResultsUsingMaxValue' | 'combineResultsUsingRoundedAverageValue',
    expectedStartDate: Date,
    expectedEndDate: Date,
    expectedResultsToCombine: DailyDataQueryResult[],
    result: DailyDataQueryResult
): void {
    jest.spyOn(dailyDataFunctions, functionName).mockImplementation(
        (
            actualStartDate: Date,
            actualEndDate: Date,
            actualResultsToCombine: DailyDataQueryResult[]
        ): DailyDataQueryResult => {
            if (!isEqual(actualStartDate, expectedStartDate)) return {};
            if (!isEqual(actualEndDate, expectedEndDate)) return {};
            if (JSON.stringify(actualResultsToCombine) !== JSON.stringify(expectedResultsToCombine)) return {};
            return result;
        }
    );
}

export function getV1DateString(date: Date): string {
    const getOffsetHours = (date: Date, adjustment: number): string => {
        const offsetHours = (-date.getTimezoneOffset() / 60) + adjustment;
        const offsetHoursString = String(Math.abs(offsetHours)).padStart(2, '0');
        return offsetHours < 0 ? `-${offsetHoursString}` : `+${offsetHoursString}`;
    };
    // The offset manipulation here is to show that offsets are ignored when parsing dates from V1 data points.
    return format(date, `yyyy-MM-dd'T'HH:mm:ss'${getOffsetHours(date, 3)}:00'`)
}

export function getV2DateString(date: Date): string {
    return format(date, 'yyyy-MM-dd\'T\'HH:mm:ss');
}