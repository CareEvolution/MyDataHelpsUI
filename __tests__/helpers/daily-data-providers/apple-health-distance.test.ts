import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupTotalValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import appleHealthDistance from '../../../src/helpers/daily-data-providers/apple-health-distance';

describe('Daily Data Provider - Apple Health Distance', () => {
    it('Should query for daily data and build a total value result keyed by start date.', async () => {
        setupDailyData('AppleHealth', 'HourlyDistanceWalkingRunning', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupTotalValueResult(sampleDailyData, sampleResult);
        expect(await appleHealthDistance(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
