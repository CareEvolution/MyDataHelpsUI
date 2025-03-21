import { describe, expect, test } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { averageStressLevel, highStressMinutes, lowStressMinutes, maxStressLevel, mediumStressMinutes, totalStressMinutes } from '../../../src/helpers/daily-data-providers/garmin-stress';

describe('Daily Data Provider - Garmin Stress', () => {
    describe('Stress Level', () => {
        test.each([
            { title: 'Max Level', stressLevelFunction: maxStressLevel, propertyName: 'MaxStressLevel' },
            { title: 'Average Level', stressLevelFunction: averageStressLevel, propertyName: 'AverageStressLevel' }
        ])('$title - Should query for daily data and build a most recent value result keyed by start date.', async ({ stressLevelFunction, propertyName }) => {
            setupDailyData('Garmin', 'Daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
            setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
                return !!valueFn
                    && valueFn({} as DeviceDataPoint) === 0
                    && valueFn({ properties: {} } as DeviceDataPoint) === 0
                    && valueFn({ properties: { [propertyName]: '7.49' } } as DeviceDataPoint) === 7
                    && valueFn({ properties: { [propertyName]: '7.50' } } as DeviceDataPoint) === 8;
            });

            expect(await stressLevelFunction(sampleStartDate, sampleEndDate)).toBe(sampleResult);
        });
    });

    describe('Stress Minutes', () => {
        test.each([
            { title: 'Total Minutes', stressMinutesFunction: totalStressMinutes, propertyName: 'StressDurationInSeconds' },
            { title: 'Low Minutes', stressMinutesFunction: lowStressMinutes, propertyName: 'LowStressDurationInSeconds' },
            { title: 'Medium Minutes', stressMinutesFunction: mediumStressMinutes, propertyName: 'MediumStressDurationInSeconds' },
            { title: 'High Minutes', stressMinutesFunction: highStressMinutes, propertyName: 'HighStressDurationInSeconds' }
        ])('$title - Should query for daily data and build a most recent value result keyed by start date.', async ({ stressMinutesFunction, propertyName }) => {
            setupDailyData('Garmin', 'Daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
            setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
                return !!valueFn
                    && valueFn({} as DeviceDataPoint) === 0
                    && valueFn({ properties: {} } as DeviceDataPoint) === 0
                    && valueFn({ properties: { [propertyName]: '329.99' } } as DeviceDataPoint) === 5
                    && valueFn({ properties: { [propertyName]: '330.00' } } as DeviceDataPoint) === 6;
            });

            expect(await stressMinutesFunction(sampleStartDate, sampleEndDate)).toBe(sampleResult);
        });
    });
});
