import { describe, expect, test } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupTotalValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DailyData } from '../../../src/helpers/daily-data-providers/daily-data';
import { cardioMinutes, fatBurnMinutes, peakMinutes, totalElevatedHeartRateMinutes } from '../../../src/helpers/daily-data-providers/fitbit-elevated-heart-rate';
import getDayKey from '../../../src/helpers/get-day-key';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';

describe('Daily Data Provider - Fitbit Elevated Heart Rate', () => {
    test.each([
        { title: 'Total Elevated', minutesFunction: totalElevatedHeartRateMinutes, zone: undefined },
        { title: 'Peak', minutesFunction: peakMinutes, zone: 'Peak' },
        { title: 'Cardio', minutesFunction: cardioMinutes, zone: 'Cardio' },
        { title: 'Fat Burn', minutesFunction: fatBurnMinutes, zone: 'Fat Burn' }
    ])('$title - Should query for daily data and build a total value result keyed by start date.', async ({ minutesFunction, zone }) => {
        const dailyData: DailyData = {
            [getDayKey(sampleStartDate)]: [
                { value: zone ?? 'Any Zone' } as DeviceDataPoint,
                { value: 'Out of Range' } as DeviceDataPoint
            ],
            [getDayKey(sampleEndDate)]: [
                { value: 'Out of Range' } as DeviceDataPoint
            ]
        };

        const filteredDailyData: DailyData = {
            [getDayKey(sampleStartDate)]: [
                { value: zone ?? 'Any Zone' } as DeviceDataPoint
            ]
        };

        setupDailyData('Fitbit', 'HeartRateZone', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, dailyData);
        setupTotalValueResult(filteredDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'Minutes': '30.9' } as { [key: string]: any } } as DeviceDataPoint) === 30
        });

        expect(await minutesFunction(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
