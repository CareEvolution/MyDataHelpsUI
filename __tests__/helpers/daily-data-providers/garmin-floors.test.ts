import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import garminFloors from '../../../src/helpers/daily-data-providers/garmin-floors';

describe('Daily Data Provider - Garmin Floors', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Garmin', 'Daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'FloorsClimbed': '1.49' } as { [key: string]: any } } as DeviceDataPoint) === 1
                && valueFn({ properties: { 'FloorsClimbed': '1.50' } as { [key: string]: any } } as DeviceDataPoint) === 2;
        });

        expect(await garminFloors(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
