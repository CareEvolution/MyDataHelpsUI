import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import garminDistance from '../../../src/helpers/daily-data-providers/garmin-distance';

describe('Daily Data Provider - Garmin Distance', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Garmin', 'Daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'DistanceInMeters': '121.49' } as { [key: string]: any } } as DeviceDataPoint) === 121
                && valueFn({ properties: { 'DistanceInMeters': '121.50' } as { [key: string]: any } } as DeviceDataPoint) === 122;
        });

        expect(await garminDistance(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
