import { querySleepMinutesV2 } from './common-sleep-v2';

// TODO: Remove namespace "as any" once MDH-JS gets updated.

export function totalSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('Garmin' as any, 'sleep-levels', startDate, endDate, ['light', 'rem', 'deep']);
}

export function lightSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('Garmin' as any, 'sleep-levels', startDate, endDate, ['light']);
}

export function remSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('Garmin' as any, 'sleep-levels', startDate, endDate, ['rem']);
}

export function deepSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('Garmin' as any, 'sleep-levels', startDate, endDate, ['deep']);
}