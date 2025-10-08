import { DailyDataQueryResult } from '../query-daily-data';
import { buildTotalValueResult, getStartDate, queryForDailyData, queryForDailyDataV2 } from './daily-data';
import { CombinedDataCollectionSettings, getCombinedDataCollectionSettings } from './combined-data-collection-settings';
import createDataCollectionHelper from './data-collection-helper';

export default async function (startDate: Date, endDate: Date, combinedDataCollectionSettings?: CombinedDataCollectionSettings): Promise<DailyDataQueryResult> {

    const dataCollectionHelper = createDataCollectionHelper(combinedDataCollectionSettings ?? await getCombinedDataCollectionSettings(true));

    if (dataCollectionHelper.canQueryV2('AppleHealth', 'Active Energy Burned')) {
        const dailyData = await queryForDailyDataV2('AppleHealth', 'Active Energy Burned', startDate, endDate, getStartDate);
        return buildTotalValueResult(dailyData);
    }

    if (dataCollectionHelper.canQueryV1('AppleHealth', 'ActiveEnergyBurned')) {
        const dailyData = await queryForDailyData('AppleHealth', 'ActiveEnergyBurned', startDate, endDate, getStartDate);
        return buildTotalValueResult(dailyData);
    }

    return {};
}