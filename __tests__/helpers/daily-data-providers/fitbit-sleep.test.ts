import { describe, expect, test } from "@jest/globals";
import {
    sampleDailyData,
    sampleEndDate,
    sampleResult,
    sampleStartDate,
    setupDailyData,
    setupTotalValueResult,
    sleepDateFunctionEvaluator
} from "../../fixtures/daily-data-providers";
import {
    deduplicateSleepData,
    deepSleepMinutes,
    lightSleepMinutes,
    remSleepMinutes,
    totalSleepMinutes
} from "../../../src/helpers/daily-data-providers/fitbit-sleep";
import { DailyData } from "../../../src/helpers/daily-data-providers/daily-data/daily-data-type";

describe("Daily Data Provider - Fitbit Sleep", () => {
    test.each([
        {
            title: "Light",
            sleepFunction: lightSleepMinutes,
            types: ["SleepLevelLight"]
        },
        {
            title: "REM",
            sleepFunction: remSleepMinutes,
            types: ["SleepLevelRem"]
        },
        {
            title: "Deep",
            sleepFunction: deepSleepMinutes,
            types: ["SleepLevelDeep"]
        },
        {
            title: "Total",
            sleepFunction: totalSleepMinutes,
            types: [
                "SleepLevelRem",
                "SleepLevelLight",
                "SleepLevelDeep",
                "SleepLevelAsleep"
            ]
        }
    ])(
        "$title - Should query for daily data and build a total value result keyed by observation date + 6 hours.",
        async ({ sleepFunction, types }) => {
            setupDailyData(
                "Fitbit",
                types,
                sampleStartDate,
                sampleEndDate,
                sleepDateFunctionEvaluator,
                sampleDailyData
            );
            setupTotalValueResult(sampleDailyData, sampleResult);

            expect(await sleepFunction(sampleStartDate, sampleEndDate)).toBe(
                sampleResult
            );
        }
    );
});

describe("Daily Data Provider - dedeuplicate sleep", () => {
    test("Should return an empty object when daily data is empty", () => {
        var result = deduplicateSleepData({});
        expect(result).toEqual({});
    });
    test("Should return the same data when no duplicates are present", () => {
        const dailyData = {
            "2023-10-01": [
                {
                    startDate: "2023-10-01T00:00:00Z",
                    observationDate: "2023-10-01T06:00:00Z",
                    modifiedDate: "2023-10-01T06:00:00Z"
                }
            ]
        } as unknown as DailyData;
        const result = deduplicateSleepData(dailyData);
        expect(result).toEqual(dailyData);
    });
    test("Should deduplicate sleep data based on startDate and observationDate", () => {
        const dailyData = {
            "2023-10-01": [
                {
                    startDate: "2023-10-01T00:00:00Z",
                    observationDate: "2023-10-01T06:00:00Z",
                    modifiedDate: "2023-10-01T06:00:00Z"
                },
                {
                    startDate: "2023-10-01T00:05:00Z",
                    observationDate: "2023-10-01T06:05:00Z",
                    modifiedDate: "2023-10-01T06:05:00Z"
                },
                {
                    startDate: "2023-10-01T00:05:00Z",
                    observationDate: "2023-10-01T06:00:00Z",
                    modifiedDate: "2023-10-01T06:03:00Z"
                }
            ]
        } as unknown as DailyData;
        const result = deduplicateSleepData(dailyData);
        expect(result).toEqual({
            "2023-10-01": [
                {
                    startDate: "2023-10-01T00:05:00Z",
                    observationDate: "2023-10-01T06:05:00Z",
                    modifiedDate: "2023-10-01T06:05:00Z"
                }
            ]
        });
    });
    test("Should return the any object that is missing startDate or observationDate", () => {
        const dailyData = {
            "2023-10-01": [
                {
                    startDate: "2023-10-01T00:00:00Z",
                    observationDate: "2023-10-01T06:00:00Z",
                    modifiedDate: "2023-10-01T06:00:00Z"
                },
                {
                    startDate: "2023-10-01T00:00:00Z",
                    modifiedDate: "2023-10-01T06:05:00Z"
                }
            ]
        } as unknown as DailyData;
        const result = deduplicateSleepData(dailyData);
        expect(result).toEqual({
            "2023-10-01": [
                {
                    startDate: "2023-10-01T00:00:00Z",
                    observationDate: "2023-10-01T06:00:00Z",
                    modifiedDate: "2023-10-01T06:00:00Z"
                },
                {
                    startDate: "2023-10-01T00:00:00Z",
                    modifiedDate: "2023-10-01T06:05:00Z"
                }
            ]
        });
    });

    test("should deduplicate if startDate is within 10 minutes, but observationDate is not", () => {
        const dailyData = {
            "2023-10-01": [
                {
                    startDate: "2023-10-01T00:00:00Z",
                    observationDate: "2023-10-01T06:00:00Z",
                    modifiedDate: "2023-10-01T06:00:00Z"
                },
                {
                    startDate: "2023-10-01T00:05:00Z",
                    observationDate: "2023-10-01T06:45:00Z",
                    modifiedDate: "2023-10-01T06:05:00Z"
                }
            ]
        } as unknown as DailyData;
        const result = deduplicateSleepData(dailyData);
        expect(result).toEqual({
            "2023-10-01": [
                {
                    startDate: "2023-10-01T00:05:00Z",
                    observationDate: "2023-10-01T06:45:00Z",
                    modifiedDate: "2023-10-01T06:05:00Z"
                }
            ]
        });
    });

    test("should deduplicate duplicates but keep distinct data points", () => {
        const dailyData = {
            "2023-10-01": [
                {
                    startDate: "2023-10-01T00:00:00Z",
                    observationDate: "2023-10-01T06:00:00Z",
                    modifiedDate: "2023-10-01T06:00:00Z"
                },
                {
                    startDate: "2023-10-01T00:05:00Z",
                    observationDate: "2023-10-01T06:05:00Z",
                    modifiedDate: "2023-10-01T06:05:00Z"
                },
                {
                    startDate: "2023-10-01T12:00:00Z",
                    observationDate: "2023-10-01T12:30:00Z",
                    modifiedDate: "2023-10-01T12:30:00Z"
                }
            ]
        } as unknown as DailyData;
        const result = deduplicateSleepData(dailyData);
        expect(result).toEqual({
            "2023-10-01": [
                {
                    startDate: "2023-10-01T00:05:00Z",
                    observationDate: "2023-10-01T06:05:00Z",
                    modifiedDate: "2023-10-01T06:05:00Z"
                },
                {
                    startDate: "2023-10-01T12:00:00Z",
                    observationDate: "2023-10-01T12:30:00Z",
                    modifiedDate: "2023-10-01T12:30:00Z"
                }
            ]
        });
    });
});
