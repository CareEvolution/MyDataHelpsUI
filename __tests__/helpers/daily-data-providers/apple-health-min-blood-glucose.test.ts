import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupAggregateDailyData } from '../../fixtures/daily-data-providers';
import appleHealthMinBloodGlucose from '../../../src/helpers/daily-data-providers/apple-health-min-blood-glucose';

describe('Daily Data Provider - Apple Health Min Blood Glucose', () => {
    it('Should query for aggregate daily data and return the minimum values keyed by date.', async () => {
        setupAggregateDailyData('AppleHealth', 'Blood Glucose', sampleStartDate, sampleEndDate, 'min', sampleResult);
        expect(await appleHealthMinBloodGlucose(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
