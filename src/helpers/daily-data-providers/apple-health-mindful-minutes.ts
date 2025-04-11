import { DailyDataQueryResult } from '../query-daily-data';
import { isSilverCloudCbtDataPoint } from './common-mindful-and-therapy';
import { buildMinutesResultFromDailyTimeRanges, computeDailyTimeRanges } from '../time-range';
import { queryForDailyDataPoints } from './daily-data';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dataPoints = await queryForDailyDataPoints('AppleHealth', 'MindfulSession', startDate, endDate);
    const dailyTimeRanges = computeDailyTimeRanges(dataPoints.filter(dataPoint => !isSilverCloudCbtDataPoint(dataPoint)));
    return buildMinutesResultFromDailyTimeRanges(startDate, endDate, dailyTimeRanges);
}