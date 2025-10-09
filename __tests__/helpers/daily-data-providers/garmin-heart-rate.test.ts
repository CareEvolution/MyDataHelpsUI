import { describe, expect, test } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { averageHeartRate, maxHeartRate, minHeartRate, restingHeartRate } from '../../../src/helpers/daily-data-providers/garmin-heart-rate';

describe('Daily Data Provider - Garmin Heart Rate', () => {
    test.each([
        { title: 'Resting', heartRateFunction: restingHeartRate, propertyName: 'RestingHeartRateInBeatsPerMinute' },
        { title: 'Min', heartRateFunction: minHeartRate, propertyName: 'MinHeartRateInBeatsPerMinute' },
        { title: 'Max', heartRateFunction: maxHeartRate, propertyName: 'MaxHeartRateInBeatsPerMinute' },
        { title: 'Average', heartRateFunction: averageHeartRate, propertyName: 'AverageHeartRateInBeatsPerMinute' }
    ])('$title - Should query for daily data and build a most recent value result keyed by start date.', async ({ heartRateFunction, propertyName }) => {
        setupDailyData('Garmin', 'Daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { [propertyName]: '85.49' } } as DeviceDataPoint) === 85
                && valueFn({ properties: { [propertyName]: '85.50' } } as DeviceDataPoint) === 86;
        });

        expect(await heartRateFunction(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
