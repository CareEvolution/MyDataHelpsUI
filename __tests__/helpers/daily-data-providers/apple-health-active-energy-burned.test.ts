import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings, setupDailyData, setupDailyDataV2, setupTotalValueResult, startDateFunctionEvaluator } from '../../fixtures/daily-data-providers';
import appleHealthActiveEnergyBurned from '../../../src/helpers/daily-data-providers/apple-health-active-energy-burned';
import * as dailyDataQueryFunctions from '../../../src/helpers/daily-data-providers/daily-data/daily-data-query';
import * as dailyDataResultFunctions from '../../../src/helpers/daily-data-providers/daily-data/daily-data-result';

describe('Daily Data Provider - Apple Health Active Energy Burned', () => {
    const queryForDailyDataMock = jest.spyOn(dailyDataQueryFunctions, 'queryForDailyData');
    const queryForDailyDataV2Mock = jest.spyOn(dailyDataQueryFunctions, 'queryForDailyDataV2');
    const buildTotalValueResultMock = jest.spyOn(dailyDataResultFunctions, 'buildTotalValueResult');

    beforeEach(() => {
        queryForDailyDataMock.mockReset();
        queryForDailyDataV2Mock.mockReset();
        buildTotalValueResultMock.mockReset();
    });

    it('Should return an empty result when Apple Health is not enabled.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();

        setupCombinedDataCollectionSettings(true, combinedSettings);

        expect(await appleHealthActiveEnergyBurned(sampleStartDate, sampleEndDate)).toEqual({});

        expect(queryForDailyDataMock).not.toHaveBeenCalled();
        expect(queryForDailyDataV2Mock).not.toHaveBeenCalled();
        expect(buildTotalValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when Apple Health is enabled, but not for the required type.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;

        setupCombinedDataCollectionSettings(true, combinedSettings);

        expect(await appleHealthActiveEnergyBurned(sampleStartDate, sampleEndDate)).toEqual({});

        expect(queryForDailyDataMock).not.toHaveBeenCalled();
        expect(queryForDailyDataV2Mock).not.toHaveBeenCalled();
        expect(buildTotalValueResultMock).not.toHaveBeenCalled();
    });

    it('Should query for daily data and build a total value result keyed by start date.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'ActiveEnergyBurned' }
        );

        setupCombinedDataCollectionSettings(true, combinedSettings);

        setupDailyData('AppleHealth', 'ActiveEnergyBurned', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyData);
        setupTotalValueResult(sampleDailyData, sampleResult);

        expect(await appleHealthActiveEnergyBurned(sampleStartDate, sampleEndDate)).toBe(sampleResult);

        expect(queryForDailyDataV2Mock).not.toHaveBeenCalled();
    });

    it('Should prefer v2 daily data.', async () => {
        const combinedSettings = createEmptyCombinedDataCollectionSettings();
        combinedSettings.settings.appleHealthEnabled = true;
        combinedSettings.settings.queryableDeviceDataTypes.push(
            { namespace: 'AppleHealth', type: 'ActiveEnergyBurned' }
        );
        combinedSettings.deviceDataV2Types.push(
            { namespace: 'AppleHealth', type: 'Active Energy Burned', enabled: true }
        );

        setupCombinedDataCollectionSettings(true, combinedSettings);

        setupDailyDataV2('AppleHealth', 'Active Energy Burned', sampleStartDate, sampleEndDate, startDateFunctionEvaluator, sampleDailyDataV2);
        setupTotalValueResult(sampleDailyDataV2, sampleResult);

        expect(await appleHealthActiveEnergyBurned(sampleStartDate, sampleEndDate)).toBe(sampleResult);

        expect(queryForDailyDataMock).not.toHaveBeenCalled();
    });
});
