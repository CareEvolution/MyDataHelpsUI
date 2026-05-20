import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupAggregateDailyData } from '../../fixtures/daily-data-providers';
import healthConnectMaxBloodGlucose from '../../../src/helpers/daily-data-providers/health-connect-max-blood-glucose';

describe('Daily Data Provider - Health Connect Max Blood Glucose', () => {
    it('Should query for aggregate daily data and return the maximum values keyed by date.', async () => {
        setupAggregateDailyData('HealthConnect', 'blood-glucose', sampleStartDate, sampleEndDate, 'max', sampleResult, 18);
        expect(await healthConnectMaxBloodGlucose(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
