import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, sampleEndDate, sampleStartDate, setupCombinedDataCollectionSettings, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import { fitbitCaloriesBurnedDataProvider, fitbitRestingCaloriesBurnedDataProvider } from '../../../src/helpers/daily-data-providers';
import fitbitActiveCaloriesBurned from "../../../src/helpers/daily-data-providers/fitbit-active-calories-burned";
import getDayKey from '../../../src/helpers/get-day-key';
import { add } from "date-fns";
import { DailyDataQueryResult } from "../../../src";

jest.mock('../../../src/helpers/daily-data-providers/fitbit-calories-burned', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/fitbit-resting-calories-burned', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Daily Data Provider - Fitbit Active Calories Burned', () => {

    const fitbitCaloriesBurnedDataProviderMock = fitbitCaloriesBurnedDataProvider as jest.Mock;
    const fitbitRestingCaloriesBurnedDataProviderMock = fitbitRestingCaloriesBurnedDataProvider as jest.Mock;

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Should return an empty result when Fitbit is not enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();

        setupCombinedDataCollectionSettings(false, combinedSettings);

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(fitbitRestingCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when Fitbit is enabled, but without the required data types.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;

        setupCombinedDataCollectionSettings(false, combinedSettings);

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(fitbitRestingCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when Fitbit is enabled, but only with total calories.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'Fitbit', type: 'Calories' }
        );

        setupCombinedDataCollectionSettings(false, combinedSettings);

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(fitbitRestingCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when Fitbit is enabled, but only with resting calories.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'Fitbit', type: 'CaloriesBMR' }
        );

        setupCombinedDataCollectionSettings(false, combinedSettings);

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(fitbitRestingCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
    });

    it('Should return the result when Fitbit is enabled with both required data types.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'Fitbit', type: 'Calories' },
            { namespace: 'Fitbit', type: 'CaloriesBMR' }
        );

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

        setupCombinedDataCollectionSettings(false, combinedSettings);
        setupDailyDataProvider(fitbitCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, totalCaloriesResult);
        setupDailyDataProvider(fitbitRestingCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, restingCaloriesResult);

        const result = await fitbitActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(Object.keys(result).length).toBe(2);
        expect(result[getDayKey(sampleStartDate)]).toBe(500);
        expect(result[getDayKey(add(sampleStartDate, { days: 3 }))]).toBe(400);
    });
});
