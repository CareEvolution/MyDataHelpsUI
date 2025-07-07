import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import healthConnectSteps from '../../../src/helpers/daily-data-providers/health-connect-steps';

describe('Daily Data Provider - Health Connect Steps', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyDataV2('HealthConnect', 'steps-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await healthConnectSteps(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
