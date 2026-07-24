import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import googleHealthRestingHeartRate from '../../../src/helpers/daily-data-providers/google-health-resting-heart-rate';

describe('Daily Data Provider - Google Health Resting Heart Rate', () => {
    it('Should query the daily resting heart rate list and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'dailyRestingHeartRate-list-beatsPerMinute', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await googleHealthRestingHeartRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
