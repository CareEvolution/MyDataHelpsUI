import { simpleAvailabilityCheck, simpleAvailabilityCheckV2 } from "../../../src/helpers/daily-data-types/availability-check";
import MyDataHelps, { DeviceDataNamespace, DeviceDataPointsPage } from "@careevolution/mydatahelps-js";


jest.mock("@careevolution/mydatahelps-js", () => ({
    __esModule: true,
    default: {
        queryDeviceData: jest.fn(),
        queryDeviceDataV2: jest.fn()
    },
}));

describe("simpleAvailabilityCheck", () => {
    const namespace: DeviceDataNamespace = "Fitbit";
    const type = "testType";
    const queryDeviceData = (MyDataHelps.queryDeviceData as jest.Mock);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return true when device data points are available", async () => {
        queryDeviceData.mockResolvedValue({ deviceDataPoints: [{}] } as DeviceDataPointsPage);

        const checkAvailability = simpleAvailabilityCheck(namespace, type);
        const result = await checkAvailability();

        expect(result).toBe(true);
        expect(queryDeviceData).toHaveBeenCalledWith({
            namespace: namespace,
            type: type,
            limit: 1
        });
    });

    it("should return false when no device data points are available", async () => {
        queryDeviceData.mockResolvedValue({ deviceDataPoints: [] } as DeviceDataPointsPage);

        const checkAvailability = simpleAvailabilityCheck(namespace, type);
        const result = await checkAvailability();

        expect(result).toBe(false);
        expect(queryDeviceData).toHaveBeenCalledWith({
            namespace: namespace,
            type: type,
            limit: 1
        });
    });

    it("should return false when query fails", async () => {
        queryDeviceData.mockRejectedValue(new Error("Query failed"));

        const checkAvailability = simpleAvailabilityCheck(namespace, type);
        const result = await checkAvailability();

        expect(result).toBe(false);
        expect(queryDeviceData).toHaveBeenCalledWith({
            namespace: namespace,
            type: type,
            limit: 1
        });
    });

    it("should include modifiedAfter parameter when provided", async () => {
        const modifiedAfter = new Date();
        queryDeviceData.mockResolvedValue({ deviceDataPoints: [{}] });

        const checkAvailability = simpleAvailabilityCheck(namespace, type);
        const result = await checkAvailability(modifiedAfter);

        expect(result).toBe(true);
        expect(queryDeviceData).toHaveBeenCalledWith({
            namespace: namespace,
            type: type,
            limit: 1,
            modifiedAfter: modifiedAfter.toISOString()
        });
    });
});

describe("simpleAvailabilityCheckV2", () => {
    const namespace = "Oura";
    const type = "testType";
    const queryDeviceDataV2 = (MyDataHelps.queryDeviceDataV2 as jest.Mock);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return true when device data points are available", async () => {
        queryDeviceDataV2.mockResolvedValue({ deviceDataPoints: [{}] } as DeviceDataPointsPage);

        const checkAvailability = simpleAvailabilityCheckV2(namespace, type);
        const result = await checkAvailability();

        expect(result).toBe(true);
        expect(queryDeviceDataV2).toHaveBeenCalledWith({
            namespace: namespace,
            type: type,
            limit: 1
        });
    });

    it("should return false when no device data points are available", async () => {
        queryDeviceDataV2.mockResolvedValue({ deviceDataPoints: [] } as DeviceDataPointsPage);

        const checkAvailability = simpleAvailabilityCheckV2(namespace, type);
        const result = await checkAvailability();

        expect(result).toBe(false);
        expect(queryDeviceDataV2).toHaveBeenCalledWith({
            namespace: namespace,
            type: type,
            limit: 1
        });
    });

    it("should return false when query fails", async () => {
        queryDeviceDataV2.mockRejectedValue(new Error("Query failed"));

        const checkAvailability = simpleAvailabilityCheckV2(namespace, type);
        const result = await checkAvailability();

        expect(result).toBe(false);
        expect(queryDeviceDataV2).toHaveBeenCalledWith({
            namespace: namespace,
            type: type,
            limit: 1
        });
    });

    it("should include modifiedAfter parameter when provided", async () => {
        const modifiedAfter = new Date();
        queryDeviceDataV2.mockResolvedValue({ deviceDataPoints: [{}] });

        const checkAvailability = simpleAvailabilityCheckV2(namespace, type);
        const result = await checkAvailability(modifiedAfter);

        expect(result).toBe(true);
        expect(queryDeviceDataV2).toHaveBeenCalledWith({
            namespace: namespace,
            type: type,
            limit: 1,
            modifiedAfter: modifiedAfter.toISOString()
        });
    });
});