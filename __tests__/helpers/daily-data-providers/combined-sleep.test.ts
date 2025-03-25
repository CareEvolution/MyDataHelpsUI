import MyDataHelps from "@careevolution/mydatahelps-js";
import {
    fitbitTotalSleepMinutesDataProvider,
    garminTotalSleepMinutesDataProvider,
    ouraSleepMinutesDataProvider,
    healthConnectTotalSleepMinutesDataProvider
} from "../../../src/helpers/daily-data-providers";
import combinedSleep from "../../../src/helpers/daily-data-providers/combined-sleep";

jest.mock("../../../src/helpers/daily-data-providers", () => ({
    fitbitTotalSleepMinutesDataProvider: jest
        .fn()
        .mockImplementation(() => Promise.resolve({})),
    garminTotalSleepMinutesDataProvider: jest
        .fn()
        .mockImplementation(() => Promise.resolve({})),
    ouraSleepMinutesDataProvider: jest
        .fn()
        .mockImplementation(() => Promise.resolve({})),
    healthConnectTotalSleepMinutesDataProvider: jest
        .fn()
        .mockImplementation(() =>
            Promise.resolve({
                "2023-01-01": 560,
                "2023-01-02": 480,
                "2023-01-03": 530
            })
        )
}));

jest.mock("@careevolution/mydatahelps-js", () => ({
    __esModule: true,
    default: {
        getDataCollectionSettings: jest.fn(),
        queryDeviceData: jest.fn(),
        queryDeviceDataV2: jest.fn(),
        getDeviceDataV2AllDataTypes: jest.fn()
    }
}));

describe("combinedSleep", () => {
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 0, 4);
    const getDataCollectionSettings =
        MyDataHelps.getDataCollectionSettings as jest.Mock;
    const queryDeviceData = MyDataHelps.queryDeviceData as jest.Mock;
    const queryDeviceDataV2 = MyDataHelps.queryDeviceDataV2 as jest.Mock;
    const getDeviceDataV2AllDataTypes =
        MyDataHelps.getDeviceDataV2AllDataTypes as jest.Mock;

    const defaultSettings = {
        fitbitEnabled: false,
        garminEnabled: false,
        ouraEnabled: false,
        healthConnectEnabled: false,
        queryableDeviceDataTypes: []
    };

    beforeEach(() => {
        jest.resetAllMocks();
        setupDeviceDataV2Types([]);
        queryDeviceData.mockResolvedValue({ deviceDataPoints: [] });
        queryDeviceDataV2.mockResolvedValue({ deviceDataPoints: [] });

        // Reset the provider mocks
        (fitbitTotalSleepMinutesDataProvider as jest.Mock).mockClear();
        (garminTotalSleepMinutesDataProvider as jest.Mock).mockClear();
        (ouraSleepMinutesDataProvider as jest.Mock).mockClear();
        (healthConnectTotalSleepMinutesDataProvider as jest.Mock).mockClear();
    });

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

    function setupProviderData() {
        (fitbitTotalSleepMinutesDataProvider as jest.Mock).mockResolvedValue({
            "2023-01-01": 540,
            "2023-01-02": 412
        });

        (garminTotalSleepMinutesDataProvider as jest.Mock).mockResolvedValue({
            "2023-01-01": 510,
            "2023-01-02": 533
        });

        (ouraSleepMinutesDataProvider as jest.Mock).mockResolvedValue({
            "2023-01-02": 433,
            "2023-01-03": 417
        });

        (
            healthConnectTotalSleepMinutesDataProvider as jest.Mock
        ).mockResolvedValue({
            "2023-01-01": 560,
            "2023-01-02": 480,
            "2023-01-03": 530
        });
    }

    it("should return an empty object if no providers are enabled", async () => {
        setupDataCollectionSettings();

        const result = await combinedSleep(startDate, endDate);
        expect(result).toEqual({});
    });

    it("should return the maximum sleep duration for each day from all available providers", async () => {
        setupProviderData();

        setupDataCollectionSettings({
            fitbitEnabled: true,
            garminEnabled: true,
            ouraEnabled: true,
            healthConnectEnabled: true
        });

        setupDeviceDataV2Types([{ namespace: "HealthConnect", type: "sleep" }]);

        const result = await combinedSleep(startDate, endDate);

        expect(result).toEqual({
            "2023-01-01": 560, // Health Connect provides higher value
            "2023-01-02": 533, // Garmin still has highest value
            "2023-01-03": 530 // Health Connect provides higher value than Oura
        });

        expect(fitbitTotalSleepMinutesDataProvider).toHaveBeenCalled();
        expect(garminTotalSleepMinutesDataProvider).toHaveBeenCalled();
        expect(ouraSleepMinutesDataProvider).toHaveBeenCalled();
        expect(healthConnectTotalSleepMinutesDataProvider).toHaveBeenCalled();
    });
});
