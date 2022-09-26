import MyDataHelps, { DeviceDataNamespace, DeviceDataPointQuery } from "@careevolution/mydatahelps-js";
import { add } from "date-fns";
import { appleHealthWalkingHeartRateAverageDataProvider, appleHealthFlightsClimbedDataProvider, appleHealthHeartRateRangeDataProvider, appleHealthHrvDataProvider, appleHealthInBedDataProvider, appleHealthMaxHeartRateDataProvider, appleHealthRestingHeartRateDataProvider, appleHealthSleepDataProvider, appleHealthStandTimeDataProvider, appleHealthStepsDataProvider, combinedStepsDataProvider, fitbitFairlyActiveMinutesDataProvider, fitbitLightlyActiveMinutesDataProvider, fitbitTotalActiveMinutesDataProvider, fitbitVeryActiveMinutesDataProvider, fitbitCaloriesBurnedDataProvider, fitbitElevatedHeartRateMinutesDataProvider, fitbitFatBurnMinutesDataProvider, fitbitCardioMinutesDataProvider, fitbitPeakMinutesDataProvider, fitbitFloorsDataProvider, fitbitHrvDataProvider, fitbitRestingHeartRateDataProvider, fitbitTotalSleepMinutesDataProvider, fitbitLightSleepMinutesDataProvider, fitbitRemSleepMinutesDataProvider, fitbitDeepSleepMinutesDataProvider, fitbitSpO2DataProvider, fitbitStepsDataProvider, appleHealthDistanceDataProvider, googleFitStepsDataProvider, fitbitBreathingRateDataProvider } from "./daily-data-providers";
import getDayKey from "./get-day-key";

export type DailyDataQueryResult = { [key: string]: number };
export type DailyDataProvider = (startDate: Date, endDate: Date) => Promise<DailyDataQueryResult>;
export type DailyDataAvailabilityCheck = (modifiedAfter?: Date) => Promise<boolean>;

var dailyDataTypes: { [key: string]: { provider: DailyDataProvider, availabilityCheck: DailyDataAvailabilityCheck } } = {};

export function registerDailyDataProvider(type: string, provider: DailyDataProvider, availabilityCheck: DailyDataAvailabilityCheck) {
	dailyDataTypes[type] = { provider: provider, availabilityCheck: availabilityCheck };
}

export function checkDailyDataAvailability(type: string, modifiedAfter?: Date) {
	var dailyDataType = dailyDataTypes[type];
	if (!dailyDataType) { throw "Unknown data type:" + type; }
	return dailyDataType.availabilityCheck(modifiedAfter);
}

export default function (type: string, startDate: Date, endDate: Date) {
	var dailyDataType = dailyDataTypes[type];
	return dailyDataType.provider(startDate, endDate).then(function (data) {
		var result: DailyDataQueryResult = {};
		while (startDate < endDate) {
			var dayKey = getDayKey(startDate);
			if (data[dayKey]) {
				result[dayKey] = data[dayKey];
			}
			startDate = add(startDate, { days: 1 });
		}
		return result;
	});
}

function simpleAvailabilityCheck(namespace: DeviceDataNamespace, type: string | string[]) {
	return function (modifiedAfter?: Date) {
		var parameters: DeviceDataPointQuery = { namespace: namespace, type: type, limit: 1 };
		if (modifiedAfter) {
			parameters.modifiedAfter = modifiedAfter.toISOString();
		}
		return MyDataHelps.queryDeviceData(parameters).then(function (result) {
			return result.deviceDataPoints.length > 0;
		}).catch(function () {
			return false;
		});
	}
}

export enum DefaultDailyDataType {
	AppleHealthDistanceWalkingRunning = "AppleHealthDistanceWalkingRunning",
	AppleHealthFlightsClimbed = "AppleHealthFlightsClimbed",
	AppleHealthHeartRateRange = "AppleHealthHeartRateRange",
	AppleHealthHrv = "AppleHealthHrv",
	AppleHealthMaxHeartRate = "AppleHealthMaxHeartRate",
	AppleHealthRestingHeartRate = "AppleHealthRestingHeartRate",
	AppleHealthSleepMinutes = "AppleHealthSleepMinutes",
	AppleHealthInBedMinutes = "AppleHealthInBedMinutes",
	AppleHealthStandMinutes = "AppleHealthStandMinutes",
	AppleHealthSteps = "AppleHealthSteps",
	AppleHealthWalkingHeartRateAverage = "AppleHealthWalkingHeartRateAverage",
	FitbitActiveMinutes = "FitbitActiveMinutes",
	FitbitLightlyActiveMinutes = "FitbitLightlyActiveMinutes",
	FitbitFairlyActiveMinutes = "FitbitFairlyActiveMinutes",
	FitbitVeryActiveMinutes = "FitbitVeryActiveMinutes",
	FitbitBreathingRate = "FitbitBreathingRate",
	FitbitCaloriesBurned = "FitbitCaloriesBurned",
	FitbitElevatedHeartRateMinutes = "FitbitElevatedHeartRateMinutes",
	FitbitFatBurnHeartRateMinutes = "FitbitFatBurnHeartRateMinutes",
	FitbitCardioHeartRateMinutes = "FitbitCardioHeartRateMinutes",
	FitbitPeakHeartRateMinutes = "FitbitPeakHeartRateMinutes",
	FitbitFloors = "FitbitFloors",
	FitbitHrv = "FitbitHrv",
	FitbitRestingHeartRate = "FitbitRestingHeartRate",
	FitbitSleepMinutes = "FitbitSleepMinutes",
	FitbitLightSleepMinutes = "FitbitLightSleepMinutes",
	FitbitRemSleepMinutes = "FitbitRemSleepMinutes",
	FitbitDeepSleepMinutes = "FitbitDeepSleepMinutes",
	FitbitSpO2 = "FitbitSpO2",
	FitbitSteps = "FitbitSteps",
	GoogleFitSteps = "GoogleFitSteps"
};

registerDailyDataProvider(DefaultDailyDataType.AppleHealthDistanceWalkingRunning, appleHealthDistanceDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlyDistanceWalkingRunning"]));
registerDailyDataProvider(DefaultDailyDataType.AppleHealthFlightsClimbed, appleHealthFlightsClimbedDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlySteps"]));
registerDailyDataProvider(DefaultDailyDataType.AppleHealthHeartRateRange, appleHealthHeartRateRangeDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlyMaximumHeartRate"]));
registerDailyDataProvider(DefaultDailyDataType.AppleHealthHrv, appleHealthHrvDataProvider, simpleAvailabilityCheck("AppleHealth", ["HeartRateVariability"]));
registerDailyDataProvider(DefaultDailyDataType.AppleHealthMaxHeartRate, appleHealthMaxHeartRateDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlyMaximumHeartRate"]));
registerDailyDataProvider(DefaultDailyDataType.AppleHealthRestingHeartRate, appleHealthRestingHeartRateDataProvider, simpleAvailabilityCheck("AppleHealth", ["RestingHeartRate"]));
registerDailyDataProvider(DefaultDailyDataType.AppleHealthSleepMinutes, appleHealthSleepDataProvider, simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]));
registerDailyDataProvider(DefaultDailyDataType.AppleHealthInBedMinutes, appleHealthInBedDataProvider, simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]));
registerDailyDataProvider(DefaultDailyDataType.AppleHealthStandMinutes, appleHealthStandTimeDataProvider, simpleAvailabilityCheck("AppleHealth", ["AppleStandTime"]));
registerDailyDataProvider(DefaultDailyDataType.AppleHealthSteps, appleHealthStepsDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlySteps"]));
registerDailyDataProvider(DefaultDailyDataType.AppleHealthWalkingHeartRateAverage, appleHealthWalkingHeartRateAverageDataProvider, simpleAvailabilityCheck("AppleHealth", ["WalkingHeartRateAverage"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitActiveMinutes, fitbitTotalActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["MinutesVeryActive", "MinutesFairlyActive", "MinutesLightlyActive"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitLightlyActiveMinutes, fitbitLightlyActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["MinutesLightlyActive"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitFairlyActiveMinutes, fitbitFairlyActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["MinutesFairlyActive"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitVeryActiveMinutes, fitbitVeryActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["MinutesVeryActive"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitBreathingRate, fitbitBreathingRateDataProvider, simpleAvailabilityCheck("Fitbit", ["BreathingRate"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitCaloriesBurned, fitbitCaloriesBurnedDataProvider, simpleAvailabilityCheck("Fitbit", ["Calories"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitElevatedHeartRateMinutes, fitbitElevatedHeartRateMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitFatBurnHeartRateMinutes, fitbitFatBurnMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitCardioHeartRateMinutes, fitbitCardioMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitPeakHeartRateMinutes, fitbitPeakMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitFloors, fitbitFloorsDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitHrv, fitbitHrvDataProvider, simpleAvailabilityCheck("Fitbit", ["Floors"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitRestingHeartRate, fitbitRestingHeartRateDataProvider, simpleAvailabilityCheck("Fitbit", ["RestingHeartRate"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitSleepMinutes, fitbitTotalSleepMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitLightSleepMinutes, fitbitLightSleepMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["SleepLevelLight"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitRemSleepMinutes, fitbitRemSleepMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["SleepLevelRem"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitDeepSleepMinutes, fitbitDeepSleepMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["SleepLevelDeep"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitSpO2, fitbitSpO2DataProvider, simpleAvailabilityCheck("Fitbit", ["SpO2"]));
registerDailyDataProvider(DefaultDailyDataType.FitbitSteps, fitbitStepsDataProvider, simpleAvailabilityCheck("Fitbit", ["Steps"]));
registerDailyDataProvider(DefaultDailyDataType.GoogleFitSteps, googleFitStepsDataProvider, simpleAvailabilityCheck("GoogleFit", ["Steps"]));

//Currently combined steps does not include google fit
registerDailyDataProvider("Steps", combinedStepsDataProvider, function (modifiedAfter?: Date) {
	return simpleAvailabilityCheck("AppleHealth", ["Steps"])(modifiedAfter).then(function (result) {
		if (!result) {
			return simpleAvailabilityCheck("Fitbit", ["Steps"])(modifiedAfter);
		}
		else {
			return result;
		}
	})
});