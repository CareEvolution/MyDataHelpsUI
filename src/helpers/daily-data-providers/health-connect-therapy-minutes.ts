import { DailyDataQueryResult } from '../query-daily-data';
import { buildMinutesResultFromDailyTimeRanges, computeDailyTimeRanges } from '../time-range';
import { queryForDailyDataPointsV2 } from './daily-data';

export default async function(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const filters = { dataSource: { dataOriginPackageName: 'com.silvercloudhealth.android.app' } };
    const dataPoints = await queryForDailyDataPointsV2('HealthConnect', 'exercise-session', startDate, endDate, filters);
    const dailyTimeRanges = computeDailyTimeRanges(dataPoints);
    return buildMinutesResultFromDailyTimeRanges(startDate, endDate, dailyTimeRanges);
}