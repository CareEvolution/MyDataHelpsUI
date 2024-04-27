import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { garminActiveCaloriesDataProvider, garminActiveMinutesDataProvider, garminAverageHeartRateDataProvider, garminAverageStressLevelDataProvider, garminAwakeMinutesDataProvider, garminDeepSleepMinutesDataProvider, garminDistanceDataProvider, garminFloorsDataProvider, garminHighStressMinutesDataProvider, garminLightSleepMinutesDataProvider, garminLowStressMinutesDataProvider, garminMaxHeartRateDataProvider, garminMaxStressLevelDataProvider, garminMediumStressMinutesDataProvider, garminMinHeartRateDataProvider, garminRemSleepMinutesDataProvider, garminRestingCaloriesDataProvider, garminRestingHeartRateDataProvider, garminSleepScoreDataProvider, garminStepsDataProvider, garminTotalCaloriesDataProvider, garminTotalSleepMinutesDataProvider, garminTotalStressMinutesDataProvider } from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faBoltLightning, faHeartbeat, faPersonRunning, faRoute, faStairs } from "@fortawesome/free-solid-svg-icons";
import language from "../language";
import React from "react";
import { defaultFormatter, heartRateFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import { simpleAvailabilityCheck } from "./availability-check";

let garminTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.GarminSteps,
        dataProvider: garminStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("steps"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter
    },
    {
        type: DailyDataType.GarminDistance,
        dataProvider: garminDistanceDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("distance"),
        icon: <FontAwesomeSvgIcon icon={faRoute} />,
        formatter: defaultFormatter
    },
    {
        type: DailyDataType.GarminFloors,
        dataProvider: garminFloorsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("floors-climbed"),
        icon: <FontAwesomeSvgIcon icon={faStairs} />,
        formatter: defaultFormatter
    },
    {
        type: DailyDataType.GarminActiveMinutes,
        dataProvider: garminActiveMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("active-minutes"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: minutesFormatter
    },
    {
        type: DailyDataType.GarminActiveCalories,
        dataProvider: garminActiveCaloriesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("active-calories"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter
    },
    {
        type: DailyDataType.GarminRestingCalories,
        dataProvider: garminRestingCaloriesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("resting-calories"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter
    },
    {
        type: DailyDataType.GarminTotalCalories,
        dataProvider: garminTotalCaloriesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("total-calories"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter
    },
    {
        type: DailyDataType.GarminRestingHeartRate,
        dataProvider: garminRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("resting-heart-rate"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter
    },
    {
        type: DailyDataType.GarminMinHeartRate,
        dataProvider: garminMinHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("min-heart-rate"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter
    },
    {
        type: DailyDataType.GarminMaxHeartRate,
        dataProvider: garminMaxHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("max-heart-rate"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter
    },
    {
        type: DailyDataType.GarminAverageHeartRate,
        dataProvider: garminAverageHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("average-heart-rate"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter
    },
    {
        type: DailyDataType.GarminMaxStressLevel,
        dataProvider: garminMaxStressLevelDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("max-stress-level"),
        icon: <FontAwesomeSvgIcon icon={faBoltLightning} />,
        formatter: defaultFormatter
    },
    {
        type: DailyDataType.GarminAverageStressLevel,
        dataProvider: garminAverageStressLevelDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("average-stress-level"),
        icon: <FontAwesomeSvgIcon icon={faBoltLightning} />,
        formatter: defaultFormatter
    },
    {
        type: DailyDataType.GarminTotalStressMinutes,
        dataProvider: garminTotalStressMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("total-stress-time"),
        icon: <FontAwesomeSvgIcon icon={faBoltLightning} />,
        formatter: minutesFormatter
    },
    {
        type: DailyDataType.GarminLowStressMinutes,
        dataProvider: garminLowStressMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("low-stress-time"),
        icon: <FontAwesomeSvgIcon icon={faBoltLightning} />,
        formatter: minutesFormatter
    },

    {
        type: DailyDataType.GarminMediumStressMinutes,
        dataProvider: garminMediumStressMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("medium-stress-time"),
        icon: <FontAwesomeSvgIcon icon={faBoltLightning} />,
        formatter: minutesFormatter
    },
    {
        type: DailyDataType.GarminHighStressMinutes,
        dataProvider: garminHighStressMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Daily"]),
        label: language("high-stress-time"),
        icon: <FontAwesomeSvgIcon icon={faBoltLightning} />,
        formatter: minutesFormatter
    },
    {
        type: DailyDataType.GarminTotalSleepMinutes,
        dataProvider: garminTotalSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Sleep"]),
        label: language("total-sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter
    },
    {
        type: DailyDataType.GarminRemSleepMinutes,
        dataProvider: garminRemSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Sleep"]),
        label: language("rem-sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter
    },
    {
        type: DailyDataType.GarminDeepSleepMinutes,
        dataProvider: garminDeepSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Sleep"]),
        label: language("deep-sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter
    },
    {
        type: DailyDataType.GarminLightSleepMinutes,
        dataProvider: garminLightSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Sleep"]),
        label: language("light-sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter
    },
    {
        type: DailyDataType.GarminAwakeMinutes,
        dataProvider: garminAwakeMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Sleep"]),
        label: language("awake-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter
    },
    {
        type: DailyDataType.GarminSleepScore,
        dataProvider: garminSleepScoreDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Garmin", ["Sleep"]),
        label: language("sleep-score"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: defaultFormatter
    }
];
garminTypeDefinitions.forEach((def) => {
    def.dataSource = "Garmin";
});
export default garminTypeDefinitions;