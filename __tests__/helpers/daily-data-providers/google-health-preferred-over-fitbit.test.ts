import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, createMockResult, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings, setupCombinedFirstValueResult, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import { googleHealthPreferredOverFitbit } from '../../../src/helpers/daily-data-providers/google-health-preferred-over-fitbit';

describe('Daily Data Provider - Google Health preferred over Fitbit', () => {
    const combinedSettings = createEmptyCombinedDataCollectionSettings();

    beforeEach(() => {
        jest.resetAllMocks();
        combinedSettings.settings.fitbitEnabled = false;
        combinedSettings.settings.googleHealthEnabled = false;
        combinedSettings.deviceDataV2Types = [];
        setupCombinedDataCollectionSettings(true, combinedSettings);
    });

    it('returns only the Fitbit result when Google Health is disabled.', async () => {
        combinedSettings.settings.fitbitEnabled = true;
        const fitbitResult = createMockResult();
        const fitbitProvider = jest.fn();
        const googleHealthProvider = jest.fn();
        setupDailyDataProvider(fitbitProvider, sampleStartDate, sampleEndDate, fitbitResult);

        const provider = googleHealthPreferredOverFitbit(fitbitProvider, googleHealthProvider, 'steps-daily');
        expect(await provider(sampleStartDate, sampleEndDate)).toBe(fitbitResult);
        expect(googleHealthProvider).not.toHaveBeenCalled();
    });

    it('returns only the Google Health result when Fitbit is disabled.', async () => {
        combinedSettings.settings.googleHealthEnabled = true;
        combinedSettings.deviceDataV2Types = [{ namespace: 'GoogleHealth', type: 'steps-daily', enabled: true }];
        const googleHealthResult = createMockResult();
        const fitbitProvider = jest.fn();
        const googleHealthProvider = jest.fn();
        setupDailyDataProvider(googleHealthProvider, sampleStartDate, sampleEndDate, googleHealthResult);

        const provider = googleHealthPreferredOverFitbit(fitbitProvider, googleHealthProvider, 'steps-daily');
        expect(await provider(sampleStartDate, sampleEndDate)).toBe(googleHealthResult);
        expect(fitbitProvider).not.toHaveBeenCalled();
    });

    it('prefers Google Health (ordered first) and falls back to Fitbit per day when both are available.', async () => {
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.googleHealthEnabled = true;
        combinedSettings.deviceDataV2Types = [{ namespace: 'GoogleHealth', type: 'steps-daily', enabled: true }];
        const fitbitResult = createMockResult();
        const googleHealthResult = createMockResult();
        const fitbitProvider = jest.fn();
        const googleHealthProvider = jest.fn();
        setupDailyDataProvider(fitbitProvider, sampleStartDate, sampleEndDate, fitbitResult);
        setupDailyDataProvider(googleHealthProvider, sampleStartDate, sampleEndDate, googleHealthResult);
        // Google Health ordered first so it wins each day, Fitbit fills the gaps.
        setupCombinedFirstValueResult(sampleStartDate, sampleEndDate, [googleHealthResult, fitbitResult], sampleResult);

        const provider = googleHealthPreferredOverFitbit(fitbitProvider, googleHealthProvider, 'steps-daily');
        expect(await provider(sampleStartDate, sampleEndDate)).toBe(sampleResult);
    });

    it('ignores Google Health when the type is present but not enabled.', async () => {
        combinedSettings.settings.fitbitEnabled = true;
        combinedSettings.settings.googleHealthEnabled = true;
        combinedSettings.deviceDataV2Types = [{ namespace: 'GoogleHealth', type: 'steps-daily', enabled: false }];
        const fitbitResult = createMockResult();
        const fitbitProvider = jest.fn();
        const googleHealthProvider = jest.fn();
        setupDailyDataProvider(fitbitProvider, sampleStartDate, sampleEndDate, fitbitResult);

        const provider = googleHealthPreferredOverFitbit(fitbitProvider, googleHealthProvider, 'steps-daily');
        expect(await provider(sampleStartDate, sampleEndDate)).toBe(fitbitResult);
        expect(googleHealthProvider).not.toHaveBeenCalled();
    });
});
