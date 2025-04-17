import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { restingCalories } from '../../../src/helpers/daily-data-providers/garmin-resting-calories';

describe('Daily Data Provider - Garmin Resting Calories', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Garmin', 'Daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'BmrKilocalories': '221.49' } as { [key: string]: any } } as DeviceDataPoint) === 221
                && valueFn({ properties: { 'BmrKilocalories': '221.50' } as { [key: string]: any } } as DeviceDataPoint) === 222;
        });

        expect(await restingCalories(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
