import MyDataHelps, {
    DeviceDataPoint,
    DeviceDataPointQuery,
    DeviceDataV2Point,
    DeviceDataV2Query,
    DeviceDataNamespace
} from "@careevolution/mydatahelps-js";
import combinedRestingHeartRate from "../../../src/helpers/daily-data-providers/combined-resting-heart-rate";

jest.mock("@careevolution/mydatahelps-js", () => ({
    __esModule: true,
    default: {
        getDataCollectionSettings: jest.fn(),
        queryDeviceData: jest.fn(),
        queryDeviceDataV2: jest.fn(),
        getDeviceDataV2AllDataTypes: jest.fn(),
        queryDeviceDataV2Aggregate: jest.fn()
    }
}));

describe("combinedRestingHeartRate", () => {
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 0, 4);
    const getDataCollectionSettings =
        MyDataHelps.getDataCollectionSettings as jest.Mock;
    const queryDeviceData = MyDataHelps.queryDeviceData as jest.Mock;
    const queryDeviceDataV2 = MyDataHelps.queryDeviceDataV2 as jest.Mock;
    const getDeviceDataV2AllDataTypes =
        MyDataHelps.getDeviceDataV2AllDataTypes as jest.Mock;
    const queryDeviceDataV2Aggregate =
        MyDataHelps.queryDeviceDataV2Aggregate as jest.Mock;

    const defaultSettings = {
        fitbitEnabled: false,
        garminEnabled: false,
        ouraEnabled: false,
        healthConnectEnabled: false,
        queryableDeviceDataTypes: []
    };

    const fitbitData = [
        buildFitbitDataPoint("46", "2023-01-01", "RestingHeartRate"),
        buildFitbitDataPoint("54", "2023-01-02", "RestingHeartRate")
    ];

    const garminData = [
        buildGarminDataPoint(
            "48",
            "2023-01-01T12:02:00",
            "Daily",
            "RestingHeartRateInBeatsPerMinute"
        ),
        buildGarminDataPoint(
            "47",
            "2023-01-02T13:01:02",
            "Daily",
            "RestingHeartRateInBeatsPerMinute"
        )
    ];

    const ouraData = [
        buildOuraDataPoint(
            "51",
            "2023-01-02",
            "lowest_heart_rate",
            "long_sleep"
        ),
        buildOuraDataPoint(
            "52",
            "2023-01-03",
            "lowest_heart_rate",
            "long_sleep"
        )
    ];

    const healthConnectData = [
        buildHealthConnectDataPoint("45", "2023-01-01"),
        buildHealthConnectDataPoint("48", "2023-01-02"),
        buildHealthConnectDataPoint("52", "2023-01-03")
    ];

    function setupDataCollectionSettings(
        options: Partial<typeof defaultSettings> = {}
    ) {
        getDataCollectionSettings.mockResolvedValue({
            ...defaultSettings,
            ...options
        });
    }

    function setupDeviceDataV2Types(
        types: Array<{ namespace: string; type: string }> = []
    ) {
        getDeviceDataV2AllDataTypes.mockResolvedValue(types);
    }

    function setupDeviceDataQueries(
        config: { fitbit?: boolean; garmin?: boolean } = {}
    ) {
        const { fitbit = false, garmin = false } = config;

        queryDeviceData.mockImplementation((query: DeviceDataPointQuery) => {
            if (query.namespace === "Fitbit" && fitbit) {
                return Promise.resolve({ deviceDataPoints: fitbitData });
            } else if (query.namespace === "Garmin" && garmin) {
                return Promise.resolve({ deviceDataPoints: garminData });
            }
            return Promise.resolve({ deviceDataPoints: [] });
        });
    }

    function setupDeviceDataV2Queries(
        config: { oura?: boolean; healthConnect?: boolean } = {}
    ) {
        const { oura = false, healthConnect = false } = config;

        queryDeviceDataV2.mockImplementation((query: DeviceDataV2Query) => {
            if (query.namespace === "Oura" && oura) {
                return Promise.resolve({ deviceDataPoints: ouraData });
            } else if (query.namespace === "HealthConnect" && healthConnect) {
                return Promise.resolve({ deviceDataPoints: healthConnectData });
            }
            return Promise.resolve({ deviceDataPoints: [] });
        });
    }

    beforeEach(() => {
        jest.resetAllMocks();
        setupDeviceDataV2Types([]);
        queryDeviceData.mockResolvedValue({ deviceDataPoints: [] });
        queryDeviceDataV2.mockResolvedValue({ deviceDataPoints: [] });
        queryDeviceDataV2Aggregate.mockResolvedValue({
            intervals: [],
            nextPageID: null
        });
    });

    it("should return an empty object if no providers are enabled", async () => {
        setupDataCollectionSettings();

        const result = await combinedRestingHeartRate(startDate, endDate);
        expect(result).toEqual({});
    });

    it("should return the average heart rate for each day", async () => {
        setupDataCollectionSettings({
            fitbitEnabled: true,
            garminEnabled: true,
            ouraEnabled: true
        });

        setupDeviceDataV2Types([{ namespace: "Oura", type: "sleep" }]);
        setupDeviceDataQueries({ fitbit: true, garmin: true });
        setupDeviceDataV2Queries({ oura: true });

        const result = await combinedRestingHeartRate(startDate, endDate);
        expect(result).toEqual({
            "2023-01-01": 47,
            "2023-01-02": 51,
            "2023-01-03": 52
        });
    });

    it("should retrieve and process Health Connect resting heart rate data", async () => {
        setupDataCollectionSettings({ healthConnectEnabled: true });
        setupDeviceDataV2Types([
            { namespace: "HealthConnect", type: "resting-heart-rate" }
        ]);
        setupDeviceDataV2Queries({ healthConnect: true });

        queryDeviceDataV2Aggregate.mockResolvedValue({
            intervals: [
                { date: "2023-01-01T00:00:00Z", statistics: { avg: 45 } },
                { date: "2023-01-02T00:00:00Z", statistics: { avg: 48 } },
                { date: "2023-01-03T00:00:00Z", statistics: { avg: 52 } }
            ],
            nextPageID: null
        });

        const result = await combinedRestingHeartRate(startDate, endDate);

        expect(result).toEqual({
            "2023-01-01": 45,
            "2023-01-02": 48,
            "2023-01-03": 52
        });

        expect(queryDeviceDataV2Aggregate).toHaveBeenCalledWith(
            expect.objectContaining({
                namespace: "HealthConnect",
                type: "resting-heart-rate"
            })
        );
    });

    it("should return an empty object if ouraEnabled, but device data v2 type sleep not available", async () => {
        setupDataCollectionSettings({
            ouraEnabled: true
        });

        // Set up device data types without Oura sleep
        setupDeviceDataV2Types([
            { namespace: "HealthConnect", type: "resting-heart-rate" }
        ]);

        const result = await combinedRestingHeartRate(startDate, endDate);

        expect(result).toEqual({});
        expect(queryDeviceDataV2).not.toHaveBeenCalledWith(
            expect.objectContaining({
                namespace: "Oura"
            })
        );
    });
});

function buildBaseDeviceDataV2Point(
    value: string,
    startDate: string,
    properties: Record<string, any> = {}
): DeviceDataV2Point {
    return {
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
        properties: properties
    } as DeviceDataV2Point;
}

function buildBaseDeviceDataPoint(
    value: string,
    startDate: string,
    namespace: DeviceDataNamespace,
    type: string,
    properties: Record<string, any> = {}
): DeviceDataPoint {
    return {
        id: "",
        namespace: namespace,
        insertedDate: "",
        modifiedDate: "",
        startDate: startDate,
        type: type,
        value: value,
        properties: properties
    };
}

function buildOuraDataPoint(
    value: string,
    startDate: string,
    propertyValueName: string,
    propertyType: string
): DeviceDataV2Point {
    const properties = { type: propertyType, day: startDate };
    properties[propertyValueName] = value;
    return buildBaseDeviceDataV2Point(value, startDate, properties);
}

function buildFitbitDataPoint(
    value: string,
    startDate: string,
    ddpType: string
): DeviceDataPoint {
    return buildBaseDeviceDataPoint(value, startDate, "Fitbit", ddpType);
}

function buildGarminDataPoint(
    value: string,
    startDate: string,
    ddpType: string,
    propertyValueName: string
): DeviceDataPoint {
    const properties = {};
    properties[propertyValueName] = value;
    return buildBaseDeviceDataPoint(
        value,
        startDate,
        "Garmin",
        ddpType,
        properties
    );
}

function buildHealthConnectDataPoint(
    value: string,
    startDate: string
): DeviceDataV2Point {
    return buildBaseDeviceDataV2Point(value, startDate, {
        type: "resting_heart_rate",
        value: value
    });
}
