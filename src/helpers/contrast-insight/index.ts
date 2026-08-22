import { add, startOfDay } from "date-fns";
import getDayKey from "../get-day-key";
import { queryDailyData } from "../query-daily-data";
import { computeContrastInsight } from "./compute";
import { ContrastInsightConfig, ContrastInsightResult, defaultContrastInsightConfig } from "./types";

export * from "./types";
export { computeContrastInsight, roundToNiceValue } from "./compute";
export { computePreviewContrastInsight, ContrastInsightPreviewState } from "./preview";

/** Queries the driver and outcome daily data over the trailing window (ending yesterday, since
 * today's data is incomplete), pairs them by day with the configured lag, and computes the
 * contrast insight. */
export async function queryContrastInsight(config: ContrastInsightConfig): Promise<ContrastInsightResult> {
    const settings = { ...defaultContrastInsightConfig, ...config };

    const endDate = startOfDay(add(new Date(), { days: -1 }));
    const startDate = add(endDate, { days: -(settings.windowDays - 1) });
    const queryStartDate = add(startDate, { days: -settings.lagDays });

    const [driverData, outcomeData] = await Promise.all([
        queryDailyData(config.driverDataType, queryStartDate, endDate),
        queryDailyData(config.outcomeDataType, startDate, endDate)
    ]);

    const pairs = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
        const driverValue = driverData[getDayKey(add(currentDate, { days: -settings.lagDays }))];
        const outcomeValue = outcomeData[getDayKey(currentDate)];
        const driverValid = driverValue !== undefined && (!settings.excludeZeroDriverDays || driverValue !== 0);
        const outcomeValid = outcomeValue !== undefined && (!settings.excludeZeroOutcomeDays || outcomeValue !== 0);
        if (driverValid && outcomeValid) {
            pairs.push({ date: currentDate, driverValue: driverValue, outcomeValue: outcomeValue });
        }
        currentDate = add(currentDate, { days: 1 });
    }

    return computeContrastInsight(pairs, config);
}
