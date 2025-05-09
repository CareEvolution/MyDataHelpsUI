import {
    simpleAvailabilityCheck,
    combinedAvailabilityCheck,
    DataSource
} from "../../../src/helpers/daily-data-types/availability-check";
import MyDataHelps, {
    DeviceDataNamespace,
    DeviceDataPointsPage,
    DeviceDataV2Namespace,
    SupportedDeviceDataV2DataType
} from "@careevolution/mydatahelps-js";

jest.mock("@careevolution/mydatahelps-js", () => ({
    __esModule: true,
    default: {
        queryDeviceData: jest.fn(),
        queryDeviceDataV2: jest.fn()
    }
}));

function createBaseSettings(enabled = false) {
    return {
        ouraEnabled: enabled,
        fitbitEnabled: enabled,
        garminEnabled: enabled,
        dexcomEnabled: enabled,
        ehrEnabled: enabled,
        googleFitEnabled: enabled,
        healthConnectEnabled: enabled,
        omronEnabled: enabled,
        airQualityEnabled: enabled,
        weatherEnabled: enabled,
        appleHealthEnabled: enabled,
        appleHealthRecordsEnabled: enabled,
        sensorDataCollectionEndDate: "",
        queryableDeviceDataTypes: []
    };
}

function createDataCollectionSettings(providerName = "", enabled = false) {
    const settings = createBaseSettings(false);
    if (providerName) {
        settings[`${providerName}Enabled`] = enabled;
    }
    return settings;
}

function createTestContext(
    settings,
    deviceDataV2Types: SupportedDeviceDataV2DataType[] = []
) {
    return {
        settings,
        deviceDataV2Types
    };
}

describe("simpleAvailabilityCheck", () => {
    const namespace: DeviceDataNamespace = "Fitbit";
    const type = "testType";
    const queryDeviceData = MyDataHelps.queryDeviceData as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return true when device data points are available", async () => {
        queryDeviceData.mockResolvedValue({
            deviceDataPoints: [{}]
        } as DeviceDataPointsPage);

        const settings = createDataCollectionSettings("fitbit", true);
        const checkAvailability = simpleAvailabilityCheck(namespace, type);
        const result = await checkAvailability(createTestContext(settings));

        expect(result).toBe(true);
        expect(queryDeviceData).toHaveBeenCalledWith({
            namespace: namespace,
            type: [type],
            limit: 1
        });
    });

    it("should return false when no device data points are available", async () => {
        queryDeviceData.mockResolvedValue({
            deviceDataPoints: []
        } as DeviceDataPointsPage);

        const settings = createDataCollectionSettings("fitbit", true);
        const checkAvailability = simpleAvailabilityCheck(namespace, type);
        const result = await checkAvailability(createTestContext(settings));

        expect(result).toBe(false);
        expect(queryDeviceData).toHaveBeenCalledWith({
            namespace: namespace,
            type: [type],
            limit: 1
        });
    });

    it("should return false when query fails", async () => {
        queryDeviceData.mockRejectedValue(new Error("Query failed"));

        const settings = createDataCollectionSettings("fitbit", true);
        const checkAvailability = simpleAvailabilityCheck(namespace, type);
        const result = await checkAvailability(createTestContext(settings));

        expect(result).toBe(false);
        expect(queryDeviceData).toHaveBeenCalledWith({
            namespace: namespace,
            type: [type],
            limit: 1
        });
    });

    it("should include modifiedAfter parameter when provided", async () => {
        const modifiedAfter = new Date();
        queryDeviceData.mockResolvedValue({ deviceDataPoints: [{}] });

        const settings = createDataCollectionSettings("fitbit", true);
        const checkAvailability = simpleAvailabilityCheck(namespace, type);
        const result = await checkAvailability(
            createTestContext(settings),
            modifiedAfter
        );

        expect(result).toBe(true);
        expect(queryDeviceData).toHaveBeenCalledWith({
            namespace: namespace,
            type: [type],
            limit: 1,
            modifiedAfter: modifiedAfter.toISOString()
        });
    });
});

describe("simpleAvailabilityCheck with deviceDataV2", () => {
    const namespace = "Oura";
    const type = "testType";
    const queryDeviceDataV2 = MyDataHelps.queryDeviceDataV2 as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return true when device data points are available", async () => {
        queryDeviceDataV2.mockResolvedValue({
            deviceDataPoints: [{}]
        } as DeviceDataPointsPage);

        const settings = createDataCollectionSettings("oura", true);
        const checkAvailability = simpleAvailabilityCheck(
            namespace,
            type,
            true
        );
        const result = await checkAvailability(
            createTestContext(settings, [
                { namespace: "Oura", type: "testType", enabled: true }
            ])
        );

        expect(result).toBe(true);
        expect(queryDeviceDataV2).toHaveBeenCalledWith({
            namespace: namespace,
            type: "testType",
            limit: 1
        });
        expect(queryDeviceDataV2).not.toHaveBeenCalledWith(expect.objectContaining({
            modifiedAfter: expect.anything()
        }));
    });

    it("should handle multiple types and return true if any type has data", async () => {
        const queryCompleted = {
            Sleep: false,
            Activity: false,
            Readiness: false
        };

        queryDeviceDataV2.mockImplementation(params => {
            if (params.type === "Sleep") {
                // Fast response
                return new Promise(resolve => {
                    setTimeout(() => {
                        queryCompleted.Sleep = true;
                        resolve({ deviceDataPoints: [{}] }); // Has data
                    }, 10);
                });
            } else if (params.type === "Activity") {
                // Slow response
                return new Promise(resolve => {
                    setTimeout(() => {
                        queryCompleted.Activity = true;
                        resolve({ deviceDataPoints: [] }); // No data
                    }, 200);
                });
            } else if (params.type === "Readiness") {
                // Medium speed response
                return new Promise(resolve => {
                    setTimeout(() => {
                        queryCompleted.Readiness = true;
                        resolve({ deviceDataPoints: [] }); // No data
                    }, 100);
                });
            }
            return Promise.resolve({ deviceDataPoints: [] });
        });

        const settings = createDataCollectionSettings("oura", true);
        const multipleTypes = ["Sleep", "Activity", "Readiness"];
        const checkAvailability = simpleAvailabilityCheck(
            namespace,
            multipleTypes,
            true
        );
        const result = await checkAvailability(
            createTestContext(settings, [
                { namespace: "Oura", type: "Sleep", enabled: true },
                { namespace: "Oura", type: "Activity", enabled: true },
                { namespace: "Oura", type: "Readiness", enabled: true }
            ])
        );

        expect(result).toBe(true);
        expect(queryDeviceDataV2).toHaveBeenCalledTimes(3);
        expect(queryCompleted.Sleep).toBe(true);
        
        // Assert that modifiedAfter is not included in any of the calls when undefined
        expect(queryDeviceDataV2).not.toHaveBeenCalledWith(expect.objectContaining({
            modifiedAfter: expect.anything()
        }));
    });

    it("should return false when no device data points are available", async () => {
        queryDeviceDataV2.mockResolvedValue({
            deviceDataPoints: []
        } as DeviceDataPointsPage);

        const settings = createDataCollectionSettings("oura", true);
        const checkAvailability = simpleAvailabilityCheck(
            namespace,
            type,
            true
        );
        const result = await checkAvailability(
            createTestContext(settings, [
                { namespace: "Oura", type: "testType", enabled: true }
            ])
        );

        expect(result).toBe(false);
        expect(queryDeviceDataV2).toHaveBeenCalledWith({
            namespace: namespace,
            type: "testType",
            limit: 1
        });
        
        // Assert that modifiedAfter is not included when undefined
        expect(queryDeviceDataV2).not.toHaveBeenCalledWith(expect.objectContaining({
            modifiedAfter: expect.anything()
        }));
    });

    it("should return false when query fails", async () => {
        queryDeviceDataV2.mockRejectedValue(new Error("Query failed"));

        const settings = createDataCollectionSettings("oura", true);
        const checkAvailability = simpleAvailabilityCheck(
            namespace,
            type,
            true
        );
        const result = await checkAvailability(
            createTestContext(settings, [
                { namespace: "Oura", type: "testType", enabled: true }
            ])
        );

        expect(result).toBe(false);
        expect(queryDeviceDataV2).toHaveBeenCalledWith({
            namespace: namespace,
            type: "testType",
            limit: 1
        });
        
        // Assert that modifiedAfter is not included when undefined
        expect(queryDeviceDataV2).not.toHaveBeenCalledWith(expect.objectContaining({
            modifiedAfter: expect.anything()
        }));
    });

    it("should include modifiedAfter parameter when provided", async () => {
        const modifiedAfter = new Date();
        queryDeviceDataV2.mockResolvedValue({ deviceDataPoints: [{}] });

        const settings = createDataCollectionSettings("oura", true);
        const checkAvailability = simpleAvailabilityCheck(
            namespace,
            type,
            true
        );
        const result = await checkAvailability(
            createTestContext(settings, [
                { namespace: "Oura", type: "testType", enabled: true }
            ]),
            modifiedAfter
        );

        expect(result).toBe(true);
        expect(queryDeviceDataV2).toHaveBeenCalledWith({
            namespace: namespace,
            type: "testType",
            limit: 1,
            modifiedAfter: modifiedAfter.toISOString()
        });
    });
});

describe("combinedAvailabilityCheck", () => {
    const queryDeviceData = MyDataHelps.queryDeviceData as jest.Mock;
    const queryDeviceDataV2 = MyDataHelps.queryDeviceDataV2 as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should resolve as soon as one of the sources resolves with data", async () => {
        const createDelayedMock = (delay: number, hasData: boolean) => {
            return jest.fn().mockImplementation(() => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve({
                            deviceDataPoints: hasData ? [{}] : []
                        });
                    }, delay);
                });
            });
        };

        const slowSuccessMock = createDelayedMock(500, true); // Slow but successful
        const fastFailureMock = createDelayedMock(50, false); // Fast but no data
        const fastSuccessMock = createDelayedMock(100, true); // Fast and successful

        queryDeviceData.mockImplementation(params => {
            if (params.namespace === "Fitbit") {
                return slowSuccessMock(params);
            } else if (params.namespace === "Garmin") {
                return fastFailureMock(params);
            }
            return Promise.resolve({ deviceDataPoints: [] });
        });

        queryDeviceDataV2.mockImplementation(params => {
            if (params.namespace === "Oura") {
                return fastSuccessMock(params);
            }
            return Promise.resolve({ deviceDataPoints: [] });
        });

        const sources: DataSource[] = [
            {
                namespace: "Fitbit" as DeviceDataNamespace,
                type: ["Sleep"],
                isV2: false
            },
            {
                namespace: "Garmin" as DeviceDataNamespace,
                type: ["Steps"],
                isV2: false
            },
            {
                namespace: "Oura" as DeviceDataV2Namespace,
                type: ["Activity"],
                isV2: true
            }
        ];

        const settings = createBaseSettings(false);
        settings.fitbitEnabled = true;
        settings.garminEnabled = true;
        settings.ouraEnabled = true;

        const startTime = Date.now();

        const checkAvailability = combinedAvailabilityCheck(sources);
        const result = await checkAvailability(
            createTestContext(settings, [
                { namespace: "Oura", type: "Activity", enabled: true }
            ])
        );

        const elapsedTime = Date.now() - startTime;
        console.log("elapsedTime", elapsedTime);

        expect(result).toBe(true);

        // Should resolve faster than the slowest source (Fitbit: 500ms)
        // but slower than or around the fastest successful source (Oura: 100ms)
        expect(elapsedTime).toBeLessThan(500);

        // Verify that Oura was queried (the fastest success)
        expect(queryDeviceDataV2).toHaveBeenCalledWith(
            expect.objectContaining({
                namespace: "Oura",
                type: "Activity"
            })
        );
        expect(queryDeviceDataV2).not.toHaveBeenCalledWith(expect.objectContaining({
            modifiedAfter: expect.anything()
        }));

        // Verify Garmin was also queried (even though it fails)
        expect(queryDeviceData).toHaveBeenCalledWith(
            expect.objectContaining({
                namespace: "Garmin",
                type: ["Steps"]
            })
        );

        // Verify Fitbit was queried but was too slow
        expect(queryDeviceData).toHaveBeenCalledWith(
            expect.objectContaining({
                namespace: "Fitbit",
                type: ["Sleep"]
            })
        );
    });
});
