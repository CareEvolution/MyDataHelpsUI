import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, createMockResult, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings, setupCombinedFirstValueResult, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import combinedBloodGlucose from '../../../src/helpers/daily-data-providers/combined-blood-glucose';
import * as dailyDataResultFunctions from '../../../src/helpers/daily-data-providers/daily-data/daily-data-result';
import { appleHealthBloodGlucoseDataProvider, healthConnectBloodGlucoseDataProvider } from '../../../src/helpers/daily-data-providers';

jest.mock('../../../src/helpers/daily-data-providers/apple-health-blood-glucose', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/health-connect-blood-glucose', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Daily Data Provider - Combined Blood Glucose', () => {

    const appleHealthBloodGlucoseDataProviderMock = appleHealthBloodGlucoseDataProvider as jest.Mock;
    const healthConnectBloodGlucoseDataProviderMock = healthConnectBloodGlucoseDataProvider as jest.Mock;
    const combinedFirstValueResultMock = jest.spyOn(dailyDataResultFunctions, 'combineResultsUsingFirstValue');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Should return an empty result when no providers are enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedBloodGlucose(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(appleHealthBloodGlucoseDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectBloodGlucoseDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when providers are enabled, but not the correct data types.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.healthConnectEnabled = true;

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedBloodGlucose(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(appleHealthBloodGlucoseDataProviderMock).not.toHaveBeenCalled();
        expect(healthConnectBloodGlucoseDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Apple Health result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'AppleHealth', type: 'Blood Glucose', enabled: true }
        );

        const appleHealthResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(appleHealthBloodGlucoseDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);

        const result = await combinedBloodGlucose(sampleStartDate, sampleEndDate);

        expect(result).toBe(appleHealthResult);
        expect(healthConnectBloodGlucoseDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Health Connect result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'HealthConnect', type: 'blood-glucose', enabled: true }
        );

        const healthConnectResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(healthConnectBloodGlucoseDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);

        const result = await combinedBloodGlucose(sampleStartDate, sampleEndDate);

        expect(result).toBe(healthConnectResult);
        expect(appleHealthBloodGlucoseDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return a combined first-value result when multiple sources are fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.healthConnectEnabled = true;
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'AppleHealth', type: 'Blood Glucose', enabled: true },
            { namespace: 'HealthConnect', type: 'blood-glucose', enabled: true }
        );

        const appleHealthResult = createMockResult();
        const healthConnectResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(appleHealthBloodGlucoseDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);
        setupDailyDataProvider(healthConnectBloodGlucoseDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);
        setupCombinedFirstValueResult(sampleStartDate, sampleEndDate, [appleHealthResult, healthConnectResult], sampleResult);

        const result = await combinedBloodGlucose(sampleStartDate, sampleEndDate);

        expect(result).toBe(sampleResult);
    });
});
