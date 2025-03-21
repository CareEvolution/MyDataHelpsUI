import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import { DailyDataQueryResult } from "../query-daily-data";
import { buildFirstValueResult } from "./shared";

export default async function (type: string, startDate: Date, endDate: Date, divideBy?: number): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceData({
        namespace: "Garmin",
        type: "Daily",
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return buildFirstValueResult(dataPoints, dataPoint => dataPoint.startDate, startDate, endDate, dataPoint => {
        const value = parseFloat(dataPoint.properties?.[type] ?? "0");
        return Math.round(divideBy ? (value / divideBy) : value);
    });
}
