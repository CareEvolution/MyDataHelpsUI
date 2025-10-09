import { appleHealthTherapyMinutesDataProvider, googleFitTherapyMinutesDataProvider } from '.';
import { DailyDataQueryResult } from '../query-daily-data';
import { getCombinedDataCollectionSettings } from './combined-data-collection-settings';
import { combineResultsUsingFirstValue } from './daily-data';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    const { settings } = await getCombinedDataCollectionSettings(false);

    if (settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(type => type.namespace === 'AppleHealth' && type.type === 'MindfulSession')) {
        providers.push(appleHealthTherapyMinutesDataProvider(startDate, endDate));
    }
    if (settings.googleFitEnabled && settings.queryableDeviceDataTypes.some(type => type.namespace === 'GoogleFit' && type.type === 'SilverCloudSession')) {
        providers.push(googleFitTherapyMinutesDataProvider(startDate, endDate));
    }

    if (providers.length === 0) return {};
    if (providers.length === 1) return providers[0];

    return combineResultsUsingFirstValue(startDate, endDate, await Promise.all(providers));
}
