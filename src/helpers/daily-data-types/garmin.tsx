import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { garminActiveCaloriesDataProvider, garminActiveMinutesDataProvider, garminAverageHeartRateDataProvider, garminAverageStressLevelDataProvider, garminAwakeMinutesDataProvider, garminDeepSleepMinutesDataProvider, garminDistanceDataProvider, garminFloorsDataProvider, garminHighStressMinutesDataProvider, garminLightSleepMinutesDataProvider, garminLowStressMinutesDataProvider, garminMaxHeartRateDataProvider, garminMaxStressLevelDataProvider, garminMediumStressMinutesDataProvider, garminMinHeartRateDataProvider, garminRemSleepMinutesDataProvider, garminRestingCaloriesDataProvider, garminRestingHeartRateDataProvider, garminSleepScoreDataProvider, garminStepsDataProvider, garminTotalCaloriesDataProvider, garminTotalSleepMinutesDataProvider, garminTotalStressMinutesDataProvider } from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faBoltLightning, faFireFlameCurved, faHeartbeat, faPersonRunning, faRoute, faShoePrints, faStairs } from "@fortawesome/free-solid-svg-icons";
import { formatNumberForLocale } from "../locale";
import React from "react";
import { defaultFormatter, heartRateFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import { simpleAvailabilityCheck } from "./availability-check";

let garminTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.GarminSteps,
        dataProvider: garminStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faShoePrints} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        type: DailyDataType.GarminDistance,
        dataProvider: garminDistanceDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "distance-traveled",
        icon: <FontAwesomeSvgIcon icon={faRoute} />,
        formatter: (value: number) => formatNumberForLocale(value / 1000, 2) + " km",
        yAxisConverter: (value: number) => value / 1000,
        previewDataRange: [3000, 5000]
    },
    {
        type: DailyDataType.GarminFloors,
        dataProvider: garminFloorsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "floors-climbed",
        icon: <FontAwesomeSvgIcon icon={faStairs} />,
        formatter: defaultFormatter,
        previewDataRange: [2, 6]
    },
    {
        type: DailyDataType.GarminActiveMinutes,
        dataProvider: garminActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "active-time",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter,
        previewDataRange: [50, 200]
    },
    {
        type: DailyDataType.GarminActiveCalories,
        dataProvider: garminActiveCaloriesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "active-calories",
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [200, 500]
    },
    {
        type: DailyDataType.GarminRestingCalories,
        dataProvider: garminRestingCaloriesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "resting-calories",
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [1200, 2000]
    },
    {
        type: DailyDataType.GarminTotalCalories,
        dataProvider: garminTotalCaloriesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "total-calories",
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [2000, 3000]
    },
    {
        type: DailyDataType.GarminRestingHeartRate,
        dataProvider: garminRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70]
    },
    {
        type: DailyDataType.GarminMinHeartRate,
        dataProvider: garminMinHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "min-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [50, 60]
    },
    {
        type: DailyDataType.GarminMaxHeartRate,
        dataProvider: garminMaxHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "max-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [110, 180]
    },
    {
        type: DailyDataType.GarminAverageHeartRate,
        dataProvider: garminAverageHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "average-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 100]
    },
    {
        type: DailyDataType.GarminMaxStressLevel,
        dataProvider: garminMaxStressLevelDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "max-stress-level",
        icon: <FontAwesomeSvgIcon icon={faBoltLightning} />,
        formatter: defaultFormatter,
        previewDataRange: [80, 100]
    },
    {
        type: DailyDataType.GarminAverageStressLevel,
        dataProvider: garminAverageStressLevelDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "average-stress-level",
        icon: <FontAwesomeSvgIcon icon={faBoltLightning} />,
        formatter: defaultFormatter,
        previewDataRange: [40, 60]
    },
    {
        type: DailyDataType.GarminTotalStressMinutes,
        dataProvider: garminTotalStressMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "total-stress-time",
        icon: <FontAwesomeSvgIcon icon={faBoltLightning} />,
        formatter: minutesFormatter,
        previewDataRange: [100, 180]
    },
    {
        type: DailyDataType.GarminLowStressMinutes,
        dataProvider: garminLowStressMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "low-stress-time",
        icon: <FontAwesomeSvgIcon icon={faBoltLightning} />,
        formatter: minutesFormatter,
        previewDataRange: [60, 100]
    },

    {
        type: DailyDataType.GarminMediumStressMinutes,
        dataProvider: garminMediumStressMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "medium-stress-time",
        icon: <FontAwesomeSvgIcon icon={faBoltLightning} />,
        formatter: minutesFormatter,
        previewDataRange: [20, 40]
    },
    {
        type: DailyDataType.GarminHighStressMinutes,
        dataProvider: garminHighStressMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        labelKey: "high-stress-time",
        icon: <FontAwesomeSvgIcon icon={faBoltLightning} />,
        formatter: minutesFormatter,
        previewDataRange: [20, 40]
    },
    {
        type: DailyDataType.GarminTotalSleepMinutes,
        dataProvider: garminTotalSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Sleep"]),
        labelKey: "sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [400, 540]
    },
    {
        type: DailyDataType.GarminRemSleepMinutes,
        dataProvider: garminRemSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Sleep"]),
        labelKey: "rem-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.GarminDeepSleepMinutes,
        dataProvider: garminDeepSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Sleep"]),
        labelKey: "deep-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.GarminLightSleepMinutes,
        dataProvider: garminLightSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Sleep"]),
        labelKey: "light-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.GarminAwakeMinutes,
        dataProvider: garminAwakeMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Sleep"]),
        labelKey: "awake-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [20, 60]
    },
    {
        type: DailyDataType.GarminSleepScore,
        dataProvider: garminSleepScoreDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Sleep"]),
        labelKey: "sleep-score",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: defaultFormatter,
        previewDataRange: [60, 80]
    }
];
garminTypeDefinitions.forEach((def) => {
    def.dataSource = "Garmin";
});
export default garminTypeDefinitions;