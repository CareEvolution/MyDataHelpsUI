import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupTotalValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import appleHealthNumberOfAlcoholicBeverages from '../../../src/helpers/daily-data-providers/apple-health-number-of-alcoholic-beverages';

describe('Daily Data Provider - Apple Health Number Of Alcoholic Beverages', () => {
    it('Should query for daily data and build a total value result keyed by start date.', async () => {
        setupDailyData('AppleHealth', 'NumberOfAlcoholicBeverages', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupTotalValueResult(sampleDailyData, sampleResult);
        expect(await appleHealthNumberOfAlcoholicBeverages(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
