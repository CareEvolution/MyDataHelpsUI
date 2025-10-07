import { DailyDataQueryResult } from '../query-daily-data';
import { buildTotalValueResult, getStartDate, queryForDailyData, queryForDailyDataV2 } from './daily-data';
import { CombinedDataCollectionSettings, getCombinedDataCollectionSettings } from './combined-data-collection-settings';
import { canQuery } from './data-collection-helper';

export default async function (startDate: Date, endDate: Date, combinedDataCollectionSettings?: CombinedDataCollectionSettings): Promise<DailyDataQueryResult> {

    const queryCheckResult = canQuery(combinedDataCollectionSettings ?? await getCombinedDataCollectionSettings(true), 'AppleHealth', ['ActiveEnergyBurned', 'Active Energy Burned']);

    if (queryCheckResult.v2.enabled) {
        const dailyData = await queryForDailyDataV2('AppleHealth', 'Active Energy Burned', startDate, endDate, getStartDate);
        return buildTotalValueResult(dailyData);
    }

    if (queryCheckResult.v1.enabled) {
        const dailyData = await queryForDailyData('AppleHealth', 'ActiveEnergyBurned', startDate, endDate, getStartDate);
        return buildTotalValueResult(dailyData);
    }

    return {};
}