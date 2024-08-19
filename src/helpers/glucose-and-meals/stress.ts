import MyDataHelps, { PersistableDeviceDataPoint } from '@careevolution/mydatahelps-js';
import { add, endOfDay, startOfDay } from 'date-fns';

export async function getStressLevel(date: Date): Promise<number | undefined> {
    let stressLevelDataPoint = await getStressLevelDataPoint(date);
    return stressLevelDataPoint ? parseInt(stressLevelDataPoint.value) : undefined;
}

export function saveStressLevel(date: Date, stressLevel: number) {
    let stressLevelDataPoint: PersistableDeviceDataPoint = {
        type: 'StressLevel',
        observationDate: startOfDay(date).toISOString(),
        value: stressLevel.toString()
    };
    MyDataHelps.persistDeviceData([stressLevelDataPoint]).then();
}

export function deleteStressLevel(date: Date) {
    getStressLevelDataPoint(date).then(stressLevelDataPoint => {
        if (stressLevelDataPoint) {
            MyDataHelps.deleteDeviceDataPoint(stressLevelDataPoint.id).then();
        }
    });
}

async function getStressLevelDataPoint(date: Date) {
    let response = await MyDataHelps.queryDeviceData({
        namespace: 'Project',
        type: 'StressLevel',
        observedAfter: endOfDay(add(date, { days: -1 })).toISOString(),
        observedBefore: startOfDay(add(date, { days: 1 })).toISOString()
    });
    return response.deviceDataPoints.length ? response.deviceDataPoints[0] : undefined;
}