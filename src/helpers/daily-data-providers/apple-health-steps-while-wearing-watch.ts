import { add, parseISO } from 'date-fns';
import getDayKey from '../get-day-key';
import queryAllDeviceData from './query-all-device-data';
import { DailyDataQueryResult } from '../query-daily-data';

export default function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return queryAllDeviceData({
        namespace: 'AppleHealth',
        type: ['Steps', 'HourlySteps'],
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    }).then(dataPoints => {
        const watchDates = dataPoints.filter(dataPoint =>
            dataPoint.type === 'Steps'
            && dataPoint.startDate
            && dataPoint.source?.properties?.['SourceProductType']?.includes('Watch')
            && parseInt(dataPoint.value) > 0
        ).map(dataPoint => getDayKey(parseISO(dataPoint.startDate!)));

        const hourlyStepsDataPoints = dataPoints.filter(dataPoint =>
            dataPoint.type === 'HourlySteps'
            && dataPoint.startDate
            && parseInt(dataPoint.value) > 0
        );

        const result: DailyDataQueryResult = {};
        hourlyStepsDataPoints.forEach(dataPoint => {
            const dayKey = getDayKey(parseISO(dataPoint.startDate!));
            if (watchDates.includes(dayKey)) {
                result[dayKey] = (result[dayKey] ?? 0) + parseInt(dataPoint.value);
            }
        });
        return result;
    });
}
