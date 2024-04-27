import MyDataHelps, { DeviceDataNamespace, DeviceDataPointQuery } from "@careevolution/mydatahelps-js";
import { add } from "date-fns";
import getDayKey from "./get-day-key";
import allTypeDefinitions, { DailyDataTypeDefinition } from "./daily-data-types";

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

export function simpleAvailabilityCheck(namespace: DeviceDataNamespace, type: string | string[]) {
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

let definitionLookup = new Map(
	allTypeDefinitions.map((typeDefinition) => [typeDefinition.type, typeDefinition])
);
export function getDailyDataTypeDefinition(dataType: DailyDataType): DailyDataTypeDefinition {
	return definitionLookup.get(dataType)!;
}


export enum DailyDataType {
	AppleHealthDistanceWalkingRunning = "AppleHealthDistanceWalkingRunning",
	AppleHealthFlightsClimbed = "AppleHealthFlightsClimbed",
	AppleHealthHeartRateRange = "AppleHealthHeartRateRange",
	AppleHealthHrv = "AppleHealthHrv",
	AppleHealthMaxHeartRate = "AppleHealthMaxHeartRate",
	AppleHealthRestingHeartRate = "AppleHealthRestingHeartRate",
	AppleHealthSleepMinutes = "AppleHealthSleepMinutes",
	AppleHealthRemSleepMinutes = "AppleHealthSleepRemMinutes",
	AppleHealthDeepSleepMinutes = "AppleHealthSleepDeepMinutes",
	AppleHealthCoreSleepMinutes = "AppleHealthSleepCoreMinutes",
	AppleHealthInBedMinutes = "AppleHealthInBedMinutes",
	AppleHealthStandMinutes = "AppleHealthStandMinutes",
	AppleHealthSteps = "AppleHealthSteps",
	AppleHealthWalkingHeartRateAverage = "AppleHealthWalkingHeartRateAverage",
	AppleHealthActiveEnergyBurned = "AppleHealthActiveEnergyBurned",
	FitbitSedentaryMinutes = "FitbitSedentaryMinutes",
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
	GarminSteps = "GarminSteps",
	GarminDistance = "GarminDistance",
	GarminFloors = "GarminFloors",
	GarminActiveMinutes = "GarminActiveMinutes",
	GarminActiveCalories = "GarminActiveCalories",
	GarminRestingCalories = "GarminRestingCalories",
	GarminTotalCalories = "GarminTotalCalories",
	GarminRestingHeartRate = "GarminRestingHeartRate",
	GarminMinHeartRate = "GarminMinHeartRate",
	GarminMaxHeartRate = "GarminMaxHeartRate",
	GarminAverageHeartRate = "GarminAverageHeartRate",
	GarminMaxStressLevel = "GarminMaxStressLevel",
	GarminAverageStressLevel = "GarminAverageStressLevel",
	GarminTotalStressMinutes = "GarminTotalStressMinutes",
	GarminLowStressMinutes = "GarminLowStressMinutes",
	GarminMediumStressMinutes = "GarminMediumStressMinutes",
	GarminHighStressMinutes = "GarminHighStressMinutes",
	GarminTotalSleepMinutes = "GarminTotalSleepMinutes",
	GarminLightSleepMinutes = "GarminLightSleepMinutes",
	GarminDeepSleepMinutes = "GarminDeepSleepMinutes",
	GarminRemSleepMinutes = "GarminRemSleepMinutes",
	GarminAwakeMinutes = "GarminAwakeMinutes",
	GarminSleepScore = "GarminSleepScore",
	GoogleFitSteps = "GoogleFitSteps",
	Steps = "Steps",
	RestingHeartRate = "RestingHeartRate",
	SleepMinutes = "SleepMinutes",
	HomeAirQuality = "HomeAirQuality",
	WorkAirQuality = "WorkAirQuality"
};

allTypeDefinitions.forEach(function (typeDefinition) {
	registerDailyDataProvider(typeDefinition.type, typeDefinition.dataProvider, typeDefinition.availabilityCheck);
});