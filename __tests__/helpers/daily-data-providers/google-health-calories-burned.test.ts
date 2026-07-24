import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import googleHealthCaloriesBurned from '../../../src/helpers/daily-data-providers/google-health-calories-burned';

describe('Daily Data Provider - Google Health Calories Burned', () => {
    it('Should query totalCalories-daily and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'totalCalories-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await googleHealthCaloriesBurned(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
