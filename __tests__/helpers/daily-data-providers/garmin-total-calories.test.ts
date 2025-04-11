import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupTotalValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from "@careevolution/mydatahelps-js";
import { totalCalories } from '../../../src/helpers/daily-data-providers/garmin-total-calories';

describe('Daily Data Provider - Garmin Total Calories', () => {
    it('Should query for daily data and build a total value result keyed by start date.', async () => {
        setupDailyData('Garmin', 'Daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupTotalValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'ActiveKilocalories': '121.49' } as { [key: string]: any } } as DeviceDataPoint) === 121
                && valueFn({ properties: { 'ActiveKilocalories': '121.50' } as { [key: string]: any } } as DeviceDataPoint) === 122
                && valueFn({ properties: { 'BmrKilocalories': '121.49' } as { [key: string]: any } } as DeviceDataPoint) === 121
                && valueFn({ properties: { 'BmrKilocalories': '121.50' } as { [key: string]: any } } as DeviceDataPoint) === 122
                && valueFn({ properties: { 'ActiveKilocalories': '121.45', 'BmrKilocalories': '121.04' } as { [key: string]: any } } as DeviceDataPoint) === 242
                && valueFn({ properties: { 'ActiveKilocalories': '121.47', 'BmrKilocalories': '121.03' } as { [key: string]: any } } as DeviceDataPoint) === 243;
        });

        expect(await totalCalories(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
