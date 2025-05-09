import { describe, expect, test } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, sampleTimeRanges, setupDailyDataPointsV2, setupDailyTimeRanges, setupMinutesResult } from '../../fixtures/daily-data-providers';
import { DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { deepSleepMinutes, lightSleepMinutes, remSleepMinutes, totalSleepMinutes } from '../../../src/helpers/daily-data-providers/garmin-sleep-v2';

describe('Daily Data Provider - Garmin Sleep V2', () => {
    test.each([
        { title: 'Light', sleepFunction: lightSleepMinutes, levels: ['light'] },
        { title: 'REM', sleepFunction: remSleepMinutes, levels: ['rem'] },
        { title: 'Deep', sleepFunction: deepSleepMinutes, levels: ['deep'] },
        { title: 'Total', sleepFunction: totalSleepMinutes, levels: ['light', 'rem', 'deep'] }
    ])('$title - Should query for daily data points, filter by sleep level, and build a minutes result.', async ({ sleepFunction, levels }) => {
        const dataPoints: DeviceDataV2Point[] = [{ value: 'Other' } as DeviceDataV2Point];
        levels.forEach(level => {
            dataPoints.push({ value: level } as DeviceDataV2Point);
        });

        setupDailyDataPointsV2('Garmin', 'sleep-levels', sampleStartDate, sampleEndDate, undefined, dataPoints);
        setupDailyTimeRanges(dataPoints.slice(1), sampleTimeRanges, -6);
        setupMinutesResult(sampleStartDate, sampleEndDate, sampleTimeRanges, sampleResult);

        expect(await sleepFunction(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
