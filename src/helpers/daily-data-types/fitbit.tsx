import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { fitbitBreathingRateDataProvider, fitbitCaloriesBurnedDataProvider, fitbitCardioMinutesDataProvider, fitbitDeepSleepMinutesDataProvider, fitbitElevatedHeartRateMinutesDataProvider, fitbitFairlyActiveMinutesDataProvider, fitbitFatBurnMinutesDataProvider, fitbitFloorsDataProvider, fitbitHrvDataProvider, fitbitLightSleepMinutesDataProvider, fitbitLightlyActiveMinutesDataProvider, fitbitPeakMinutesDataProvider, fitbitRemSleepMinutesDataProvider, fitbitRestingHeartRateDataProvider, fitbitSedentaryMinutesDataProvider, fitbitSpO2DataProvider, fitbitStepsDataProvider, fitbitTotalActiveMinutesDataProvider, fitbitTotalSleepMinutesDataProvider, fitbitVeryActiveMinutesDataProvider } from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faHeartbeat, faPerson, faPersonRunning, faRoute, faStairs, faWind } from "@fortawesome/free-solid-svg-icons";
import language from "../language";
import React from "react";
import { defaultFormatter, heartRateFormatter, hrvFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import { simpleAvailabilityCheck } from "./availability-check";

let fitbitTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.FitbitSedentaryMinutes,
        dataProvider: fitbitSedentaryMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["MinutesSedentary"]),
        getLabel: () => language("sedentary-time"),
        icon: <FontAwesomeSvgIcon icon={faPerson} />,
        formatter: minutesFormatter,
        previewDataRange: [200, 300]
    },
    {
        type: DailyDataType.FitbitActiveMinutes,
        dataProvider: fitbitTotalActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["MinutesVeryActive", "MinutesFairlyActive", "MinutesLightlyActive"]),
        getLabel: () => language("active-time"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [50, 200]
    },
    {
        type: DailyDataType.FitbitLightlyActiveMinutes,
        dataProvider: fitbitLightlyActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["MinutesLightlyActive"]),
        getLabel: () => language("lightly-active-time"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.FitbitFairlyActiveMinutes,
        dataProvider: fitbitFairlyActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["MinutesFairlyActive"]),
        getLabel: () => language("fairly-active-time"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.FitbitVeryActiveMinutes,
        dataProvider: fitbitVeryActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["MinutesVeryActive"]),
        getLabel: () => language("very-active-time"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [25, 100]
    },
    {
        type: DailyDataType.FitbitBreathingRate,
        dataProvider: fitbitBreathingRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["BreathingRate"]),
        getLabel: () => language("breathing-rate"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: defaultFormatter,
        previewDataRange: [13, 18]
    },
    {
        type: DailyDataType.FitbitCaloriesBurned,
        dataProvider: fitbitCaloriesBurnedDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["Calories"]),
        getLabel: () => language("calories-burned"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [1800, 2200]
    },
    {
        type: DailyDataType.FitbitElevatedHeartRateMinutes,
        dataProvider: fitbitElevatedHeartRateMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]),
        getLabel: () => language("elevated-heart-rate-time"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 120]
    },
    {
        type: DailyDataType.FitbitFatBurnHeartRateMinutes,
        dataProvider: fitbitFatBurnMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]),
        getLabel: () => language("fat-burn-heart-rate-time"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.FitbitCardioHeartRateMinutes,
        dataProvider: fitbitCardioMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]),
        getLabel: () => language("cardio-heart-rate-time"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.FitbitPeakHeartRateMinutes,
        dataProvider: fitbitPeakMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["HeartRateZone"]),
        getLabel: () => language("peak-heart-rate-time"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: minutesFormatter,
        previewDataRange: [0, 60]
    },
    {
        type: DailyDataType.FitbitFloors,
        dataProvider: fitbitFloorsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["Floors"]),
        getLabel: () => language("floors-climbed"),
        icon: <FontAwesomeSvgIcon icon={faStairs} />,
        formatter: defaultFormatter,
        previewDataRange: [2, 8]
    },
    {
        type: DailyDataType.FitbitHrv,
        dataProvider: fitbitHrvDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["HeartRateVariability"]),
        getLabel: () => language("heart-rate-variability"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: hrvFormatter,
        previewDataRange: [55, 85]
    },
    {
        type: DailyDataType.FitbitRestingHeartRate,
        dataProvider: fitbitRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["RestingHeartRate"]),
        getLabel: () => language("resting-heart-rate"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70]
    },
    {
        type: DailyDataType.FitbitSleepMinutes,
        dataProvider: fitbitTotalSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"]),
        getLabel: () => language("sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [400, 540]
    },
    {
        type: DailyDataType.FitbitLightSleepMinutes,
        dataProvider: fitbitLightSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["SleepLevelLight"]),
        getLabel: () => language("light-sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.FitbitRemSleepMinutes,
        dataProvider: fitbitRemSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["SleepLevelRem"]),
        getLabel: () => language("rem-sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.FitbitDeepSleepMinutes,
        dataProvider: fitbitDeepSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["SleepLevelDeep"]),
        getLabel: () => language("deep-sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.FitbitSpO2,
        dataProvider: fitbitSpO2DataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["SpO2"]),
        getLabel: () => language("spo2"),
        icon: <FontAwesomeSvgIcon icon={faWind} />,
        formatter: (value: number) => Number(value.toFixed(0)) + " %",
        previewDataRange: [95, 100]
    },
    {
        type: DailyDataType.FitbitSteps,
        dataProvider: fitbitStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Fitbit", ["Steps"]),
        getLabel: () => language("steps"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    }
];
fitbitTypeDefinitions.forEach((def) => {
    def.dataSource = "Fitbit";
});
export default fitbitTypeDefinitions;