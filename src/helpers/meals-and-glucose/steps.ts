import MyDataHelps, { DeviceDataPointQuery, DeviceDataV2AggregateQuery } from '@careevolution/mydatahelps-js';
import queryAllDeviceDataV2 from '../query-all-device-data-v2';
import { Reading } from './types';
import { add, endOfDay, parseISO, startOfDay } from 'date-fns';
import queryAllDeviceData from '../daily-data-providers/query-all-device-data';
import { readingTimestampSort } from './util';

export async function fitbitHalfHourlyStepsDataProvider(date: Date): Promise<Reading[]> {
    const params: DeviceDataV2AggregateQuery = {
        namespace: 'Fitbit',
        type: 'activities_steps_intraday',
        observedAfter: startOfDay(date).toISOString(),
        observedBefore: endOfDay(date).toISOString(),
        intervalAmount: 30,
        intervalType: 'Minutes',
        aggregateFunctions: ['sum']
    };

    return queryAllDeviceDataV2(params).then(aggregates => {
        return aggregates.map(aggregate => {
            return {
                timestamp: add(parseISO(aggregate.date), { minutes: -15 }),
                value: aggregate.statistics['sum']
            };
        }).sort(readingTimestampSort);
    });
}

export async function garminHalfHourlyStepsDataProvider(date: Date): Promise<Reading[]> {
    return [];  // TODO: Query for Garmin steps.
}

export async function appleHealthHalfHourlyStepsDataProvider(date: Date): Promise<Reading[]> {
    const params: DeviceDataPointQuery = {
        namespace: 'AppleHealth',
        type: 'HalfHourSteps',
        observedAfter: startOfDay(date).toISOString(),
        observedBefore: endOfDay(date).toISOString(),
    };

    return queryAllDeviceData(params).then(dataPoints => {
        return dataPoints.map(dataPoint => {
            return {
                timestamp: add(parseISO(dataPoint.observationDate!), { minutes: -15 }),
                value: parseInt(dataPoint.value)
            };
        }).sort(readingTimestampSort);
    });
}

export async function getSteps(date: Date): Promise<Reading[]> {
    let providers: Promise<Reading[]>[] = [];

    return MyDataHelps.getDataCollectionSettings().then((settings) => {
        if (settings.fitbitEnabled) {
            providers.push(fitbitHalfHourlyStepsDataProvider(date));
        }
        if (settings.garminEnabled) {
            providers.push(garminHalfHourlyStepsDataProvider(date));
        }
        if (settings.queryableDeviceDataTypes.find(s => s.namespace == "AppleHealth" && s.type == "HalfHourlySteps")) {
            providers.push(appleHealthHalfHourlyStepsDataProvider(date));
        }

        if (providers.length === 0) return [];

        return Promise.all(providers).then(results => {
            let readings: Reading[] = [];
            results.forEach(result => {
                result.forEach(reading => {
                    if (!readings.find(r => r.timestamp === reading.timestamp)) {
                        readings.push(reading);
                    }
                });
            });
            return readings;
        });
    });
}