import { describe, expect, it, jest } from '@jest/globals';
import { sampleEndDate, sampleStartDate, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import getDayKey from '../../../src/helpers/get-day-key';
import appleHealthHeartRateRange from '../../../src/helpers/daily-data-providers/apple-health-heart-rate-range';
import { appleHealthMaxHeartRateDataProvider, appleHealthMinHeartRateDataProvider } from '../../../src/helpers/daily-data-providers/index';

jest.mock('../../../src/helpers/daily-data-providers/index');

describe('Daily Data Provider - Apple Health Heart Rate Range', () => {
    it('Should query for daily data and compute ranges by subtracting min from max for each day.', async () => {
        const dayKey = getDayKey(sampleStartDate);
        setupDailyDataProvider(appleHealthMinHeartRateDataProvider as jest.Mock, sampleStartDate, sampleEndDate, { [dayKey]: 60 });
        setupDailyDataProvider(appleHealthMaxHeartRateDataProvider as jest.Mock, sampleStartDate, sampleEndDate, { [dayKey]: 110 });

        const result = await appleHealthHeartRateRange(sampleStartDate, sampleEndDate);

        expect(Object.keys(result)).toHaveLength(1);
        expect(result[dayKey]).toBe(50);
    });

    it('Should exclude days that do not have a minimum value.', async () => {
        const dayKey = getDayKey(sampleStartDate);
        setupDailyDataProvider(appleHealthMinHeartRateDataProvider as jest.Mock, sampleStartDate, sampleEndDate, {});
        setupDailyDataProvider(appleHealthMaxHeartRateDataProvider as jest.Mock, sampleStartDate, sampleEndDate, { [dayKey]: 110 });

        const result = await appleHealthHeartRateRange(sampleStartDate, sampleEndDate);

        expect(Object.keys(result)).toHaveLength(0);
    });

    it('Should exclude days that do not have a maximum value.', async () => {
        const dayKey = getDayKey(sampleStartDate);
        setupDailyDataProvider(appleHealthMinHeartRateDataProvider as jest.Mock, sampleStartDate, sampleEndDate, { [dayKey]: 60 });
        setupDailyDataProvider(appleHealthMaxHeartRateDataProvider as jest.Mock, sampleStartDate, sampleEndDate, {});

        const result = await appleHealthHeartRateRange(sampleStartDate, sampleEndDate);

        expect(Object.keys(result)).toHaveLength(0);
    });
});
