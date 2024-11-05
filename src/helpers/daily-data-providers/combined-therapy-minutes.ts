import { appleHealthTherapyMinutesDataProvider, googleFitTherapyMinutesDataProvider } from '.';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { DailyDataQueryResult } from '../query-daily-data';
import { combineResults } from './common-mindful-and-therapy';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const providers: Promise<{ [key: string]: number }>[] = [];

    const settings = await MyDataHelps.getDataCollectionSettings();
    if (settings.queryableDeviceDataTypes.find(type => type.namespace == 'AppleHealth' && type.type == 'MindfulSession')) {
        providers.push(appleHealthTherapyMinutesDataProvider(startDate, endDate));
    }
    if (settings.queryableDeviceDataTypes.find(type => type.namespace == 'GoogleFit' && type.type == 'SilverCloudSession')) {
        providers.push(googleFitTherapyMinutesDataProvider(startDate, endDate));
    }

    return combineResults(startDate, endDate, providers.length ? await Promise.all(providers) : []);
}
