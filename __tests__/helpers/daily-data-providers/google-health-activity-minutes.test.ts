import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import * as dailyDataQueryFunctions from '../../../src/helpers/daily-data-providers/daily-data/daily-data-query';
import { fairlyActiveMinutes, lightlyActiveMinutes, sedentaryMinutes, totalActiveMinutes, veryActiveMinutes } from '../../../src/helpers/daily-data-providers/google-health-activity-minutes';

describe('Daily Data Provider - Google Health Activity Minutes', () => {
    beforeEach(() => jest.restoreAllMocks());

    it('Sedentary: should query sedentaryPeriod-daily with a seconds-to-minutes value function.', async () => {
        setupDailyDataV2('GoogleHealth', 'sedentaryPeriod-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => !!valueFn && valueFn({ value: '120' } as any) === 2);
        expect(await sedentaryMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Lightly active: should query activeMinutes-daily-light and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'activeMinutes-daily-light', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await lightlyActiveMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Fairly active: should query activeMinutes-daily-moderate and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'activeMinutes-daily-moderate', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await fairlyActiveMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Very active: should query activeMinutes-daily-vigorous and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'activeMinutes-daily-vigorous', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await veryActiveMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Total active: should sum the light, moderate and vigorous active minutes per day.', async () => {
        const valueByType: Record<string, string> = {
            'activeMinutes-daily-light': '10',
            'activeMinutes-daily-moderate': '20',
            'activeMinutes-daily-vigorous': '30'
        };
        jest.spyOn(dailyDataQueryFunctions, 'queryForDailyDataV2').mockImplementation(
            async (_namespace, type) => ({ 'SomeDate': [{ value: valueByType[type] } as any] })
        );

        expect(await totalActiveMinutes(sampleStartDate, sampleEndDate)).toEqual({ 'SomeDate': 60 });
    });
});
