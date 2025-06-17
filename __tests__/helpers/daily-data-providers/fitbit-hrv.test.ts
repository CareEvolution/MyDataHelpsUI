import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import fitbitHrv from '../../../src/helpers/daily-data-providers/fitbit-hrv';

describe('Daily Data Provider - Fitbit HRV', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Fitbit', 'Hrv', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({ value: '65.49' } as DeviceDataPoint) === 65
                && valueFn({ value: '65.50' } as DeviceDataPoint) === 66;
        });

        expect(await fitbitHrv(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
