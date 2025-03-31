import { describe, expect, it } from '@jest/globals';
import { observationDateFunctionEvaluator, sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupMaxValueResult } from '../../fixtures/daily-data-providers';
import airQualityWork from '../../../src/helpers/daily-data-providers/air-quality-work';

describe('Daily Data Provider - Work Air Quality', () => {
    it('Should query for daily data and build a max value result keyed by observation date.', async () => {
        setupDailyData('AirNowApi', 'WorkAirQuality', sampleStartDate, sampleEndDate, observationDateFunctionEvaluator, sampleDailyData);
        setupMaxValueResult(sampleDailyData, sampleResult);
        expect(await airQualityWork(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
