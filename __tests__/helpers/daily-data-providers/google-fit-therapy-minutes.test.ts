import { describe, expect, it } from '@jest/globals';
import { sampleDataPoints, sampleEndDate, sampleResult, sampleStartDate, sampleTimeRanges, setupDailyDataPoints, setupDailyTimeRanges, setupMinutesResult } from '../../fixtures/daily-data-providers';
import googleFitTherapyMinutes from '../../../src/helpers/daily-data-providers/google-fit-therapy-minutes';

describe('Daily Data Provider - Google Fit Therapy Minutes', () => {
    it('Should query for daily data points and build a minutes result.', async () => {
        setupDailyDataPoints('GoogleFit', 'SilverCloudSession', sampleStartDate, sampleEndDate, undefined, sampleDataPoints);
        setupDailyTimeRanges(sampleDataPoints, sampleTimeRanges);
        setupMinutesResult(sampleStartDate, sampleEndDate, sampleTimeRanges, sampleResult);

        expect(await googleFitTherapyMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
