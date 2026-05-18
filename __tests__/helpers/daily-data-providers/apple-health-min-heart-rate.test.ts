import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupAggregateDailyData } from '../../fixtures/daily-data-providers';
import appleHealthMinHeartRate from '../../../src/helpers/daily-data-providers/apple-health-min-heart-rate';

describe('Daily Data Provider - Apple Health Min Heart Rate', () => {
    it('Should query for aggregate daily data and return the minimum values keyed by date.', async () => {
        setupAggregateDailyData('AppleHealth', 'Hourly Minimum Heart Rate', sampleStartDate, sampleEndDate, 'min', sampleResult);
        expect(await appleHealthMinHeartRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
