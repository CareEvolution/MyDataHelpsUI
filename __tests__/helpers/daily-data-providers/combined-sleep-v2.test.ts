import MyDataHelps, {
    SupportedDeviceDataV2DataType
} from "@careevolution/mydatahelps-js";
import { totalSleepMinutes as fitbitTotalSleepMinutesDataProvider } from "../../../src/helpers/daily-data-providers/fitbit-sleep-v2";
import { totalSleepMinutes as garminTotalSleepMinutesDataProvider } from "../../../src/helpers/daily-data-providers/garmin-sleep-v2";
import { totalSleepMinutes as appleHealthSleepMinutesDataProvider } from "../../../src/helpers/daily-data-providers/apple-health-sleep-v2";
import { totalSleepMinutes as healthConnectTotalSleepMinutesDataProvider } from "../../../src/helpers/daily-data-providers/health-connect-sleep";
import combinedSleepV2 from "../../../src/helpers/daily-data-providers/combined-sleep-v2";
import { getCombinedDataCollectionSettings } from "../../../src/helpers/daily-data-providers/combined-data-collection-settings";

jest.mock("../../../src/helpers/daily-data-providers/fitbit-sleep-v2", () => ({
    totalSleepMinutes: jest.fn().mockImplementation(() => Promise.resolve({}))
}));

jest.mock("../../../src/helpers/daily-data-providers/garmin-sleep-v2", () => ({
    totalSleepMinutes: jest.fn().mockImplementation(() => Promise.resolve({}))
}));

jest.mock(
    "../../../src/helpers/daily-data-providers/apple-health-sleep-v2",
    () => ({
        totalSleepMinutes: jest
            .fn()
            .mockImplementation(() => Promise.resolve({}))
    })
);

jest.mock(
    "../../../src/helpers/daily-data-providers/health-connect-sleep",
    () => ({
        totalSleepMinutes: jest.fn().mockImplementation(() =>
            Promise.resolve({
                "2023-01-01": 560,
                "2023-01-02": 480,
                "2023-01-03": 530
            })
        )
    })
);

jest.mock(
    "../../../src/helpers/daily-data-providers/combined-data-collection-settings",
    () => ({
        getCombinedDataCollectionSettings: jest.fn()
    })
);

// Mock MyDataHelps
jest.mock("@careevolution/mydatahelps-js", () => ({
    __esModule: true,
    default: {
        getDataCollectionSettings: jest.fn(),
        queryDeviceData: jest.fn(),
        queryDeviceDataV2: jest.fn(),
        getDeviceDataV2AllDataTypes: jest.fn()
    }
}));

describe("combinedSleepV2", () => {
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 0, 4);
    const getDataCollectionSettings =
        MyDataHelps.getDataCollectionSettings as jest.Mock;
    const getDeviceDataV2AllDataTypes =
        MyDataHelps.getDeviceDataV2AllDataTypes as jest.Mock;
    const getCombinedDataCollectionSettingsMock =
        getCombinedDataCollectionSettings as jest.Mock;

    interface TestSettings {
        fitbitEnabled: boolean;
        garminEnabled: boolean;
        appleHealthEnabled: boolean;
        healthConnectEnabled: boolean;
        queryableDeviceDataTypes: { namespace: string; type: string }[];
    }

    const defaultSettings: TestSettings = {
        fitbitEnabled: false,
        garminEnabled: false,
        appleHealthEnabled: false,
        healthConnectEnabled: false,
        queryableDeviceDataTypes: []
    };

    const defaultDeviceDataV2Types: SupportedDeviceDataV2DataType[] = [];

    beforeEach(() => {
        jest.resetAllMocks();

        (fitbitTotalSleepMinutesDataProvider as jest.Mock).mockClear();
        (garminTotalSleepMinutesDataProvider as jest.Mock).mockClear();
        (appleHealthSleepMinutesDataProvider as jest.Mock).mockClear();
        (healthConnectTotalSleepMinutesDataProvider as jest.Mock).mockClear();

        getCombinedDataCollectionSettingsMock.mockResolvedValue({
            settings: defaultSettings,
            deviceDataV2Types: defaultDeviceDataV2Types
        });
    });

    function setupCombinedSettings(
        settings: Partial<TestSettings> = {},
        deviceDataV2Types: Array<
            SupportedDeviceDataV2DataType & { enabled?: boolean }
        > = []
    ) {
        getCombinedDataCollectionSettingsMock.mockResolvedValue({
            settings: {
                ...defaultSettings,
                ...settings
            },
            deviceDataV2Types
        });
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

        (appleHealthSleepMinutesDataProvider as jest.Mock).mockResolvedValue({
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
        setupCombinedSettings();

        const result = await combinedSleepV2(startDate, endDate);
        expect(result).toEqual({});
    });

    it("should return the maximum sleep duration for each day from all available providers", async () => {
        setupProviderData();

        setupCombinedSettings(
            {
                fitbitEnabled: true,
                garminEnabled: true,
                appleHealthEnabled: true,
                healthConnectEnabled: true,
                queryableDeviceDataTypes: [
                    {
                        namespace: "AppleHealth",
                        type: "SleepAnalysisInterval"
                    }
                ]
            },
            [
                {
                    namespace: "HealthConnect",
                    type: "sleep",
                    enabled: true
                }
            ]
        );

        const result = await combinedSleepV2(startDate, endDate);

        expect(result).toEqual({
            "2023-01-01": 560, // Health Connect provides higher value
            "2023-01-02": 533, // Garmin still has highest value
            "2023-01-03": 530 // Health Connect provides higher value than Apple Health
        });

        expect(fitbitTotalSleepMinutesDataProvider).toHaveBeenCalled();
        expect(garminTotalSleepMinutesDataProvider).toHaveBeenCalled();
        expect(appleHealthSleepMinutesDataProvider).toHaveBeenCalled();
        expect(healthConnectTotalSleepMinutesDataProvider).toHaveBeenCalled();
    });

    it("should only call enabled providers", async () => {
        setupProviderData();

        setupCombinedSettings(
            {
                fitbitEnabled: true,
                garminEnabled: false,
                appleHealthEnabled: false,
                healthConnectEnabled: true,
                queryableDeviceDataTypes: []
            },
            [
                {
                    namespace: "HealthConnect",
                    type: "sleep",
                    enabled: true
                }
            ]
        );

        const result = await combinedSleepV2(startDate, endDate);

        expect(result).toEqual({
            "2023-01-01": 560, // Health Connect provides higher value
            "2023-01-02": 480, // Fitbit data is available but lower
            "2023-01-03": 530 // Only Health Connect has data
        });

        expect(fitbitTotalSleepMinutesDataProvider).toHaveBeenCalled();
        expect(garminTotalSleepMinutesDataProvider).not.toHaveBeenCalled();
        expect(appleHealthSleepMinutesDataProvider).not.toHaveBeenCalled();
        expect(healthConnectTotalSleepMinutesDataProvider).toHaveBeenCalled();
    });

    it("should not include Apple Health if SleepAnalysisInterval is not supported", async () => {
        setupProviderData();

        setupCombinedSettings(
            {
                fitbitEnabled: true,
                garminEnabled: true,
                appleHealthEnabled: true,
                healthConnectEnabled: true,
                queryableDeviceDataTypes: [
                    {
                        namespace: "AppleHealth",
                        type: "Steps" // Different type, not sleep
                    }
                ]
            },
            [
                {
                    namespace: "HealthConnect",
                    type: "sleep",
                    enabled: true
                }
            ]
        );

        const result = await combinedSleepV2(startDate, endDate);

        expect(result).toEqual({
            "2023-01-01": 560, // Health Connect provides higher value
            "2023-01-02": 533, // Garmin still has highest value
            "2023-01-03": 530 // Only Health Connect has data
        });

        expect(fitbitTotalSleepMinutesDataProvider).toHaveBeenCalled();
        expect(garminTotalSleepMinutesDataProvider).toHaveBeenCalled();
        expect(appleHealthSleepMinutesDataProvider).not.toHaveBeenCalled();
        expect(healthConnectTotalSleepMinutesDataProvider).toHaveBeenCalled();
    });

    it("should not include Health Connect if sleep data type is not enabled", async () => {
        setupProviderData();

        setupCombinedSettings(
            {
                fitbitEnabled: true,
                garminEnabled: true,
                appleHealthEnabled: true,
                healthConnectEnabled: true,
                queryableDeviceDataTypes: [
                    {
                        namespace: "AppleHealth",
                        type: "SleepAnalysisInterval"
                    }
                ]
            },
            [
                {
                    namespace: "HealthConnect",
                    type: "sleep",
                    enabled: false // Not enabled
                }
            ]
        );

        const result = await combinedSleepV2(startDate, endDate);

        expect(result).toEqual({
            "2023-01-01": 540, // Fitbit provides highest value now
            "2023-01-02": 533, // Garmin still has highest value
            "2023-01-03": 417 // Only Apple Health has data now
        });

        expect(fitbitTotalSleepMinutesDataProvider).toHaveBeenCalled();
        expect(garminTotalSleepMinutesDataProvider).toHaveBeenCalled();
        expect(appleHealthSleepMinutesDataProvider).toHaveBeenCalled();
        expect(
            healthConnectTotalSleepMinutesDataProvider
        ).not.toHaveBeenCalled();
    });
});
