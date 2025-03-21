import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import { DailyDataQueryResult } from "../query-daily-data";
import { buildFirstValueResult } from "./shared";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceData({
        namespace: "Fitbit",
        type: "HeartRateIntradayCount",
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return buildFirstValueResult(dataPoints, dataPoint => dataPoint.startDate, startDate, endDate, dataPoint => parseInt(dataPoint.properties?.["MinuteCount"] ?? "0"));
}
