import MyDataHelps, { DeviceDataNamespace, DeviceDataPoint, DeviceDataV2Namespace, DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { Reading } from './types';
import queryAllDeviceData from '../daily-data-providers/query-all-device-data';
import { endOfDay, startOfDay } from 'date-fns';
import queryAllDeviceDataV2 from '../query-all-device-data-v2';
import { parseISOWithoutOffset } from '../date-helpers';

export async function checkForReadings(namespace: DeviceDataNamespace, type: string): Promise<boolean> {
    const response = await MyDataHelps.queryDeviceData({ namespace: namespace, type: type, limit: 1 });
    return response.deviceDataPoints.length > 0;
}

export async function checkForV2Readings(namespace: DeviceDataV2Namespace, type: string): Promise<boolean> {
    const response = await MyDataHelps.queryDeviceDataV2({ namespace: namespace, type: type, limit: 1 });
    return response.deviceDataPoints.length > 0;
}

export async function queryForReadings(namespace: DeviceDataNamespace, type: string, startDate: Date, endDate: Date): Promise<Reading[]> {
    const dataPoints = await queryAllDeviceData({
        namespace: namespace,
        type: type,
        observedAfter: startOfDay(startDate).toISOString(),
        observedBefore: endOfDay(endDate).toISOString()
    })
    return dataPoints.map(dataPointToReading);
}

export async function queryForV2Readings(namespace: DeviceDataV2Namespace, type: string, startDate: Date, endDate: Date): Promise<Reading[]> {
    const dataPoints = await queryAllDeviceDataV2({
        namespace: namespace,
        type: type,
        observedAfter: startOfDay(startDate).toISOString(),
        observedBefore: endOfDay(endDate).toISOString()
    })
    return dataPoints.map(dataPointToReading);
}

function dataPointToReading(dataPoint: DeviceDataPoint | DeviceDataV2Point): Reading {
    return {
        timestamp: parseISOWithoutOffset(dataPoint.observationDate!),
        value: parseInt(dataPoint.value)
    };
}
