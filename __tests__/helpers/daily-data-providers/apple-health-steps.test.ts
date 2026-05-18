import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupAggregateDailyData } from '../../fixtures/daily-data-providers';
import appleHealthSteps from '../../../src/helpers/daily-data-providers/apple-health-steps';

describe('Daily Data Provider - Apple Health Steps', () => {
    it('Should query for aggregate daily data and return the sum of values keyed by date.', async () => {
        setupAggregateDailyData('AppleHealth', 'Hourly Steps', sampleStartDate, sampleEndDate, 'sum', sampleResult);
        expect(await appleHealthSteps(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
