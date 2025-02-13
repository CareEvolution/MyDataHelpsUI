import { querySleepMinutesV2 } from './common-sleep-v2';

export function totalSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('HealthConnect', 'sleep', startDate, endDate, ['STAGE_TYPE_LIGHT', 'STAGE_TYPE_REM', 'STAGE_TYPE_DEEP']);
}

export function lightSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('HealthConnect', 'sleep', startDate, endDate, ['STAGE_TYPE_LIGHT']);
}

export function remSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('HealthConnect', 'sleep', startDate, endDate, ['STAGE_TYPE_REM']);
}

export function deepSleepMinutes(startDate: Date, endDate: Date) {
    return querySleepMinutesV2('HealthConnect', 'sleep', startDate, endDate, ['STAGE_TYPE_DEEP']);
}
