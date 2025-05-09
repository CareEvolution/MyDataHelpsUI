import { DeviceDataV2Namespace } from '@careevolution/mydatahelps-js';
import { BloodPressureDataPoint } from '.';
import queryAllDeviceDataV2 from '../query-all-device-data-v2';
import { buildBloodPressureDataPoints } from './common-blood-pressure-data-provider';

export default async function (namespace: DeviceDataV2Namespace, systolicType: string, diastolicType: string): Promise<BloodPressureDataPoint[]> {
    const dataPoints = (await Promise.all([
        queryAllDeviceDataV2({ namespace: namespace, type: systolicType }),
        queryAllDeviceDataV2({ namespace: namespace, type: diastolicType })
    ])).reduce((allDataPoints, dataPoints) => allDataPoints.concat(dataPoints), []);

    return buildBloodPressureDataPoints(dataPoints, systolicType, diastolicType);
}
