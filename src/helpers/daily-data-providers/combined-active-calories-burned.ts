import { appleHealthActiveEnergyBurnedDataProvider, fitbitActiveCaloriesBurnedDataProvider, garminActiveCaloriesDataProvider, healthConnectActiveCaloriesBurnedDataProvider, ouraActiveCaloriesBurnedDataProvider } from '.';
import { CombinedDataCollectionSettings, getCombinedDataCollectionSettings } from './combined-data-collection-settings';
import { DailyDataQueryResult } from '../query-daily-data';
import { combineResultsUsingMaxValue } from './daily-data';
import { getSupportedApis, SupportedAPIsQuery } from './data-collection-helper';

export default async function(startDate: Date, endDate: Date, combinedDataCollectionSettings?: CombinedDataCollectionSettings): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    combinedDataCollectionSettings = combinedDataCollectionSettings ?? await getCombinedDataCollectionSettings(true);

    const fitbitSupportedApisQuery: SupportedAPIsQuery = { namespace: 'Fitbit', types: ['Calories', 'CaloriesBMR'], requireAllTypes: true };
    if (getSupportedApis(combinedDataCollectionSettings, fitbitSupportedApisQuery).v1.enabled) {
        providers.push(fitbitActiveCaloriesBurnedDataProvider(startDate, endDate, combinedDataCollectionSettings));
    }

    const garminSupportedApisQuery: SupportedAPIsQuery = { namespace: 'Garmin', types: ['Calories'], requireAllTypes: false };
    if (getSupportedApis(combinedDataCollectionSettings, garminSupportedApisQuery).v1.enabled) {
        providers.push(garminActiveCaloriesDataProvider(startDate, endDate));
    }

    const appleHealthSupportedApisQuery: SupportedAPIsQuery = { namespace: 'AppleHealth', types: ['ActiveEnergyBurned', 'Active Energy Burned'], requireAllTypes: false };
    const appleHealthSupportedApisResult = getSupportedApis(combinedDataCollectionSettings, appleHealthSupportedApisQuery);
    if (appleHealthSupportedApisResult.v1.enabled || appleHealthSupportedApisResult.v2.enabled) {
        providers.push(appleHealthActiveEnergyBurnedDataProvider(startDate, endDate, combinedDataCollectionSettings));
    }

    const healthConnectSupportedApisQuery: SupportedAPIsQuery = { namespace: 'HealthConnect', types: ['active-calories-burned-daily'], requireAllTypes: false };
    if (getSupportedApis(combinedDataCollectionSettings, healthConnectSupportedApisQuery).v2.enabled) {
        providers.push(healthConnectActiveCaloriesBurnedDataProvider(startDate, endDate));
    }

    const ouraSupportedApisQuery: SupportedAPIsQuery = { namespace: 'Oura', types: ['daily-activity'], requireAllTypes: false };
    if (getSupportedApis(combinedDataCollectionSettings, ouraSupportedApisQuery).v2.enabled) {
        providers.push(ouraActiveCaloriesBurnedDataProvider(startDate, endDate));
    }

    if (providers.length === 0) return {};
    if (providers.length === 1) return providers[0];

    return combineResultsUsingMaxValue(startDate, endDate, await Promise.all(providers));
}
