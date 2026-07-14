import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import googleHealthHrv from '../../../src/helpers/daily-data-providers/google-health-hrv';

describe('Daily Data Provider - Google Health HRV', () => {
    it('Should query the daily heart rate variability list and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'dailyHeartRateVariability-list-averageRmssd', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await googleHealthHrv(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
