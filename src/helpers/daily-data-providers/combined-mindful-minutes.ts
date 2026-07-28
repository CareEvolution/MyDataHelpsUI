import { appleHealthMindfulMinutesDataProvider, googleFitMindfulMinutesDataProvider, healthConnectMindfulMinutesDataProvider } from '.';
import { DailyDataQueryResult } from '../query-daily-data';
import { getCombinedDataCollectionSettings } from './combined-data-collection-settings';
import { combineResultsUsingFirstValue } from './daily-data';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    const { settings, deviceDataV2Types } = await getCombinedDataCollectionSettings(true);

    if (settings.appleHealthEnabled && deviceDataV2Types.some(type => type.namespace === 'AppleHealth' && type.type === 'Mindful Sessions')) {
        providers.push(appleHealthMindfulMinutesDataProvider(startDate, endDate));
    }
    if (settings.googleFitEnabled && settings.queryableDeviceDataTypes.some(type => type.namespace === 'GoogleFit' && type.type === 'ActivitySegment')) {
        providers.push(googleFitMindfulMinutesDataProvider(startDate, endDate));
    }
    if (settings.healthConnectEnabled && deviceDataV2Types.some(type => type.namespace === 'HealthConnect' && type.type === 'mindfulness-sessions')) {
        providers.push(healthConnectMindfulMinutesDataProvider(startDate, endDate));
    }

    if (providers.length === 0) return {};
    if (providers.length === 1) return providers[0];

    return combineResultsUsingFirstValue(startDate, endDate, await Promise.all(providers));
}