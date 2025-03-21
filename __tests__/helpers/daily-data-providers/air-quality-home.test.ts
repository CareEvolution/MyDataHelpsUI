import { describe, expect, it } from '@jest/globals';
import { observationDateFunctionEvaluator, sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMaxValueResult } from '../../fixtures/daily-data-providers';
import airQualityHome from '../../../src/helpers/daily-data-providers/air-quality-home';

describe('Daily Data Provider - Home Air Quality', () => {
    it('Should query for daily data and build a max value result keyed by observation date.', async () => {
        setupDailyData('AirNowApi', 'HomeAirQuality', sampleStartDate, sampleEndDate, observationDateFunctionEvaluator, sampleDailyData);
        setupMaxValueResult(sampleDailyData, sampleResult);
        expect(await airQualityHome(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
