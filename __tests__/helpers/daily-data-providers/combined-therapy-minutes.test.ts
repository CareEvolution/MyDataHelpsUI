import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, createMockResult, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings, setupCombinedFirstValueResult, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import combinedTherapyMinutes from '../../../src/helpers/daily-data-providers/combined-therapy-minutes';
import * as dailyDataFunctions from '../../../src/helpers/daily-data-providers/daily-data';
import { appleHealthTherapyMinutesDataProvider, googleFitTherapyMinutesDataProvider } from '../../../src/helpers/daily-data-providers';

jest.mock('../../../src/helpers/daily-data-providers/apple-health-therapy-minutes', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/google-fit-therapy-minutes', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Daily Data Provider - Combined Therapy Minutes', () => {

    const appleHealthTherapyMinutesDataProviderMock = appleHealthTherapyMinutesDataProvider as jest.Mock;
    const googleFitTherapyMinutesDataProviderMock = googleFitTherapyMinutesDataProvider as jest.Mock;
    const combinedFirstValueResultMock = jest.spyOn(dailyDataFunctions, 'combineResultsUsingFirstValue');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Should return an empty result when no providers are enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();

        setupCombinedDataCollectionSettings(false, combinedSettings);

        const result = await combinedTherapyMinutes(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(appleHealthTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when providers are enabled, but not the correct data types.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.googleFitEnabled = true;

        setupCombinedDataCollectionSettings(false, combinedSettings);

        const result = await combinedTherapyMinutes(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(appleHealthTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Apple Health result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'MindfulSession' }
        );

        const appleHealthResult = createMockResult();

        setupCombinedDataCollectionSettings(false, combinedSettings);
        setupDailyDataProvider(appleHealthTherapyMinutesDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);

        const result = await combinedTherapyMinutes(sampleStartDate, sampleEndDate);

        expect(result).toBe(appleHealthResult);
        expect(googleFitTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Google Fit result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.googleFitEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'GoogleFit', type: 'SilverCloudSession' }
        );

        const googleFitResult = createMockResult();

        setupCombinedDataCollectionSettings(false, combinedSettings);
        setupDailyDataProvider(googleFitTherapyMinutesDataProviderMock, sampleStartDate, sampleEndDate, googleFitResult);

        const result = await combinedTherapyMinutes(sampleStartDate, sampleEndDate);

        expect(result).toBe(googleFitResult);
        expect(appleHealthTherapyMinutesDataProviderMock).not.toHaveBeenCalled();
        expect(combinedFirstValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return a combined first-value result when both sources are fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.googleFitEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'MindfulSession' },
            { namespace: 'GoogleFit', type: 'SilverCloudSession' }
        );

        const appleHealthResult = createMockResult();
        const googleFitResult = createMockResult();

        setupCombinedDataCollectionSettings(false, combinedSettings);
        setupDailyDataProvider(appleHealthTherapyMinutesDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);
        setupDailyDataProvider(googleFitTherapyMinutesDataProviderMock, sampleStartDate, sampleEndDate, googleFitResult);
        setupCombinedFirstValueResult(sampleStartDate, sampleEndDate, [appleHealthResult, googleFitResult], sampleResult);

        const result = await combinedTherapyMinutes(sampleStartDate, sampleEndDate);

        expect(result).toBe(sampleResult);
    });
});
