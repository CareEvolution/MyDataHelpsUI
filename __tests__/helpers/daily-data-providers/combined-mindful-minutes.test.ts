import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, createMockResult, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings, setupCombinedFirstValueResult, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import combinedMindfulMinutes from '../../../src/helpers/daily-data-providers/combined-mindful-minutes';
import * as dailyDataResultFunctions from '../../../src/helpers/daily-data-providers/daily-data/daily-data-result';
import { appleHealthMindfulMinutesDataProvider, googleFitMindfulMinutesDataProvider, healthConnectMindfulMinutesDataProvider } from '../../../src/helpers/daily-data-providers';

jest.mock('../../../src/helpers/daily-data-providers/apple-health-mindful-minutes', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/google-fit-mindful-minutes', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/health-connect-mindful-minutes', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Daily Data Provider - Combined Mindful Minutes', () => {

    const appleHealthMindfulMinutesDataProviderMock = appleHealthMindfulMinutesDataProvider as jest.Mock;
    const googleFitMindfulMinutesDataProviderMock = googleFitMindfulMinutesDataProvider as jest.Mock;
    const healthConnectMindfulMinutesDataProviderMock = healthConnectMindfulMinutesDataProvider as jest.Mock;
    const combinedFirstValueResultMock = jest.spyOn(dailyDataResultFunctions, 'combineResultsUsingFirstValue');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Should return an empty result when no providers are enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedMindfulMinutes(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(appleHealthMindfulMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitMindfulMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectMindfulMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when providers are enabled, but not the correct data types.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.googleFitEnabled = true;
        combinedSettings.settings.healthConnectEnabled = true;

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedMindfulMinutes(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(appleHealthMindfulMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitMindfulMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectMindfulMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Apple Health result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'AppleHealth', type: 'Mindful Sessions', enabled: true }
        );

        const appleHealthResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(appleHealthMindfulMinutesDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);

        const result = await combinedMindfulMinutes(sampleStartDate, sampleEndDate);

        expect(result).toBe(appleHealthResult);
        expect(googleFitMindfulMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectMindfulMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Google Fit result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.googleFitEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'GoogleFit', type: 'ActivitySegment' }
        );

        const googleFitResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(googleFitMindfulMinutesDataProviderMock, sampleStartDate, sampleEndDate, googleFitResult);

        const result = await combinedMindfulMinutes(sampleStartDate, sampleEndDate);

        expect(result).toBe(googleFitResult);
        expect(appleHealthMindfulMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectMindfulMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Health Connect result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'HealthConnect', type: 'mindfulness-sessions', enabled: true }
        );

        const healthConnectResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(healthConnectMindfulMinutesDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);

        const result = await combinedMindfulMinutes(sampleStartDate, sampleEndDate);

        expect(result).toBe(healthConnectResult);
        expect(appleHealthMindfulMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitMindfulMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return a combined first-value result when multiple sources are fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.googleFitEnabled = true;
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'GoogleFit', type: 'ActivitySegment' }
        );
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'AppleHealth', type: 'Mindful Sessions', enabled: true },
            { namespace: 'HealthConnect', type: 'mindfulness-sessions', enabled: true }
        );

        const appleHealthResult = createMockResult();
        const googleFitResult = createMockResult();
        const healthConnectResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(appleHealthMindfulMinutesDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);
        setupDailyDataProvider(googleFitMindfulMinutesDataProviderMock, sampleStartDate, sampleEndDate, googleFitResult);
        setupDailyDataProvider(healthConnectMindfulMinutesDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);
        setupCombinedFirstValueResult(sampleStartDate, sampleEndDate, [appleHealthResult, googleFitResult, healthConnectResult], sampleResult);

        const result = await combinedMindfulMinutes(sampleStartDate, sampleEndDate);

        expect(result).toBe(sampleResult);
    });
});
