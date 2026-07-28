import { DailyDataQueryResult } from '../query-daily-data';
import { querySleepMinutesV2 } from './common-sleep-v2';

export function inBedTime(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['InBed']);
}

export function asleepCoreTime(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['AsleepCore']);
}

export function asleepRemTime(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['AsleepREM']);
}

export function asleepDeepTime(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['AsleepDeep']);
}

export function asleepTime(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['AsleepCore', 'AsleepREM', 'AsleepDeep', 'Asleep']);
}