import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import fitbitSpo2 from '../../../src/helpers/daily-data-providers/fitbit-spo2';

describe('Daily Data Provider - Fitbit SpO2', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Fitbit', 'SpO2', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({ value: '94.49' } as DeviceDataPoint) === 94
                && valueFn({ value: '94.50' } as DeviceDataPoint) === 95;
        });

        expect(await fitbitSpo2(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
