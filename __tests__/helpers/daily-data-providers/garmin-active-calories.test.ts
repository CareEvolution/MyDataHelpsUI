import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { activeCalories } from '../../../src/helpers/daily-data-providers/garmin-active-calories';

describe('Daily Data Provider - Garmin Active Calories', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Garmin', 'Daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'ActiveKilocalories': '321.49' } as { [key: string]: any } } as DeviceDataPoint) === 321
                && valueFn({ properties: { 'ActiveKilocalories': '321.50' } as { [key: string]: any } } as DeviceDataPoint) === 322;
        });

        expect(await activeCalories(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
