import { add } from 'date-fns';
import getDayKey from '../get-day-key';
import { DailyDataQueryResult } from '../query-daily-data';
import queryAllDeviceDataV2Aggregates from '../query-all-device-data-v2-aggregates';
import { DeviceDataV2Aggregate } from '@careevolution/mydatahelps-js';
import { buildTotalValueResult, DailyData, getStartDate, queryForDailyData } from "./daily-data";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const convertAggregatesToDates = (aggregates: DeviceDataV2Aggregate[]): string[] => {
        return aggregates.reduce((dates, aggregate) => {
            const dayKey = getDayKey(aggregate.date);
            if (!dates.includes(dayKey) && aggregate.statistics['sum'] > 0) {
                dates.push(dayKey);
            }
            return dates;
        }, [] as string[]);
    };

    const watchDates = await queryAllDeviceDataV2Aggregates({
        namespace: 'AppleHealth',
        type: 'Steps',
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString(),
        dataSource: { deviceModel: 'Watch' },
        intervalAmount: 1,
        intervalType: 'Days',
        aggregateFunctions: ['sum']
    }).then(convertAggregatesToDates);

    const ouraDates = await queryAllDeviceDataV2Aggregates({
        namespace: 'AppleHealth',
        type: 'Steps',
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString(),
        dataSource: { sourceIdentifier: 'com.ouraring.oura' },
        intervalAmount: 1,
        intervalType: 'Days',
        aggregateFunctions: ['sum']
    }).then(convertAggregatesToDates);

    const dailyData = await queryForDailyData('AppleHealth', 'HourlySteps', startDate, endDate, getStartDate);

    const filteredDailyData = Object.keys(dailyData).reduce((filteredDailyData, dayKey) => {
        if (watchDates.includes(dayKey) || ouraDates.includes(dayKey)) {
            filteredDailyData[dayKey] = dailyData[dayKey];
        }
        return filteredDailyData;
    }, {} as DailyData);

    return buildTotalValueResult(filteredDailyData);
}

