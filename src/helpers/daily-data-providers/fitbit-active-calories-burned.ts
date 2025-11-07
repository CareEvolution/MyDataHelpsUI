import { fitbitCaloriesBurnedDataProvider, fitbitRestingCaloriesBurnedDataProvider } from '.';
import { CombinedDataCollectionSettings, getCombinedDataCollectionSettings } from './combined-data-collection-settings';
import { DailyDataQueryResult } from '../query-daily-data';
import { canQuery } from './data-collection-helper';

export default async function(startDate: Date, endDate: Date, combinedDataCollectionSettings?: CombinedDataCollectionSettings): Promise<DailyDataQueryResult> {
    const canQueryResult = canQuery(combinedDataCollectionSettings ?? await getCombinedDataCollectionSettings(), 'Fitbit', ['Calories', 'CaloriesBMR'], true);

    if (canQueryResult.v1.enabled) {
        const [totalCaloriesResult, restingCaloriesResult] = await Promise.all([
            fitbitCaloriesBurnedDataProvider(startDate, endDate),
            fitbitRestingCaloriesBurnedDataProvider(startDate, endDate)
        ]);

        return Object.keys(totalCaloriesResult).reduce((activeCaloriesResult, dayKey) => {
            if (dayKey in restingCaloriesResult) {
                const activeCaloriesForDay = totalCaloriesResult[dayKey] - restingCaloriesResult[dayKey];
                if (activeCaloriesForDay > 0) {
                    activeCaloriesResult[dayKey] = activeCaloriesForDay;
                }
            }
            return activeCaloriesResult;
        }, {} as DailyDataQueryResult);
    }

    return {};
}
