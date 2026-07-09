import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { fitbitActiveCaloriesBurnedDataProvider, fitbitBreathingRateDataProvider, fitbitCaloriesBurnedDataProvider, fitbitCardioMinutesDataProvider, fitbitDeepSleepMinutesDataProvider, fitbitElevatedHeartRateMinutesDataProvider, fitbitFairlyActiveMinutesDataProvider, fitbitFatBurnMinutesDataProvider, fitbitFloorsDataProvider, fitbitHrvDataProvider, fitbitLightlyActiveMinutesDataProvider, fitbitLightSleepMinutesDataProvider, fitbitPeakMinutesDataProvider, fitbitRemSleepMinutesDataProvider, fitbitRestingCaloriesBurnedDataProvider, fitbitRestingHeartRateDataProvider, fitbitSedentaryMinutesDataProvider, fitbitSpO2DataProvider, fitbitStepsDataProvider, fitbitTotalActiveMinutesDataProvider, fitbitTotalSleepMinutesDataProvider, fitbitVeryActiveMinutesDataProvider, fitbitWearMinutesDataProvider, googleHealthActiveCaloriesBurnedDataProvider, googleHealthBreathingRateDataProvider, googleHealthCaloriesBurnedDataProvider, googleHealthCardioMinutesDataProvider, googleHealthDeepSleepMinutesDataProvider, googleHealthElevatedHeartRateMinutesDataProvider, googleHealthFairlyActiveMinutesDataProvider, googleHealthFatBurnMinutesDataProvider, googleHealthFloorsDataProvider, googleHealthHrvDataProvider, googleHealthLightlyActiveMinutesDataProvider, googleHealthLightSleepMinutesDataProvider, googleHealthPeakMinutesDataProvider, googleHealthRemSleepMinutesDataProvider, googleHealthRestingHeartRateDataProvider, googleHealthSedentaryMinutesDataProvider, googleHealthSpO2DataProvider, googleHealthStepsDataProvider, googleHealthTotalActiveMinutesDataProvider, googleHealthTotalSleepMinutesDataProvider, googleHealthVeryActiveMinutesDataProvider, googleHealthWearMinutesDataProvider, fitbitWithGoogleHealthFallback } from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faClock, faFireFlameCurved, faHeartbeat, faPerson, faPersonRunning, faShoePrints, faStairs, faWind } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter, heartRateFormatter, hrvFormatter, minutesFormatter, minutesToHoursYAxisConverter } from "./formatters";
import { AvailabilityCheckOptions, combinedAvailabilityCheck, simpleAvailabilityCheck, sources } from "./availability-check";
import { formatNumberForLocale } from "../locale";
import { DailyDataProvider } from "../query-daily-data";

// Prefer the Fitbit value, but fall back to the equivalent Google Health data per day when
// Fitbit reports nothing. Keeps existing Fitbit-configured graphs working as Fitbit is
// retired in favor of Google Health (a separate back-end that participants connect to
// during the transition). The type's enum key is unchanged, so stored configs still resolve.
function withGoogleHealthFallback(
    fitbitTypes: string | string[],
    fitbitProvider: DailyDataProvider,
    googleHealthProvider: DailyDataProvider,
    googleHealthTypes: string | string[],
    fitbitOptions?: AvailabilityCheckOptions
): Pick<DailyDataTypeDefinition, "dataProvider" | "availabilityCheck"> {
    return {
        dataProvider: fitbitWithGoogleHealthFallback(fitbitProvider, googleHealthProvider, googleHealthTypes),
        availabilityCheck: combinedAvailabilityCheck(sources(["Fitbit", fitbitTypes, fitbitOptions], ["GoogleHealth", googleHealthTypes]))
    };
}

let fitbitTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.FitbitSedentaryMinutes,
        ...withGoogleHealthFallback(["MinutesSedentary"], fitbitSedentaryMinutesDataProvider, googleHealthSedentaryMinutesDataProvider, "sedentaryPeriod-daily"),
        labelKey: "sedentary-time",
        icon: <FontAwesomeSvgIcon icon={faPerson} />,
        formatter: minutesFormatter,
        previewDataRange: [200, 300]
    },
    {
        type: DailyDataType.FitbitActiveMinutes,
        ...withGoogleHealthFallback(["MinutesVeryActive", "MinutesFairlyActive", "MinutesLightlyActive"], fitbitTotalActiveMinutesDataProvider, googleHealthTotalActiveMinutesDataProvider, ["activeMinutes-daily-light", "activeMinutes-daily-moderate", "activeMinutes-daily-vigorous"]),
        labelKey: "active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [50, 200]
    },
    {
        type: DailyDataType.FitbitLightlyActiveMinutes,
        ...withGoogleHealthFallback(["MinutesLightlyActive"], fitbitLightlyActiveMinutesDataProvider, googleHealthLightlyActiveMinutesDataProvider, "activeMinutes-daily-light"),
        labelKey: "lightly-active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.FitbitFairlyActiveMinutes,
        ...withGoogleHealthFallback(["MinutesFairlyActive"], fitbitFairlyActiveMinutesDataProvider, googleHealthFairlyActiveMinutesDataProvider, "activeMinutes-daily-moderate"),
        labelKey: "fairly-active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.FitbitVeryActiveMinutes,
        ...withGoogleHealthFallback(["MinutesVeryActive"], fitbitVeryActiveMinutesDataProvider, googleHealthVeryActiveMinutesDataProvider, "activeMinutes-daily-vigorous"),
        labelKey: "very-active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.FitbitBreathingRate,
        ...withGoogleHealthFallback(["BreathingRate"], fitbitBreathingRateDataProvider, googleHealthBreathingRateDataProvider, "dailyRespiratoryRate-list-breathsPerMinute"),
        labelKey: "breathing-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: defaultFormatter,
        previewDataRange: [13, 18]
    },
    {
        type: DailyDataType.FitbitCaloriesBurned,
        ...withGoogleHealthFallback(["Calories"], fitbitCaloriesBurnedDataProvider, googleHealthCaloriesBurnedDataProvider, "totalCalories-daily"),
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
        ...withGoogleHealthFallback(["Calories", "CaloriesBMR"], fitbitActiveCaloriesBurnedDataProvider, googleHealthActiveCaloriesBurnedDataProvider, "activeEnergyBurned-daily", { requireAllTypes: true }),
        labelKey: "active-calories-burned",
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [300, 500]
    },
    {
        type: DailyDataType.FitbitElevatedHeartRateMinutes,
        ...withGoogleHealthFallback(["HeartRateZone"], fitbitElevatedHeartRateMinutesDataProvider, googleHealthElevatedHeartRateMinutesDataProvider, ["activeZoneMinutes-daily-fat-burn", "activeZoneMinutes-daily-cardio", "activeZoneMinutes-daily-peak"]),
        labelKey: "elevated-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 120]
    },
    {
        type: DailyDataType.FitbitFatBurnHeartRateMinutes,
        ...withGoogleHealthFallback(["HeartRateZone"], fitbitFatBurnMinutesDataProvider, googleHealthFatBurnMinutesDataProvider, "activeZoneMinutes-daily-fat-burn"),
        labelKey: "fat-burn-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.FitbitCardioHeartRateMinutes,
        ...withGoogleHealthFallback(["HeartRateZone"], fitbitCardioMinutesDataProvider, googleHealthCardioMinutesDataProvider, "activeZoneMinutes-daily-cardio"),
        labelKey: "cardio-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.FitbitPeakHeartRateMinutes,
        ...withGoogleHealthFallback(["HeartRateZone"], fitbitPeakMinutesDataProvider, googleHealthPeakMinutesDataProvider, "activeZoneMinutes-daily-peak"),
        labelKey: "peak-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.FitbitFloors,
        ...withGoogleHealthFallback(["Floors"], fitbitFloorsDataProvider, googleHealthFloorsDataProvider, "floors-daily"),
        labelKey: "floors-climbed",
        icon: <FontAwesomeSvgIcon icon={faStairs} />,
        formatter: defaultFormatter,
        previewDataRange: [2, 8]
    },
    {
        type: DailyDataType.FitbitHrv,
        ...withGoogleHealthFallback(["HeartRateVariability"], fitbitHrvDataProvider, googleHealthHrvDataProvider, "dailyHeartRateVariability-list-averageRmssd"),
        labelKey: "heart-rate-variability",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: hrvFormatter,
        previewDataRange: [55, 85]
    },
    {
        type: DailyDataType.FitbitRestingHeartRate,
        ...withGoogleHealthFallback(["RestingHeartRate"], fitbitRestingHeartRateDataProvider, googleHealthRestingHeartRateDataProvider, "dailyRestingHeartRate-list-beatsPerMinute"),
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70]
    },
    {
        type: DailyDataType.FitbitSleepMinutes,
        ...withGoogleHealthFallback(["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"], fitbitTotalSleepMinutesDataProvider, googleHealthTotalSleepMinutesDataProvider, "sleep-list-session-asleep"),
        labelKey: "sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [400, 540]
    },
    {
        type: DailyDataType.FitbitLightSleepMinutes,
        ...withGoogleHealthFallback(["SleepLevelLight"], fitbitLightSleepMinutesDataProvider, googleHealthLightSleepMinutesDataProvider, "sleep-list-stages-summary-light-minutes"),
        labelKey: "light-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.FitbitRemSleepMinutes,
        ...withGoogleHealthFallback(["SleepLevelRem"], fitbitRemSleepMinutesDataProvider, googleHealthRemSleepMinutesDataProvider, "sleep-list-stages-summary-rem-minutes"),
        labelKey: "rem-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.FitbitDeepSleepMinutes,
        ...withGoogleHealthFallback(["SleepLevelDeep"], fitbitDeepSleepMinutesDataProvider, googleHealthDeepSleepMinutesDataProvider, "sleep-list-stages-summary-deep-minutes"),
        labelKey: "deep-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: minutesToHoursYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.FitbitSpO2,
        ...withGoogleHealthFallback(["SpO2"], fitbitSpO2DataProvider, googleHealthSpO2DataProvider, "dailyOxygenSaturation-list-avg"),
        labelKey: "spo2",
        icon: <FontAwesomeSvgIcon icon={faWind} />,
        formatter: (value: number) => formatNumberForLocale(value) + " %",
        previewDataRange: [95, 100]
    },
    {
        type: DailyDataType.FitbitSteps,
        ...withGoogleHealthFallback(["Steps"], fitbitStepsDataProvider, googleHealthStepsDataProvider, "steps-daily"),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faShoePrints} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        type: DailyDataType.FitbitWearMinutes,
        ...withGoogleHealthFallback(["HeartRateIntradayCount"], fitbitWearMinutesDataProvider, googleHealthWearMinutesDataProvider, "wearTime-daily"),
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
