import MyDataHelps, { DeviceDataNamespace, DeviceDataPointQuery } from "@careevolution/mydatahelps-js";
import { add } from "date-fns";
import { appleHealthWalkingHeartRateAverageDataProvider, appleHealthFlightsClimbedDataProvider, appleHealthHeartRateRangeDataProvider, appleHealthHrvDataProvider, appleHealthInBedDataProvider, appleHealthMaxHeartRateDataProvider, appleHealthRestingHeartRateDataProvider, appleHealthSleepDataProvider, appleHealthStandTimeDataProvider, appleHealthStepsDataProvider, combinedStepsDataProvider, fitbitFairlyActiveMinutesDataProvider, fitbitLightlyActiveMinutesDataProvider, fitbitTotalActiveMinutesDataProvider, fitbitVeryActiveMinutesDataProvider, fitbitCaloriesBurnedDataProvider, fitbitElevatedHeartRateMinutesDataProvider, fitbitFatBurnMinutesDataProvider, fitbitCardioMinutesDataProvider, fitbitPeakMinutesDataProvider, fitbitFloorsDataProvider, fitbitHrvDataProvider, fitbitRestingHeartRateDataProvider, fitbitTotalSleepMinutesDataProvider, fitbitLightSleepMinutesDataProvider, fitbitRemSleepMinutesDataProvider, fitbitDeepSleepMinutesDataProvider, fitbitSpO2DataProvider, fitbitStepsDataProvider, appleHealthDistanceDataProvider, googleFitStepsDataProvider, fitbitBreathingRateDataProvider } from "./daily-data-providers";
import combinedRestingHeartRate from "./daily-data-providers/combined-resting-heart-rate";
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

export function queryDailyData(type: string, startDate: Date, endDate: Date) {
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

export enum DailyDataType {
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
	GoogleFitSteps = "GoogleFitSteps",
	Steps = "Steps",
	RestingHeartRate = "RestingHeartRate"
};

registerDailyDataProvider(DailyDataType.AppleHealthDistanceWalkingRunning, appleHealthDistanceDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlyDistanceWalkingRunning"]));
registerDailyDataProvider(DailyDataType.AppleHealthFlightsClimbed, appleHealthFlightsClimbedDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlySteps"]));
registerDailyDataProvider(DailyDataType.AppleHealthHeartRateRange, appleHealthHeartRateRangeDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlyMaximumHeartRate"]));
registerDailyDataProvider(DailyDataType.AppleHealthHrv, appleHealthHrvDataProvider, simpleAvailabilityCheck("AppleHealth", ["HeartRateVariability"]));
registerDailyDataProvider(DailyDataType.AppleHealthMaxHeartRate, appleHealthMaxHeartRateDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlyMaximumHeartRate"]));
registerDailyDataProvider(DailyDataType.AppleHealthRestingHeartRate, appleHealthRestingHeartRateDataProvider, simpleAvailabilityCheck("AppleHealth", ["RestingHeartRate"]));
registerDailyDataProvider(DailyDataType.AppleHealthSleepMinutes, appleHealthSleepDataProvider, simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]));
registerDailyDataProvider(DailyDataType.AppleHealthInBedMinutes, appleHealthInBedDataProvider, simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]));
registerDailyDataProvider(DailyDataType.AppleHealthStandMinutes, appleHealthStandTimeDataProvider, simpleAvailabilityCheck("AppleHealth", ["AppleStandTime"]));
registerDailyDataProvider(DailyDataType.AppleHealthSteps, appleHealthStepsDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlySteps"]));
registerDailyDataProvider(DailyDataType.AppleHealthWalkingHeartRateAverage, appleHealthWalkingHeartRateAverageDataProvider, simpleAvailabilityCheck("AppleHealth", ["WalkingHeartRateAverage"]));
registerDailyDataProvider(DailyDataType.FitbitActiveMinutes, fitbitTotalActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["MinutesVeryActive", "MinutesFairlyActive", "MinutesLightlyActive"]));
registerDailyDataProvider(DailyDataType.FitbitLightlyActiveMinutes, fitbitLightlyActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["MinutesLightlyActive"]));
registerDailyDataProvider(DailyDataType.FitbitFairlyActiveMinutes, fitbitFairlyActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["MinutesFairlyActive"]));
registerDailyDataProvider(DailyDataType.FitbitVeryActiveMinutes, fitbitVeryActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["MinutesVeryActive"]));
registerDailyDataProvider(DailyDataType.FitbitBreathingRate, fitbitBreathingRateDataProvider, simpleAvailabilityCheck("Fitbit", ["BreathingRate"]));
registerDailyDataProvider(DailyDataType.FitbitCaloriesBurned, fitbitCaloriesBurnedDataProvider, simpleAvailabilityCheck("Fitbit", ["Calories"]));
registerDailyDataProvider(DailyDataType.FitbitElevatedHeartRateMinutes, fitbitElevatedHeartRateMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider(DailyDataType.FitbitFatBurnHeartRateMinutes, fitbitFatBurnMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider(DailyDataType.FitbitCardioHeartRateMinutes, fitbitCardioMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider(DailyDataType.FitbitPeakHeartRateMinutes, fitbitPeakMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider(DailyDataType.FitbitFloors, fitbitFloorsDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider(DailyDataType.FitbitHrv, fitbitHrvDataProvider, simpleAvailabilityCheck("Fitbit", ["Floors"]));
registerDailyDataProvider(DailyDataType.FitbitRestingHeartRate, fitbitRestingHeartRateDataProvider, simpleAvailabilityCheck("Fitbit", ["RestingHeartRate"]));
registerDailyDataProvider(DailyDataType.FitbitSleepMinutes, fitbitTotalSleepMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"]));
registerDailyDataProvider(DailyDataType.FitbitLightSleepMinutes, fitbitLightSleepMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["SleepLevelLight"]));
registerDailyDataProvider(DailyDataType.FitbitRemSleepMinutes, fitbitRemSleepMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["SleepLevelRem"]));
registerDailyDataProvider(DailyDataType.FitbitDeepSleepMinutes, fitbitDeepSleepMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["SleepLevelDeep"]));
registerDailyDataProvider(DailyDataType.FitbitSpO2, fitbitSpO2DataProvider, simpleAvailabilityCheck("Fitbit", ["SpO2"]));
registerDailyDataProvider(DailyDataType.FitbitSteps, fitbitStepsDataProvider, simpleAvailabilityCheck("Fitbit", ["Steps"]));
registerDailyDataProvider(DailyDataType.GoogleFitSteps, googleFitStepsDataProvider, simpleAvailabilityCheck("GoogleFit", ["Steps"]));

//Currently combined RHR does not include google fit
registerDailyDataProvider(DailyDataType.RestingHeartRate, combinedRestingHeartRate, function (modifiedAfter?: Date) {
	return simpleAvailabilityCheck("AppleHealth", ["RestingHeartRate"])(modifiedAfter).then(function (result) {
		if (!result) {
			return simpleAvailabilityCheck("Fitbit", ["RestingHeartRate"])(modifiedAfter);
		}
		else {
			return result;
		}
	})
});

//Currently combined steps does not include google fit
registerDailyDataProvider(DailyDataType.Steps, combinedStepsDataProvider, function (modifiedAfter?: Date) {
	return simpleAvailabilityCheck("AppleHealth", ["Steps"])(modifiedAfter).then(function (result) {
		if (!result) {
			return simpleAvailabilityCheck("Fitbit", ["Steps"])(modifiedAfter);
		}
		else {
			return result;
		}
	})
});