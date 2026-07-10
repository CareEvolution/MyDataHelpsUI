import { describe, expect, it } from '@jest/globals';
import { sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupDailyDataV2, setupMostRecentValueResult, setupTotalValueResult, sleepDateFunctionEvaluator, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import { googleHealthDistanceDataProvider, googleHealthRestingHeartRateDataProvider, googleHealthSedentaryMinutesDataProvider, googleHealthStepsDataProvider, googleHealthTotalSleepMinutesDataProvider } from '../../../src/helpers/daily-data-providers/google-health';

describe('Daily Data Provider - Google Health', () => {
    it('Steps: queries steps-daily and builds a most recent value result keyed by start date.', async () => {
        setupDailyDataV2('GoogleHealth', 'steps-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await googleHealthStepsDataProvider(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Resting heart rate: queries the daily resting heart rate list and builds a most recent value result.', async () => {
        setupDailyDataV2('GoogleHealth', 'dailyRestingHeartRate-list-beatsPerMinute', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult);
        expect(await googleHealthRestingHeartRateDataProvider(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Sleep: sums the per-session asleep minutes into a total value result, dated to the wake-up day.', async () => {
        // getSleepDate (observationDate + 6h) so a night's sleep is attributed to the wake-up day, like Fitbit.
        setupDailyDataV2('GoogleHealth', 'sleep-list-session-asleep', sampleStartDate, sampleEndDate, sleepDateFunctionEvaluator, sampleDailyDataV2);
        setupTotalValueResult(sampleDailyData, sampleResult);
        expect(await googleHealthTotalSleepMinutesDataProvider(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Distance: converts the millimeter daily rollup to meters.', async () => {
        setupDailyDataV2('GoogleHealth', 'distance-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult); // { SomeDate: 100 } millimeters
        expect(await googleHealthDistanceDataProvider(sampleStartDate, sampleEndDate)).toEqual({ SomeDate: 0.1 });
    });

    it('Sedentary: converts the seconds daily rollup to minutes.', async () => {
        setupDailyDataV2('GoogleHealth', 'sedentaryPeriod-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult); // { SomeDate: 100 } seconds
        expect(await googleHealthSedentaryMinutesDataProvider(sampleStartDate, sampleEndDate)).toEqual({ SomeDate: 100 / 60 });
    });
});
