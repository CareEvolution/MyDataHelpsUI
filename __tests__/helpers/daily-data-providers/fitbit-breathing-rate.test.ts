import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import fitbitBreathingRate from '../../../src/helpers/daily-data-providers/fitbit-breathing-rate';

describe('Daily Data Provider - Fitbit Breathing Rate', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Fitbit', 'BreathingRate', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({ value: '15.49' } as DeviceDataPoint) === 15
                && valueFn({ value: '15.50' } as DeviceDataPoint) === 16;
        });

        expect(await fitbitBreathingRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
