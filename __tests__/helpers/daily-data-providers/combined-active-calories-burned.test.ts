import { describe, expect, it } from '@jest/globals';
import { createEmptyCombinedDataCollectionSettings, createMockResult, sampleEndDate, sampleResult, sampleStartDate, setupCombinedDataCollectionSettings, setupCombinedMaxValueResult, setupDailyDataProvider } from '../../fixtures/daily-data-providers';
import * as dailyDataResultFunctions from '../../../src/helpers/daily-data-providers/daily-data/daily-data-result';
import { appleHealthActiveEnergyBurnedDataProvider, fitbitActiveCaloriesBurnedDataProvider, garminActiveCaloriesDataProvider, healthConnectActiveCaloriesBurnedDataProvider, ouraActiveCaloriesBurnedDataProvider } from '../../../src/helpers/daily-data-providers';
import combinedActiveCaloriesBurned from '../../../src/helpers/daily-data-providers/combined-active-calories-burned';
import { canQuery } from "../../../src/helpers/daily-data-providers/data-collection-helper";

jest.mock('../../../src/helpers/daily-data-providers/data-collection-helper', () => ({
    __esModule: true,
    canQuery: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/fitbit-active-calories-burned', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/garmin-active-calories', () => ({
    __esModule: true,
    activeCalories: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/apple-health-active-energy-burned', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/health-connect-active-calories-burned', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('../../../src/helpers/daily-data-providers/oura-active-calories-burned', () => ({
    __esModule: true,
    default: jest.fn()
}));

describe('Daily Data Provider - Combined Active Calories Burned', () => {

    const canQueryMock = canQuery as jest.Mock;

    const fitbitActiveCaloriesBurnedDataProviderMock = fitbitActiveCaloriesBurnedDataProvider as jest.Mock;
    const garminActiveCaloriesDataProviderMock = garminActiveCaloriesDataProvider as jest.Mock;
    const appleHealthActiveEnergyBurnedDataProviderMock = appleHealthActiveEnergyBurnedDataProvider as jest.Mock;
    const healthConnectActiveCaloriesBurnedDataProviderMock = healthConnectActiveCaloriesBurnedDataProvider as jest.Mock;
    const ouraActiveCaloriesBurnedDataProviderMock = ouraActiveCaloriesBurnedDataProvider as jest.Mock;
    const allDataProviderMocks = [
        fitbitActiveCaloriesBurnedDataProviderMock,
        garminActiveCaloriesDataProviderMock,
        appleHealthActiveEnergyBurnedDataProviderMock,
        healthConnectActiveCaloriesBurnedDataProviderMock,
        ouraActiveCaloriesBurnedDataProviderMock
    ];

    const combinedMaxValueResultMock = jest.spyOn(dailyDataResultFunctions, 'combineResultsUsingMaxValue');

    const combinedSettings = createEmptyCombinedDataCollectionSettings();

    beforeEach(() => {
        jest.resetAllMocks();
        setupCombinedDataCollectionSettings(true, combinedSettings);
    });

    const verifyCanQueryCalls = (): void => {
        expect(canQueryMock).toHaveBeenCalledTimes(5);
        expect(canQueryMock).toHaveBeenCalledWith(combinedSettings, 'Fitbit', ['Calories', 'CaloriesBMR'], true);
        expect(canQueryMock).toHaveBeenCalledWith(combinedSettings, 'Garmin', 'Calories');
        expect(canQueryMock).toHaveBeenCalledWith(combinedSettings, 'AppleHealth', ['ActiveEnergyBurned', 'Active Energy Burned']);
        expect(canQueryMock).toHaveBeenCalledWith(combinedSettings, 'HealthConnect', 'active-calories-burned-daily');
        expect(canQueryMock).toHaveBeenCalledWith(combinedSettings, 'Oura', 'daily-activity');
    };

    const verifyDataProvidersCalls = (dataProviderMockThatWasCalled?: jest.Mock, includeCombinedSettings?: boolean): void => {
        allDataProviderMocks.filter(dpm => !dataProviderMockThatWasCalled || dpm !== dataProviderMockThatWasCalled).forEach(dataProviderMock => {
            expect(dataProviderMock).not.toHaveBeenCalled();
        });
        if (dataProviderMockThatWasCalled) {
            expect(dataProviderMockThatWasCalled).toHaveBeenCalledTimes(1);
            if (includeCombinedSettings) {
                expect(dataProviderMockThatWasCalled).toHaveBeenCalledWith(sampleStartDate, sampleEndDate, combinedSettings);
            } else {
                expect(dataProviderMockThatWasCalled).toHaveBeenCalledWith(sampleStartDate, sampleEndDate);
            }
        }
    };

    it('Should return an empty result when the required types cannot be queried.', async () => {
        canQueryMock.mockReturnValue({ v1: { enabled: false }, v2: { enabled: false } });

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});

        verifyCanQueryCalls();
        verifyDataProvidersCalls();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Fitbit result when the required types can been queried from v1.', async () => {
        canQueryMock.mockImplementation((_, namespace) => {
            if (namespace !== 'Fitbit') return { v1: { enabled: false }, v2: { enabled: false } };
            return { v1: { enabled: true, types: ['Calories', 'CaloriesBMR'] }, v2: { enabled: false } };
        });

        const fitbitResult = createMockResult();
        fitbitActiveCaloriesBurnedDataProviderMock.mockResolvedValue(fitbitResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(fitbitResult);

        verifyCanQueryCalls();
        verifyDataProvidersCalls(fitbitActiveCaloriesBurnedDataProviderMock, true);
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when the Fitbit required types can only be queried from v2.', async () => {
        canQueryMock.mockImplementation((_, namespace) => {
            if (namespace !== 'Fitbit') return { v1: { enabled: false }, v2: { enabled: false } };
            return { v1: { enabled: false }, v2: { enabled: true, types: ['Calories', 'CaloriesBMR'] } };
        });

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});

        verifyCanQueryCalls();
        verifyDataProvidersCalls();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Garmin result when the required types can been queried from v1.', async () => {
        canQueryMock.mockImplementation((_, namespace) => {
            if (namespace !== 'Garmin') return { v1: { enabled: false }, v2: { enabled: false } };
            return { v1: { enabled: true, types: ['Calories'] }, v2: { enabled: false } };
        });

        const garminResult = createMockResult();
        garminActiveCaloriesDataProviderMock.mockResolvedValue(garminResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(garminResult);

        verifyCanQueryCalls();
        verifyDataProvidersCalls(garminActiveCaloriesDataProviderMock);
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when the Garmin required types can only be queried from v2.', async () => {
        canQueryMock.mockImplementation((_, namespace) => {
            if (namespace !== 'Garmin') return { v1: { enabled: false }, v2: { enabled: false } };
            return { v1: { enabled: false }, v2: { enabled: true, types: ['Calories'] } };
        });

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});

        verifyCanQueryCalls();
        verifyDataProvidersCalls();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the AppleHealth result when the required types can been queried from v1.', async () => {
        canQueryMock.mockImplementation((_, namespace) => {
            if (namespace !== 'AppleHealth') return { v1: { enabled: false }, v2: { enabled: false } };
            return { v1: { enabled: true, types: ['ActiveEnergyBurned'] }, v2: { enabled: false } };
        });

        const appleHealthResult = createMockResult();
        appleHealthActiveEnergyBurnedDataProviderMock.mockResolvedValue(appleHealthResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(appleHealthResult);

        verifyCanQueryCalls();
        verifyDataProvidersCalls(appleHealthActiveEnergyBurnedDataProviderMock, true);
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the AppleHealth result when the required types can been queried from v2.', async () => {
        canQueryMock.mockImplementation((_, namespace) => {
            if (namespace !== 'AppleHealth') return { v1: { enabled: false }, v2: { enabled: false } };
            return { v1: { enabled: false }, v2: { enabled: true, types: ['Active Energy Burned'] } };
        });

        const appleHealthResult = createMockResult();
        appleHealthActiveEnergyBurnedDataProviderMock.mockResolvedValue(appleHealthResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(appleHealthResult);

        verifyCanQueryCalls();
        verifyDataProvidersCalls(appleHealthActiveEnergyBurnedDataProviderMock, true);
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when the HealthConnect required types can only be queried from v1.', async () => {
        canQueryMock.mockImplementation((_, namespace) => {
            if (namespace !== 'HealthConnect') return { v1: { enabled: false }, v2: { enabled: false } };
            return { v1: { enabled: true, types: ['active-calories-burned-daily'] }, v2: { enabled: false } };
        });

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});

        verifyCanQueryCalls();
        verifyDataProvidersCalls();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the HealthConnect result when the required types can been queried from v2.', async () => {
        canQueryMock.mockImplementation((_, namespace) => {
            if (namespace !== 'HealthConnect') return { v1: { enabled: false }, v2: { enabled: false } };
            return { v1: { enabled: false }, v2: { enabled: true, types: ['active-calories-burned-daily'] } };
        });

        const healthConnectResult = createMockResult();
        healthConnectActiveCaloriesBurnedDataProviderMock.mockResolvedValue(healthConnectResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(healthConnectResult);

        verifyCanQueryCalls();
        verifyDataProvidersCalls(healthConnectActiveCaloriesBurnedDataProviderMock);
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return an empty result when the Oura required types can only be queried from v1.', async () => {
        canQueryMock.mockImplementation((_, namespace) => {
            if (namespace !== 'Oura') return { v1: { enabled: false }, v2: { enabled: false } };
            return { v1: { enabled: true, types: ['daily-activity'] }, v2: { enabled: false } };
        });

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toEqual({});

        verifyCanQueryCalls();
        verifyDataProvidersCalls();
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return the Oura result when the required types can been queried from v2.', async () => {
        canQueryMock.mockImplementation((_, namespace) => {
            if (namespace !== 'Oura') return { v1: { enabled: false }, v2: { enabled: false } };
            return { v1: { enabled: false }, v2: { enabled: true, types: ['daily-activity'] } };
        });

        const ouraResult = createMockResult();
        ouraActiveCaloriesBurnedDataProviderMock.mockResolvedValue(ouraResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(ouraResult);

        verifyCanQueryCalls();
        verifyDataProvidersCalls(ouraActiveCaloriesBurnedDataProviderMock);
        expect(combinedMaxValueResultMock).not.toHaveBeenCalled();
    });

    it('Should return a combined max-value result when multiple sources are enabled.', async () => {
        canQueryMock.mockImplementation((_, namespace) => {
            if (namespace === 'Fitbit') return { v1: { enabled: true, types: ['Calories', 'CaloriesBMR'] }, v2: { enabled: false } };
            if (namespace === 'Garmin') return { v1: { enabled: true, types: ['Calories'] }, v2: { enabled: false } };
            if (namespace === 'AppleHealth') return { v1: { enabled: true, types: ['ActiveEnergyBurned'] }, v2: { enabled: true, types: ['Active Energy Burned'] } };
            if (namespace === 'HealthConnect') return { v1: { enabled: false }, v2: { enabled: true, types: ['active-calories-burned-daily'] } };
            if (namespace === 'Oura') return { v1: { enabled: false }, v2: { enabled: true, types: ['daily-activity'] } };
            return { v1: { enabled: false }, v2: { enabled: false } };
        });

        const fitbitResult = createMockResult();
        const garminResult = createMockResult();
        const appleHealthResult = createMockResult();
        const healthConnectResult = createMockResult();
        const ouraResult = createMockResult();

        setupDailyDataProvider(fitbitActiveCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, fitbitResult);
        setupDailyDataProvider(garminActiveCaloriesDataProviderMock, sampleStartDate, sampleEndDate, garminResult);
        setupDailyDataProvider(appleHealthActiveEnergyBurnedDataProviderMock, sampleStartDate, sampleEndDate, appleHealthResult);
        setupDailyDataProvider(healthConnectActiveCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, healthConnectResult);
        setupDailyDataProvider(ouraActiveCaloriesBurnedDataProviderMock, sampleStartDate, sampleEndDate, ouraResult);
        setupCombinedMaxValueResult(sampleStartDate, sampleEndDate, [fitbitResult, garminResult, appleHealthResult, healthConnectResult, ouraResult], sampleResult);

        const result = await combinedActiveCaloriesBurned(sampleStartDate, sampleEndDate);

        expect(result).toBe(sampleResult);
    });
});
