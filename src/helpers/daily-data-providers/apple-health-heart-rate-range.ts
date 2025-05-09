import { DailyDataQueryResult } from "../query-daily-data";
import { getFloatValue, getStartDate, queryForDailyData } from "./daily-data";
import { DeviceDataPoint } from "@careevolution/mydatahelps-js";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("AppleHealth", ["HourlyMaximumHeartRate", "HourlyMinimumHeartRate"], startDate, endDate, getStartDate);

    const getHeartRate = (dataPoints: DeviceDataPoint[], type: string, aggregateFn: typeof Math.min | typeof Math.max): number => {
        const typeFilteredDataPoints = dataPoints.filter(dataPoint => dataPoint.type === type);
        return typeFilteredDataPoints.length > 0 ? aggregateFn(...typeFilteredDataPoints.map(getFloatValue)) : 0;
    };

    return Object.entries(dailyData).reduce((result, [dayKey, dataPoints]) => {
        const maxHeartRate = getHeartRate(dataPoints, "HourlyMaximumHeartRate", Math.max);
        const minHeartRate = getHeartRate(dataPoints, "HourlyMinimumHeartRate", Math.min);
        if (maxHeartRate && minHeartRate) {
            result[dayKey] = maxHeartRate - minHeartRate;
        }
        return result;
    }, {} as DailyDataQueryResult);
}
