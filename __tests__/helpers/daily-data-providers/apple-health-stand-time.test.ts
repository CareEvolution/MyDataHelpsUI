import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupTotalValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import appleHealthStandTime from '../../../src/helpers/daily-data-providers/apple-health-stand-time';

describe('Daily Data Provider - Apple Health Stand Time', () => {
    it('Should query for daily data and build a total value result keyed by start date.', async () => {
        setupDailyData('AppleHealth', 'AppleStandTime', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupTotalValueResult(sampleDailyData, sampleResult);
        expect(await appleHealthStandTime(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
