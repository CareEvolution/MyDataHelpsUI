import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupAverageValueResult, setupDailyData, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import appleHealthRestingHeartRate from '../../../src/helpers/daily-data-providers/apple-health-resting-heart-rate';

describe('Daily Data Provider - Apple Health Resting Heart Rate', () => {
    it('Should query for daily data and build an average value result keyed by start date.', async () => {
        setupDailyData('AppleHealth', 'RestingHeartRate', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupAverageValueResult(sampleDailyData, sampleResult);
        expect(await appleHealthRestingHeartRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
