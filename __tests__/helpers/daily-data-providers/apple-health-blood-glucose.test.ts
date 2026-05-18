import { describe, expect, it } from '@jest/globals';
import { observationDateFunctionEvaluator, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupAverageValueResult, setupDailyDataV2, setupMaxValueResult, setupMinValueResult } from '../../fixtures/daily-data-providers';
import { averageBloodGlucose, maxBloodGlucose, minBloodGlucose } from '../../../src/helpers/daily-data-providers/apple-health-blood-glucose';

describe('Daily Data Provider - Apple Health Blood Glucose', () => {
    it('Average - Should query for daily data and build an average value result keyed by observation date.', async () => {
        setupDailyDataV2('AppleHealth', 'Blood Glucose', sampleStartDate, sampleEndDate, observationDateFunctionEvaluator, sampleDailyDataV2);
        setupAverageValueResult(sampleDailyDataV2, sampleResult);
        expect(await averageBloodGlucose(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Min - Should query for daily data and build a minimum value result keyed by observation date.', async () => {
        setupDailyDataV2('AppleHealth', 'Blood Glucose', sampleStartDate, sampleEndDate, observationDateFunctionEvaluator, sampleDailyDataV2);
        setupMinValueResult(sampleDailyDataV2, sampleResult);
        expect(await minBloodGlucose(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Max - Should query for daily data and build a maximum value result keyed by observation date.', async () => {
        setupDailyDataV2('AppleHealth', 'Blood Glucose', sampleStartDate, sampleEndDate, observationDateFunctionEvaluator, sampleDailyDataV2);
        setupMaxValueResult(sampleDailyDataV2, sampleResult);
        expect(await maxBloodGlucose(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
