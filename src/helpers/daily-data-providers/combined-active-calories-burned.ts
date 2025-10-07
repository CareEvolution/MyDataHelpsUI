import { appleHealthActiveEnergyBurnedDataProvider, fitbitActiveCaloriesBurnedDataProvider, garminActiveCaloriesDataProvider, healthConnectActiveCaloriesBurnedDataProvider, ouraActiveCaloriesBurnedDataProvider } from '.';
import { CombinedDataCollectionSettings, getCombinedDataCollectionSettings } from './combined-data-collection-settings';
import { DailyDataQueryResult } from '../query-daily-data';
import { combineResultsUsingMaxValue } from './daily-data';
import createDataCollectionHelper from './data-collection-helper';

export default async function (startDate: Date, endDate: Date, combinedDataCollectionSettings?: CombinedDataCollectionSettings): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    combinedDataCollectionSettings = combinedDataCollectionSettings ?? await getCombinedDataCollectionSettings(true);
    const dataCollectionHelper = createDataCollectionHelper(combinedDataCollectionSettings);

    if (dataCollectionHelper.canQueryV1('Fitbit', ['Calories', 'CaloriesBMR'])) {
        providers.push(fitbitActiveCaloriesBurnedDataProvider(startDate, endDate, combinedDataCollectionSettings));
    }
    if (dataCollectionHelper.canQueryV1('Garmin', 'Calories')) {
        providers.push(garminActiveCaloriesDataProvider(startDate, endDate));
    }
    if (dataCollectionHelper.canQueryV1('AppleHealth', 'ActiveEnergyBurned')) {
        providers.push(appleHealthActiveEnergyBurnedDataProvider(startDate, endDate));
    }
    if (dataCollectionHelper.canQueryV2('HealthConnect', 'active-calories-burned-daily')) {
        providers.push(healthConnectActiveCaloriesBurnedDataProvider(startDate, endDate));
    }
    if (dataCollectionHelper.canQueryV2('Oura', 'daily-activity')) {
        providers.push(ouraActiveCaloriesBurnedDataProvider(startDate, endDate));
    }

    if (providers.length === 0) return {};
    if (providers.length === 1) return providers[0];

    return combineResultsUsingMaxValue(startDate, endDate, await Promise.all(providers));
}
