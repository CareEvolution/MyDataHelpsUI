import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupAggregateDailyData } from '../../fixtures/daily-data-providers';
import appleHealthMaxHeartRate from '../../../src/helpers/daily-data-providers/apple-health-max-heart-rate';

describe('Daily Data Provider - Apple Health Max Heart Rate', () => {
    it('Should query for aggregate daily data and return the maximum values keyed by date.', async () => {
        setupAggregateDailyData('AppleHealth', 'Hourly Maximum Heart Rate', sampleStartDate, sampleEndDate, 'max', sampleResult);
        expect(await appleHealthMaxHeartRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
