import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import healthConnectDistance from '../../../src/helpers/daily-data-providers/health-connect-distance';

describe('Daily Data Provider - Health Connect Distance', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyDataV2('HealthConnect', 'distance-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await healthConnectDistance(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
