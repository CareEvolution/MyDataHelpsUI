import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupTotalValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import appleHealthFlightsClimbed from '../../../src/helpers/daily-data-providers/apple-health-flights-climbed';

describe('Daily Data Provider - Apple Health Flights Climbed', () => {
    it('Should query for daily data and build a total value result keyed by start date.', async () => {
        setupDailyData('AppleHealth', 'FlightsClimbed', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupTotalValueResult(sampleDailyData, sampleResult);
        expect(await appleHealthFlightsClimbed(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
