import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import googleHealthWearMinutes from '../../../src/helpers/daily-data-providers/google-health-wear-minutes';

describe('Daily Data Provider - Google Health Wear Minutes', () => {
    it('Should query wearTime-daily and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'wearTime-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await googleHealthWearMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
