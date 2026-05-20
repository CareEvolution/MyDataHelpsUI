import { DailyDataQueryResult } from '../query-daily-data';
import { queryAggregateDailyData } from './daily-data/daily-data-aggregate';

const MMOL_TO_MGDL_SCALE_FACTOR = 18;

export default async function(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryAggregateDailyData('HealthConnect', 'blood-glucose', startDate, endDate, 'min', MMOL_TO_MGDL_SCALE_FACTOR);
}