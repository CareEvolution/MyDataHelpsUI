import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { appleHealthActiveEnergyBurned, appleHealthDistanceDataProvider, appleHealthFlightsClimbedDataProvider, appleHealthHeartRateRangeDataProvider, appleHealthHrvDataProvider, appleHealthInBedDataProvider, appleHealthMaxHeartRateDataProvider, appleHealthRestingHeartRateDataProvider, appleHealthSleepCoreDataProvider, appleHealthSleepDataProvider, appleHealthSleepDeepDataProvider, appleHealthSleepRemDataProvider, appleHealthStandTimeDataProvider, appleHealthStepsDataProvider, appleHealthWalkingHeartRateAverageDataProvider } from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faHeartbeat, faPerson, faPersonRunning, faRoute, faStairs } from "@fortawesome/free-solid-svg-icons";
import language from "../language";
import React from "react";
import { defaultFormatter, heartRateFormatter, hrvFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import { simpleAvailabilityCheck } from "./availability-check";

let appleHealthTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.AppleHealthDistanceWalkingRunning,
        dataProvider: appleHealthDistanceDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlyDistanceWalkingRunning"]),
        getLabel: () => language("distance-traveled"),
        icon: <FontAwesomeSvgIcon icon={faRoute} />,
        formatter: (value: number) => Number((value / 1000).toFixed(2)).toLocaleString() + " km",
        yAxisConverter: (value: number) => value / 1000,
        previewDataRange: [3000, 5000]
    },
    {
        type: DailyDataType.AppleHealthFlightsClimbed,
        dataProvider: appleHealthFlightsClimbedDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["FlightsClimbed"]),
        getLabel: () => language("floors-climbed"),
        icon: <FontAwesomeSvgIcon icon={faStairs} />,
        formatter: defaultFormatter,
        previewDataRange: [2, 6]
    },
    {
        type: DailyDataType.AppleHealthHeartRateRange,
        dataProvider: appleHealthHeartRateRangeDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlyMaximumHeartRate"]),
        getLabel: () => language("heart-rate-range"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [20, 100]
    },
    {
        type: DailyDataType.AppleHealthHrv,
        dataProvider: appleHealthHrvDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HeartRateVariability"]),
        getLabel: () => language("heart-rate-variability"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: hrvFormatter,
        previewDataRange: [35, 55]
    },
    {
        type: DailyDataType.AppleHealthMaxHeartRate,
        dataProvider: appleHealthMaxHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlyMaximumHeartRate"]),
        getLabel: () => language("max-heart-rate"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [100, 180]
    },
    {
        type: DailyDataType.AppleHealthRestingHeartRate,
        dataProvider: appleHealthRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["RestingHeartRate"]),
        getLabel: () => language("resting-heart-rate"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70]
    },
    {
        type: DailyDataType.AppleHealthSleepMinutes,
        dataProvider: appleHealthSleepDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
        getLabel: () => language("sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [420, 540]
    },
    {
        type: DailyDataType.AppleHealthCoreSleepMinutes,
        dataProvider: appleHealthSleepCoreDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
        getLabel: () => language("core-sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.AppleHealthDeepSleepMinutes,
        dataProvider: appleHealthSleepDeepDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
        getLabel: () => language("deep-sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.AppleHealthRemSleepMinutes,
        dataProvider: appleHealthSleepRemDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
        getLabel: () => language("rem-sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.AppleHealthInBedMinutes,
        dataProvider: appleHealthInBedDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
        getLabel: () => language("in-bed-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [420, 540]
    },
    {
        type: DailyDataType.AppleHealthStandMinutes,
        dataProvider: appleHealthStandTimeDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["AppleStandTime"]),
        getLabel: () => language("stand-time"),
        icon: <FontAwesomeSvgIcon icon={faPerson} />,
        formatter: minutesFormatter,
        previewDataRange: [30, 300]
    },
    {
        type: DailyDataType.AppleHealthSteps,
        dataProvider: appleHealthStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlySteps"]),
        getLabel: () => language("steps"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        type: DailyDataType.AppleHealthWalkingHeartRateAverage,
        dataProvider: appleHealthWalkingHeartRateAverageDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["WalkingHeartRateAverage"]),
        getLabel: () => language("walking-heart-rate-average"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [80, 100]
    },
    {
        type: DailyDataType.AppleHealthActiveEnergyBurned,
        dataProvider: appleHealthActiveEnergyBurned,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["ActiveEnergyBurned"]),
        getLabel: () => language("active-energy-burned"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: defaultFormatter,
        previewDataRange: [300, 500]
    }
];
appleHealthTypeDefinitions.forEach((def) => {
    def.dataSource = "AppleHealth";
});

export default appleHealthTypeDefinitions;