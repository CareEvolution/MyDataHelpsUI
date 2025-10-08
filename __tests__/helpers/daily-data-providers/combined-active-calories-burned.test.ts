import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, createMockResult, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings, setupCombinedMaxValueResult, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import * as dailyDataResultFunctions from '../../../src/helpers/daily-data-providers/daily-data/daily-data-result';
import { appleHealthActiveEnergyBurnedDataProvider, fitbitActiveCaloriesBurnedDataProvider, garminActiveCaloriesDataProvider, healthConnectActiveCaloriesBurnedDataProvider, ouraActiveCaloriesBurnedDataProvider } from '../../../src/helpers/daily-data-providers';
import combinedActiveCaloriesBurned from '../../../src/helpers/daily-data-providers/combined-active-calories-burned';

jest.mock('../../../src/helpers/daily-data-providers/fitbit-active-calories-burned', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/garmin-active-calories', () => ({
    __esModule: true,
    activeCalories: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/apple-health-active-energy-burned', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/health-connect-active-calories-burned', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/oura-active-calories-burned', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Daily Data Provider - Combined Active Calories Burned', () => {

    const fitbitActiveCaloriesBurnedDataProviderMock = fitbitActiveCaloriesBurnedDataProvider as jest.Mock;
    const garminActiveCaloriesDataProviderMock = garminActiveCaloriesDataProvider as jest.Mock;
    const appleHealthActiveEnergyBurnedDataProviderMock = appleHealthActiveEnergyBurnedDataProvider as jest.Mock;
    const healthConnectActiveCaloriesBurnedDataProviderMock = healthConnectActiveCaloriesBurnedDataProvider as jest.Mock;
    const ouraActiveCaloriesBurnedDataProviderMock = ouraActiveCaloriesBurnedDataProvider as jest.Mock;
    const combinedMaxValueResultMock = jest.spyOn(dailyDataResultFunctions, 'combineResultsUsingMaxValue');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Should return an empty result when no providers are enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(garminActiveCaloriesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthActiveEnergyBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(ouraActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when providers are enabled, but not the correct data types.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.settings.ouraEnabled = true;

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(garminActiveCaloriesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthActiveEnergyBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(ouraActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when Fitbit is enabled, but only with total calories.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'Fitbit', type: 'Calories' }
        );

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(garminActiveCaloriesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthActiveEnergyBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(ouraActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when Fitbit is enabled, but only with resting calories.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'Fitbit', type: 'CaloriesBMR' }
        );

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(garminActiveCaloriesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthActiveEnergyBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(ouraActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Fitbit result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'Fitbit', type: 'Calories' },
            { namespace: 'Fitbit', type: 'CaloriesBMR' }
        );

        const fitbitResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(fitbitActiveCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, fitbitResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(fitbitResult);
        expect(garminActiveCaloriesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthActiveEnergyBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(ouraActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Garmin result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.garminEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'Garmin', type: 'Calories' }
        );

        const garminResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(garminActiveCaloriesDataProviderMock, sampleStartDate, sampleEndDate, garminResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(garminResult);
        expect(fitbitActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthActiveEnergyBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(ouraActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Apple Health result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'ActiveEnergyBurned' }
        );

        const appleHealthResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(appleHealthActiveEnergyBurnedDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(appleHealthResult);
        expect(fitbitActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(garminActiveCaloriesDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(ouraActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Apple Health result when fully enabled (v2).', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'AppleHealth', type: 'Active Energy Burned', enabled: true }
        );

        const appleHealthResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(appleHealthActiveEnergyBurnedDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(appleHealthResult);
        expect(fitbitActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(garminActiveCaloriesDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(ouraActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Health Connect result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'HealthConnect', type: 'active-calories-burned-daily', enabled: true }
        );

        const healthConnectResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(healthConnectActiveCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(healthConnectResult);
        expect(fitbitActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(garminActiveCaloriesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthActiveEnergyBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(ouraActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Oura result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.ouraEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'Oura', type: 'daily-activity', enabled: true }
        );

        const ouraResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(ouraActiveCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, ouraResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(ouraResult);
        expect(fitbitActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(garminActiveCaloriesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthActiveEnergyBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectActiveCaloriesBurnedDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return a combined max-value result when multiple sources are fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.garminEnabled = true;
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.settings.ouraEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'Fitbit', type: 'Calories' },
            { namespace: 'Fitbit', type: 'CaloriesBMR' },
            { namespace: 'Garmin', type: 'Calories' },
            { namespace: 'AppleHealth', type: 'ActiveEnergyBurned' }
        );
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'HealthConnect', type: 'active-calories-burned-daily', enabled: true },
            { namespace: 'Oura', type: 'daily-activity', enabled: true }
        );

        const fitbitResult = createMockResult();
        const garminResult = createMockResult();
        const appleHealthResult = createMockResult();
        const healthConnectResult = createMockResult();
        const ouraResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(fitbitActiveCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, fitbitResult);
        setupDailyDataProvider(garminActiveCaloriesDataProviderMock, sampleStartDate, sampleEndDate, garminResult);
        setupDailyDataProvider(appleHealthActiveEnergyBurnedDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);
        setupDailyDataProvider(healthConnectActiveCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);
        setupDailyDataProvider(ouraActiveCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, ouraResult);
        setupCombinedMaxValueResult(sampleStartDate, sampleEndDate, [fitbitResult, garminResult, appleHealthResult, healthConnectResult, ouraResult], sampleResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(sampleResult);
    });
});
