import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMaxValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import appleHealthMaxHeartRate from '../../../src/helpers/daily-data-providers/apple-health-max-heart-rate';

describe('Daily Data Provider - Apple Health Max Heart Rate', () => {
    it('Should query for daily data and build a max value result keyed by start date.', async () => {
        setupDailyData('AppleHealth', 'HourlyMaximumHeartRate', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMaxValueResult(sampleDailyData, sampleResult);
        expect(await appleHealthMaxHeartRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
