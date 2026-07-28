import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupAggregateDailyData } from '../../fixtures/daily-data-providers';
import appleHealthBloodGlucose from '../../../src/helpers/daily-data-providers/apple-health-blood-glucose';

describe('Daily Data Provider - Apple Health Blood Glucose', () => {
    it('Should query for aggregate daily data and return the average values keyed by date.', async () => {
        setupAggregateDailyData('AppleHealth', 'Blood Glucose', sampleStartDate, sampleEndDate, 'avg', sampleResult);
        expect(await appleHealthBloodGlucose(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
