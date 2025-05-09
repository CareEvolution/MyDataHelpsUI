import { DailyDataQueryResult } from '../../query-daily-data';
import { add, compareDesc } from 'date-fns';
import getDayKey from '../../get-day-key';
import { DailyData, DailyDataV2, DailyDataValueFunction, getFloatValue } from './daily-data-type';

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