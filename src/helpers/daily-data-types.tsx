import { ReactElement } from "react";
import { DailyDataAvailabilityCheck, DailyDataProvider } from "./query-daily-data";

export enum DailyDataType {
	AppleHealthDistanceWalkingRunning = "AppleHealthDistanceWalkingRunning",
	AppleHealthFlightsClimbed = "AppleHealthFlightsClimbed",
	AppleHealthHeartRateRange = "AppleHealthHeartRateRange",
	AppleHealthHrv = "AppleHealthHrv",
	AppleHealthMaxHeartRate = "AppleHealthMaxHeartRate",
	AppleHealthMindfulMinutes = "AppleHealthMindfulMinutes",
	AppleHealthRestingHeartRate = "AppleHealthRestingHeartRate",
	AppleHealthSleepMinutes = "AppleHealthSleepMinutes",
	AppleHealthRemSleepMinutes = "AppleHealthSleepRemMinutes",
	AppleHealthDeepSleepMinutes = "AppleHealthSleepDeepMinutes",
	AppleHealthCoreSleepMinutes = "AppleHealthSleepCoreMinutes",
	AppleHealthInBedMinutes = "AppleHealthInBedMinutes",
	AppleHealthStandMinutes = "AppleHealthStandMinutes",
	AppleHealthSteps = "AppleHealthSteps",
	AppleHealthStepsWhileWearingDevice = "AppleHealthStepsWhileWearingDevice",
	AppleHealthTherapyMinutes = "AppleHealthTherapyMinutes",
	AppleHealthWalkingHeartRateAverage = "AppleHealthWalkingHeartRateAverage",
	AppleHealthActiveEnergyBurned = "AppleHealthActiveEnergyBurned",
	AppleHealthNumberOfAlcoholicBeverages = "AppleHealthNumberOfAlcoholicBeverages",
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
	FitbitWearMinutes = "FitbitWearMinutes",
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
	GoogleFitMindfulMinutes = "GoogleFitMindfulMinutes",
	GoogleFitSteps = "GoogleFitSteps",
	GoogleFitTherapyMinutes = "GoogleFitTherapyMinutes",
	Steps = "Steps",
	StepsWithGoogleFit = "StepsWithGoogleFit",
	RestingHeartRate = "RestingHeartRate",
	SleepMinutes = "SleepMinutes",
	MindfulMinutes = "MindfulMinutes",
	TherapyMinutes = "TherapyMinutes",
	AirQuality = "AirQuality",
	HomeAirQuality = "HomeAirQuality",
	WorkAirQuality = "WorkAirQuality",
	HealthConnectRestingHeartRate = "HealthConnectRestingHeartRate",
	HealthConnectTotalSleepMinutes = "HealthConnectTotalSleepMinutes",
	HealthConnectLightSleepMinutes = "HealthConnectLightSleepMinutes",
	HealthConnectRemSleepMinutes = "HealthConnectRemSleepMinutes",
	HealthConnectDeepSleepMinutes = "HealthConnectDeepSleepMinutes",
	HealthConnectSteps = "HealthConnectSteps",
	HealthConnectDistance = "HealthConnectDistance",
	HealthConnectMaxHeartRate = "HealthConnectMaxHeartRate",
	HealthConnectMinHeartRate = "HealthConnectMinHeartRate",
	HealthConnectActiveCaloriesBurned = "HealthConnectActiveCaloriesBurned",
	HealthConnectTotalCaloriesBurned = "HealthConnectTotalCaloriesBurned",
	OuraSteps = "OuraSteps",
	OuraRestingHeartRate = "OuraRestingHeartRate",
	OuraSleepMinutes = "OuraSleepMinutes"
};

export interface DailyDataTypeDefinition {
	dataSource?: "Unified" | "AppleHealth" | "Garmin" | "Fitbit" | "GoogleFit" | "AirQuality" | "Oura" | "HealthConnect";
	type: string;
	dataProvider: DailyDataProvider;
	availabilityCheck: DailyDataAvailabilityCheck;
	labelKey?: string;
	icon: ReactElement;
	formatter: (value: number) => string;
	yAxisConverter?: (value: number) => number;
	previewDataRange: [number, number];
	requiresV2Api?: boolean;
}