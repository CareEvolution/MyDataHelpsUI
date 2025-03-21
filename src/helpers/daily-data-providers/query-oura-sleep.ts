import { add } from "date-fns";
import queryAllDeviceDataV2 from "../query-all-device-data-v2";
import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult } from "./shared";

export type OuraSleepType = "long_sleep" | "sleep" | "late_nap" | "deleted" | "rest";

export default async function (startDate: Date, endDate: Date, dataType: string, sleepTypesToInclude: OuraSleepType[], divideBy?: number): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceDataV2({
        namespace: "Oura",
        type: "sleep",
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    const filteredDataPoints = dataPoints.filter(dataPoint => {
        return sleepTypesToInclude.length === 0 || sleepTypesToInclude.includes(dataPoint.properties?.["type"] as OuraSleepType);
    });
    return buildTotalValueResult(filteredDataPoints, dataPoint => dataPoint.properties?.["day"], startDate, endDate, dataPoint => {
        const value = parseFloat(dataPoint.properties?.[dataType] ?? "0");
        return Math.round(divideBy ? (value / divideBy) : value);
    });
}