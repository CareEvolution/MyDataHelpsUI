import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, sampleEndDate, sampleStartDate, setupCombinedDataCollectionSettings } from '../../fixtures/daily-data-providers';
import { fitbitCaloriesBurnedDataProvider, fitbitRestingCaloriesBurnedDataProvider } from '../../../src/helpers/daily-data-providers';
import fitbitActiveCaloriesBurned from '../../../src/helpers/daily-data-providers/fitbit-active-calories-burned';
import getDayKey from '../../../src/helpers/get-day-key';
import { add } from 'date-fns';
import { DailyDataQueryResult } from '../../../src';
import { getSupportedApis } from '../../../src/helpers/daily-data-providers/data-collection-helper';
import { CombinedDataCollectionSettings } from '../../../src/helpers/daily-data-providers/combined-data-collection-settings';

jest.mock('../../../src/helpers/daily-data-providers/data-collection-helper', () => ({
    __esModule: true,
    getSupportedApis: jest.fn()
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

    const getSupportedApisMock = getSupportedApis as jest.Mock;
    const fitbitCaloriesBurnedDataProviderMock = fitbitCaloriesBurnedDataProvider as jest.Mock;
    const fitbitRestingCaloriesBurnedDataProviderMock = fitbitRestingCaloriesBurnedDataProvider as jest.Mock;

    const combinedSettings = createEmptyCombinedDataCollectionSettings();

    const expectedSupportedApisQuery = { namespace: 'Fitbit', types: ['Calories', 'CaloriesBMR'], requireAllTypes: true };

    beforeEach(() => {
        jest.resetAllMocks();
        setupCombinedDataCollectionSettings(false, combinedSettings);
    });

    it('Should return an empty result when querying for the required types is not enabled.', async () => {
        getSupportedApisMock.mockReturnValue({ v1: { enabled: false }, v2: { enabled: false } });

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});

        expect(getSupportedApisMock).toHaveBeenCalledTimes(1);
        expect(getSupportedApisMock).toHaveBeenCalledWith(combinedSettings, expectedSupportedApisQuery);
        expect(fitbitCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(fitbitRestingCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when querying for the required types is enabled, but only for v2.', async () => {
        getSupportedApisMock.mockReturnValue({ v1: { enabled: false }, v2: { enabled: true, types: ['Calories', 'CaloriesBMR'] } });

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});

        expect(getSupportedApisMock).toHaveBeenCalledTimes(1);
        expect(getSupportedApisMock).toHaveBeenCalledWith(combinedSettings, expectedSupportedApisQuery);
        expect(fitbitCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(fitbitRestingCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
    });

    it('Should return the result when querying for the required types is enabled for v1.', async () => {
        getSupportedApisMock.mockReturnValue({ v1: { enabled: true, types: ['Calories', 'CaloriesBMR'] }, v2: { enabled: false } });

        const totalCaloriesResult: DailyDataQueryResult = {
            [getDayKey(sampleStartDate)]: 2500,
            [getDayKey(add(sampleStartDate, { days: 1 }))]: 2400,
            [getDayKey(add(sampleStartDate, { days: 3 }))]: 2200
        };
        const restingCaloriesResult: DailyDataQueryResult = {
            [getDayKey(sampleStartDate)]: 2000,
            [getDayKey(add(sampleStartDate, { days: 2 }))]: 1900,
            [getDayKey(add(sampleStartDate, { days: 3 }))]: 1800
        };

        fitbitCaloriesBurnedDataProviderMock.mockResolvedValue(totalCaloriesResult);
        fitbitRestingCaloriesBurnedDataProviderMock.mockResolvedValue(restingCaloriesResult);

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(Object.keys(result).length).toBe(2);
        expect(result[getDayKey(sampleStartDate)]).toBe(500);
        expect(result[getDayKey(add(sampleStartDate, { days: 3 }))]).toBe(400);

        expect(getSupportedApisMock).toHaveBeenCalledTimes(1);
        expect(getSupportedApisMock).toHaveBeenCalledWith(combinedSettings, expectedSupportedApisQuery);
        expect(fitbitCaloriesBurnedDataProviderMock).toHaveBeenCalledTimes(1);
        expect(fitbitCaloriesBurnedDataProviderMock).toHaveBeenCalledWith(sampleStartDate, sampleEndDate);
        expect(fitbitRestingCaloriesBurnedDataProviderMock).toHaveBeenCalledTimes(1);
        expect(fitbitRestingCaloriesBurnedDataProviderMock).toHaveBeenCalledWith(sampleStartDate, sampleEndDate);
    });

    it('Should use specified combined settings, when provided.', async () => {
        getSupportedApisMock.mockReturnValue({ v1: { enabled: true, types: ['Calories', 'CaloriesBMR'] }, v2: { enabled: false } });

        const totalCaloriesResult: DailyDataQueryResult = {
            [getDayKey(sampleStartDate)]: 2500,
            [getDayKey(add(sampleStartDate, { days: 1 }))]: 2400,
            [getDayKey(add(sampleStartDate, { days: 3 }))]: 2200
        };
        const restingCaloriesResult: DailyDataQueryResult = {
            [getDayKey(sampleStartDate)]: 2000,
            [getDayKey(add(sampleStartDate, { days: 2 }))]: 1900,
            [getDayKey(add(sampleStartDate, { days: 3 }))]: 1800
        };

        fitbitCaloriesBurnedDataProviderMock.mockResolvedValue(totalCaloriesResult);
        fitbitRestingCaloriesBurnedDataProviderMock.mockResolvedValue(restingCaloriesResult);

        const specifiedCombinedSettings = {} as CombinedDataCollectionSettings;

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate, specifiedCombinedSettings);

        expect(Object.keys(result).length).toBe(2);
        expect(result[getDayKey(sampleStartDate)]).toBe(500);
        expect(result[getDayKey(add(sampleStartDate, { days: 3 }))]).toBe(400);

        expect(getSupportedApisMock).toHaveBeenCalledTimes(1);
        expect(getSupportedApisMock).toHaveBeenCalledWith(specifiedCombinedSettings, expectedSupportedApisQuery);
        expect(fitbitCaloriesBurnedDataProviderMock).toHaveBeenCalledTimes(1);
        expect(fitbitCaloriesBurnedDataProviderMock).toHaveBeenCalledWith(sampleStartDate, sampleEndDate);
        expect(fitbitRestingCaloriesBurnedDataProviderMock).toHaveBeenCalledTimes(1);
        expect(fitbitRestingCaloriesBurnedDataProviderMock).toHaveBeenCalledWith(sampleStartDate, sampleEndDate);
    });

    it('Should ignore non-positive computed values.', async () => {
        getSupportedApisMock.mockReturnValue({ v1: { enabled: true, types: ['Calories', 'CaloriesBMR'] }, v2: { enabled: false } });

        const totalCaloriesResult: DailyDataQueryResult = {
            [getDayKey(sampleStartDate)]: 2500,
            [getDayKey(add(sampleStartDate, { days: 1 }))]: 2400
        };
        const restingCaloriesResult: DailyDataQueryResult = {
            [getDayKey(sampleStartDate)]: 2600,
            [getDayKey(add(sampleStartDate, { days: 1 }))]: 2400
        };

        fitbitCaloriesBurnedDataProviderMock.mockResolvedValue(totalCaloriesResult);
        fitbitRestingCaloriesBurnedDataProviderMock.mockResolvedValue(restingCaloriesResult);

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});

        expect(getSupportedApisMock).toHaveBeenCalledTimes(1);
        expect(getSupportedApisMock).toHaveBeenCalledWith(combinedSettings, expectedSupportedApisQuery);
        expect(fitbitCaloriesBurnedDataProviderMock).toHaveBeenCalledTimes(1);
        expect(fitbitCaloriesBurnedDataProviderMock).toHaveBeenCalledWith(sampleStartDate, sampleEndDate);
        expect(fitbitRestingCaloriesBurnedDataProviderMock).toHaveBeenCalledTimes(1);
        expect(fitbitRestingCaloriesBurnedDataProviderMock).toHaveBeenCalledWith(sampleStartDate, sampleEndDate);
    });
});
