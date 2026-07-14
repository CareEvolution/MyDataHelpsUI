import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { averageHeartRate, maxHeartRate, minHeartRate } from '../../../src/helpers/daily-data-providers/google-health-heart-rate';

describe('Daily Data Provider - Google Health Heart Rate', () => {
    it('Max: should query heartRate-daily-max and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'heartRate-daily-max', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await maxHeartRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Min: should query heartRate-daily-min and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'heartRate-daily-min', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await minHeartRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Average: should query heartRate-daily-avg and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'heartRate-daily-avg', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await averageHeartRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
