import { describe, expect, it } from '@jest/globals';
import { sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupTotalValueResult } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint, DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { DailyDataV2 } from '../../../src/helpers/daily-data-providers/daily-data';
import getDayKey from '../../../src/helpers/get-day-key';
import ouraTotalSleep from '../../../src/helpers/daily-data-providers/oura-total-sleep';

describe('Daily Data Provider - Oura Total Sleep', () => {
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
            const dayKey = getDayKey(sampleStartDate);
            return !!dateFn
                && dateFn({} as DeviceDataPoint) === undefined
                && dateFn({ properties: {} } as DeviceDataPoint) === undefined
                && dateFn({ properties: { 'day': dayKey } as { [key: string]: any } } as DeviceDataPoint) === dayKey;
        }, dailyData);
        setupTotalValueResult(filteredDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'total_sleep_duration': '329.99' } as { [key: string]: any } } as DeviceDataPoint) === 5
                && valueFn({ properties: { 'total_sleep_duration': '330.00' } as { [key: string]: any } } as DeviceDataPoint) === 6;
        });

        expect(await ouraTotalSleep(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
