import { DailyDataQueryResult } from '../query-daily-data';
import { buildTotalValueResult, getStartDate, queryForDailyData, queryForDailyDataV2 } from './daily-data';
import { CombinedDataCollectionSettings, getCombinedDataCollectionSettings } from './combined-data-collection-settings';
import { getSupportedApis, SupportedAPIsQuery } from './data-collection-helper';

export default async function(startDate: Date, endDate: Date, combinedDataCollectionSettings?: CombinedDataCollectionSettings): Promise<DailyDataQueryResult> {

    const supportedApisQuery: SupportedAPIsQuery = { namespace: 'AppleHealth', types: ['ActiveEnergyBurned', 'Active Energy Burned'], requireAllTypes: false };
    const supportedApisResult = getSupportedApis(combinedDataCollectionSettings ?? await getCombinedDataCollectionSettings(true), supportedApisQuery);

    if (supportedApisResult.v2.enabled) {
        const dailyData = await queryForDailyDataV2('AppleHealth', 'Active Energy Burned', startDate, endDate, getStartDate);
        if (Object.keys(dailyData).length > 0) {
            return buildTotalValueResult(dailyData);
        }
    }

    if (supportedApisResult.v1.enabled) {
        const dailyData = await queryForDailyData('AppleHealth', 'ActiveEnergyBurned', startDate, endDate, getStartDate);
        return buildTotalValueResult(dailyData);
    }

    return {};
}