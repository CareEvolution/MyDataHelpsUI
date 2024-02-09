import { DailyDataQueryResult } from '../../../../helpers/query-daily-data';
import { queryAsthmaDeviceData } from './shared';

export default function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryAsthmaDeviceData('NighttimeBloodOxygenLevel', startDate, endDate);
}
