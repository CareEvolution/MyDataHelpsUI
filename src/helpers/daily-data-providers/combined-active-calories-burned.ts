import { appleHealthActiveEnergyBurnedDataProvider, fitbitActiveCaloriesBurnedDataProvider, garminActiveCaloriesDataProvider, healthConnectActiveCaloriesBurnedDataProvider, ouraActiveCaloriesBurnedDataProvider } from '.';
import { CombinedDataCollectionSettings, getCombinedDataCollectionSettings } from './combined-data-collection-settings';
import { DailyDataQueryResult } from '../query-daily-data';
import { combineResultsUsingMaxValue } from './daily-data';
import { canQuery } from './data-collection-helper';

export default async function(startDate: Date, endDate: Date, combinedDataCollectionSettings?: CombinedDataCollectionSettings): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    combinedDataCollectionSettings = combinedDataCollectionSettings ?? await getCombinedDataCollectionSettings(true);

    if (canQuery(combinedDataCollectionSettings, 'Fitbit', ['Calories', 'CaloriesBMR'], true).v1.enabled) {
        providers.push(fitbitActiveCaloriesBurnedDataProvider(startDate, endDate, combinedDataCollectionSettings));
    }
    if (canQuery(combinedDataCollectionSettings, 'Garmin', ['Calories'], false).v1.enabled) {
        providers.push(garminActiveCaloriesDataProvider(startDate, endDate));
    }

    const appleHealthCanQueryResult = canQuery(combinedDataCollectionSettings, 'AppleHealth', ['ActiveEnergyBurned', 'Active Energy Burned'], false);
    if (appleHealthCanQueryResult.v1.enabled || appleHealthCanQueryResult.v2.enabled) {
        providers.push(appleHealthActiveEnergyBurnedDataProvider(startDate, endDate, combinedDataCollectionSettings));
    }

    if (canQuery(combinedDataCollectionSettings, 'HealthConnect', ['active-calories-burned-daily'], false).v2.enabled) {
        providers.push(healthConnectActiveCaloriesBurnedDataProvider(startDate, endDate));
    }
    if (canQuery(combinedDataCollectionSettings, 'Oura', ['daily-activity'], false).v2.enabled) {
        providers.push(ouraActiveCaloriesBurnedDataProvider(startDate, endDate));
    }

    if (providers.length === 0) return {};
    if (providers.length === 1) return providers[0];

    return combineResultsUsingMaxValue(startDate, endDate, await Promise.all(providers));
}
