import { describe, expect, it, test } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMaxValueResult, sleepDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { awakeSleepMinutes, deepSleepMinutes, lightSleepMinutes, remSleepMinutes, sleepScore, totalSleepMinutes } from '../../../src/helpers/daily-data-providers/garmin-sleep';

describe('Daily Data Provider - Garmin Sleep', () => {
    describe('Sleep Score', () => {
        it('Should query for daily data and build a max value result keyed by observation date + 6 hours.', async () => {
            setupDailyData('Garmin', 'Sleep', sampleStartDate, sampleEndDate, sleepDateFunctionEvaluator, sampleDailyData);
            setupMaxValueResult(sampleDailyData, sampleResult, valueFn => {
                return !!valueFn
                    && valueFn({} as DeviceDataPoint) === 0
                    && valueFn({ properties: {} } as DeviceDataPoint) === 0
                    && valueFn({ properties: { 'OverallSleepScore.Value': '4.5' } as { [key: string]: any } } as DeviceDataPoint) === 4.5
            });

            expect(await sleepScore(sampleStartDate, sampleEndDate)).toBe(sampleResult);
        });
    });

    describe('Sleep Minutes', () => {
        test.each([
            { title: 'Awake', sleepFunction: awakeSleepMinutes, propertyName: 'AwakeDurationInSeconds' },
            { title: 'Light', sleepFunction: lightSleepMinutes, propertyName: 'LightSleepDurationInSeconds' },
            { title: 'REM', sleepFunction: remSleepMinutes, propertyName: 'RemSleepInSeconds' },
            { title: 'Deep', sleepFunction: deepSleepMinutes, propertyName: 'DeepSleepDurationInSeconds' },
            { title: 'Total', sleepFunction: totalSleepMinutes, propertyName: 'DurationInSeconds' }
        ])('$title - Should query for daily data and build a max value result keyed by observation date + 6 hours.', async ({ sleepFunction, propertyName }) => {
            setupDailyData('Garmin', 'Sleep', sampleStartDate, sampleEndDate, sleepDateFunctionEvaluator, sampleDailyData);
            setupMaxValueResult(sampleDailyData, sampleResult, valueFn => {
                return !!valueFn
                    && valueFn({} as DeviceDataPoint) === 0
                    && valueFn({ properties: {} } as DeviceDataPoint) === 0
                    && valueFn({ properties: { [propertyName]: '153.6' } as { [key: string]: any } } as DeviceDataPoint) === 2.56
            });

            expect(await sleepFunction(sampleStartDate, sampleEndDate)).toBe(sampleResult);
        });
    });
});
