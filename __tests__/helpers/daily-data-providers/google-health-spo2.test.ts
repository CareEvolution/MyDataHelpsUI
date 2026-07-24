import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import googleHealthSpO2 from '../../../src/helpers/daily-data-providers/google-health-spo2';

describe('Daily Data Provider - Google Health SpO2', () => {
    it('Should query the daily oxygen saturation average and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'dailyOxygenSaturation-list-avg', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await googleHealthSpO2(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
