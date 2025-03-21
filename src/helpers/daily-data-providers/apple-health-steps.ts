import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult } from "./shared";

export default async function (startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceData({
        namespace: "AppleHealth",
        type: "HourlySteps",
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return buildTotalValueResult(dataPoints, dataPoint => dataPoint.startDate, startDate, endDate);
}
