import { DailyDataQueryResult } from '../query-daily-data';
import { buildMaxValueResult, getObservationDate, queryForDailyData } from './daily-data';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData('AirNowApi', 'WorkAirQuality', startDate, endDate, getObservationDate);
    return buildMaxValueResult(dailyData);
}
