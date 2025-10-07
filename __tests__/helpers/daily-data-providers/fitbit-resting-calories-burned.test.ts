import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import fitbitRestingCaloriesBurned from '../../../src/helpers/daily-data-providers/fitbit-resting-calories-burned';

describe('Daily Data Provider - Fitbit Resting Calories Burned', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Fitbit', 'CaloriesBMR', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({ value: '225.49' } as DeviceDataPoint) === 225
                && valueFn({ value: '225.50' } as DeviceDataPoint) === 226;
        });

        expect(await fitbitRestingCaloriesBurned(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
