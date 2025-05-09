import { DeviceDataNamespace, DeviceDataPoint, DeviceDataV2Namespace, DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import getDayKey from '../../get-day-key';
import queryAllDeviceData from '../query-all-device-data';
import { add, endOfDay, Interval, isWithinInterval, startOfDay } from 'date-fns';
import queryAllDeviceDataV2 from '../../query-all-device-data-v2';
import { DailyData, DailyDataDateFunction, DailyDataV2 } from './daily-data-type';
import { parseISOWithoutOffset } from '../../date-helpers';

const self = module.exports as typeof import('./daily-data-query');

export async function queryForDailyData(
    namespace: DeviceDataNamespace,
    type: string | string[],
    startDate: Date,
    endDate: Date,
    dateFn: DailyDataDateFunction
): Promise<DailyData> {
    const dataPoints = await self.queryForDailyDataPoints(namespace, type, startDate, endDate, dateFn);
    return dataPoints.reduce((dailyData, dataPoint) => {
        const dayKey = getDayKey(dateFn(dataPoint)!);
        if (!dailyData[dayKey]) {
            dailyData[dayKey] = [];
        }
        dailyData[dayKey].push(dataPoint);
        return dailyData;
    }, {} as DailyData);
}

export async function queryForDailyDataPoints(
    namespace: DeviceDataNamespace,
    type: string | string[],
    startDate: Date,
    endDate: Date,
    dateFn?: DailyDataDateFunction
): Promise<DeviceDataPoint[]> {
    const dataPoints = await queryAllDeviceData({
        namespace: namespace,
        type: type,
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return dataPoints.filter(dataPoint => !dateFn || self.dailyDataDateFilter(dateFn(dataPoint), startDate, endDate));
}

export async function queryForDailyDataV2(
    namespace: DeviceDataV2Namespace,
    type: string,
    startDate: Date,
    endDate: Date,
    dateFn: DailyDataDateFunction
): Promise<DailyDataV2> {
    const dataPoints = await self.queryForDailyDataPointsV2(namespace, type, startDate, endDate, dateFn);
    return dataPoints.reduce((dailyData, dataPoint) => {
        const dayKey = getDayKey(dateFn(dataPoint)!);
        if (!dailyData[dayKey]) {
            dailyData[dayKey] = [];
        }
        dailyData[dayKey].push(dataPoint);
        return dailyData;
    }, {} as DailyDataV2);
}

export async function queryForDailyDataPointsV2(
    namespace: DeviceDataV2Namespace,
    type: string,
    startDate: Date,
    endDate: Date,
    dateFn?: DailyDataDateFunction
): Promise<DeviceDataV2Point[]> {
    const dataPoints = await queryAllDeviceDataV2({
        namespace: namespace,
        type: type,
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return dataPoints.filter(dataPoint => !dateFn || self.dailyDataDateFilter(dateFn(dataPoint), startDate, endDate));
}

export function dailyDataDateFilter(dateStrOrDate: string | Date | undefined, startDate: Date, endDate: Date): boolean {
    if (!dateStrOrDate) return false;

    const date = typeof dateStrOrDate === 'string' ? parseISOWithoutOffset(dateStrOrDate) : dateStrOrDate;
    const interval: Interval<Date, Date> = {
        start: startOfDay(startDate),
        end: endOfDay(endDate)
    };

    return isWithinInterval(date, interval);
}