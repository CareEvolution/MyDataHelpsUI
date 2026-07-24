import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupTotalValueResult, sleepDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { deepSleepMinutes, lightSleepMinutes, remSleepMinutes, totalSleepMinutes } from '../../../src/helpers/daily-data-providers/google-health-sleep';

describe('Daily Data Provider - Google Health Sleep', () => {
    // Sleep is dated by getSleepDate (observationDate + 6h) so a night's sleep is attributed to the wake-up day.
    it('Total: should sum per-session asleep minutes into a total value result, dated to the wake-up day.', async () => {
        setupDailyDataV2('GoogleHealth', 'sleep-list-session-asleep', sampleStartDate, sampleEndDate, sleepDateFunctionEvaluator, sampleDailyDataV2);
        setupTotalValueResult(sampleDailyData, sampleResult);
        expect(await totalSleepMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Light: should sum the light-stage summary minutes into a total value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'sleep-list-stages-summary-light-minutes', sampleStartDate, sampleEndDate, sleepDateFunctionEvaluator, sampleDailyDataV2);
        setupTotalValueResult(sampleDailyData, sampleResult);
        expect(await lightSleepMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('REM: should sum the rem-stage summary minutes into a total value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'sleep-list-stages-summary-rem-minutes', sampleStartDate, sampleEndDate, sleepDateFunctionEvaluator, sampleDailyDataV2);
        setupTotalValueResult(sampleDailyData, sampleResult);
        expect(await remSleepMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Deep: should sum the deep-stage summary minutes into a total value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'sleep-list-stages-summary-deep-minutes', sampleStartDate, sampleEndDate, sleepDateFunctionEvaluator, sampleDailyDataV2);
        setupTotalValueResult(sampleDailyData, sampleResult);
        expect(await deepSleepMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
