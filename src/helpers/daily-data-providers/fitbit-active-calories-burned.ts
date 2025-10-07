import { fitbitCaloriesBurnedDataProvider, fitbitRestingCaloriesBurnedDataProvider } from '.';
import { CombinedDataCollectionSettings, getCombinedDataCollectionSettings } from './combined-data-collection-settings';
import { DailyDataQueryResult } from '../query-daily-data';
import createDataCollectionHelper from './data-collection-helper';

export default async function (startDate: Date, endDate: Date, combinedDataCollectionSettings?: CombinedDataCollectionSettings): Promise<DailyDataQueryResult> {
    const dataCollectionHelper = createDataCollectionHelper(combinedDataCollectionSettings ?? await getCombinedDataCollectionSettings());

    if (dataCollectionHelper.canQueryV1('Fitbit', ['Calories', 'CaloriesBMR'])) {
        const [totalCaloriesResult, restingCaloriesResult] = await Promise.all([
            fitbitCaloriesBurnedDataProvider(startDate, endDate),
            fitbitRestingCaloriesBurnedDataProvider(startDate, endDate)
        ]);

        return Object.keys(totalCaloriesResult).reduce((activeCaloriesResult, dayKey) => {
            if (dayKey in restingCaloriesResult) {
                activeCaloriesResult[dayKey] = totalCaloriesResult[dayKey] - restingCaloriesResult[dayKey];
            }
            return activeCaloriesResult;
        }, {} as DailyDataQueryResult);
    }

    return {};
}
