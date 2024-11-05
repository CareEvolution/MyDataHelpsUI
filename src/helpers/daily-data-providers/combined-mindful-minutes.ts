import { add } from 'date-fns';
import { appleHealthMindfulMinutesDataProvider, googleFitMindfulMinutesDataProvider } from '.';
import getDayKey from '../get-day-key';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { DailyDataQueryResult } from '../query-daily-data';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const providers: Promise<{ [key: string]: number }>[] = [];

    const settings = await MyDataHelps.getDataCollectionSettings();
    if (settings.queryableDeviceDataTypes.find(type => type.namespace == 'AppleHealth' && type.type == 'MindfulSession')) {
        providers.push(appleHealthMindfulMinutesDataProvider(startDate, endDate));
    }
    if (settings.queryableDeviceDataTypes.find(type => type.namespace == 'GoogleFit' && type.type == 'ActivitySegment')) {
        providers.push(googleFitMindfulMinutesDataProvider(startDate, endDate));
    }

    const queryResults = providers.length ? await Promise.all(providers) : [];

    const result: DailyDataQueryResult = {};

    let currentDate = startDate;
    while (currentDate < endDate) {
        const dayKey = getDayKey(currentDate);
        queryResults.filter(queryResult => queryResult.hasOwnProperty(dayKey)).forEach(queryResult => {
            result[dayKey] = result[dayKey] ?? queryResult[dayKey];
        });
        currentDate = add(currentDate, { days: 1 });
    }

    return result;
}
