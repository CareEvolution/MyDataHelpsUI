import MyDataHelps, { DeviceDataV2AggregateQuery } from '@careevolution/mydatahelps-js';
import queryAllDeviceDataV2 from '../query-all-device-data-v2';
import { Reading } from './types';
import { endOfDay, parseISO, startOfDay } from 'date-fns';

export async function fitbitHalfHourlyStepsDataProvider(date: Date): Promise<Reading[]> {
    const params: DeviceDataV2AggregateQuery = {
        type: 'activities_steps_intraday',
        namespace: 'Fitbit',
        observedAfter: startOfDay(date).toISOString(),
        observedBefore: endOfDay(date).toISOString(),
        intervalAmount: 30,
        intervalType: 'Minutes',
        aggregateFunctions: ['sum']
    };

    return queryAllDeviceDataV2(params).then(aggregates => {
        return aggregates.map(aggregate => {
            return {
                timestamp: parseISO(aggregate.date),
                value: aggregate.statistics['sum'],
                source: 'Fitbit'
            } as Reading
        });
    });
}

export async function garminHalfHourlyStepsDataProvider(date: Date): Promise<Reading[]> {
    return [];
}

export async function appleHealthHalfHourlyStepsDataProvider(date: Date): Promise<Reading[]> {
    return [];
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

        if (!providers.length) {
            return [];
        }

        return Promise.all(providers).then(results => {
            let readings: Reading[] = [];
            results.forEach(result => {
                result.forEach(reading => {
                    let existingReading = readings.find(r => r.timestamp === reading.timestamp);
                    if (!existingReading) {
                        readings.push(reading);
                    }
                });
            });
            return readings;
        });
    });
}