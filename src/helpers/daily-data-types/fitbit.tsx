import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { fitbitActiveCaloriesBurnedDataProvider, fitbitBreathingRateDataProvider, fitbitCaloriesBurnedDataProvider, fitbitCardioMinutesDataProvider, fitbitDeepSleepMinutesDataProvider, fitbitElevatedHeartRateMinutesDataProvider, fitbitFairlyActiveMinutesDataProvider, fitbitFatBurnMinutesDataProvider, fitbitFloorsDataProvider, fitbitHrvDataProvider, fitbitLightlyActiveMinutesDataProvider, fitbitLightSleepMinutesDataProvider, fitbitPeakMinutesDataProvider, fitbitRemSleepMinutesDataProvider, fitbitRestingCaloriesBurnedDataProvider, fitbitRestingHeartRateDataProvider, fitbitSedentaryMinutesDataProvider, fitbitSpO2DataProvider, fitbitStepsDataProvider, fitbitTotalActiveMinutesDataProvider, fitbitTotalSleepMinutesDataProvider, fitbitVeryActiveMinutesDataProvider, fitbitWearMinutesDataProvider, googleHealthActiveCaloriesBurnedDataProvider, googleHealthBreathingRateDataProvider, googleHealthCaloriesBurnedDataProvider, googleHealthCardioMinutesDataProvider, googleHealthDeepSleepMinutesDataProvider, googleHealthElevatedHeartRateMinutesDataProvider, googleHealthFairlyActiveMinutesDataProvider, googleHealthFatBurnMinutesDataProvider, googleHealthFloorsDataProvider, googleHealthHrvDataProvider, googleHealthLightlyActiveMinutesDataProvider, googleHealthLightSleepMinutesDataProvider, googleHealthPeakMinutesDataProvider, googleHealthRemSleepMinutesDataProvider, googleHealthRestingHeartRateDataProvider, googleHealthSedentaryMinutesDataProvider, googleHealthSpO2DataProvider, googleHealthStepsDataProvider, googleHealthTotalActiveMinutesDataProvider, googleHealthTotalSleepMinutesDataProvider, googleHealthVeryActiveMinutesDataProvider, googleHealthWearMinutesDataProvider, googleHealthPreferredOverFitbit } from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faClock, faFireFlameCurved, faHeartbeat, faPerson, faPersonRunning, faShoePrints, faStairs, faWind } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter, heartRateFormatter, hrvFormatter, minutesFormatter, minutesToHoursYAxisConverter } from "./formatters";
import { combinedAvailabilityCheck, simpleAvailabilityCheck, sources } from "./availability-check";
import { formatNumberForLocale } from "../locale";

// Fitbit types prefer the equivalent Google Health value, falling back to Fitbit per day
// when Google Health reports nothing (via googleHealthPreferredOverFitbit + a combined
// availability check). This keeps existing Fitbit-configured graphs working while Google
// Health becomes the source of truth as Fitbit is retired; the enum keys are unchanged, so
// stored configs still resolve.
let fitbitTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.FitbitSedentaryMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitSedentaryMinutesDataProvider, googleHealthSedentaryMinutesDataProvider, "sedentaryPeriod-daily"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "MinutesSedentary"], ["GoogleHealth", "sedentaryPeriod-daily"])),
        labelKey: "sedentary-time",
        icon: <FontAwesomeSvgIcon icon={faPerson} />,
        formatter: minutesFormatter,
        previewDataRange: [200, 300]
    },
    {
        type: DailyDataType.FitbitActiveMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitTotalActiveMinutesDataProvider, googleHealthTotalActiveMinutesDataProvider, ["activeMinutes-daily-light", "activeMinutes-daily-moderate", "activeMinutes-daily-vigorous"]),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", ["MinutesVeryActive", "MinutesFairlyActive", "MinutesLightlyActive"]], ["GoogleHealth", ["activeMinutes-daily-light", "activeMinutes-daily-moderate", "activeMinutes-daily-vigorous"]])),
        labelKey: "active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [50, 200]
    },
    {
        type: DailyDataType.FitbitLightlyActiveMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitLightlyActiveMinutesDataProvider, googleHealthLightlyActiveMinutesDataProvider, "activeMinutes-daily-light"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "MinutesLightlyActive"], ["GoogleHealth", "activeMinutes-daily-light"])),
        labelKey: "lightly-active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.FitbitFairlyActiveMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitFairlyActiveMinutesDataProvider, googleHealthFairlyActiveMinutesDataProvider, "activeMinutes-daily-moderate"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "MinutesFairlyActive"], ["GoogleHealth", "activeMinutes-daily-moderate"])),
        labelKey: "fairly-active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.FitbitVeryActiveMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitVeryActiveMinutesDataProvider, googleHealthVeryActiveMinutesDataProvider, "activeMinutes-daily-vigorous"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "MinutesVeryActive"], ["GoogleHealth", "activeMinutes-daily-vigorous"])),
        labelKey: "very-active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.FitbitBreathingRate,
        dataProvider: googleHealthPreferredOverFitbit(fitbitBreathingRateDataProvider, googleHealthBreathingRateDataProvider, "dailyRespiratoryRate-list-breathsPerMinute"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "BreathingRate"], ["GoogleHealth", "dailyRespiratoryRate-list-breathsPerMinute"])),
        labelKey: "breathing-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: defaultFormatter,
        previewDataRange: [13, 18]
    },
    {
        type: DailyDataType.FitbitCaloriesBurned,
        dataProvider: googleHealthPreferredOverFitbit(fitbitCaloriesBurnedDataProvider, googleHealthCaloriesBurnedDataProvider, "totalCalories-daily"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "Calories"], ["GoogleHealth", "totalCalories-daily"])),
        labelKey: "calories-burned",
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [1800, 2200]
    },
    {
        type: DailyDataType.FitbitRestingCaloriesBurned,
        dataProvider: fitbitRestingCaloriesBurnedDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["CaloriesBMR"]),
        labelKey: "resting-calories-burned",
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [1500, 1700]
    },
    {
        type: DailyDataType.FitbitActiveCaloriesBurned,
        dataProvider: googleHealthPreferredOverFitbit(fitbitActiveCaloriesBurnedDataProvider, googleHealthActiveCaloriesBurnedDataProvider, "activeEnergyBurned-daily"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", ["Calories", "CaloriesBMR"], { requireAllTypes: true }], ["GoogleHealth", "activeEnergyBurned-daily"])),
        labelKey: "active-calories-burned",
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [300, 500]
    },
    {
        type: DailyDataType.FitbitElevatedHeartRateMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitElevatedHeartRateMinutesDataProvider, googleHealthElevatedHeartRateMinutesDataProvider, ["activeZoneMinutes-daily-fat-burn", "activeZoneMinutes-daily-cardio", "activeZoneMinutes-daily-peak"]),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "HeartRateZone"], ["GoogleHealth", ["activeZoneMinutes-daily-fat-burn", "activeZoneMinutes-daily-cardio", "activeZoneMinutes-daily-peak"]])),
        labelKey: "elevated-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 120]
    },
    {
        type: DailyDataType.FitbitFatBurnHeartRateMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitFatBurnMinutesDataProvider, googleHealthFatBurnMinutesDataProvider, "activeZoneMinutes-daily-fat-burn"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "HeartRateZone"], ["GoogleHealth", "activeZoneMinutes-daily-fat-burn"])),
        labelKey: "fat-burn-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.FitbitCardioHeartRateMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitCardioMinutesDataProvider, googleHealthCardioMinutesDataProvider, "activeZoneMinutes-daily-cardio"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "HeartRateZone"], ["GoogleHealth", "activeZoneMinutes-daily-cardio"])),
        labelKey: "cardio-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.FitbitPeakHeartRateMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitPeakMinutesDataProvider, googleHealthPeakMinutesDataProvider, "activeZoneMinutes-daily-peak"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "HeartRateZone"], ["GoogleHealth", "activeZoneMinutes-daily-peak"])),
        labelKey: "peak-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.FitbitFloors,
        dataProvider: googleHealthPreferredOverFitbit(fitbitFloorsDataProvider, googleHealthFloorsDataProvider, "floors-daily"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "Floors"], ["GoogleHealth", "floors-daily"])),
        labelKey: "floors-climbed",
        icon: <FontAwesomeSvgIcon icon={faStairs} />,
        formatter: defaultFormatter,
        previewDataRange: [2, 8]
    },
    {
        type: DailyDataType.FitbitHrv,
        dataProvider: googleHealthPreferredOverFitbit(fitbitHrvDataProvider, googleHealthHrvDataProvider, "dailyHeartRateVariability-list-averageRmssd"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "HeartRateVariability"], ["GoogleHealth", "dailyHeartRateVariability-list-averageRmssd"])),
        labelKey: "heart-rate-variability",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: hrvFormatter,
        previewDataRange: [55, 85]
    },
    {
        type: DailyDataType.FitbitRestingHeartRate,
        dataProvider: googleHealthPreferredOverFitbit(fitbitRestingHeartRateDataProvider, googleHealthRestingHeartRateDataProvider, "dailyRestingHeartRate-list-beatsPerMinute"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "RestingHeartRate"], ["GoogleHealth", "dailyRestingHeartRate-list-beatsPerMinute"])),
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70]
    },
    {
        type: DailyDataType.FitbitSleepMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitTotalSleepMinutesDataProvider, googleHealthTotalSleepMinutesDataProvider, "sleep-list-session-asleep"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"]], ["GoogleHealth", "sleep-list-session-asleep"])),
        labelKey: "sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [400, 540]
    },
    {
        type: DailyDataType.FitbitLightSleepMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitLightSleepMinutesDataProvider, googleHealthLightSleepMinutesDataProvider, "sleep-list-stages-summary-light-minutes"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "SleepLevelLight"], ["GoogleHealth", "sleep-list-stages-summary-light-minutes"])),
        labelKey: "light-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.FitbitRemSleepMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitRemSleepMinutesDataProvider, googleHealthRemSleepMinutesDataProvider, "sleep-list-stages-summary-rem-minutes"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "SleepLevelRem"], ["GoogleHealth", "sleep-list-stages-summary-rem-minutes"])),
        labelKey: "rem-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.FitbitDeepSleepMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitDeepSleepMinutesDataProvider, googleHealthDeepSleepMinutesDataProvider, "sleep-list-stages-summary-deep-minutes"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "SleepLevelDeep"], ["GoogleHealth", "sleep-list-stages-summary-deep-minutes"])),
        labelKey: "deep-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.FitbitSpO2,
        dataProvider: googleHealthPreferredOverFitbit(fitbitSpO2DataProvider, googleHealthSpO2DataProvider, "dailyOxygenSaturation-list-avg"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "SpO2"], ["GoogleHealth", "dailyOxygenSaturation-list-avg"])),
        labelKey: "spo2",
        icon: <FontAwesomeSvgIcon icon={faWind} />,
        formatter: (value: number) => formatNumberForLocale(value) + " %",
        previewDataRange: [95, 100]
    },
    {
        type: DailyDataType.FitbitSteps,
        dataProvider: googleHealthPreferredOverFitbit(fitbitStepsDataProvider, googleHealthStepsDataProvider, "steps-daily"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "Steps"], ["GoogleHealth", "steps-daily"])),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faShoePrints} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        type: DailyDataType.FitbitWearMinutes,
        dataProvider: googleHealthPreferredOverFitbit(fitbitWearMinutesDataProvider, googleHealthWearMinutesDataProvider, "wearTime-daily"),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", "HeartRateIntradayCount"], ["GoogleHealth", "wearTime-daily"])),
        labelKey: "fitbit-wear-time",
        icon: <FontAwesomeSvgIcon icon={faClock} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [300, 700]
    }
];
fitbitTypeDefinitions.forEach((def) => {
    def.dataSource = "Fitbit";
});
export default fitbitTypeDefinitions;
