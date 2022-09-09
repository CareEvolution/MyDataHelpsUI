import MyDataHelps, { DeviceDataNamespace, DeviceDataPointQuery } from "@careevolution/mydatahelps-js";
import { add } from "date-fns";
import { appleHealthWalkingHeartRateAverageDataProvider, appleHealthFlightsClimbedDataProvider, appleHealthHeartRateRangeDataProvider, appleHealthHrvDataProvider, appleHealthInBedDataProvider, appleHealthMaxHeartRateDataProvider, appleHealthRestingHeartRateDataProvider, appleHealthSleepDataProvider, appleHealthStandTimeDataProvider, appleHealthStepsDataProvider, combinedStepsDataProvider, fitbitFairlyActiveMinutesDataProvider, fitbitLightlyActiveMinutesDataProvider, fitbitTotalActiveMinutesDataProvider, fitbitVeryActiveMinutesDataProvider, fitbitCaloriesBurnedDataProvider, fitbitElevatedHeartRateMinutesDataProvider, fitbitFatBurnMinutesDataProvider, fitbitCardioMinutesDataProvider, fitbitPeakMinutesDataProvider, fitbitFloorsDataProvider, fitbitHrvDataProvider, fitbitRestingHeartRateDataProvider, fitbitTotalSleepMinutesDataProvider, fitbitLightSleepMinutesDataProvider, fitbitRemSleepMinutesDataProvider, fitbitDeepSleepMinutesDataProvider, fitbitSpO2DataProvider, fitbitStepsDataProvider, appleHealthDistanceDataProvider, googleFitStepsDataProvider } from "./daily-data-providers";
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

registerDailyDataProvider("AppleHealthDistanceWalkingRunning", appleHealthDistanceDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlyDistanceWalkingRunning"]));
registerDailyDataProvider("AppleHealthFlightsClimbed", appleHealthFlightsClimbedDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlySteps"]));
registerDailyDataProvider("AppleHealthHeartRateRange", appleHealthHeartRateRangeDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlyMaximumHeartRate"]));
registerDailyDataProvider("AppleHealthHrv", appleHealthHrvDataProvider, simpleAvailabilityCheck("AppleHealth", ["HeartRateVariability"]));
registerDailyDataProvider("AppleHealthMaxHeartRate", appleHealthMaxHeartRateDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlyMaximumHeartRate"]));
registerDailyDataProvider("AppleHealthRestingHeartRate", appleHealthRestingHeartRateDataProvider, simpleAvailabilityCheck("AppleHealth", ["RestingHeartRate"]));
registerDailyDataProvider("AppleHealthSleepMinutes", appleHealthSleepDataProvider, simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]));
registerDailyDataProvider("AppleHealthInBedMinutes", appleHealthInBedDataProvider, simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]));
registerDailyDataProvider("AppleHealthStandMinutes", appleHealthStandTimeDataProvider, simpleAvailabilityCheck("AppleHealth", ["AppleStandTime"]));
registerDailyDataProvider("AppleHealthSteps", appleHealthStepsDataProvider, simpleAvailabilityCheck("AppleHealth", ["HourlySteps"]));
registerDailyDataProvider("AppleHealthWalkingHeartRateAverage", appleHealthWalkingHeartRateAverageDataProvider, simpleAvailabilityCheck("AppleHealth", ["WalkingHeartRateAverage"]));
registerDailyDataProvider("FitbitActiveMinutes", fitbitTotalActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["MinutesVeryActive", "MinutesFairlyActive", "MinutesLightlyActive"]));
registerDailyDataProvider("FitbitLightlyActiveMinutes", fitbitLightlyActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["MinutesLightlyActive"]));
registerDailyDataProvider("FitbitFairlyActiveMinutes", fitbitFairlyActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["MinutesFairlyActive"]));
registerDailyDataProvider("FitbitVeryActiveMinutes", fitbitVeryActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["MinutesVeryActive"]));
registerDailyDataProvider("FitbitBreathingRate", fitbitVeryActiveMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["BreathingRate"]));
registerDailyDataProvider("FitbitCaloriesBurned", fitbitCaloriesBurnedDataProvider, simpleAvailabilityCheck("Fitbit", ["Calories"]));
registerDailyDataProvider("FitbitElevatedHeartRateMinutes", fitbitElevatedHeartRateMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider("FitbitFatBurnHeartRateMinutes", fitbitFatBurnMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider("FitbitCardioHeartRateMinutes", fitbitCardioMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider("FitbitPeakHeartRateMinutes", fitbitPeakMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider("FitbitFloors", fitbitFloorsDataProvider, simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]));
registerDailyDataProvider("FitbitHrv", fitbitHrvDataProvider, simpleAvailabilityCheck("Fitbit", ["Floors"]));
registerDailyDataProvider("FitbitRestingHeartRate", fitbitRestingHeartRateDataProvider, simpleAvailabilityCheck("Fitbit", ["RestingHeartRate"]));
registerDailyDataProvider("FitbitSleepMinutes", fitbitTotalSleepMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"]));
registerDailyDataProvider("FitbitLightSleepMinutes", fitbitLightSleepMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["SleepLevelLight"]));
registerDailyDataProvider("FitbitRemSleepMinutes", fitbitRemSleepMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["SleepLevelRem"]));
registerDailyDataProvider("FitbitDeepSleepMinutes", fitbitDeepSleepMinutesDataProvider, simpleAvailabilityCheck("Fitbit", ["SleepLevelDeep"]));
registerDailyDataProvider("FitbitSpO2", fitbitSpO2DataProvider, simpleAvailabilityCheck("Fitbit", ["SpO2"]));
registerDailyDataProvider("FitbitSteps", fitbitStepsDataProvider, simpleAvailabilityCheck("Fitbit", ["Steps"]));
registerDailyDataProvider("GoogleFitSteps", googleFitStepsDataProvider, simpleAvailabilityCheck("GoogleFit", ["Steps"]));

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