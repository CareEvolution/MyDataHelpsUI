import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import healthConnectMinHeartRate from '../../../src/helpers/daily-data-providers/health-connect-min-heart-rate';

describe('Daily Data Provider - Health Connect Min Heart Rate', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyDataV2('HealthConnect', 'heart-rate-daily-minimum', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await healthConnectMinHeartRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
