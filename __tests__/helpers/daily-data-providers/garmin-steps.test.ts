import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import garminSteps from '../../../src/helpers/daily-data-providers/garmin-steps';

describe('Daily Data Provider - Garmin Steps', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Garmin', 'Daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'Steps': '4221.49' } as { [key: string]: any } } as DeviceDataPoint) === 4221
                && valueFn({ properties: { 'Steps': '4221.50' } as { [key: string]: any } } as DeviceDataPoint) === 4222;
        });

        expect(await garminSteps(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
