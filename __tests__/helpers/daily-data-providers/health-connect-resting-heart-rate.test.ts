import { add } from "date-fns";
import { restingHeartRateProvider } from "../../../src/helpers/daily-data-providers/health-connect-resting-heart-rate";
import * as queryAllDeviceDataV2AggregatesModule from "../../../src/helpers/query-all-device-data-v2-aggregates";

jest.mock("../../../src/helpers/query-all-device-data-v2-aggregates", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("health-connect-resting-heart-rate", () => {
  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2023, 0, 4);
  const queryAllDeviceDataV2Aggregates = (queryAllDeviceDataV2AggregatesModule.default as jest.Mock);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return empty object when no data is available", async () => {
    queryAllDeviceDataV2Aggregates.mockResolvedValue([]);

    const result = await restingHeartRateProvider(startDate, endDate);
    
    expect(result).toEqual({});
    expect(queryAllDeviceDataV2Aggregates).toHaveBeenCalledWith({
      namespace: "HealthConnect",
      type: "resting-heart-rate",
      intervalAmount: 1,
      intervalType: "Days",
      aggregateFunctions: ["avg"],
      observedAfter: add(startDate, { days: -1 }).toISOString(),
      observedBefore: add(endDate, { days: 1 }).toISOString(),
    });
  });

  it("should process and return daily resting heart rate averages", async () => {
    queryAllDeviceDataV2Aggregates.mockResolvedValue([
      {
        date: "2023-01-01T00:00:00.000Z",
        statistics: { avg: 68 }
      },
      {
        date: "2023-01-02T00:00:00.000Z",
        statistics: { avg: 65 }
      },
      {
        date: "2023-01-03T00:00:00.000Z",
        statistics: { avg: 70 }
      },
      {
        date: "2023-01-04T00:00:00.000Z",
        statistics: { avg: 67 }
      }
    ]);

    const result = await restingHeartRateProvider(startDate, endDate);
    
    expect(result).toEqual({
      "2023-01-01": 68,
      "2023-01-02": 65,
      "2023-01-03": 70,
      "2023-01-04": 67
    });
  });

  it("should handle partial data correctly", async () => {
    queryAllDeviceDataV2Aggregates.mockResolvedValue([
      {
        date: "2023-01-01T00:00:00.000Z",
        statistics: { avg: 67 }
      },
      // No data for 2023-01-02
      {
        date: "2023-01-03T00:00:00.000Z",
        statistics: { avg: 71 }
      }
    ]);

    const result = await restingHeartRateProvider(startDate, endDate);
    
    expect(result).toEqual({
      "2023-01-01": 67,
      "2023-01-03": 71
    });
  });

  it("should handle different date formats correctly", async () => {
    queryAllDeviceDataV2Aggregates.mockResolvedValue([
      {
        date: "2023-01-01T12:00:00.000Z", // With time component
        statistics: { avg: 65 }
      },
      {
        date: "2023-01-02", // No time component
        statistics: { avg: 68 }
      }
    ]);

    const result = await restingHeartRateProvider(startDate, endDate);
    
    expect(result).toEqual({
      "2023-01-01": 65,
      "2023-01-02": 68
    });
  });
}); 