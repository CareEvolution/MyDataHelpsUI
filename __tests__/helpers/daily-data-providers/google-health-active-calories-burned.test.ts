import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import googleHealthActiveCaloriesBurned from '../../../src/helpers/daily-data-providers/google-health-active-calories-burned';

describe('Daily Data Provider - Google Health Active Calories Burned', () => {
    it('Should query activeEnergyBurned-daily and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'activeEnergyBurned-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await googleHealthActiveCaloriesBurned(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
