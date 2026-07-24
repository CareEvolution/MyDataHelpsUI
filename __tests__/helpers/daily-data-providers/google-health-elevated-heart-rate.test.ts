import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import * as dailyDataQueryFunctions from '../../../src/helpers/daily-data-providers/daily-data/daily-data-query';
import { cardioMinutes, fatBurnMinutes, peakMinutes, totalElevatedHeartRateMinutes } from '../../../src/helpers/daily-data-providers/google-health-elevated-heart-rate';

describe('Daily Data Provider - Google Health Elevated Heart Rate', () => {
    beforeEach(() => jest.restoreAllMocks());

    it('Fat burn: should query activeZoneMinutes-daily-fat-burn and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'activeZoneMinutes-daily-fat-burn', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await fatBurnMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Cardio: should query activeZoneMinutes-daily-cardio and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'activeZoneMinutes-daily-cardio', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await cardioMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Peak: should query activeZoneMinutes-daily-peak and build a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'activeZoneMinutes-daily-peak', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await peakMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Elevated: should sum the fat-burn, cardio and peak zone minutes per day.', async () => {
        const valueByType: Record<string, string> = {
            'activeZoneMinutes-daily-fat-burn': '15',
            'activeZoneMinutes-daily-cardio': '25',
            'activeZoneMinutes-daily-peak': '5'
        };
        jest.spyOn(dailyDataQueryFunctions, 'queryForDailyDataV2').mockImplementation(
            async (_namespace, type) => ({ 'SomeDate': [{ value: valueByType[type] } as any] })
        );

        expect(await totalElevatedHeartRateMinutes(sampleStartDate, sampleEndDate)).toEqual({ 'SomeDate': 45 });
    });
});
