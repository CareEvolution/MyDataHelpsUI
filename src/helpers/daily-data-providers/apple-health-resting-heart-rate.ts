import { DailyDataQueryResult } from '../query-daily-data';
import { queryAggregateDailyData } from './daily-data/daily-data-aggregate';

export default async function(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryAggregateDailyData('AppleHealth', 'Resting Heart Rate', startDate, endDate, 'avg');
}