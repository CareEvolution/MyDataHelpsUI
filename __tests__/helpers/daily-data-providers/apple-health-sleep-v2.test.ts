import { describe, expect, test } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, sampleTimeRanges, setupDailyDataPointsV2, setupDailyTimeRanges, setupMinutesResult } from '../../fixtures/daily-data-providers';
import { DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { coreSleepMinutes, deepSleepMinutes, remSleepMinutes, totalSleepMinutes } from '../../../src/helpers/daily-data-providers/apple-health-sleep-v2';

describe('Daily Data Provider - Apple Health Sleep V2', () => {
    test.each([
        { title: 'Core', sleepFunction: coreSleepMinutes, levels: ['AsleepCore'] },
        { title: 'REM', sleepFunction: remSleepMinutes, levels: ['AsleepREM'] },
        { title: 'Deep', sleepFunction: deepSleepMinutes, levels: ['AsleepDeep'] },
        { title: 'Total', sleepFunction: totalSleepMinutes, levels: ['AsleepCore', 'AsleepREM', 'AsleepDeep', 'Asleep'] }
    ])('$title - Should query for daily data points, filter by sleep level, and build a minutes result.', async ({ sleepFunction, levels }) => {
        const dataPoints: DeviceDataV2Point[] = [{ value: 'Other' } as DeviceDataV2Point];
        levels.forEach(level => {
            dataPoints.push({ value: level } as DeviceDataV2Point);
        });

        setupDailyDataPointsV2('AppleHealth', 'Sleep Analysis', sampleStartDate, sampleEndDate, undefined, dataPoints);
        setupDailyTimeRanges(dataPoints.slice(1), sampleTimeRanges, -6);
        setupMinutesResult(sampleStartDate, sampleEndDate, sampleTimeRanges, sampleResult);

        expect(await sleepFunction(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
