import { appleHealthTherapyMinutesDataProvider, googleFitTherapyMinutesDataProvider } from '.';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { DailyDataQueryResult } from '../query-daily-data';
import { combineResultsUsingFirstValue } from './daily-data';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const providers: Promise<DailyDataQueryResult>[] = [];

    const settings = await MyDataHelps.getDataCollectionSettings();
    if (settings.queryableDeviceDataTypes.find(type => type.namespace == 'AppleHealth' && type.type == 'MindfulSession')) {
        providers.push(appleHealthTherapyMinutesDataProvider(startDate, endDate));
    }
    if (settings.queryableDeviceDataTypes.find(type => type.namespace == 'GoogleFit' && type.type == 'SilverCloudSession')) {
        providers.push(googleFitTherapyMinutesDataProvider(startDate, endDate));
    }

    return providers.length ? combineResultsUsingFirstValue(startDate, endDate, await Promise.all(providers)) : {};
}