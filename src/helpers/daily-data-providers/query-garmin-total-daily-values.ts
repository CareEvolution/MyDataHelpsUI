import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult } from "./shared";

export default async function (types: string[], startDate: Date, endDate: Date, divideBy?: number): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceData({
        namespace: "Garmin",
        type: "Daily",
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return buildTotalValueResult(dataPoints, dataPoint => dataPoint.startDate, startDate, endDate, dataPoint => {
        const value = types.reduce((total: number, type: string) => {
            const typeValue = parseFloat(dataPoint.properties?.[type] ?? "0");
            return total + (divideBy ? (typeValue / divideBy) : typeValue);
        }, 0);
        return Math.round(value);
    });
}
