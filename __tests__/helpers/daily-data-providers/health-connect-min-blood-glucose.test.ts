import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupAggregateDailyData } from '../../fixtures/daily-data-providers';
import healthConnectMinBloodGlucose from '../../../src/helpers/daily-data-providers/health-connect-min-blood-glucose';

describe('Daily Data Provider - Health Connect Min Blood Glucose', () => {
    it('Should query for aggregate daily data and return the minimum values keyed by date.', async () => {
        setupAggregateDailyData('HealthConnect', 'blood-glucose', sampleStartDate, sampleEndDate, 'min', sampleResult, 18);
        expect(await healthConnectMinBloodGlucose(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
