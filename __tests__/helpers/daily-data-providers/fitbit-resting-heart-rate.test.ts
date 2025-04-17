import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import fitbitRestingHeartRate from '../../../src/helpers/daily-data-providers/fitbit-resting-heart-rate';

describe('Daily Data Provider - Fitbit Resting Heart Rate', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Fitbit', 'RestingHeartRate', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({ value: '75.49' } as DeviceDataPoint) === 75
                && valueFn({ value: '75.50' } as DeviceDataPoint) === 76;
        });

        expect(await fitbitRestingHeartRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
