import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleStartDate, setupDailyData, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import getDayKey from '../../../src/helpers/get-day-key';
import { DailyData } from '../../../src/helpers/daily-data-providers/daily-data';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import appleHealthHeartRateRange from '../../../src/helpers/daily-data-providers/apple-health-heart-rate-range';

describe('Daily Data Provider - Apple Health Heart Rate Range', () => {
    it('Should query for daily data and build a result keyed by start date.', async () => {
        const dailyData: DailyData = {
            [getDayKey(sampleStartDate)]: [
                { type: 'HourlyMaximumHeartRate', value: '120' } as DeviceDataPoint,
                { type: 'HourlyMinimumHeartRate', value: '65' } as DeviceDataPoint,
                { type: 'HourlyMaximumHeartRate', value: '100' } as DeviceDataPoint,
                { type: 'HourlyMinimumHeartRate', value: '60' } as DeviceDataPoint
            ]
        };
        setupDailyData('AppleHealth', ['HourlyMaximumHeartRate', 'HourlyMinimumHeartRate'], sampleStartDate, sampleEndDate, startDateFunctionEvaluator, dailyData);

        const result = await appleHealthHeartRateRange(sampleStartDate, sampleEndDate);

        expect(Object.keys(result)).toHaveLength(1);
        expect(result[getDayKey(sampleStartDate)]).toBe(60);
    });

    it('Should exclude days that do not have a minimum value.', async () => {
        const dailyData: DailyData = {
            [getDayKey(sampleStartDate)]: [
                { type: 'HourlyMaximumHeartRate', value: '120' } as DeviceDataPoint,
                { type: 'HourlyMaximumHeartRate', value: '100' } as DeviceDataPoint,
            ]
        };
        setupDailyData('AppleHealth', ['HourlyMaximumHeartRate', 'HourlyMinimumHeartRate'], sampleStartDate, sampleEndDate, startDateFunctionEvaluator, dailyData);

        const result = await appleHealthHeartRateRange(sampleStartDate, sampleEndDate);

        expect(Object.keys(result)).toHaveLength(0);
    });

    it('Should exclude days that do not have a maximum value.', async () => {
        const dailyData: DailyData = {
            [getDayKey(sampleStartDate)]: [
                { type: 'HourlyMinimumHeartRate', value: '65' } as DeviceDataPoint,
                { type: 'HourlyMinimumHeartRate', value: '60' } as DeviceDataPoint
            ]
        };
        setupDailyData('AppleHealth', ['HourlyMaximumHeartRate', 'HourlyMinimumHeartRate'], sampleStartDate, sampleEndDate, startDateFunctionEvaluator, dailyData);

        const result = await appleHealthHeartRateRange(sampleStartDate, sampleEndDate);

        expect(Object.keys(result)).toHaveLength(0);
    });
});
