import { DailyDataQueryResult } from "../query-daily-data";
import { parseISO, add } from 'date-fns';
import queryAllDeviceDataV2Aggregates from "../query-all-device-data-v2-aggregates";
import { dailyDataDateFilter } from "./daily-data";
import getDayKey from "../get-day-key";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    
    /*
    Requires Heart Rate data from Apple Health stored in V2 format.

    Built using analysis of Apple SensorKit data that has actual on/off wrist timestamps.
    n = 5 PPTs, 48 full days of data
    10 minute buckets using >= 1 heart rate per bucket to indicate "watch on wrist" was the best predictor 
    of true wear time (vs. 20 min buckets or higher thresholds of samples per bucket). Typical overestimates
    actual wear time by 1-2%.
    average actual wear per day by PPT and relative error at 10 min buckets and 1/bucket
    [
        12:17 - 0.7 % UNDERESTIMATE,
        21:48 - 1.0 % OVERESTIMATE, 
        18:18 - 12.8 % OVER,
        20:34 - 1.6 % OVER,
        23:03 - 1.2 % OVER
    ]
    */

    const BUCKET_INTERVAL_MINUTES = 10;  // must be a factor of 60
    const SAMPLES_PER_BUCKET_INTERVAL_TO_INDICATE_WEAR = 1;

    const bucketedData = await queryAllDeviceDataV2Aggregates({
        namespace: 'AppleHealth',
        type: 'Heart Rate',
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString(),
        dataSource: { deviceModel: 'Watch' },
        intervalAmount: BUCKET_INTERVAL_MINUTES,
        intervalType: 'Minutes',
        aggregateFunctions: ['count']
    })

    const result: DailyDataQueryResult = {};
    for (const bucket of bucketedData) {
        if (bucket.statistics['count'] >= SAMPLES_PER_BUCKET_INTERVAL_TO_INDICATE_WEAR) {
            if (!dailyDataDateFilter(bucket.date, startDate, endDate)) {
                continue;
            }
            // NOTE: bucket.date for aggregate call has no offset included in date string
            const date = parseISO(bucket.date);
            const dayKey = getDayKey(date);
            result[dayKey] = (result[dayKey] ?? 0) + BUCKET_INTERVAL_MINUTES;
        }
    }
    
    return result;
}