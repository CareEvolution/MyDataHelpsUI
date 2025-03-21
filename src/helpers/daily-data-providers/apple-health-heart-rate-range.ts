import { DailyDataQueryResult } from "../query-daily-data";
import { getFloatValue, getStartDate, queryForDailyData } from "./daily-data";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("AppleHealth", ["HourlyMaximumHeartRate", "HourlyMinimumHeartRate"], startDate, endDate, getStartDate);

    const result: DailyDataQueryResult = {};
    Object.keys(dailyData).forEach(dayKey => {
        const maxHeartRateDataPoints = dailyData[dayKey].filter(dataPoint => dataPoint.type === "HourlyMaximumHeartRate");
        const maxHeartRate = maxHeartRateDataPoints.length > 0 ? Math.max(...maxHeartRateDataPoints.map(getFloatValue)) : 0;

        const minHeartRateDataPoints = dailyData[dayKey].filter(dataPoint => dataPoint.type === "HourlyMinimumHeartRate");
        const minHeartRate = minHeartRateDataPoints.length > 0 ? Math.min(...minHeartRateDataPoints.map(getFloatValue)) : 0;

        if (maxHeartRate && minHeartRate) {
            result[dayKey] = maxHeartRate - minHeartRate;
        }
    });
    return result;
}
