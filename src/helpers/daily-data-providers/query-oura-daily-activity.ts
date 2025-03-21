import { add } from "date-fns";
import queryAllDeviceDataV2 from "../query-all-device-data-v2";
import { DailyDataQueryResult } from "../query-daily-data";
import { buildFirstValueResult } from "./shared";

export default async function (startDate: Date, endDate: Date, type: string): Promise<DailyDataQueryResult> {
    const dataPoints = await queryAllDeviceDataV2({
        namespace: "Oura",
        type: "daily-activity",
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    });
    return buildFirstValueResult(dataPoints, dataPoint => dataPoint.observationDate, startDate, endDate, dataPoint => {
        return Math.round(parseFloat(dataPoint.properties?.[type] ?? "0"));
    });
}