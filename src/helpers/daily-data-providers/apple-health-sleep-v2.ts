import { querySleepMinutesV2 } from './common-sleep-v2';
import { DailyDataQueryResult } from '../query-daily-data';

export function totalSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['AsleepCore', 'AsleepREM', 'AsleepDeep', 'Asleep']);
}

export function coreSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['AsleepCore']);
}

export function remSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['AsleepREM']);
}

export function deepSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['AsleepDeep']);
}