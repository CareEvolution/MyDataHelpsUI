import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import fitbitSteps from '../../../src/helpers/daily-data-providers/fitbit-steps';

describe('Daily Data Provider - Fitbit Steps', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Fitbit', 'Steps', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({ value: '4321.49' } as DeviceDataPoint) === 4321
                && valueFn({ value: '4321.50' } as DeviceDataPoint) === 4322;
        });

        expect(await fitbitSteps(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
