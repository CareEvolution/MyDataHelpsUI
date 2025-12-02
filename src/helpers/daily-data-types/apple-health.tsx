import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import {
    appleHealthActiveEnergyBurnedDataProvider, appleHealthDistanceDataProvider, appleHealthEstimatedAppleWatchWearTimeDataProvider, appleHealthFlightsClimbedDataProvider, appleHealthHeartRateRangeDataProvider,
    appleHealthHrvDataProvider, appleHealthInBedDataProvider, appleHealthMaxHeartRateDataProvider, appleHealthRestingHeartRateDataProvider,
    appleHealthSleepCoreDataProvider, appleHealthSleepDataProvider, appleHealthSleepDeepDataProvider, appleHealthSleepRemDataProvider,
    appleHealthStandTimeDataProvider, appleHealthStepsDataProvider, appleHealthWalkingHeartRateAverageDataProvider,
    appleHealthNumberOfAlcoholicBeveragesDataProvider, appleHealthMindfulMinutesDataProvider, appleHealthTherapyMinutesDataProvider, appleHealthStepsWhileWearingDeviceDataProvider
} from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faFireFlameCurved, faHeartbeat, faPerson, faRoute, faStairs, faCocktail, faHourglassHalf, faShoePrints, faHandBackFist } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter, distanceFormatter, distanceYAxisConverter, heartRateFormatter, hrvFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import { simpleAvailabilityCheck } from "./availability-check";
import { formatNumberForLocale } from "../locale";

let appleHealthTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.AppleHealthDistanceWalkingRunning,
        dataProvider: appleHealthDistanceDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HourlyDistanceWalkingRunning"]),
        labelKey: "distance-traveled",
        icon: <FontAwesomeSvgIcon icon={faRoute} />,
        formatter: distanceFormatter,
        yAxisConverter: distanceYAxisConverter,
        previewDataRange: [3000, 5000]
    },
    {
        type: DailyDataType.AppleHealthEstimatedAppleWatchWearTime,
        dataProvider: appleHealthEstimatedAppleWatchWearTimeDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["HeartRate"]),
        labelKey: "apple-watch-wear-time",
        icon: <FontAwesomeSvgIcon icon={faHandBackFist} />,
        formatter: minutesFormatter,
        yAxisConverter: distanceYAxisConverter,
        previewDataRange: [8, 18]
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
        type: DailyDataType.AppleHealthMindfulMinutes,
        dataProvider: appleHealthMindfulMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", "MindfulSession"),
        labelKey: "mindful-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => formatNumberForLocale(value),
        previewDataRange: [0, 120]
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
        icon: <FontAwesomeSvgIcon icon={faShoePrints} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        type: DailyDataType.AppleHealthStepsWhileWearingDevice,
        dataProvider: appleHealthStepsWhileWearingDeviceDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", "HourlySteps"),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faShoePrints} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000],
        requiresV2Api: true
    },
    {
        type: DailyDataType.AppleHealthTherapyMinutes,
        dataProvider: appleHealthTherapyMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", "MindfulSession"),
        labelKey: "therapy-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => formatNumberForLocale(value),
        previewDataRange: [0, 120]
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
        availabilityCheck: simpleAvailabilityCheck("AppleHealth", ["ActiveEnergyBurned", "Active Energy Burned"]),
        labelKey: "active-energy-burned",
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
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