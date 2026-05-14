import { DailyDataQueryResult } from '../query-daily-data';
import { buildMinutesResultFromDailyTimeRanges, computeDailyTimeRanges } from '../time-range';
import { queryForDailyDataPointsV2 } from './daily-data';

export const EXERCISE_SESSION_FILTERS = { dataSource: { dataOriginPackageName: 'com.silvercloudhealth.android.app' } };

export default async function(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dataPoints = await queryForDailyDataPointsV2('HealthConnect', 'exercise-session', startDate, endDate, EXERCISE_SESSION_FILTERS);
    const dailyTimeRanges = computeDailyTimeRanges(dataPoints);
    return buildMinutesResultFromDailyTimeRanges(startDate, endDate, dailyTimeRanges);
}