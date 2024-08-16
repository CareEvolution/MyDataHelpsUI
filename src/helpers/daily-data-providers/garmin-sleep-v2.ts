﻿import { querySleepMinutesV2 } from './common-sleep-v2';

export function totalSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('Garmin', 'sleep-levels', startDate, endDate, ['light', 'rem', 'deep']);
}

export function lightSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('Garmin', 'sleep-levels', startDate, endDate, ['light']);
}

export function remSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('Garmin', 'sleep-levels', startDate, endDate, ['rem']);
}

export function deepSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('Garmin', 'sleep-levels', startDate, endDate, ['deep']);
}