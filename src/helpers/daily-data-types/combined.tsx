import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faHeartbeat, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import language from "../language";
import React from "react";
import { defaultFormatter, heartRateFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import combinedRestingHeartRate from "../daily-data-providers/combined-resting-heart-rate";
import { combinedSleepDataProvider, combinedStepsDataProvider } from "../daily-data-providers";
import { simpleAvailabilityCheck, combinedAvailabilityCheck } from "./availability-check";

let combinedTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        dataSource: "Unified",
        type: DailyDataType.RestingHeartRate,
        dataProvider: combinedRestingHeartRate,
        availabilityCheck: function (modifiedAfter?: Date) {
            return combinedAvailabilityCheck( [
                { namespace: "AppleHealth", type: ["RestingHeartRate"] }, 
                { namespace: "Fitbit", type: ["RestingHeartRate"] }, 
                { namespace: "Garmin", type: ["RestingHeartRateInBeatsPerMinute"] } ] )( modifiedAfter );
        },
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [40, 100]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.MaxHeartRate,
        dataProvider: combinedRestingHeartRate,
        availabilityCheck: function (modifiedAfter?: Date) {
            return combinedAvailabilityCheck( [
                { namespace: "AppleHealth", type: ["AppleHealthMaxHeartRate"] }, 
                { namespace: "Fitbit", type: ["FitbitMaxHeartRate"] }, 
                { namespace: "Garmin", type: ["GarminMaxHeartRate"] } ] )( modifiedAfter );
        },
        labelKey: "max-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [100, 200]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.MinHeartRate,
        dataProvider: combinedRestingHeartRate,
        availabilityCheck: function (modifiedAfter?: Date) {
            return combinedAvailabilityCheck( [
                { namespace: "AppleHealth", type: ["AppleHealthMinHeartRate"] }, 
                { namespace: "Fitbit", type: ["FitbitMinHeartRate"] }, 
                { namespace: "Garmin", type: ["GarminMinHeartRate"] } ] )( modifiedAfter );
        },
        labelKey: "min-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [40, 100]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.AverageHeartRate,
        dataProvider: combinedRestingHeartRate,
        availabilityCheck: function (modifiedAfter?: Date) {
            return combinedAvailabilityCheck( [
                { namespace: "AppleHealth", type: ["AppleHealthAverageHeartRate"] }, 
                { namespace: "Fitbit", type: ["FitbitAverageHeartRate"] }, 
                { namespace: "Garmin", type: ["GarminAverageHeartRate"] } ] )( modifiedAfter );
        },
        labelKey: "average-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [50, 110]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.Steps,
        dataProvider: combinedStepsDataProvider,
        availabilityCheck: function (modifiedAfter?: Date) {
            return combinedAvailabilityCheck( [
                { namespace: "AppleHealth", type: ["Steps"] }, 
                { namespace: "Fitbit", type: ["Steps"] }, 
                { namespace: "Garmin", type: ["Steps"] } ] )( modifiedAfter);
        },
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.SleepMinutes,
        dataProvider: combinedSleepDataProvider,
        availabilityCheck: function (modifiedAfter?: Date) {
            return combinedAvailabilityCheck( [
                { namespace: "AppleHealth", type: ["SleepAnalysisInterval"] }, 
                { namespace: "Fitbit", type: ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"] }, 
                { namespace: "Garmin", type: ["Sleep"] } ] )( modifiedAfter );
        },
        labelKey: "sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [420, 540]
    }
];
export default combinedTypeDefinitions;