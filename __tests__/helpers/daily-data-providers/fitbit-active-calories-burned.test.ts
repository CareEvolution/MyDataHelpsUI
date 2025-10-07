import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, sampleEndDate, sampleStartDate, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import { fitbitCaloriesBurnedDataProvider, fitbitRestingCaloriesBurnedDataProvider } from '../../../src/helpers/daily-data-providers';
import fitbitActiveCaloriesBurned from '../../../src/helpers/daily-data-providers/fitbit-active-calories-burned';
import getDayKey from '../../../src/helpers/get-day-key';
import { add } from 'date-fns';
import { DailyDataQueryResult } from '../../../src';
import { canQuery } from '../../../src/helpers/daily-data-providers/data-collection-helper';

jest.mock('../../../src/helpers/daily-data-providers/data-collection-helper', () => ({
    __esModule: true,
    canQuery: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/fitbit-calories-burned', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/fitbit-resting-calories-burned', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Daily Data Provider - Fitbit Active Calories Burned', () => {

    const canQueryMock = canQuery as jest.Mock;
    const fitbitCaloriesBurnedDataProviderMock = fitbitCaloriesBurnedDataProvider as jest.Mock;
    const fitbitRestingCaloriesBurnedDataProviderMock = fitbitRestingCaloriesBurnedDataProvider as jest.Mock;

    beforeEach(() => {
        jest.resetAllMocks();
    });

    const combinedSettings = createEmptyCombinedDataCollectionSettings();

    it('Should return an empty result when querying for the required types is not enabled.', async () => {
        canQueryMock.mockReturnValue({ v1: { enabled: false }, v2: { enabled: false } });

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate, combinedSettings);

        expect(result).toEqual({});

        expect(canQueryMock).toHaveBeenCalledTimes(1);
        expect(canQueryMock).toHaveBeenCalledWith(combinedSettings, 'Fitbit', ['Calories', 'CaloriesBMR'], true);
        expect(fitbitCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(fitbitRestingCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when querying for the required types is enabled, but only for v2.', async () => {
        canQueryMock.mockReturnValue({ v1: { enabled: false }, v2: { enabled: true, types: ['Calories', 'CaloriesBMR'] } });

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate, combinedSettings);

        expect(result).toEqual({});

        expect(canQueryMock).toHaveBeenCalledTimes(1);
        expect(canQueryMock).toHaveBeenCalledWith(combinedSettings, 'Fitbit', ['Calories', 'CaloriesBMR'], true);
        expect(fitbitCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(fitbitRestingCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
    });

    it('Should return the result when querying for the required types is enabled for v1.', async () => {
        canQueryMock.mockReturnValue({ v1: { enabled: true, types: ['Calories', 'CaloriesBMR'] }, v2: { enabled: false } });

        const totalCaloriesResult: DailyDataQueryResult = {
            [getDayKey(sampleStartDate)]: 2500,
            [getDayKey(add(sampleStartDate, { days: 1 }))]: 2400,
            [getDayKey(add(sampleStartDate, { days: 3 }))]: 2200
        };
        const restingCaloriesResult: DailyDataQueryResult = {
            [getDayKey(sampleStartDate)]: 2000,
            [getDayKey(add(sampleStartDate, { days: 2 }))]: 1900,
            [getDayKey(add(sampleStartDate, { days: 3 }))]: 1800
        }

        setupDailyDataProvider(fitbitCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, totalCaloriesResult);
        setupDailyDataProvider(fitbitRestingCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, restingCaloriesResult);

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate, combinedSettings);

        expect(Object.keys(result).length).toBe(2);
        expect(result[getDayKey(sampleStartDate)]).toBe(500);
        expect(result[getDayKey(add(sampleStartDate, { days: 3 }))]).toBe(400);

        expect(canQueryMock).toHaveBeenCalledTimes(1);
        expect(canQueryMock).toHaveBeenCalledWith(combinedSettings, 'Fitbit', ['Calories', 'CaloriesBMR'], true);
    });
});
