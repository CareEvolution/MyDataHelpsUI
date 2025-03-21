import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupTotalValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import appleHealthActiveEnergyBurned from '../../../src/helpers/daily-data-providers/apple-health-active-energy-burned';

describe('Daily Data Provider - Apple Health Active Energy Burned', () => {
    it('Should query for daily data and build a total value result keyed by start date.', async () => {
        setupDailyData('AppleHealth', 'ActiveEnergyBurned', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupTotalValueResult(sampleDailyData, sampleResult);
        expect(await appleHealthActiveEnergyBurned(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
