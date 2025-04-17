import MyDataHelps, { DeviceDataPointQuery, DeviceDataV2AggregateQuery } from '@careevolution/mydatahelps-js';
import queryAllDeviceDataV2Aggregates from '../query-all-device-data-v2-aggregates';
import { Reading } from './types';
import { add, endOfDay, parseISO, startOfDay } from 'date-fns';
import queryAllDeviceData from '../daily-data-providers/query-all-device-data';
import { getMaxValueReadings } from './util';
import { getCombinedDataCollectionSettings } from '../daily-data-providers/combined-data-collection-settings';

export function fitbitHalfHourStepsDataProvider(date: Date): Promise<Reading[]> {
    const params: DeviceDataV2AggregateQuery = {
        namespace: 'Fitbit',
        type: 'activities-steps-intraday',
        observedAfter: startOfDay(date).toISOString(),
        observedBefore: endOfDay(date).toISOString(),
        intervalAmount: 30,
        intervalType: 'Minutes',
        aggregateFunctions: ['sum']
    };

    return queryAllDeviceDataV2Aggregates(params).then(aggregates => {
        return aggregates.map(aggregate => {
            return {
                timestamp: add(parseISO(aggregate.date), { minutes: 15 }),
                value: aggregate.statistics['sum']
            };
        });
    }, () => []);
}

export function garminHalfHourStepsDataProvider(date: Date): Promise<Reading[]> {
    const params: DeviceDataV2AggregateQuery = {
        namespace: 'Garmin' as any,
        type: 'epoch-steps',
        observedAfter: startOfDay(date).toISOString(),
        observedBefore: endOfDay(date).toISOString(),
        intervalAmount: 30,
        intervalType: 'Minutes',
        aggregateFunctions: ['sum']
    };

    return queryAllDeviceDataV2Aggregates(params).then(aggregates => {
        return aggregates.map(aggregate => {
            return {
                timestamp: add(parseISO(aggregate.date), { minutes: 15 }),
                value: aggregate.statistics['sum']
            };
        });
    }, () => []);
}

export function appleHealthHalfHourStepsDataProvider(date: Date): Promise<Reading[]> {
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
        });
    }, () => []);
}

export async function getSteps(date: Date): Promise<Reading[]> {
    let providers: Promise<Reading[]>[] = [];

    let { settings, deviceDataV2Types } = await getCombinedDataCollectionSettings();
    if (settings.fitbitEnabled && deviceDataV2Types.find(s => s.namespace == 'Fitbit' && s.type == 'activities-steps-intraday')) {
        providers.push(fitbitHalfHourStepsDataProvider(date));
    }
    if (settings.garminEnabled) {
        providers.push(garminHalfHourStepsDataProvider(date));
    }
    if (settings.queryableDeviceDataTypes.find(s => s.namespace == 'AppleHealth' && s.type == 'HalfHourSteps')) {
        providers.push(appleHealthHalfHourStepsDataProvider(date));
    }

    return providers.length > 0 ? await getMaxValueReadings(providers) : [];
}