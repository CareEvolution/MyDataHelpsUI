import MyDataHelps from '@careevolution/mydatahelps-js';
import { add, endOfDay, startOfDay } from 'date-fns';

export async function getStressLevel(date: Date): Promise<number | undefined> {
    let response = await MyDataHelps.queryDeviceData({
        namespace: 'Project',
        type: 'StressLevel',
        observedAfter: endOfDay(add(date, { days: -1 })).toISOString(),
        observedBefore: startOfDay(add(date, { days: 1 })).toISOString()
    });
    return response.deviceDataPoints.length ? parseInt(response.deviceDataPoints[0].value) : undefined;
}
