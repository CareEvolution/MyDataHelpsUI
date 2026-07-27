import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupAggregateDailyData } from '../../fixtures/daily-data-providers';
import healthConnectBloodGlucose from '../../../src/helpers/daily-data-providers/health-connect-blood-glucose';

describe('Daily Data Provider - Health Connect Blood Glucose', () => {
    it('Should query for aggregate daily data and return the average values keyed by date.', async () => {
        setupAggregateDailyData('HealthConnect', 'blood-glucose', sampleStartDate, sampleEndDate, 'avg', sampleResult, 18);
        expect(await healthConnectBloodGlucose(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
