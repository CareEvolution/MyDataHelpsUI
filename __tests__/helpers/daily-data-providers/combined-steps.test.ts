import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, createMockResult, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings, setupCombinedMaxValueResult, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import combinedSteps from '../../../src/helpers/daily-data-providers/combined-steps';
import * as dailyDataResultFunctions from '../../../src/helpers/daily-data-providers/daily-data/daily-data-result';
import { appleHealthStepsDataProvider, fitbitStepsDataProvider, garminStepsDataProvider, googleFitStepsDataProvider, ouraStepsDataProvider } from '../../../src/helpers/daily-data-providers';

jest.mock('../../../src/helpers/daily-data-providers/fitbit-steps', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/garmin-steps', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/apple-health-steps', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/google-fit-steps', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/oura-daily-steps', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Daily Data Provider - Combined Steps', () => {

    const fitbitStepsDataProviderMock = fitbitStepsDataProvider as jest.Mock;
    const garminStepsDataProviderMock = garminStepsDataProvider as jest.Mock;
    const appleHealthStepsDataProviderMock = appleHealthStepsDataProvider as jest.Mock;
    const googleFitStepsDataProviderMock = googleFitStepsDataProvider as jest.Mock;
    const ouraStepsDataProviderMock = ouraStepsDataProvider as jest.Mock;
    const combinedMaxValueResultMock = jest.spyOn(dailyDataResultFunctions, 'combineResultsUsingMaxValue');

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('Should return an empty result when no providers are enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedSteps(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(garminStepsDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthStepsDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(ouraStepsDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when providers are enabled, but not the correct data types.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.googleFitEnabled = true;
        combinedSettings.settings.ouraEnabled = true;

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedSteps(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(garminStepsDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthStepsDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(ouraStepsDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when GoogleFit is enabled and has the correct data type, but is not included (the default).', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.googleFitEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'GoogleFit', type: 'Steps' }
        );

        setupCombinedDataCollectionSettings(true, combinedSettings);

        const result = await combinedSteps(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});
        expect(fitbitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(garminStepsDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthStepsDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(ouraStepsDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Fitbit result when enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;

        const fitbitResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(fitbitStepsDataProviderMock, sampleStartDate, sampleEndDate, fitbitResult);

        const result = await combinedSteps(sampleStartDate, sampleEndDate);

        expect(result).toBe(fitbitResult);
        expect(garminStepsDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthStepsDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(ouraStepsDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Garmin result when enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.garminEnabled = true;

        const garminResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(garminStepsDataProviderMock, sampleStartDate, sampleEndDate, garminResult);

        const result = await combinedSteps(sampleStartDate, sampleEndDate);

        expect(result).toBe(garminResult);
        expect(fitbitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthStepsDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(ouraStepsDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Apple Health result when fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'HourlySteps' }
        );

        const appleHealthResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(appleHealthStepsDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);

        const result = await combinedSteps(sampleStartDate, sampleEndDate);

        expect(result).toBe(appleHealthResult);
        expect(fitbitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(garminStepsDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(ouraStepsDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Google Fit result when fully enabled and included.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.googleFitEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'GoogleFit', type: 'Steps' }
        );

        const googleFitResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(googleFitStepsDataProviderMock, sampleStartDate, sampleEndDate, googleFitResult);

        const result = await combinedSteps(sampleStartDate, sampleEndDate, true);

        expect(result).toBe(googleFitResult);
        expect(fitbitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(garminStepsDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthStepsDataProviderMock).not.toHaveBeenCalled();
        expect(ouraStepsDataProviderMock).not.toHaveBeenCalled();
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
        setupDailyDataProvider(ouraStepsDataProviderMock, sampleStartDate, sampleEndDate, ouraResult);

        const result = await combinedSteps(sampleStartDate, sampleEndDate);

        expect(result).toBe(ouraResult);
        expect(fitbitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(garminStepsDataProviderMock).not.toHaveBeenCalled();
        expect(appleHealthStepsDataProviderMock).not.toHaveBeenCalled();
        expect(googleFitStepsDataProviderMock).not.toHaveBeenCalled();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return a combined max-value result when multiple sources are fully enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.garminEnabled = true;
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.googleFitEnabled = true;
        combinedSettings.settings.ouraEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'HourlySteps' },
            { namespace: 'GoogleFit', type: 'Steps' }
        );
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'Oura', type: 'daily-activity', enabled: true }
        );

        const fitbitResult = createMockResult();
        const garminResult = createMockResult();
        const appleHealthResult = createMockResult();
        const googleFitResult = createMockResult();
        const ouraResult = createMockResult();

        setupCombinedDataCollectionSettings(true, combinedSettings);
        setupDailyDataProvider(fitbitStepsDataProviderMock, sampleStartDate, sampleEndDate, fitbitResult);
        setupDailyDataProvider(garminStepsDataProviderMock, sampleStartDate, sampleEndDate, garminResult);
        setupDailyDataProvider(appleHealthStepsDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);
        setupDailyDataProvider(googleFitStepsDataProviderMock, sampleStartDate, sampleEndDate, googleFitResult);
        setupDailyDataProvider(ouraStepsDataProviderMock, sampleStartDate, sampleEndDate, ouraResult);
        setupCombinedMaxValueResult(sampleStartDate, sampleEndDate, [fitbitResult, garminResult, appleHealthResult, googleFitResult, ouraResult], sampleResult);

        const result = await combinedSteps(sampleStartDate, sampleEndDate, true);

        expect(result).toBe(sampleResult);
    });
});
