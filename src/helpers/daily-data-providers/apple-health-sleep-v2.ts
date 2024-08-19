import { querySleepMinutesV2 } from './common-sleep-v2';

export function totalSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['AsleepCore', 'AsleepREM', 'AsleepDeep', 'Asleep']);
}

export function coreSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['AsleepCore']);
}

export function remSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['AsleepREM']);
}

export function deepSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('AppleHealth', 'Sleep Analysis', startDate, endDate, ['AsleepDeep']);
}