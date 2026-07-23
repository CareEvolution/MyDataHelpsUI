import { DailyDataQueryResult } from "../query-daily-data";
import { appleHealthMaxHeartRateDataProvider, appleHealthMinHeartRateDataProvider } from './index';

export default async function(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const [minResult, maxResult] = await Promise.all([
        appleHealthMinHeartRateDataProvider(startDate, endDate),
        appleHealthMaxHeartRateDataProvider(startDate, endDate)
    ]);

    return Object.entries(minResult).reduce((result, [dayKey, minHeartRate]) => {
        if (maxResult[dayKey] > minHeartRate) {
            result[dayKey] = maxResult[dayKey] - minHeartRate;
        }
        return result;
    }, {} as DailyDataQueryResult);
}
