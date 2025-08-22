import { DailyDataQueryResult } from '../query-daily-data';
import { buildMostRecentValueResult, getStartDate, queryForDailyDataV2 } from './daily-data';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyDataV2('HealthConnect', 'active-calories-burned-daily', startDate, endDate, getStartDate);
    return buildMostRecentValueResult(dailyData);
}