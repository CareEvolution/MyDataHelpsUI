import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import healthConnectTotalCaloriesBurned from '../../../src/helpers/daily-data-providers/health-connect-total-calories-burned';

describe('Daily Data Provider - Health Connect Total Calories Burned', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyDataV2('HealthConnect', 'total-calories-burned-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await healthConnectTotalCaloriesBurned(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
