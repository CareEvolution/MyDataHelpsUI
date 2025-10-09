import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import fitbitFloors from '../../../src/helpers/daily-data-providers/fitbit-floors';

describe('Daily Data Provider - Fitbit Floors', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Fitbit', 'Floors', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({ value: '10.49' } as DeviceDataPoint) === 10
                && valueFn({ value: '10.50' } as DeviceDataPoint) === 11;
        });

        expect(await fitbitFloors(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
