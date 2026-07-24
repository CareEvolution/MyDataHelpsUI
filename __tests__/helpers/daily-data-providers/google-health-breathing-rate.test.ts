import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import googleHealthBreathingRate from '../../../src/helpers/daily-data-providers/google-health-breathing-rate';

describe('Daily Data Provider - Google Health Breathing Rate', () => {
    it('Should query the daily respiratory rate list and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'dailyRespiratoryRate-list-breathsPerMinute', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await googleHealthBreathingRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
