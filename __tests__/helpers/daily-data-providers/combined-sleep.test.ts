import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, createMockResult, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings, setupCombinedMaxValueResult, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import * as dailyDataResultFunctions from '../../../src/helpers/daily-data-providers/daily-data/daily-data-result';
import { appleHealthSleepDataProvider, fitbitTotalSleepMinutesDataProvider, garminTotalSleepMinutesDataProvider, healthConnectTotalSleepMinutesDataProvider, ouraSleepMinutesDataProvider } from '../../../src/helpers/daily-data-providers';
import combinedSleep from '../../../src/helpers/daily-data-providers/combined-sleep';

jest.mock('../../../src/helpers/daily-data-providers/fitbit-sleep', () => ({
    __esModule: true,
    totalSleepMinutes: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/garmin-sleep', () => ({
    __esModule: true,
    totalSleepMinutes: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/apple-health-sleep', () => ({
    __esModule: true,
    asleepTime: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/health-connect-sleep', () => ({
    __esModule: true,
    totalSleepMinutes: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/oura-total-sleep', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Daily Data Provider - Combined Sleep', () => {

    const fitbitTotalSleepMinutesDataProviderMock = fitbitTotalSleepMinutesDataProvider as jest.Mock;
    const garminTotalSleepMinutesDataProviderMock = garminTotalSleepMinutesDataProvider as jest.Mock;
    const appleHealthSleepDataProviderMock = appleHealthSleepDataProvider as jest.Mock;
    const healthConnectTotalSleepMinutesDataProviderMock = healthConnectTotalSleepMinutesDataProvider as jest.Mock;
    const ouraSleepMinutesDataProviderMock = ouraSleepMinutesDataProvider as jest.Mock;
    const combinedMaxValueResultMock = jest.spyOn(dailyDataResultFunctions, 'combineResultsUsingMaxValue');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Should return an empty result when no providers are enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedSleep(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(garminTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthSleepDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(ouraSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when providers are enabled, but not the correct data types.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.settings.ouraEnabled = true;

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedSleep(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(garminTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthSleepDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(ouraSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Fitbit result when enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;

        const fitbitResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(fitbitTotalSleepMinutesDataProviderMock, sampleStartDate, sampleEndDate, fitbitResult);

        const result = await combinedSleep(sampleStartDate, sampleEndDate);

        expect(result).toBe(fitbitResult);
        expect(garminTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthSleepDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(ouraSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Garmin result when enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.garminEnabled = true;

        const garminResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(garminTotalSleepMinutesDataProviderMock, sampleStartDate, sampleEndDate, garminResult);

        const result = await combinedSleep(sampleStartDate, sampleEndDate);

        expect(result).toBe(garminResult);
        expect(fitbitTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthSleepDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(ouraSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Apple Health result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'SleepAnalysisInterval' }
        );

        const appleHealthResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(appleHealthSleepDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);

        const result = await combinedSleep(sampleStartDate, sampleEndDate);

        expect(result).toBe(appleHealthResult);
        expect(fitbitTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(garminTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(ouraSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Health Connect result when fully enabled and included.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'HealthConnect', type: 'sleep', enabled: true }
        );

        const healthConnectResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(healthConnectTotalSleepMinutesDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);

        const result = await combinedSleep(sampleStartDate, sampleEndDate);

        expect(result).toBe(healthConnectResult);
        expect(fitbitTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(garminTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthSleepDataProviderMock).not.toHaveBeenCalled();
        expect(ouraSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Oura result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.ouraEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'Oura', type: 'sleep', enabled: true }
        );

        const ouraResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(ouraSleepMinutesDataProviderMock, sampleStartDate, sampleEndDate, ouraResult);

        const result = await combinedSleep(sampleStartDate, sampleEndDate);

        expect(result).toBe(ouraResult);
        expect(fitbitTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(garminTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthSleepDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectTotalSleepMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return a combined rounded-average-value result when multiple sources are fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.garminEnabled = true;
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.settings.ouraEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'SleepAnalysisInterval' }
        );
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'HealthConnect', type: 'sleep', enabled: true },
            { namespace: 'Oura', type: 'sleep', enabled: true }
        );

        const fitbitResult = createMockResult();
        const garminResult = createMockResult();
        const appleHealthResult = createMockResult();
        const healthConnectResult = createMockResult();
        const ouraResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(fitbitTotalSleepMinutesDataProviderMock, sampleStartDate, sampleEndDate, fitbitResult);
        setupDailyDataProvider(garminTotalSleepMinutesDataProviderMock, sampleStartDate, sampleEndDate, garminResult);
        setupDailyDataProvider(appleHealthSleepDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);
        setupDailyDataProvider(healthConnectTotalSleepMinutesDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);
        setupDailyDataProvider(ouraSleepMinutesDataProviderMock, sampleStartDate, sampleEndDate, ouraResult);
        setupCombinedMaxValueResult(sampleStartDate, sampleEndDate, [fitbitResult, garminResult, appleHealthResult, healthConnectResult, ouraResult], sampleResult);

        const result = await combinedSleep(sampleStartDate, sampleEndDate);

        expect(result).toBe(sampleResult);
    });
});
