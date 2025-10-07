import queryOuraDailyActivity from './query-oura-daily-activity';
import { DailyDataQueryResult } from '../query-daily-data';

export default function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryOuraDailyActivity(startDate, endDate, 'active_calories');
}
