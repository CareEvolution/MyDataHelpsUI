import { describe, expect, test } from '@jest/globals';
import { sampleDailyData, sampleEndDate, sampleResult, sampleStartDate, setupDailyData, setupTotalValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { getIntValue } from '../../../src/helpers/daily-data-providers/daily-data';
import { fairlyActiveMinutes, lightlyActiveMinutes, sedentaryMinutes, totalActiveMinutes, veryActiveMinutes } from '../../../src/helpers/daily-data-providers/fitbit-activity-minutes';

describe('Daily Data Provider - Fitbit Activity Minutes', () => {
    test.each([
        { title: 'Sedentary', activityFunction: sedentaryMinutes, types: ['MinutesSedentary'] },
        { title: 'Total Active', activityFunction: totalActiveMinutes, types: ['MinutesVeryActive', 'MinutesFairlyActive', 'MinutesLightlyActive'] },
        { title: 'Lightly Active', activityFunction: lightlyActiveMinutes, types: ['MinutesLightlyActive'] },
        { title: 'Fairly Active', activityFunction: fairlyActiveMinutes, types: ['MinutesFairlyActive'] },
        { title: 'Very Active', activityFunction: veryActiveMinutes, types: ['MinutesVeryActive'] }
    ])('$title - Should query for daily data and build a total value result keyed by start date.', async ({ activityFunction, types }) => {
        setupDailyData('Fitbit', types, sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupTotalValueResult(sampleDailyData, sampleResult, valueFn => valueFn === getIntValue);

        expect(await activityFunction(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
