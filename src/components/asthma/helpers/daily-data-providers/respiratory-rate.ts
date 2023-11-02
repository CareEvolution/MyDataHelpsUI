import { DailyDataQueryResult } from '../../../../helpers/query-daily-data';
import { collateLatestDataPoints, queryAsthmaDeviceData } from './shared';

export default function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryAsthmaDeviceData('Project', 'RespiratoryRate', startDate, endDate, collateLatestDataPoints);
}
