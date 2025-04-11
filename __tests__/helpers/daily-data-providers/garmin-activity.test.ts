import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMostRecentValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { DeviceDataPoint } from '@careevolution/mydatahelps-js';
import { activeMinutes } from '../../../src/helpers/daily-data-providers/garmin-activity';

describe('Daily Data Provider - Garmin Activity', () => {
    it('Should query for daily data and build a most recent value result keyed by start date.', async () => {
        setupDailyData('Garmin', 'Daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => {
            return !!valueFn
                && valueFn({} as DeviceDataPoint) === 0
                && valueFn({ properties: {} } as DeviceDataPoint) === 0
                && valueFn({ properties: { 'ActiveTimeInSeconds': '329.99' } as { [key: string]: any } } as DeviceDataPoint) === 5
                && valueFn({ properties: { 'ActiveTimeInSeconds': '330.00' } as { [key: string]: any } } as DeviceDataPoint) === 6;
        });

        expect(await activeMinutes(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
