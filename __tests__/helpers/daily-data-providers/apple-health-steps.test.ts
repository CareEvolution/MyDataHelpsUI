import { describe, expect, it } from '@jest/globals';
import { sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupTotalValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import appleHealthSteps from '../../../src/helpers/daily-data-providers/apple-health-steps';

describe('Daily Data Provider - Apple Health Steps', () => {
    it('Should query for daily data and build a total value result keyed by start date.', async () => {
        setupDailyDataV2('AppleHealth', 'Hourly Steps', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupTotalValueResult(sampleDailyDataV2, sampleResult);
        expect(await appleHealthSteps(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
