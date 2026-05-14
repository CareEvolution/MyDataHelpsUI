import { describe, expect, it } from '@jest/globals';
import { sampleDataPointsV2, sampleEndDate, sampleResult, sampleStartDate, sampleTimeRanges, setupDailyDataPointsV2, setupDailyTimeRanges, setupMinutesResult } from '../../fixtures/daily-data-providers';
import healthConnectTherapyMinutes, { EXERCISE_SESSION_FILTERS } from '../../../src/helpers/daily-data-providers/health-connect-therapy-minutes';

describe('Daily Data Provider - Health Connect Therapy Minutes', () => {
    it('Should query for daily data points with the appropriate filters and build a minutes result.', async () => {
        setupDailyDataPointsV2('HealthConnect', 'exercise-session', sampleStartDate, sampleEndDate, EXERCISE_SESSION_FILTERS, undefined, sampleDataPointsV2);
        setupDailyTimeRanges(sampleDataPointsV2, sampleTimeRanges);
        setupMinutesResult(sampleStartDate, sampleEndDate, sampleTimeRanges, sampleResult);

        expect(await healthConnectTherapyMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
