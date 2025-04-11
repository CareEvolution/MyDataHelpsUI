import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupAverageValueResult, setupDailyData, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import appleHealthWalkingHeartRateAverage from '../../../src/helpers/daily-data-providers/apple-health-walking-heart-rate-average';

describe('Daily Data Provider - Apple Health Walking Heart Rate Average', () => {
    it('Should query for daily data and build an average value result keyed by start date.', async () => {
        setupDailyData('AppleHealth', 'WalkingHeartRateAverage', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupAverageValueResult(sampleDailyData, sampleResult);
        expect(await appleHealthWalkingHeartRateAverage(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
