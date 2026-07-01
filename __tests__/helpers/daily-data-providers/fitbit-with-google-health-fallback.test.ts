import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, createMockResult, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings, setupCombinedFirstValueResult, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import { fitbitWithGoogleHealthFallback } from '../../../src/helpers/daily-data-providers/fitbit-with-google-health-fallback';

describe('Daily Data Provider - Fitbit with Google Health fallback', () => {
    const combinedSettings = createEmptyCombinedDataCollectionSettings();

    beforeEach(() => {
        jest.resetAllMocks();
        combinedSettings.settings.fitbitEnabled = false;
        combinedSettings.settings.googleHealthEnabled = false;
        combinedSettings.deviceDataV2Types = [];
        setupCombinedDataCollectionSettings(true, combinedSettings);
    });

    it('returns only the Fitbit result when Google Health is not connected.', async () => {
        combinedSettings.settings.fitbitEnabled = true;
        const fitbitResult = createMockResult();
        const fitbitProvider = jest.fn();
        const googleHealthProvider = jest.fn();
        setupDailyDataProvider(fitbitProvider, sampleStartDate, sampleEndDate, fitbitResult);

        const provider = fitbitWithGoogleHealthFallback(fitbitProvider, googleHealthProvider, 'steps-daily');
        expect(await provider(sampleStartDate, sampleEndDate)).toBe(fitbitResult);
        expect(googleHealthProvider).not.toHaveBeenCalled();
    });

    it('returns only the Google Health result when Fitbit is disabled.', async () => {
        combinedSettings.settings.googleHealthEnabled = true;
        combinedSettings.deviceDataV2Types = [{ namespace: 'GoogleHealth' as any, type: 'steps-daily', enabled: true }];
        const googleHealthResult = createMockResult();
        const fitbitProvider = jest.fn();
        const googleHealthProvider = jest.fn();
        setupDailyDataProvider(googleHealthProvider, sampleStartDate, sampleEndDate, googleHealthResult);

        const provider = fitbitWithGoogleHealthFallback(fitbitProvider, googleHealthProvider, 'steps-daily');
        expect(await provider(sampleStartDate, sampleEndDate)).toBe(googleHealthResult);
        expect(fitbitProvider).not.toHaveBeenCalled();
    });

    it('prefers Fitbit (ordered first) and falls back to Google Health per day when both are available.', async () => {
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.googleHealthEnabled = true;
        combinedSettings.deviceDataV2Types = [{ namespace: 'GoogleHealth' as any, type: 'steps-daily', enabled: true }];
        const fitbitResult = createMockResult();
        const googleHealthResult = createMockResult();
        const fitbitProvider = jest.fn();
        const googleHealthProvider = jest.fn();
        setupDailyDataProvider(fitbitProvider, sampleStartDate, sampleEndDate, fitbitResult);
        setupDailyDataProvider(googleHealthProvider, sampleStartDate, sampleEndDate, googleHealthResult);
        setupCombinedFirstValueResult(sampleStartDate, sampleEndDate, [fitbitResult, googleHealthResult], sampleResult);

        const provider = fitbitWithGoogleHealthFallback(fitbitProvider, googleHealthProvider, 'steps-daily');
        expect(await provider(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('ignores Google Health when the type is present but not enabled.', async () => {
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.googleHealthEnabled = true;
        combinedSettings.deviceDataV2Types = [{ namespace: 'GoogleHealth' as any, type: 'steps-daily', enabled: false }];
        const fitbitResult = createMockResult();
        const fitbitProvider = jest.fn();
        const googleHealthProvider = jest.fn();
        setupDailyDataProvider(fitbitProvider, sampleStartDate, sampleEndDate, fitbitResult);

        const provider = fitbitWithGoogleHealthFallback(fitbitProvider, googleHealthProvider, 'steps-daily');
        expect(await provider(sampleStartDate, sampleEndDate)).toBe(fitbitResult);
        expect(googleHealthProvider).not.toHaveBeenCalled();
    });
});
