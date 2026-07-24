import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import googleHealthDistance from '../../../src/helpers/daily-data-providers/google-health-distance';

describe('Daily Data Provider - Google Health Distance', () => {
    it('Should query distance-daily with a millimeters-to-meters value function.', async () => {
        setupDailyDataV2('GoogleHealth', 'distance-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => !!valueFn && valueFn({ value: '1000' } as any) === 1);
        expect(await googleHealthDistance(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
