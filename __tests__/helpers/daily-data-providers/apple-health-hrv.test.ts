import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupAverageValueResult, setupDailyData, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import appleHealthHrv from '../../../src/helpers/daily-data-providers/apple-health-hrv';

describe('Daily Data Provider - Apple Health HRV', () => {
    it('Should query for daily data and build an average value result keyed by start date.', async () => {
        setupDailyData('AppleHealth', 'HeartRateVariability', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupAverageValueResult(sampleDailyData, sampleResult);
        expect(await appleHealthHrv(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
