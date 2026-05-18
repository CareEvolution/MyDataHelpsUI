import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupAggregateDailyData } from '../../fixtures/daily-data-providers';
import appleHealthMaxBloodGlucose from '../../../src/helpers/daily-data-providers/apple-health-max-blood-glucose';

describe('Daily Data Provider - Apple Health Max Blood Glucose', () => {
    it('Should query for aggregate daily data and return the maximum values keyed by date.', async () => {
        setupAggregateDailyData('AppleHealth', 'Blood Glucose', sampleStartDate, sampleEndDate, 'max', sampleResult);
        expect(await appleHealthMaxBloodGlucose(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
