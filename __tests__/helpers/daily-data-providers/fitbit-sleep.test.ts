import { describe, expect, test } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupTotalValueResult, sleepDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { deepSleepMinutes, lightSleepMinutes, remSleepMinutes, totalSleepMinutes } from '../../../src/helpers/daily-data-providers/fitbit-sleep';

describe('Daily Data Provider - Fitbit Sleep', () => {
    test.each([
        { title: 'Light', sleepFunction: lightSleepMinutes, types: ["SleepLevelLight"] },
        { title: 'REM', sleepFunction: remSleepMinutes, types: ["SleepLevelRem"] },
        { title: 'Deep', sleepFunction: deepSleepMinutes, types: ["SleepLevelDeep"] },
        { title: 'Total', sleepFunction: totalSleepMinutes, types: ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"] }
    ])('$title - Should query for daily data and build a total value result keyed by observation date + 6 hours.', async ({ sleepFunction, types }) => {
        setupDailyData('Fitbit', types, sampleStartDate, sampleEndDate, sleepDateFunctionEvaluator, sampleDailyData);
        setupTotalValueResult(sampleDailyData, sampleResult);

        expect(await sleepFunction(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
