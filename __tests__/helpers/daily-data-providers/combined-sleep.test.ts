import MyDataHelps, { DeviceDataPoint, DeviceDataPointQuery, DeviceDataV2Point, DeviceDataV2Query } from "@careevolution/mydatahelps-js";
import combinedSleep from "../../../src/helpers/daily-data-providers/combined-sleep";

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

describe("combinedSleep", () => {
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

        const result = await combinedSleep(startDate, endDate);
        expect(result).toEqual({});
    });

    it("should return an empty object if ouraEnabled, but device data v2 type sleep not available", async () => {
        getDataCollectionSettings.mockResolvedValue({
            ouraEnabled: true,
            queryableDeviceDataTypes: []
        });
        getDeviceDataV2AllDataTypes.mockResolvedValue([]);
        const result = await combinedSleep(startDate, endDate);
        expect(result).toEqual({});
    });

    it("should return the maximum sleep for each day", async () => {
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
                        buildFitbitDataPoint("540", "2023-01-01"),
                        buildFitbitDataPoint("412", "2023-01-02")
                    ]
                });
            } else if (query.namespace === "Garmin") {
                return Promise.resolve({
                    deviceDataPoints: [
                        buildGarminDataPoint((510 * 60).toString(), "2023-01-01T12:02:00", "DurationInSeconds"),
                        buildGarminDataPoint((533 * 60).toString(), "2023-01-02T13:01:02", "DurationInSeconds")
                    ]
                });
            }
        });
        queryDeviceDataV2.mockImplementation((query: DeviceDataV2Query) => {
            if (query.namespace === "Oura") {
                return Promise.resolve({
                    deviceDataPoints: [
                        buildOuraDataPoint((433 * 60).toString(), "2023-01-02", "total_sleep_duration", "long_sleep"),
                        buildOuraDataPoint((417 * 60).toString(), "2023-01-03", "total_sleep_duration", "long_sleep"),
                    ]
                });
            }
        })

        const result = await combinedSleep(startDate, endDate);
        expect(result).toEqual({
            "2023-01-01": 540,
            "2023-01-02": 533,
            "2023-01-03": 417,
        });
    });
});

function buildOuraDataPoint(value: string, startDate: string, propertyValueName: string, propertyType: string): DeviceDataV2Point {
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

function buildFitbitDataPoint(value: string, startDate: string): DeviceDataPoint {
    let ddp: DeviceDataPoint = {
        id: "",
        namespace: "Fitbit",
        insertedDate: "",
        modifiedDate: "",
        observationDate: startDate,
        startDate: startDate,
        type: "",
        value: value,
        properties: {},
    };
    return ddp;
}

function buildGarminDataPoint(value: string, startDate: string, propertyValueName: string): DeviceDataPoint {
    let ddp: DeviceDataPoint = {
        id: "",
        namespace: "Garmin",
        insertedDate: "",
        modifiedDate: "",
        observationDate: startDate,
        startDate: startDate,
        type: "",
        value: value,
        properties: {},
    };
    ddp.properties![propertyValueName] = value;
    return ddp;
}