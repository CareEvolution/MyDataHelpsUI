import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, createMockResult, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings, setupCombinedRoundedAverageValueResult, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import * as dailyDataFunctions from '../../../src/helpers/daily-data-providers/daily-data';
import { appleHealthRestingHeartRateDataProvider, fitbitRestingHeartRateDataProvider, garminRestingHeartRateDataProvider, healthConnectRestingHeartRateDataProvider, ouraRestingHeartRateDataProvider } from '../../../src/helpers/daily-data-providers';
import combinedRestingHeartRate from '../../../src/helpers/daily-data-providers/combined-resting-heart-rate';

jest.mock('../../../src/helpers/daily-data-providers/fitbit-resting-heart-rate', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/garmin-heart-rate', () => ({
    __esModule: true,
    restingHeartRate: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/apple-health-resting-heart-rate', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/health-connect-resting-heart-rate', () => ({
    __esModule: true,
    restingHeartRateProvider: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/oura-resting-heart-rate', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Daily Data Provider - Combined Resting Heart Rate', () => {

    const fitbitRestingHeartRateDataProviderMock = fitbitRestingHeartRateDataProvider as jest.Mock;
    const garminRestingHeartRateDataProviderMock = garminRestingHeartRateDataProvider as jest.Mock;
    const appleHealthRestingHeartRateDataProviderMock = appleHealthRestingHeartRateDataProvider as jest.Mock;
    const healthConnectRestingHeartRateDataProviderMock = healthConnectRestingHeartRateDataProvider as jest.Mock;
    const ouraRestingHeartRateDataProviderMock = ouraRestingHeartRateDataProvider as jest.Mock;
    const combinedRoundedAverageValueResultMock = jest.spyOn(dailyDataFunctions, 'combineResultsUsingRoundedAverageValue');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Should return an empty result when no providers are enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedRestingHeartRate(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(garminRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(ouraRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(combinedRoundedAverageValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when providers are enabled, but not the correct data types.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.settings.ouraEnabled = true;

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedRestingHeartRate(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(garminRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(ouraRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(combinedRoundedAverageValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Fitbit result when enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;

        const fitbitResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(fitbitRestingHeartRateDataProviderMock, sampleStartDate, sampleEndDate, fitbitResult);

        const result = await combinedRestingHeartRate(sampleStartDate, sampleEndDate);

        expect(result).toBe(fitbitResult);
        expect(garminRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(ouraRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(combinedRoundedAverageValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Garmin result when enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.garminEnabled = true;

        const garminResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(garminRestingHeartRateDataProviderMock, sampleStartDate, sampleEndDate, garminResult);

        const result = await combinedRestingHeartRate(sampleStartDate, sampleEndDate);

        expect(result).toBe(garminResult);
        expect(fitbitRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(ouraRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(combinedRoundedAverageValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Apple Health result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'RestingHeartRate' }
        );

        const appleHealthResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(appleHealthRestingHeartRateDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);

        const result = await combinedRestingHeartRate(sampleStartDate, sampleEndDate);

        expect(result).toBe(appleHealthResult);
        expect(fitbitRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(garminRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(ouraRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(combinedRoundedAverageValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Health Connect result when fully enabled and included.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'HealthConnect', type: 'resting-heart-rate', enabled: true }
        );

        const healthConnectResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(healthConnectRestingHeartRateDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);

        const result = await combinedRestingHeartRate(sampleStartDate, sampleEndDate);

        expect(result).toBe(healthConnectResult);
        expect(fitbitRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(garminRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(ouraRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(combinedRoundedAverageValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Oura result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.ouraEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'Oura', type: 'sleep', enabled: true }
        );

        const ouraResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(ouraRestingHeartRateDataProviderMock, sampleStartDate, sampleEndDate, ouraResult);

        const result = await combinedRestingHeartRate(sampleStartDate, sampleEndDate);

        expect(result).toBe(ouraResult);
        expect(fitbitRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(garminRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectRestingHeartRateDataProviderMock).not.toHaveBeenCalled();
        expect(combinedRoundedAverageValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return a combined rounded-average-value result when multiple sources are fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.garminEnabled = true;
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.settings.ouraEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'RestingHeartRate' }
        );
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'HealthConnect', type: 'resting-heart-rate', enabled: true },
            { namespace: 'Oura', type: 'sleep', enabled: true }
        );

        const fitbitResult = createMockResult();
        const garminResult = createMockResult();
        const appleHealthResult = createMockResult();
        const healthConnectResult = createMockResult();
        const ouraResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(fitbitRestingHeartRateDataProviderMock, sampleStartDate, sampleEndDate, fitbitResult);
        setupDailyDataProvider(garminRestingHeartRateDataProviderMock, sampleStartDate, sampleEndDate, garminResult);
        setupDailyDataProvider(appleHealthRestingHeartRateDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);
        setupDailyDataProvider(healthConnectRestingHeartRateDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);
        setupDailyDataProvider(ouraRestingHeartRateDataProviderMock, sampleStartDate, sampleEndDate, ouraResult);
        setupCombinedRoundedAverageValueResult(sampleStartDate, sampleEndDate, [fitbitResult, garminResult, appleHealthResult, healthConnectResult, ouraResult], sampleResult);

        const result = await combinedRestingHeartRate(sampleStartDate, sampleEndDate);

        expect(result).toBe(sampleResult);
    });
});
