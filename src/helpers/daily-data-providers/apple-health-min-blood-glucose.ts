import { DailyDataQueryResult } from '../query-daily-data';
import { queryAggregateDailyData } from './daily-data/daily-data-aggregate';

export default async function(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryAggregateDailyData('AppleHealth', 'Blood Glucose', startDate, endDate, 'min');
}