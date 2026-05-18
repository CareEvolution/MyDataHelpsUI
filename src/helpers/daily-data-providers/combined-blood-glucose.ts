import { appleHealthBloodGlucoseDataProvider, healthConnectBloodGlucoseDataProvider } from '.';
import { DailyDataQueryResult } from '../query-daily-data';
import { getCombinedDataCollectionSettings } from './combined-data-collection-settings';
import { combineResultsUsingFirstValue } from './daily-data';

export default async function(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    const { settings, deviceDataV2Types } = await getCombinedDataCollectionSettings(true);

    if (settings.appleHealthEnabled && deviceDataV2Types.some(type => type.namespace === 'AppleHealth' && type.type === 'Blood Glucose')) {
        providers.push(appleHealthBloodGlucoseDataProvider(startDate, endDate));
    }
    if (settings.healthConnectEnabled && deviceDataV2Types.some(type => type.namespace === 'HealthConnect' && type.type === 'blood-glucose')) {
        providers.push(healthConnectBloodGlucoseDataProvider(startDate, endDate));
    }

    if (providers.length === 0) return {};
    if (providers.length === 1) return providers[0];

    return combineResultsUsingFirstValue(startDate, endDate, await Promise.all(providers));
}