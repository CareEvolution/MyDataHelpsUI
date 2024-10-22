import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { appleHealthActiveEnergyBurnedDataProvider, appleHealthDistanceDataProvider, appleHealthFlightsClimbedDataProvider, appleHealthHeartRateRangeDataProvider, 
    appleHealthHrvDataProvider, appleHealthInBedDataProvider, appleHealthMaxHeartRateDataProvider, appleHealthRestingHeartRateDataProvider,
    appleHealthSleepCoreDataProvider, appleHealthSleepDataProvider, appleHealthSleepDeepDataProvider, appleHealthSleepRemDataProvider,
    appleHealthStandTimeDataProvider, appleHealthStepsDataProvider, appleHealthWalkingHeartRateAverageDataProvider,
    appleHealthNumberOfAlcoholicBeveragesDataProvider } from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faHeartbeat, faPerson, faPersonRunning, faRoute, faStairs, faCocktail } from "@fortawesome/free-solid-svg-icons";
import language from "../language";
import React from "react";
import { defaultFormatter, heartRateFormatter, hrvFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import { simpleAvailabilityCheck } from "./availability-check";

let appleHealthTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.AppleHealthDistanceWalkingRunning,
        dataProvider: appleHealthDistanceDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlyDistanceWalkingRunning"]),
        labelKey: "distance-traveled",
        icon: <FontAwesomeSvgIcon icon={faRoute} />,
        formatter: (value: number) => Number((value / 1000).toFixed(2)).toLocaleString() + " km",
        yAxisConverter: (value: number) => value / 1000,
        previewDataRange: [3000, 5000]
    },
    {
        type: DailyDataType.AppleHealthFlightsClimbed,
        dataProvider: appleHealthFlightsClimbedDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["FlightsClimbed"]),
        labelKey: "floors-climbed",
        icon: <FontAwesomeSvgIcon icon={faStairs} />,
        formatter: defaultFormatter,
        previewDataRange: [2, 6]
    },
    {
        type: DailyDataType.AppleHealthHeartRateRange,
        dataProvider: appleHealthHeartRateRangeDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlyMaximumHeartRate"]),
        labelKey: "heart-rate-range",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [20, 100]
    },
    {
        type: DailyDataType.AppleHealthHrv,
        dataProvider: appleHealthHrvDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HeartRateVariability"]),
        labelKey: "heart-rate-variability",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: hrvFormatter,
        previewDataRange: [35, 55]
    },
    {
        type: DailyDataType.AppleHealthMaxHeartRate,
        dataProvider: appleHealthMaxHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlyMaximumHeartRate"]),
        labelKey: "max-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [100, 180]
    },
    {
        type: DailyDataType.AppleHealthRestingHeartRate,
        dataProvider: appleHealthRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["RestingHeartRate"]),
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70]
    },
    {
        type: DailyDataType.AppleHealthSleepMinutes,
        dataProvider: appleHealthSleepDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
        labelKey: "sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [420, 540]
    },
    {
        type: DailyDataType.AppleHealthCoreSleepMinutes,
        dataProvider: appleHealthSleepCoreDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
        labelKey: "core-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.AppleHealthDeepSleepMinutes,
        dataProvider: appleHealthSleepDeepDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
        labelKey: "deep-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.AppleHealthRemSleepMinutes,
        dataProvider: appleHealthSleepRemDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
        labelKey: "rem-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240]
    },
    {
        type: DailyDataType.AppleHealthInBedMinutes,
        dataProvider: appleHealthInBedDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"]),
        labelKey: "in-bed-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [420, 540]
    },
    {
        type: DailyDataType.AppleHealthStandMinutes,
        dataProvider: appleHealthStandTimeDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["AppleStandTime"]),
        labelKey: "stand-time",
        icon: <FontAwesomeSvgIcon icon={faPerson} />,
        formatter: minutesFormatter,
        previewDataRange: [30, 300]
    },
    {
        type: DailyDataType.AppleHealthSteps,
        dataProvider: appleHealthStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlySteps"]),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        type: DailyDataType.AppleHealthWalkingHeartRateAverage,
        dataProvider: appleHealthWalkingHeartRateAverageDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["WalkingHeartRateAverage"]),
        labelKey: "walking-heart-rate-average",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [80, 100]
    },
    {
        type: DailyDataType.AppleHealthActiveEnergyBurned,
        dataProvider: appleHealthActiveEnergyBurnedDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["ActiveEnergyBurned"]),
        labelKey: "active-energy-burned",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: defaultFormatter,
        previewDataRange: [300, 500]
    },
    {
        type: DailyDataType.AppleHealthNumberOfAlcoholicBeverages,
        dataProvider: appleHealthNumberOfAlcoholicBeveragesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["NumberOfAlcoholicBeverages"]),
        labelKey: "number-of-alcoholic-beverages",
        icon: <FontAwesomeSvgIcon icon={faCocktail} />,
        formatter: defaultFormatter,
        previewDataRange: [0, 20]
    }
];
appleHealthTypeDefinitions.forEach((def) => {
    def.dataSource = "AppleHealth";
});

export default appleHealthTypeDefinitions;