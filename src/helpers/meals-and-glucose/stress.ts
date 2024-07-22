import MyDataHelps from '@careevolution/mydatahelps-js';
import { compareDesc, isSameDay } from 'date-fns';
import { Reading } from './types';

export async function getStressLevel(date: Date): Promise<number | undefined> {
    let response = await MyDataHelps.queryDeviceData({
        namespace: 'Project',
        type: 'StressLevels'
    });
    if (!response?.deviceDataPoints.length) return undefined;

    let stressLevels = JSON.parse(response.deviceDataPoints[0].value) as Reading[];
    let filteredStressLevels = stressLevels.filter(stressLevel => isSameDay(stressLevel.timestamp, date));
    if (filteredStressLevels.length === 0) return undefined;

    return filteredStressLevels.sort((a, b) => compareDesc(a.timestamp, b.timestamp))[0].value;
}
