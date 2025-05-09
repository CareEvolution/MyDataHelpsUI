import { DeviceDataNamespace } from '@careevolution/mydatahelps-js';
import { BloodPressureDataPoint } from '.';
import queryAllDeviceData from '../daily-data-providers/query-all-device-data';
import { buildBloodPressureDataPoints } from './common-blood-pressure-data-provider';

export default async function (namespace: DeviceDataNamespace, systolicType: string, diastolicType: string): Promise<BloodPressureDataPoint[]> {
    const dataPoints = await queryAllDeviceData({
        namespace: namespace,
        type: [systolicType, diastolicType]
    });

    return buildBloodPressureDataPoints(dataPoints, systolicType, diastolicType);
}
