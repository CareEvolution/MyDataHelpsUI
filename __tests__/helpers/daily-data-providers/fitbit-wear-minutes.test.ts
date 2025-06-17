import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import fitbitWearMinutes from '../../../src/helpers/daily-data-providers/fitbit-wear-minutes';

describe('Daily Data Provider - Fitbit Wear Minutes', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Fitbit', 'HeartRateIntradayCount', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'MinuteCount': '30.9' } as { [key: string]: any } } as DeviceDataPoint) === 30
        });

        expect(await fitbitWearMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
