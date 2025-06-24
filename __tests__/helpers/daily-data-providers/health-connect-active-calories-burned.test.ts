import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import healthConnectActiveCaloriesBurned from '../../../src/helpers/daily-data-providers/health-connect-active-calories-burned';

describe('Daily Data Provider - Health Connect Active Calories Burned', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyDataV2('HealthConnect', 'active-calories-burned-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await healthConnectActiveCaloriesBurned(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
