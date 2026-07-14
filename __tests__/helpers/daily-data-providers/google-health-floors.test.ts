import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import googleHealthFloors from '../../../src/helpers/daily-data-providers/google-health-floors';

describe('Daily Data Provider - Google Health Floors', () => {
    it('Should query floors-daily and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'floors-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await googleHealthFloors(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
