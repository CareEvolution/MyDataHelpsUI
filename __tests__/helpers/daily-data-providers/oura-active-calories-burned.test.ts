import { describe, expect, it } from '@jest/globals';
import { observationDateFunctionEvaluator, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import ouraActiveCaloriesBurned from '../../../src/helpers/daily-data-providers/oura-active-calories-burned';

describe('Daily Data Provider - Oura Active Calories Burned', () => {
    it('Should query for daily data and build a max value result keyed by observation date.', async () => {
        setupDailyDataV2('Oura', 'daily-activity', sampleStartDate, sampleEndDate, observationDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyDataV2, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'active_calories': '505.49' } as { [key: string]: any } } as DeviceDataPoint) === 505
                && valueFn({ properties: { 'active_calories': '505.50' } as { [key: string]: any } } as DeviceDataPoint) === 506;
        });

        expect(await ouraActiveCaloriesBurned(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
