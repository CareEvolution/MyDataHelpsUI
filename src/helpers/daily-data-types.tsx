import { ReactElement } from "react";
import { DailyDataAvailabilityCheck, DailyDataProvider } from "./query-daily-data";

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
	GoogleFitSteps = "GoogleFitSteps",
	Steps = "Steps",
	RestingHeartRate = "RestingHeartRate",
	SleepMinutes = "SleepMinutes",
	HomeAirQuality = "HomeAirQuality",
	WorkAirQuality = "WorkAirQuality"
};

export interface DailyDataTypeDefinition {
	dataSource?: "Unified" | "AppleHealth" | "Garmin" | "Fitbit" | "GoogleFit" | "AirQuality";
	type: string;
	dataProvider: DailyDataProvider;
	availabilityCheck: DailyDataAvailabilityCheck;
	labelKey?: string;
	icon: ReactElement;
	formatter: (value: number) => string;
	yAxisConverter?: (value: number) => number;
	previewDataRange: [number, number];
}