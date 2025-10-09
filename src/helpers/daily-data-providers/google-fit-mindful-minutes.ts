import { DailyDataQueryResult } from '../query-daily-data';
import { buildMinutesResultFromDailyTimeRanges, computeDailyTimeRanges } from '../time-range';
import { queryForDailyDataPoints } from './daily-data';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dataPoints = await queryForDailyDataPoints('GoogleFit', 'ActivitySegment', startDate, endDate);
    const dailyTimeRanges = computeDailyTimeRanges(dataPoints.filter(dataPoint => dataPoint.value === 'meditation'));
    return buildMinutesResultFromDailyTimeRanges(startDate, endDate, dailyTimeRanges);
}