import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery, DeviceDataV2Point, DeviceDataV2Query } from "@careevolution/mydatahelps-js";
import combinedRestingHeartRate from "../../../src/helpers/daily-data-providers/combined-resting-heart-rate";

jest.mock("@careevolution/mydatahelps-js", () => ({
    __esModule: true,
    default: {
        getDataCollectionSettings: jest.fn(),
        getDeviceDataV2AllDataTypes: jest.fn(),
        queryDeviceData: jest.fn(),
        queryDeviceDataV2: jest.fn()
    }
}
));

describe("combinedRestingHeartRate", () => {
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 0, 4);
    const getDataCollectionSettings = (MyDataHelps.getDataCollectionSettings as jest.Mock);
    const getDeviceDataV2AllDataTypes = (MyDataHelps.getDeviceDataV2AllDataTypes as jest.Mock);
    const queryDeviceData = (MyDataHelps.queryDeviceData as jest.Mock);
    const queryDeviceDataV2 = (MyDataHelps.queryDeviceDataV2 as jest.Mock);

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should return an empty object if no providers are enabled", async () => {
        getDataCollectionSettings.mockResolvedValue({
            fitbitEnabled: false,
            garminEnabled: false,
            ouraEnabled: false,
            queryableDeviceDataTypes: []
        });

        const result = await combinedRestingHeartRate(startDate, endDate);
        expect(result).toEqual({});
    });

    it("should return an empty object if device data v2 type not available", async () => {
        getDataCollectionSettings.mockResolvedValue({
            ouraEnabled: true,
            queryableDeviceDataTypes: []
        });
        getDeviceDataV2AllDataTypes.mockResolvedValue([]);
        const result = await combinedRestingHeartRate(startDate, endDate);
        expect(result).toEqual({});
    });

    it("should return the average heart rate for each day", async () => {
        getDataCollectionSettings.mockResolvedValue({
            fitbitEnabled: true,
            garminEnabled: true,
            ouraEnabled: true,
            queryableDeviceDataTypes: []
        });
        getDeviceDataV2AllDataTypes.mockResolvedValue([
            {
                enabled: true,
                namespace: "Oura",
                type: "sleep"
            }
        ]);
        queryDeviceData.mockImplementation((query: DeviceDataPointQuery) => {
            if (query.namespace === "Fitbit") {
                return Promise.resolve({
                    deviceDataPoints: [
                        buildFitbitDataPoint("46", "2023-01-01", "RestingHeartRate"),
                        buildFitbitDataPoint("54", "2023-01-02", "RestingHeartRate")
                    ]
                });
            } else if (query.namespace === "Garmin") {
                return Promise.resolve({
                    deviceDataPoints: [
                        buildGarminDataPoint("48", "2023-01-01T12:02:00", "Daily", "RestingHeartRateInBeatsPerMinute"),
                        buildGarminDataPoint("47", "2023-01-02T13:01:02", "Daily", "RestingHeartRateInBeatsPerMinute")
                    ]
                });
            }
        });
        queryDeviceDataV2.mockImplementation((query: DeviceDataV2Query) => {
            if (query.namespace === "Oura") {
                return Promise.resolve({
                    deviceDataPoints: [
                        buildOuraDataPoint("51", "2023-01-02", "lowest_heart_rate", "long_sleep"),
                        buildOuraDataPoint("52", "2023-01-03", "lowest_heart_rate", "long_sleep"),
                    ]
                });
            }
        })

        const result = await combinedRestingHeartRate(startDate, endDate);
        expect(result).toEqual({
            "2023-01-01": 47,
            "2023-01-02": 51,
            "2023-01-03": 52,
        });
    });
});

export function buildOuraDataPoint(value: string, startDate: string, propertyValueName: string, propertyType: string): DeviceDataV2Point {
    let ddp = {
        id: "",
        participantID: "",
        participantIdentifier: "",
        identifier: "",
        value: value,
        units: "",
        startDate: startDate,
        startDateOffset: "",
        observationDate: startDate,
        observationDateOffset: "",
        insertedDate: "",
        modifiedDate: "",
        properties: { type: propertyType, day: startDate }
    } as DeviceDataV2Point;
    ddp.properties![propertyValueName] = value;
    return ddp;
}

export function buildFitbitDataPoint(value: string, startDate: string, ddpType: string): DeviceDataPoint {
    let ddp: DeviceDataPoint = {
        id: "",
        namespace: "Fitbit",
        insertedDate: "",
        modifiedDate: "",
        startDate: startDate,
        type: ddpType,
        value: value,
        properties: {},
    };
    return ddp;
}

export function buildGarminDataPoint(value: string, startDate: string, ddpType: string, propertyValueName: string): DeviceDataPoint {
    let ddp: DeviceDataPoint = {
        id: "",
        namespace: "Garmin",
        insertedDate: "",
        modifiedDate: "",
        startDate: startDate,
        type: ddpType,
        value: value,
        properties: {},
    };
    ddp.properties![propertyValueName] = value;
    return ddp;
}