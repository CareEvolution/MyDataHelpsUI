import { DailyDataQueryResult } from '../query-daily-data';
import { queryAggregateDailyData } from './daily-data/daily-data-aggregate';

// Blood glucose values from Health Connect are in mmol/L. Multiplying by 18 converts to mg/dL,
// based on glucose's molecular weight of ~180.16 g/mol (1 mmol/L ≈ 18.016 mg/dL, conventionally rounded to 18).
const MMOL_TO_MGDL_SCALE_FACTOR = 18;

export default async function(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryAggregateDailyData('HealthConnect', 'blood-glucose', startDate, endDate, 'min', MMOL_TO_MGDL_SCALE_FACTOR);
}