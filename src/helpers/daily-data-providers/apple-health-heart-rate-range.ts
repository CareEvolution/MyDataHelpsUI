import { add } from "date-fns";
import getDayKey from "../get-day-key";
import queryAllDeviceData from "./query-all-device-data";
import { DailyDataQueryResult } from "../query-daily-data";
import { dailyDataDateFilter } from "./shared";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceData({
        namespace: "AppleHealth",
        type: ["HourlyMaximumHeartRate", "HourlyMinimumHeartRate"],
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });

    const dateFilteredDataPoints = dataPoints.filter(dataPoint => dailyDataDateFilter(dataPoint.startDate, startDate, endDate));

    const dailyMinMax: Record<string, Record<string, number>> = {};
    dateFilteredDataPoints.forEach(dataPoint => {
        const dayKey = getDayKey(dataPoint.startDate!);
        const value = parseFloat(dataPoint.value);
        if (dataPoint.type === "HourlyMaximumHeartRate") {
            if (!dailyMinMax[dayKey]) {
                dailyMinMax[dayKey] = { "MaxHeartRate": value };
            } else if (!dailyMinMax[dayKey]["MaxHeartRate"] || value > dailyMinMax[dayKey]["MaxHeartRate"]) {
                dailyMinMax[dayKey]["MaxHeartRate"] = value;
            }
        } else if (dataPoint.type === "HourlyMinimumHeartRate") {
            if (!dailyMinMax[dayKey]) {
                dailyMinMax[dayKey] = { "MinHeartRate": value };
            } else if (!dailyMinMax[dayKey]["MinHeartRate"] || value < dailyMinMax[dayKey]["MinHeartRate"]) {
                dailyMinMax[dayKey]["MinHeartRate"] = value;
            }
        }
    });

    const result: DailyDataQueryResult = {};
    Object.keys(dailyMinMax).forEach(dayKey => {
        const dayData = dailyMinMax[dayKey];
        if (dayData["MaxHeartRate"] && dayData["MinHeartRate"]) {
            result[dayKey] = dayData["MaxHeartRate"] - dayData["MinHeartRate"];
        }
    });

    return result;
}
