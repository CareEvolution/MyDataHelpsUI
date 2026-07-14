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

    it('Distance: reads distance-daily with a millimeters-to-meters value function.', async () => {
        setupDailyDataV2('GoogleHealth', 'distance-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => !!valueFn && valueFn({ value: '1000' } as any) === 1);
        expect(await googleHealthDistanceDataProvider(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('Sedentary: reads sedentaryPeriod-daily with a seconds-to-minutes value function.', async () => {
        setupDailyDataV2('GoogleHealth', 'sedentaryPeriod-daily', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupMostRecentValueResult(sampleDailyData, sampleResult, valueFn => !!valueFn && valueFn({ value: '120' } as any) === 2);
        expect(await googleHealthSedentaryMinutesDataProvider(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });
});
