import { DailyDataQueryResult, parseISOWithoutOffset } from '../../../../helpers';
import { add, isAfter } from 'date-fns';
import getDayKey from '../../../../helpers/get-day-key';
import queryAllDeviceData from '../../../../helpers/daily-data-providers/query-all-device-data';
import { dailyDataDateFilter } from "../../../../helpers/daily-data-providers";

export const queryAsthmaDeviceData = async (type: string, startDate: Date, endDate: Date): Promise<DailyDataQueryResult> => {
    const dataPoints = await queryAllDeviceData({
        namespace: 'Project',
        type: type,
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });

    const dateFilteredDataPoints = dataPoints.filter(dataPoint => dailyDataDateFilter(dataPoint.observationDate, startDate, endDate));

    const result: DailyDataQueryResult = {};
    const observationDates: Record<string, Date> = {};
    dateFilteredDataPoints.forEach(dataPoint => {
        const observationDate = parseISOWithoutOffset(dataPoint.observationDate!);
        const dayKey = getDayKey(observationDate);

        // There should only be one data point per day, but just in case, if there happens to be
        // more than one, take the value from the data point with the later observationDate.
        if (!result[dayKey] || isAfter(observationDate, observationDates[dayKey])) {
            result[dayKey] = parseFloat(dataPoint.value);
            observationDates[dayKey] = observationDate;
        }
    });

    return result;
};