import * as healthConnectSleep from "../../../src/helpers/daily-data-providers/health-connect-sleep";
import * as commonSleepV2 from "../../../src/helpers/daily-data-providers/common-sleep-v2";

jest.mock("../../../src/helpers/daily-data-providers/common-sleep-v2", () => ({
  querySleepMinutesV2: jest.fn()
}));

describe("health-connect-sleep", () => {
  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2023, 0, 4);
  const querySleepMinutesV2 = commonSleepV2.querySleepMinutesV2 as jest.Mock;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("totalSleepMinutes", () => {
    it("should call querySleepMinutesV2 with correct parameters", async () => {
      querySleepMinutesV2.mockResolvedValue({ "2023-01-01": 480 });
      
      const result = await healthConnectSleep.totalSleepMinutes(startDate, endDate);
      
      expect(querySleepMinutesV2).toHaveBeenCalledWith(
        "HealthConnect", 
        "sleep", 
        startDate, 
        endDate, 
        ["STAGE_TYPE_LIGHT", "STAGE_TYPE_REM", "STAGE_TYPE_DEEP"]
      );
      expect(result).toEqual({ "2023-01-01": 480 });
    });
  });

  describe("lightSleepMinutes", () => {
    it("should call querySleepMinutesV2 with correct parameters", async () => {
      querySleepMinutesV2.mockResolvedValue({ "2023-01-01": 240 });
      
      const result = await healthConnectSleep.lightSleepMinutes(startDate, endDate);
      
      expect(querySleepMinutesV2).toHaveBeenCalledWith(
        "HealthConnect", 
        "sleep", 
        startDate, 
        endDate, 
        ["STAGE_TYPE_LIGHT"]
      );
      expect(result).toEqual({ "2023-01-01": 240 });
    });
  });

  describe("remSleepMinutes", () => {
    it("should call querySleepMinutesV2 with correct parameters", async () => {
      querySleepMinutesV2.mockResolvedValue({ "2023-01-01": 120 });
      
      const result = await healthConnectSleep.remSleepMinutes(startDate, endDate);
      
      expect(querySleepMinutesV2).toHaveBeenCalledWith(
        "HealthConnect", 
        "sleep", 
        startDate, 
        endDate, 
        ["STAGE_TYPE_REM"]
      );
      expect(result).toEqual({ "2023-01-01": 120 });
    });
  });

  describe("deepSleepMinutes", () => {
    it("should call querySleepMinutesV2 with correct parameters", async () => {
      querySleepMinutesV2.mockResolvedValue({ "2023-01-01": 120 });
      
      const result = await healthConnectSleep.deepSleepMinutes(startDate, endDate);
      
      expect(querySleepMinutesV2).toHaveBeenCalledWith(
        "HealthConnect", 
        "sleep", 
        startDate, 
        endDate, 
        ["STAGE_TYPE_DEEP"]
      );
      expect(result).toEqual({ "2023-01-01": 120 });
    });
  });
}); 