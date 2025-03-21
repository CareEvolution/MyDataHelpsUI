import MyDataHelps, { PersistableDeviceDataPoint } from '@careevolution/mydatahelps-js';
import { add, compareDesc, endOfDay, startOfDay } from 'date-fns';
import getDayKey from '../get-day-key';

export async function getStressLevel(date: Date): Promise<number | undefined> {
    let stressLevelDataPoint = await getStressLevelDataPoint(date);
    return stressLevelDataPoint ? parseInt(stressLevelDataPoint.value) : undefined;
}

export function saveStressLevel(date: Date, stressLevel: number) {
    let stressLevelDataPoint: PersistableDeviceDataPoint = {
        type: 'StressLevel',
        observationDate: `${getDayKey(date)}T12:00:00-06:00`,
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
    if (response.deviceDataPoints.length > 0) {
        if (response.deviceDataPoints.length > 1) {
            // There should be a single data point per day.  However, due to a change in the timestamp being
            // applied to these daily data points, we may end up with more than one.  This code cleans that
            // up by deleting the extra data points and returning the most recently modified one.
            const sortedDataPoints = [...response.deviceDataPoints].sort((a, b) => compareDesc(a.modifiedDate, b.modifiedDate));
            sortedDataPoints.slice(1).forEach(dataPoint => MyDataHelps.deleteDeviceDataPoint(dataPoint.id));
            return sortedDataPoints[0];
        }
        return response.deviceDataPoints[0];
    }
    return undefined;
}