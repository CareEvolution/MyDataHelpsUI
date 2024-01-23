import { DailyDataQueryResult } from '../../../../helpers/query-daily-data';
import { collateMaxValueDataPoints, queryAsthmaDeviceData } from './shared';

export default function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryAsthmaDeviceData('AirNowApi', 'WorkAirQuality', startDate, endDate, collateMaxValueDataPoints);
}
