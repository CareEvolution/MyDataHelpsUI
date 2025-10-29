import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, sampleDailyData, sampleDailyDataV2, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings } from '../../fixtures/daily-data-providers';
import appleHealthActiveEnergyBurned from '../../../src/helpers/daily-data-providers/apple-health-active-energy-burned';
import { buildTotalValueResult, getStartDate, queryForDailyData, queryForDailyDataV2 } from '../../../src/helpers/daily-data-providers/daily-data';
import { canQuery } from '../../../src/helpers/daily-data-providers/data-collection-helper';
import { CombinedDataCollectionSettings } from '../../../src/helpers/daily-data-providers/combined-data-collection-settings';

jest.mock('../../../src/helpers/daily-data-providers/combined-data-collection-settings', () => ({
    __esModule: true,
    getCombinedDataCollectionSettings: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/data-collection-helper', () => ({
    __esModule: true,
    canQuery: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/daily-data/daily-data-query', () => ({
    __esModule: true,
    queryForDailyData: jest.fn(),
    queryForDailyDataV2: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/daily-data/daily-data-result', () => ({
    __esModule: true,
    buildTotalValueResult: jest.fn()
}));

describe('Daily Data Provider - Apple Health Active Energy Burned', () => {

    const canQueryMock = canQuery as jest.Mock;
    const queryForDailyDataMock = queryForDailyData as jest.Mock;
    const queryForDailyDataV2Mock = queryForDailyDataV2 as jest.Mock;
    const buildTotalValueResultMock = buildTotalValueResult as jest.Mock;

    const combinedSettings = createEmptyCombinedDataCollectionSettings();

    beforeEach(() => {
        jest.resetAllMocks();
        setupCombinedDataCollectionSettings(true, combinedSettings);
    });

    it('Should return an empty result when Apple Health is not enabled.', async () => {
        canQueryMock.mockReturnValue({ v1: { enabled: false }, v2: { enabled: false } });

        expect(await appleHealthActiveEnergyBurned(sampleStartDate, sampleEndDate)).toEqual({});

        expect(canQueryMock).toHaveBeenCalledTimes(1);
        expect(canQueryMock).toHaveBeenCalledWith(combinedSettings, 'AppleHealth', ['ActiveEnergyBurned', 'Active Energy Burned'], false);
        expect(queryForDailyDataMock).not.toHaveBeenCalled();
        expect(queryForDailyDataV2Mock).not.toHaveBeenCalled();
        expect(buildTotalValueResultMock).not.toHaveBeenCalled();
    });

    it('Should query for daily data and build a total value result keyed by start date when available from v1.', async () => {
        canQueryMock.mockReturnValue({ v1: { enabled: true, types: ['ActiveEnergyBurned'] }, v2: { enabled: false } });
        queryForDailyDataMock.mockResolvedValue(sampleDailyData);
        buildTotalValueResultMock.mockReturnValue(sampleResult);

        expect(await appleHealthActiveEnergyBurned(sampleStartDate, sampleEndDate)).toBe(sampleResult);

        expect(canQueryMock).toHaveBeenCalledTimes(1);
        expect(canQueryMock).toHaveBeenCalledWith(combinedSettings, 'AppleHealth', ['ActiveEnergyBurned', 'Active Energy Burned'], false);
        expect(queryForDailyDataMock).toHaveBeenCalledTimes(1);
        expect(queryForDailyDataMock).toHaveBeenCalledWith('AppleHealth', 'ActiveEnergyBurned', sampleStartDate, sampleEndDate, getStartDate);
        expect(queryForDailyDataV2Mock).not.toHaveBeenCalled();
        expect(buildTotalValueResultMock).toHaveBeenCalledTimes(1);
        expect(buildTotalValueResultMock).toHaveBeenCalledWith(sampleDailyData);
    });

    it('Should query for daily data and build a total value result keyed by start date when available from v2, even if v1 is also available.', async () => {
        canQueryMock.mockReturnValue({ v1: { enabled: true, types: ['ActiveEnergyBurned'] }, v2: { enabled: true, types: ['Active Energy Burned'] } });
        queryForDailyDataV2Mock.mockResolvedValue(sampleDailyDataV2);
        buildTotalValueResultMock.mockReturnValue(sampleResult);

        expect(await appleHealthActiveEnergyBurned(sampleStartDate, sampleEndDate)).toBe(sampleResult);

        expect(canQueryMock).toHaveBeenCalledTimes(1);
        expect(canQueryMock).toHaveBeenCalledWith(combinedSettings, 'AppleHealth', ['ActiveEnergyBurned', 'Active Energy Burned'], false);
        expect(queryForDailyDataMock).not.toHaveBeenCalled();
        expect(queryForDailyDataV2Mock).toHaveBeenCalledTimes(1);
        expect(queryForDailyDataV2Mock).toHaveBeenCalledWith('AppleHealth', 'Active Energy Burned', sampleStartDate, sampleEndDate, getStartDate);
        expect(buildTotalValueResultMock).toHaveBeenCalledTimes(1);
        expect(buildTotalValueResultMock).toHaveBeenCalledWith(sampleDailyDataV2);
    });

    it('Should fall back to v1 if no data is available in v2.', async () => {
        canQueryMock.mockReturnValue({ v1: { enabled: true, types: ['ActiveEnergyBurned'] }, v2: { enabled: true, types: ['Active Energy Burned'] } });
        queryForDailyDataMock.mockResolvedValue(sampleDailyData);
        queryForDailyDataV2Mock.mockResolvedValue({});
        buildTotalValueResultMock.mockReturnValue(sampleResult);

        expect(await appleHealthActiveEnergyBurned(sampleStartDate, sampleEndDate)).toBe(sampleResult);

        expect(canQueryMock).toHaveBeenCalledTimes(1);
        expect(canQueryMock).toHaveBeenCalledWith(combinedSettings, 'AppleHealth', ['ActiveEnergyBurned', 'Active Energy Burned'], false);
        expect(queryForDailyDataMock).toHaveBeenCalledTimes(1);
        expect(queryForDailyDataMock).toHaveBeenCalledWith('AppleHealth', 'ActiveEnergyBurned', sampleStartDate, sampleEndDate, getStartDate);
        expect(queryForDailyDataV2Mock).toHaveBeenCalledTimes(1);
        expect(queryForDailyDataV2Mock).toHaveBeenCalledWith('AppleHealth', 'Active Energy Burned', sampleStartDate, sampleEndDate, getStartDate);
        expect(buildTotalValueResultMock).toHaveBeenCalledTimes(1);
        expect(buildTotalValueResultMock).toHaveBeenCalledWith(sampleDailyData);
    });

    it('Should use specified combined settings, when provided.', async () => {
        canQueryMock.mockReturnValue({ v1: { enabled: true, types: ['ActiveEnergyBurned'] }, v2: { enabled: true, types: ['Active Energy Burned'] } });
        queryForDailyDataV2Mock.mockResolvedValue(sampleDailyDataV2);
        buildTotalValueResultMock.mockReturnValue(sampleResult);

        const specifiedCombinedSettings = {} as CombinedDataCollectionSettings;

        expect(await appleHealthActiveEnergyBurned(sampleStartDate, sampleEndDate, specifiedCombinedSettings)).toBe(sampleResult);

        expect(canQueryMock).toHaveBeenCalledTimes(1);
        expect(canQueryMock).toHaveBeenCalledWith(specifiedCombinedSettings, 'AppleHealth', ['ActiveEnergyBurned', 'Active Energy Burned'], false);
        expect(queryForDailyDataMock).not.toHaveBeenCalled();
        expect(queryForDailyDataV2Mock).toHaveBeenCalledTimes(1);
        expect(queryForDailyDataV2Mock).toHaveBeenCalledWith('AppleHealth', 'Active Energy Burned', sampleStartDate, sampleEndDate, getStartDate);
        expect(buildTotalValueResultMock).toHaveBeenCalledTimes(1);
        expect(buildTotalValueResultMock).toHaveBeenCalledWith(sampleDailyDataV2);
    });
});
