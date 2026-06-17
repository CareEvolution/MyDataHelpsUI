import { describe, expect, it } from '@jest/globals';
import { sampleDataPointsV2, sampleEndDate, sampleResult, sampleStartDate, sampleTimeRanges, setupDailyDataPointsV2, setupDailyTimeRanges, setupMinutesResult } from '../../fixtures/daily-data-providers';
import healthConnectMindfulMinutes from '../../../src/helpers/daily-data-providers/health-connect-mindful-minutes';

describe('Daily Data Provider - Health Connect Mindful Minutes', () => {
    it('Should query for daily data points and build a minutes result.', async () => {
        setupDailyDataPointsV2('HealthConnect', 'mindfulness-sessions', sampleStartDate, sampleEndDate, undefined, undefined, sampleDataPointsV2);
        setupDailyTimeRanges(sampleDataPointsV2, sampleTimeRanges);
        setupMinutesResult(sampleStartDate, sampleEndDate, sampleTimeRanges, sampleResult);

        expect(await healthConnectMindfulMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
