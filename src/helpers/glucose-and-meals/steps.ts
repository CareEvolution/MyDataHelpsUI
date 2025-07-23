import { DeviceDataPointQuery, DeviceDataV2AggregateQuery, DeviceDataV2Query } from '@careevolution/mydatahelps-js';
import queryAllDeviceDataV2Aggregates from '../query-all-device-data-v2-aggregates';
import { Reading } from './types';
import { add, endOfDay, startOfDay } from 'date-fns';
import queryAllDeviceData from '../daily-data-providers/query-all-device-data';
import queryAllDeviceDataV2 from '../query-all-device-data-v2';
import { getMaxValueReadings } from './util';
import { getCombinedDataCollectionSettings } from '../daily-data-providers/combined-data-collection-settings';
import { parseISOWithoutOffset } from '../date-helpers';

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
                timestamp: add(parseISOWithoutOffset(aggregate.date), { minutes: 15 }),
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
                timestamp: add(parseISOWithoutOffset(aggregate.date), { minutes: 15 }),
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
                timestamp: add(parseISOWithoutOffset(dataPoint.observationDate!), { minutes: -15 }),
                value: parseInt(dataPoint.value)
            };
        });
    }, () => []);
}

export function healthConnectHalfHourStepsDataProvider(date: Date): Promise<Reading[]> {
    const params: DeviceDataV2Query = {
        namespace: 'HealthConnect',
        type: 'steps-half-hourly',
        observedAfter: startOfDay(date).toISOString(),
        observedBefore: endOfDay(date).toISOString(),
    };

    return queryAllDeviceDataV2(params).then(dataPoints => {
        return dataPoints.map(dataPoint => {
            return {
                timestamp: add(parseISOWithoutOffset(dataPoint.observationDate!), { minutes: -15 }),
                value: parseInt(dataPoint.value)
            };
        });
    }, () => []);
}

export async function getSteps(date: Date): Promise<Reading[]> {
    const providers: Promise<Reading[]>[] = [];

    const { settings, deviceDataV2Types } = await getCombinedDataCollectionSettings(true);

    if (settings.fitbitEnabled && deviceDataV2Types.some(ddt => ddt.namespace === 'Fitbit' && ddt.type === 'activities-steps-intraday')) {
        providers.push(fitbitHalfHourStepsDataProvider(date));
    }
    if (settings.garminEnabled && deviceDataV2Types.some(ddt => ddt.namespace === 'Garmin' && ddt.type === 'epoch-steps')) {
        providers.push(garminHalfHourStepsDataProvider(date));
    }
    if (settings.appleHealthEnabled && settings.queryableDeviceDataTypes.some(ddt => ddt.namespace === 'AppleHealth' && ddt.type === 'HalfHourSteps')) {
        providers.push(appleHealthHalfHourStepsDataProvider(date));
    }
    if (settings.healthConnectEnabled && deviceDataV2Types.some(ddt => ddt.namespace === 'HealthConnect' && ddt.type === 'steps-half-hourly')) {
        providers.push(healthConnectHalfHourStepsDataProvider(date));
    }

    return providers.length > 0 ? await getMaxValueReadings(providers) : [];
}