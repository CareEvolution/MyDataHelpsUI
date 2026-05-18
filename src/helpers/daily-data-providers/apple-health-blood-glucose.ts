import { DailyDataQueryResult } from '../query-daily-data';
import { buildAverageValueResult, buildMaxValueResult, buildMinValueResult, DailyDataV2, getObservationDate, queryForDailyDataV2 } from './daily-data';

async function queryBloodGlucose(startDate: Date, endDate: Date): Promise<DailyDataV2> {
    return queryForDailyDataV2('AppleHealth', 'Blood Glucose', startDate, endDate, getObservationDate);
}

export async function averageBloodGlucose(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryBloodGlucose(startDate, endDate);
    return buildAverageValueResult(dailyData);
}

export async function minBloodGlucose(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryBloodGlucose(startDate, endDate);
    return buildMinValueResult(dailyData);
}

export async function maxBloodGlucose(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryBloodGlucose(startDate, endDate);
    return buildMaxValueResult(dailyData);
}