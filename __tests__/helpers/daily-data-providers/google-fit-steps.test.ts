import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupTotalValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import googleFitSteps from '../../../src/helpers/daily-data-providers/google-fit-steps';

describe('Daily Data Provider - Google Fit Steps', () => {
    it('Should query for daily data and build a total value result keyed by start date.', async () => {
        setupDailyData('GoogleFit', 'Steps', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupTotalValueResult(sampleDailyData, sampleResult);
        expect(await googleFitSteps(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
