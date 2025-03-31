import { parseISO, startOfDay, endOfDay } from "date-fns";
import * as queryAllDeviceDataModule from "../../../src/helpers/daily-data-providers/query-all-device-data";
import * as queryAllDeviceDataV2Module from "../../../src/helpers/query-all-device-data-v2";
import * as combinedDataCollectionSettingsModule from "../../../src/helpers/daily-data-providers/combined-data-collection-settings";
import {
    appleHealthBloodGlucoseDataProvider,
    googleFitBloodGlucoseDataProvider,
    healthConnectBloodGlucoseDataProvider,
    getGlucoseReadings,
    computeBestFitGlucoseValue,
    computeGlucoseReadingRanges,
    computeGlucoseReadingRecentAverage
} from "../../../src/helpers/glucose-and-meals/glucose";
import { Reading } from "../../../src/helpers/glucose-and-meals/types";

jest.mock(
    "../../../src/helpers/daily-data-providers/query-all-device-data",
    () => ({
        __esModule: true,
        default: jest.fn()
    })
);

jest.mock("../../../src/helpers/query-all-device-data-v2", () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock(
    "../../../src/helpers/daily-data-providers/combined-data-collection-settings",
    () => ({
        getCombinedDataCollectionSettings: jest.fn()
    })
);

describe("glucose", () => {
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 0, 4);
    const queryAllDeviceData = queryAllDeviceDataModule.default as jest.Mock;
    const queryAllDeviceDataV2 =
        queryAllDeviceDataV2Module.default as jest.Mock;
    const getCombinedDataCollectionSettings =
        combinedDataCollectionSettingsModule.getCombinedDataCollectionSettings as jest.Mock;

    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe("appleHealthBloodGlucoseDataProvider", () => {
        it("should query and transform AppleHealth blood glucose data", async () => {
            queryAllDeviceData.mockResolvedValue([
                {
                    observationDate: "2023-01-01T10:30:00Z",
                    value: "120"
                },
                {
                    observationDate: "2023-01-02T08:45:00Z",
                    value: "105"
                }
            ]);

            const result = await appleHealthBloodGlucoseDataProvider(
                startDate,
                endDate
            );

            expect(queryAllDeviceData).toHaveBeenCalledWith({
                namespace: "AppleHealth",
                type: "BloodGlucose",
                observedAfter: startOfDay(startDate).toISOString(),
                observedBefore: endOfDay(endDate).toISOString()
            });

            expect(result).toEqual([
                {
                    timestamp: parseISO("2023-01-01T10:30:00Z"),
                    value: 120
                },
                {
                    timestamp: parseISO("2023-01-02T08:45:00Z"),
                    value: 105
                }
            ]);
        });
    });

    describe("googleFitBloodGlucoseDataProvider", () => {
        it("should query and transform GoogleFit blood glucose data", async () => {
            queryAllDeviceData.mockResolvedValue([
                {
                    observationDate: "2023-01-02T14:20:00Z",
                    value: "115"
                }
            ]);

            const result = await googleFitBloodGlucoseDataProvider(
                startDate,
                endDate
            );

            expect(queryAllDeviceData).toHaveBeenCalledWith({
                namespace: "GoogleFit",
                type: "BloodGlucose",
                observedAfter: startOfDay(startDate).toISOString(),
                observedBefore: endOfDay(endDate).toISOString()
            });

            expect(result).toEqual([
                {
                    timestamp: parseISO("2023-01-02T14:20:00Z"),
                    value: 115
                }
            ]);
        });
    });

    describe("healthConnectBloodGlucoseDataProvider", () => {
        it("should query and transform HealthConnect blood glucose data", async () => {
            queryAllDeviceDataV2.mockResolvedValue([
                {
                    observationDate: "2023-01-03T09:15:00Z",
                    value: "130"
                }
            ]);

            const result = await healthConnectBloodGlucoseDataProvider(
                startDate,
                endDate
            );

            expect(queryAllDeviceDataV2).toHaveBeenCalledWith({
                namespace: "HealthConnect",
                type: "blood-glucose",
                observedAfter: startOfDay(startDate).toISOString(),
                observedBefore: endOfDay(endDate).toISOString()
            });

            expect(result).toEqual([
                {
                    timestamp: parseISO("2023-01-03T09:15:00Z"),
                    value: 130
                }
            ]);
        });
    });

    describe("getGlucoseReadings", () => {
        it("should return empty array if no providers are enabled", async () => {
            getCombinedDataCollectionSettings.mockResolvedValue({
                settings: {
                    appleHealthEnabled: false,
                    googleFitEnabled: false,
                    healthConnectEnabled: false,
                    queryableDeviceDataTypes: []
                },
                deviceDataV2Types: []
            });

            const result = await getGlucoseReadings(startDate, endDate);
            expect(result).toEqual([]);
        });

        it("should query and combine data from enabled providers", async () => {
            getCombinedDataCollectionSettings.mockResolvedValue({
                settings: {
                    appleHealthEnabled: true,
                    googleFitEnabled: true,
                    healthConnectEnabled: true,
                    queryableDeviceDataTypes: [
                        { namespace: "AppleHealth", type: "BloodGlucose" },
                        { namespace: "GoogleFit", type: "BloodGlucose" }
                    ]
                },
                deviceDataV2Types: [
                    { namespace: "HealthConnect", type: "blood-glucose" }
                ]
            });

            queryAllDeviceData.mockImplementation(query => {
                if (query.namespace === "AppleHealth") {
                    return Promise.resolve([
                        {
                            observationDate: "2023-01-01T10:30:00Z",
                            value: "120"
                        }
                    ]);
                } else if (query.namespace === "GoogleFit") {
                    return Promise.resolve([
                        {
                            observationDate: "2023-01-02T14:20:00Z",
                            value: "115"
                        }
                    ]);
                }
                return Promise.resolve([]);
            });

            queryAllDeviceDataV2.mockResolvedValue([
                { observationDate: "2023-01-03T09:15:00Z", value: "130" }
            ]);

            const result = await getGlucoseReadings(startDate, endDate);
            expect(result).toEqual([
                { timestamp: parseISO("2023-01-01T10:30:00Z"), value: 120 },
                { timestamp: parseISO("2023-01-02T14:20:00Z"), value: 115 },
                { timestamp: parseISO("2023-01-03T09:15:00Z"), value: 130 }
            ]);
        });
    });

    describe("computeBestFitGlucoseValue", () => {
        it("should return exact value when observation time matches a reading", () => {
            const readings: Reading[] = [
                { timestamp: new Date(2023, 0, 1, 10, 0), value: 100 },
                { timestamp: new Date(2023, 0, 1, 12, 0), value: 120 }
            ];

            const result = computeBestFitGlucoseValue(
                new Date(2023, 0, 1, 10, 0),
                readings
            );
            expect(result).toBe(100);
        });

        it("should compute best fit value between two readings", () => {
            const readings: Reading[] = [
                { timestamp: new Date(2023, 0, 1, 10, 0), value: 100 },
                { timestamp: new Date(2023, 0, 1, 12, 0), value: 120 }
            ];

            // Halfway between readings, should be 110
            const result = computeBestFitGlucoseValue(
                new Date(2023, 0, 1, 11, 0),
                readings
            );
            expect(result).toBeCloseTo(110, 0);
        });
    });

    describe("computeGlucoseReadingRanges", () => {
        it("should compute ranges by day", () => {
            const readings: Reading[] = [
                { timestamp: new Date(2023, 0, 1, 10, 0), value: 100 },
                { timestamp: new Date(2023, 0, 1, 12, 0), value: 120 },
                { timestamp: new Date(2023, 0, 1, 14, 0), value: 110 },
                { timestamp: new Date(2023, 0, 2, 10, 0), value: 95 },
                { timestamp: new Date(2023, 0, 2, 16, 0), value: 130 }
            ];

            const result = computeGlucoseReadingRanges(readings);
            expect(result).toEqual([
                {
                    date: parseISO("2023-01-01"),
                    min: 100,
                    max: 120,
                    average: 110
                },
                {
                    date: parseISO("2023-01-02"),
                    min: 95,
                    max: 130,
                    average: 112.5
                }
            ]);
        });
    });

    describe("computeGlucoseReadingRecentAverage", () => {
        it("should return undefined if no readings in date range", () => {
            const readings: Reading[] = [
                { timestamp: new Date(2023, 0, 10, 10, 0), value: 100 },
                { timestamp: new Date(2023, 0, 11, 12, 0), value: 120 }
            ];

            const result = computeGlucoseReadingRecentAverage(
                readings,
                new Date(2023, 0, 5),
                7
            );
            expect(result).toBeUndefined();
        });

        it("should compute average for readings in date range", () => {
            const readings: Reading[] = [
                { timestamp: new Date(2023, 0, 1, 10, 0), value: 100 },
                { timestamp: new Date(2023, 0, 2, 12, 0), value: 120 },
                { timestamp: new Date(2023, 0, 3, 14, 0), value: 110 },
                { timestamp: new Date(2023, 0, 10, 10, 0), value: 130 } // outside range
            ];

            const endDate = new Date(2023, 0, 5);
            const result = computeGlucoseReadingRecentAverage(
                readings,
                endDate,
                7
            );
            expect(result).toBe(110); // Average of 100, 120, 110
        });
    });
});
