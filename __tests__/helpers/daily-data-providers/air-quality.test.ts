import { describe, expect, it } from '@jest/globals';
import { observationDateFunctionEvaluator, sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMaxValueResult } from '../../fixtures/daily-data-providers';
import airQuality from '../../../src/helpers/daily-data-providers/air-quality';

describe('Daily Data Provider - Air Quality', () => {
    it('Should query for daily data and build a max value result keyed by observation date.', async () => {
        setupDailyData('AirNowApi', 'AirQuality', sampleStartDate, sampleEndDate, observationDateFunctionEvaluator, sampleDailyData);
        setupMaxValueResult(sampleDailyData, sampleResult);
        expect(await airQuality(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
