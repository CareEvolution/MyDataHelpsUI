import { appleHealthMindfulMinutesDataProvider, googleFitMindfulMinutesDataProvider } from '.';
import { DailyDataQueryResult } from '../query-daily-data';
import { getCombinedDataCollectionSettings } from './combined-data-collection-settings';
import { combineResultsUsingFirstValue } from './daily-data';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    const { settings } = await getCombinedDataCollectionSettings(false);

    if (settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(type => type.namespace == 'AppleHealth' && type.type == 'MindfulSession')) {
        providers.push(appleHealthMindfulMinutesDataProvider(startDate, endDate));
    }
    if (settings.googleFitEnabled && settings.queryableDeviceDataTypes.some(type => type.namespace == 'GoogleFit' && type.type == 'ActivitySegment')) {
        providers.push(googleFitMindfulMinutesDataProvider(startDate, endDate));
    }

    return providers.length ? combineResultsUsingFirstValue(startDate, endDate, await Promise.all(providers)) : {};
}