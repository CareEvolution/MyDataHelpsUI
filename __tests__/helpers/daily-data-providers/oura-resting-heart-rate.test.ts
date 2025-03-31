import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupTotalValueResult } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint, DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { DailyDataV2 } from '../../../src/helpers/daily-data-providers/daily-data';
import getDayKey from '../../../src/helpers/get-day-key';
import ouraRestingHeartRate from '../../../src/helpers/daily-data-providers/oura-resting-heart-rate';

describe('Daily Data Provider - Oura Resting Heart Rate', () => {
    it('Should query for daily data and build a total value result keyed by the day property.', async () => {
        const dailyData: DailyDataV2 = {
            [getDayKey(sampleStartDate)]: [
                {} as DeviceDataV2Point,
                { properties: {} } as DeviceDataV2Point,
                { properties: { 'type': 'other_sleep' } as { [key: string]: any } } as DeviceDataV2Point,
                { properties: { 'type': 'long_sleep' } as { [key: string]: any } } as DeviceDataV2Point
            ],
            [getDayKey(sampleEndDate)]: [
                { properties: { 'type': 'other_sleep' } as { [key: string]: any } } as DeviceDataV2Point
            ]
        };

        const filteredDailyData: DailyDataV2 = {
            [getDayKey(sampleStartDate)]: [
                { properties: { 'type': 'long_sleep' } as { [key: string]: any } } as DeviceDataV2Point
            ]
        };

        setupDailyDataV2('Oura', 'sleep', sampleStartDate, sampleEndDate, dateFn => {
            return !!dateFn
                && dateFn({} as DeviceDataPoint) === undefined
                && dateFn({ properties: {} } as DeviceDataPoint) === undefined
                && dateFn({ properties: { 'day': getDayKey(sampleStartDate) } as { [key: string]: any } } as DeviceDataPoint) === getDayKey(sampleStartDate);
        }, dailyData);
        setupTotalValueResult(filteredDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'lowest_heart_rate': '65.49' } as { [key: string]: any } } as DeviceDataPoint) === 65
                && valueFn({ properties: { 'lowest_heart_rate': '65.50' } as { [key: string]: any } } as DeviceDataPoint) === 66;
        });

        expect(await ouraRestingHeartRate(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
