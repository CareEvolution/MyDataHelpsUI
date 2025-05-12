import { DeviceDataPoint, DeviceDataV2Point } from '@careevolution/mydatahelps-js';
import { add } from 'date-fns';
import { parseISOWithoutOffset } from '../../date-helpers';

export type DailyDataDateFunction = (dataPoint: DeviceDataPoint | DeviceDataV2Point) => string | Date | undefined;
export const getStartDate: DailyDataDateFunction = dataPoint => dataPoint.startDate;
export const getObservationDate: DailyDataDateFunction = dataPoint => dataPoint.observationDate;
export const getSleepDate: DailyDataDateFunction = dataPoint => {
    return dataPoint.observationDate ? add(parseISOWithoutOffset(dataPoint.observationDate), { hours: 6 }) : undefined;
};

export type DailyDataValueFunction = (dataPoint: DeviceDataPoint | DeviceDataV2Point) => number;
export const getFloatValue: DailyDataValueFunction = dataPoint => parseFloat(dataPoint.value);
export const getIntValue: DailyDataValueFunction = dataPoint => parseInt(dataPoint.value);

export type DailyData = Record<string, DeviceDataPoint[]>;
export type DailyDataV2 = Record<string, DeviceDataV2Point[]>;