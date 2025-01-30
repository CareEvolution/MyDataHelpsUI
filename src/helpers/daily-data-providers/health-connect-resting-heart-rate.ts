import { add } from "date-fns";
import { DailyDataQueryResult } from "../query-daily-data";
import queryAllDeviceDataV2Aggregates from "../query-all-device-data-v2-aggregates";

export async function averageRestingHeartRateProvider(
  startDate: Date,
  endDate: Date
): Promise<DailyDataQueryResult> {
  const aggregates = await queryAllDeviceDataV2Aggregates({
    namespace: "HealthConnect",
    type: "RestingHeartRate",
    intervalAmount: 1,
    intervalType: "Days",
    aggregateFunctions: ["avg"],
    observedAfter: add(startDate, { days: -1 }).toISOString(),
    observedBefore: add(endDate, { days: 1 }).toISOString(),
  });

  const result: DailyDataQueryResult = {};
  aggregates.forEach((agg) => {
    const dateKey = agg.date.split("T")[0];
    result[dateKey] = agg.statistics.avg;
  });
  return result;
}
