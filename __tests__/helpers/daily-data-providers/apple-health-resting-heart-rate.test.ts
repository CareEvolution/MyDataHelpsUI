import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupAggregateDailyData } from '../../fixtures/daily-data-providers';
import appleHealthRestingHeartRate from '../../../src/helpers/daily-data-providers/apple-health-resting-heart-rate';

describe('Daily Data Provider - Apple Health Resting Heart Rate', () => {
    it('Should query for aggregate daily data and return the average values keyed by date.', async () => {
        setupAggregateDailyData('AppleHealth', 'Resting Heart Rate', sampleStartDate, sampleEndDate, 'avg', sampleResult);
        expect(await appleHealthRestingHeartRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
