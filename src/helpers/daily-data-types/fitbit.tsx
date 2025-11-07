import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { fitbitActiveCaloriesBurnedDataProvider, fitbitBreathingRateDataProvider, fitbitCaloriesBurnedDataProvider, fitbitCardioMinutesDataProvider, fitbitDeepSleepMinutesDataProvider, fitbitElevatedHeartRateMinutesDataProvider, fitbitFairlyActiveMinutesDataProvider, fitbitFatBurnMinutesDataProvider, fitbitFloorsDataProvider, fitbitHrvDataProvider, fitbitLightlyActiveMinutesDataProvider, fitbitLightSleepMinutesDataProvider, fitbitPeakMinutesDataProvider, fitbitRemSleepMinutesDataProvider, fitbitRestingCaloriesBurnedDataProvider, fitbitRestingHeartRateDataProvider, fitbitSedentaryMinutesDataProvider, fitbitSpO2DataProvider, fitbitStepsDataProvider, fitbitTotalActiveMinutesDataProvider, fitbitTotalSleepMinutesDataProvider, fitbitVeryActiveMinutesDataProvider, fitbitWearMinutesDataProvider } from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faClock, faFireFlameCurved, faHeartbeat, faPerson, faPersonRunning, faShoePrints, faStairs, faWind } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter, heartRateFormatter, hrvFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import { simpleAvailabilityCheck } from "./availability-check";
import { formatNumberForLocale } from "../locale";

let fitbitTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.FitbitSedentaryMinutes,
        dataProvider: fitbitSedentaryMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["MinutesSedentary"]),
        labelKey: "sedentary-time",
        icon: <FontAwesomeSvgIcon icon={faPerson} />,
        formatter: minutesFormatter,
        previewDataRange: [200, 300]
    },
    {
        type: DailyDataType.FitbitActiveMinutes,
        dataProvider: fitbitTotalActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["MinutesVeryActive", "MinutesFairlyActive", "MinutesLightlyActive"]),
        labelKey: "active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [50, 200]
    },
    {
        type: DailyDataType.FitbitLightlyActiveMinutes,
        dataProvider: fitbitLightlyActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["MinutesLightlyActive"]),
        labelKey: "lightly-active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.FitbitFairlyActiveMinutes,
        dataProvider: fitbitFairlyActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["MinutesFairlyActive"]),
        labelKey: "fairly-active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.FitbitVeryActiveMinutes,
        dataProvider: fitbitVeryActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["MinutesVeryActive"]),
        labelKey: "very-active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.FitbitBreathingRate,
        dataProvider: fitbitBreathingRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["BreathingRate"]),
        labelKey: "breathing-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: defaultFormatter,
        previewDataRange: [13, 18]
    },
    {
        type: DailyDataType.FitbitCaloriesBurned,
        dataProvider: fitbitCaloriesBurnedDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["Calories"]),
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
        dataProvider: fitbitActiveCaloriesBurnedDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["Calories", "CaloriesBMR"], { requireAllTypes: true }),
        labelKey: "active-calories-burned",
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [300, 500]
    },
    {
        type: DailyDataType.FitbitElevatedHeartRateMinutes,
        dataProvider: fitbitElevatedHeartRateMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]),
        labelKey: "elevated-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 120]
    },
    {
        type: DailyDataType.FitbitFatBurnHeartRateMinutes,
        dataProvider: fitbitFatBurnMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]),
        labelKey: "fat-burn-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.FitbitCardioHeartRateMinutes,
        dataProvider: fitbitCardioMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]),
        labelKey: "cardio-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.FitbitPeakHeartRateMinutes,
        dataProvider: fitbitPeakMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]),
        labelKey: "peak-heart-rate-time",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.FitbitFloors,
        dataProvider: fitbitFloorsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["Floors"]),
        labelKey: "floors-climbed",
        icon: <FontAwesomeSvgIcon icon={faStairs} />,
        formatter: defaultFormatter,
        previewDataRange: [2, 8]
    },
    {
        type: DailyDataType.FitbitHrv,
        dataProvider: fitbitHrvDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["HeartRateVariability"]),
        labelKey: "heart-rate-variability",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: hrvFormatter,
        previewDataRange: [55, 85]
    },
    {
        type: DailyDataType.FitbitRestingHeartRate,
        dataProvider: fitbitRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["RestingHeartRate"]),
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70]
    },
    {
        type: DailyDataType.FitbitSleepMinutes,
        dataProvider: fitbitTotalSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"]),
        labelKey: "sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [400, 540]
    },
    {
        type: DailyDataType.FitbitLightSleepMinutes,
        dataProvider: fitbitLightSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["SleepLevelLight"]),
        labelKey: "light-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.FitbitRemSleepMinutes,
        dataProvider: fitbitRemSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["SleepLevelRem"]),
        labelKey: "rem-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.FitbitDeepSleepMinutes,
        dataProvider: fitbitDeepSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["SleepLevelDeep"]),
        labelKey: "deep-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.FitbitSpO2,
        dataProvider: fitbitSpO2DataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["SpO2"]),
        labelKey: "spo2",
        icon: <FontAwesomeSvgIcon icon={faWind} />,
        formatter: (value: number) => formatNumberForLocale(value) + " %",
        previewDataRange: [95, 100]
    },
    {
        type: DailyDataType.FitbitSteps,
        dataProvider: fitbitStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["Steps"]),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faShoePrints} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        type: DailyDataType.FitbitWearMinutes,
        dataProvider: fitbitWearMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["HeartRateIntradayCount"]),
        labelKey: "fitbit-wear-time",
        icon: <FontAwesomeSvgIcon icon={faClock} />,
        formatter: defaultFormatter,
        previewDataRange: [300, 700]
    }
];
fitbitTypeDefinitions.forEach((def) => {
    def.dataSource = "Fitbit";
});
export default fitbitTypeDefinitions;