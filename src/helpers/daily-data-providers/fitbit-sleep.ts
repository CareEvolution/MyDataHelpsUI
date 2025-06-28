import { parseISOWithoutOffset } from "../date-helpers";
import { DailyDataQueryResult } from "../query-daily-data";
import { buildTotalValueResult, DailyData, getSleepDate, queryForDailyData } from "./daily-data";
import { DeviceDataPoint } from "@careevolution/mydatahelps-js";

async function querySleep(startDate: Date, endDate: Date, types: string[]): Promise<DailyDataQueryResult> {
    const dailyData = await queryForDailyData("Fitbit", types, startDate, endDate, getSleepDate);
    const dedeuplicatedData = deduplicateSleepData(dailyData);
    return buildTotalValueResult(dedeuplicatedData);
}

function deduplicateDataPoints(
    dataPoints: DeviceDataPoint[]
): DeviceDataPoint[] {
    const uniqueDataPoints: DeviceDataPoint[] = [];

    if (!dataPoints || dataPoints.length <= 1) {
        return dataPoints;
    }

    for (const dataPoint of dataPoints) {
        if (!dataPoint.startDate || !dataPoint.observationDate || !dataPoint.modifiedDate) {
            uniqueDataPoints.push(dataPoint);
            continue;
        }
        const duplicateIndex = uniqueDataPoints
            .filter(dp => dp.startDate && dp.observationDate && dp.modifiedDate)
            .findIndex(uniquePoint => {
                const uniqueStartDate = parseISOWithoutOffset(uniquePoint.startDate!);
                const uniqueObservationDate = parseISOWithoutOffset(uniquePoint.observationDate!);
                const currentStartDate = parseISOWithoutOffset(dataPoint.startDate!);
                const currentObservationDate = parseISOWithoutOffset(dataPoint.observationDate!);

                // Check if the start date and observation date are within 10 minutes of each other
                const tenMinutesInMs = 10 * 60 * 1000;
                const startDateDiff = Math.abs(uniqueStartDate.getTime() - currentStartDate.getTime());
                const observationDateDiff = Math.abs(uniqueObservationDate.getTime() - currentObservationDate.getTime());

                return startDateDiff <= tenMinutesInMs || observationDateDiff <= tenMinutesInMs;
            });

        if (duplicateIndex === -1) {
            // No duplicate found, add the data point
            uniqueDataPoints.push(dataPoint);
        } else {
            // Duplicate found, keep the one with the most recent modifiedDate
            const existingPoint = uniqueDataPoints[duplicateIndex];
            const existingModifiedDate = parseISOWithoutOffset(existingPoint.modifiedDate!);
            const currentModifiedDate = parseISOWithoutOffset(dataPoint.modifiedDate!);

            if (currentModifiedDate > existingModifiedDate) {
                uniqueDataPoints[duplicateIndex] = dataPoint;
            }
        }
    }

    return uniqueDataPoints;
}

/**
 * Fitbit began sending updates to sleep data with different logIds for the same sleep period.
 * This function deduplicates sleep data by checking if the startDate and observationDate are within
 * 10 minutes of each other. If they are, it keeps the most recent entry based on modifiedDate.
 * @param dailyData - Daily data object where keys are dates in YYYY-MM-DD format and values are arrays of DeviceDataPoint objects.
 * @returns 
 */
export function deduplicateSleepData(dailyData: DailyData): DailyData {
    const deduplicatedData: DailyData = {};

    if (!dailyData || Object.keys(dailyData).length === 0) {
        return deduplicatedData;
    }

    //key is the date in YYYY-MM-DD format
    for (const [key, dataPoints] of Object.entries(dailyData)) {
        const uniqueDataPoints = deduplicateDataPoints(dataPoints);
        deduplicatedData[key] = uniqueDataPoints;
    }

    return deduplicatedData;
}

export function totalSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep(startDate, endDate, ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"]);
}

export function remSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep(startDate, endDate, ["SleepLevelRem"]);
}

export function lightSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep(startDate, endDate, ["SleepLevelLight"]);
}

export function deepSleepMinutes(startDate: Date, endDate: Date): Promise<DailyDataQueryResult> {
    return querySleep(startDate, endDate, ["SleepLevelDeep"]);
}