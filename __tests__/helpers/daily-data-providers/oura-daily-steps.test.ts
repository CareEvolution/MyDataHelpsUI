import { describe, expect, it } from '@jest/globals';
import { observationDateFunctionEvaluator, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import ouraDailySteps from '../../../src/helpers/daily-data-providers/oura-daily-steps';

describe('Daily Data Provider - Oura Daily Steps', () => {
    it('Should query for daily data and build a most recent value result keyed by observation date.', async () => {
        setupDailyDataV2('Oura', 'daily-activity', sampleStartDate, sampleEndDate, observationDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyDataV2, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'steps': '2121.49' } as { [key: string]: any } } as DeviceDataPoint) === 2121
                && valueFn({ properties: { 'steps': '2121.50' } as { [key: string]: any } } as DeviceDataPoint) === 2122;
        });

        expect(await ouraDailySteps(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
