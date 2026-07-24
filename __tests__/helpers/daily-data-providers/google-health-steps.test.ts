import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import googleHealthSteps from '../../../src/helpers/daily-data-providers/google-health-steps';

describe('Daily Data Provider - Google Health Steps', () => {
    it('Should query steps-daily and build a most recent value result keyed by start date.', async () => {
        setupDailyDataV2('GoogleHealth', 'steps-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await googleHealthSteps(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
