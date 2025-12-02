import { DailyDataQueryResult } from "../query-daily-data";
import { getStartDate, queryForDailyDataV2 } from "./daily-data";
import { parseISO, format, getMinutes } from 'date-fns';

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    
    /*
    Requires Heart Rate data from Apple Health stored in V2 format.

    Takes about 5-6 seconds to run for a week.

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
    https://careevolution.slack.com/archives/C08QJ2BDQ12/p1748453259744509
    */
    
    const BUCKET_INTERVAL_MINUTES = 10;  // must be a factor of 60
    const SAMPLES_PER_BUCKET_INTERVAL_TO_INDICATE_WEAR = 1;

    const allDailyData = await queryForDailyDataV2("AppleHealth", "Heart Rate", startDate, endDate, getStartDate);
    const groupedData: { [dayKey: string]: number } = {};
    const result: DailyDataQueryResult = {};
    for (const dayKey in allDailyData) {
        const dataPoints = allDailyData[dayKey];
        const dayDict: { [timeString: string]: number } = {};
        // uses local time for bucketing based on startDate and offset of data point
        for (const dataPoint of dataPoints) {
            if (!dataPoint.startDate) {
                continue;
            }
            const date = parseISO(dataPoint.startDate);
            const hourString = format(date, "HH");
            const minute = getMinutes(date);
            const ordinalBucket = Math.floor(minute / BUCKET_INTERVAL_MINUTES);
            const timeString = `${hourString}:${(ordinalBucket * BUCKET_INTERVAL_MINUTES).toString().padStart(2, '0')}`;
            let summedCount = (dayDict[timeString] || 0) + 1;
            dayDict[timeString] = summedCount;
        }
        let durationMinutes = 0;
        for (const timeString in dayDict) {
            if (dayDict[timeString] >= SAMPLES_PER_BUCKET_INTERVAL_TO_INDICATE_WEAR) {
                durationMinutes += BUCKET_INTERVAL_MINUTES;
            }
        }
        groupedData[dayKey] = durationMinutes;
        result[dayKey] = durationMinutes;
    }
    return result;
}