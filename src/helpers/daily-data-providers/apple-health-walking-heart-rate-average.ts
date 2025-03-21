import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import { buildAverageValueResult } from "./shared";
import { DailyDataQueryResult } from "../query-daily-data";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceData({
        namespace: "AppleHealth",
        type: "WalkingHeartRateAverage",
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return buildAverageValueResult(dataPoints, dataPoint => dataPoint.startDate, startDate, endDate);
}