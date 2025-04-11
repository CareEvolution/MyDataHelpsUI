import combinedSteps from "../../../src/helpers/daily-data-providers/combined-steps";
import MyDataHelps, { DataCollectionSettings, DeviceDataPointQuery, DeviceDataV2Point, DeviceDataV2Query } from "@careevolution/mydatahelps-js";

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

describe("combinedSteps", () => {
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 0, 4);
    const getDataCollectionSettings = MyDataHelps.getDataCollectionSettings as jest.Mock;
    const getDeviceDataV2AllDataTypes = MyDataHelps.getDeviceDataV2AllDataTypes as jest.Mock;
    const queryDeviceData = MyDataHelps.queryDeviceData as jest.Mock;
    const queryDeviceDataV2 = MyDataHelps.queryDeviceDataV2 as jest.Mock;

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

        const result = await combinedSteps(startDate, endDate);
        expect(result).toEqual({});
    });

    it("should return the maximum steps for each day", async () => {
        getDataCollectionSettings.mockResolvedValue({
            fitbitEnabled: true,
            garminEnabled: true,
            ouraEnabled: true,
            queryableDeviceDataTypes: []
        });
        getDeviceDataV2AllDataTypes.mockResolvedValue([
            { namespace: "Oura", type: 'daily-activity', enabled: true }
        ]);
        queryDeviceData.mockImplementation((query: DeviceDataPointQuery) => {
            if (query.namespace === "Fitbit") {
                return Promise.resolve({
                    deviceDataPoints: [
                        { value: 1000, startDate: "2023-01-01" },
                        { value: 1301, startDate: "2023-01-02" }
                    ]
                });
            } else if (query.namespace === "Garmin") {
                return Promise.resolve({
                    deviceDataPoints: [
                        { value: 1500, startDate: "2023-01-01", properties: { Steps: 1500 } },
                        { value: 1101, startDate: "2023-01-02", properties: { Steps: 1101 } }
                    ]
                });
            }
        });
        queryDeviceDataV2.mockImplementation((query: DeviceDataV2Query) => {
            if (query.namespace === "Oura") {
                return Promise.resolve({
                    deviceDataPoints: [
                        buildOuraDataPoint("1200", "2023-01-02", "steps"),
                        buildOuraDataPoint("1201", "2023-01-03", "steps"),
                    ]
                });
            }
        })

        const result = await combinedSteps(startDate, endDate, true);
        expect(result).toEqual({
            "2023-01-01": 1500,
            "2023-01-02": 1301,
            "2023-01-03": 1201,
        });
    });
});

function buildOuraDataPoint(value: string, startDate: string, pointType: string): DeviceDataV2Point {
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
        properties: { type: pointType }
    } as DeviceDataV2Point;
    ddp.properties![pointType] = value;
    return ddp;
}