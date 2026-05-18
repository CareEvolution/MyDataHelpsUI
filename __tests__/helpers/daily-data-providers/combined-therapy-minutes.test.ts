import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, createMockResult, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings, setupCombinedFirstValueResult, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import combinedTherapyMinutes from '../../../src/helpers/daily-data-providers/combined-therapy-minutes';
import * as dailyDataResultFunctions from '../../../src/helpers/daily-data-providers/daily-data/daily-data-result';
import { appleHealthTherapyMinutesDataProvider, googleFitTherapyMinutesDataProvider, healthConnectTherapyMinutesDataProvider } from '../../../src/helpers/daily-data-providers';

jest.mock('../../../src/helpers/daily-data-providers/apple-health-therapy-minutes', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/google-fit-therapy-minutes', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/health-connect-therapy-minutes', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Daily Data Provider - Combined Therapy Minutes', () => {

    const appleHealthTherapyMinutesDataProviderMock = appleHealthTherapyMinutesDataProvider as jest.Mock;
    const googleFitTherapyMinutesDataProviderMock = googleFitTherapyMinutesDataProvider as jest.Mock;
    const healthConnectTherapyMinutesDataProviderMock = healthConnectTherapyMinutesDataProvider as jest.Mock;
    const combinedFirstValueResultMock = jest.spyOn(dailyDataResultFunctions, 'combineResultsUsingFirstValue');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Should return an empty result when no providers are enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedTherapyMinutes(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(appleHealthTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when providers are enabled, but not the correct data types.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.googleFitEnabled = true;
        combinedSettings.settings.healthConnectEnabled = true;

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedTherapyMinutes(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(appleHealthTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Apple Health result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'MindfulSession' }
        );

        const appleHealthResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(appleHealthTherapyMinutesDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);

        const result = await combinedTherapyMinutes(sampleStartDate, sampleEndDate);

        expect(result).toBe(appleHealthResult);
        expect(googleFitTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Google Fit result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.googleFitEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'GoogleFit', type: 'SilverCloudSession' }
        );

        const googleFitResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(googleFitTherapyMinutesDataProviderMock, sampleStartDate, sampleEndDate, googleFitResult);

        const result = await combinedTherapyMinutes(sampleStartDate, sampleEndDate);

        expect(result).toBe(googleFitResult);
        expect(appleHealthTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Health Connect result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'HealthConnect', type: 'exercise-session', enabled: true }
        );

        const healthConnectResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(healthConnectTherapyMinutesDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);

        const result = await combinedTherapyMinutes(sampleStartDate, sampleEndDate);

        expect(result).toBe(healthConnectResult);
        expect(appleHealthTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return a combined first-value result when multiple sources are fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.googleFitEnabled = true;
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'MindfulSession' },
            { namespace: 'GoogleFit', type: 'SilverCloudSession' }
        );
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'HealthConnect', type: 'exercise-session', enabled: true }
        );

        const appleHealthResult = createMockResult();
        const googleFitResult = createMockResult();
        const healthConnectResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(appleHealthTherapyMinutesDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);
        setupDailyDataProvider(googleFitTherapyMinutesDataProviderMock, sampleStartDate, sampleEndDate, googleFitResult);
        setupDailyDataProvider(healthConnectTherapyMinutesDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);
        setupCombinedFirstValueResult(sampleStartDate, sampleEndDate, [appleHealthResult, googleFitResult, healthConnectResult], sampleResult);

        const result = await combinedTherapyMinutes(sampleStartDate, sampleEndDate);

        expect(result).toBe(sampleResult);
    });
});
