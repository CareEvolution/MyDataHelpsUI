import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faHeartbeat, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import language from "../language";
import React from "react";
import { defaultFormatter, heartRateFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import combinedRestingHeartRate from "../daily-data-providers/combined-resting-heart-rate";
import { combinedSleepDataProvider, combinedStepsDataProvider } from "../daily-data-providers";
import { simpleAvailabilityCheck } from "./availability-check";

let combinedTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        dataSource: "All Sources",
        type: DailyDataType.RestingHeartRate,
        dataProvider: combinedRestingHeartRate,
        availabilityCheck: function (modifiedAfter?: Date) {
            return simpleAvailabilityCheck("AppleHealth", ["RestingHeartRate"])(modifiedAfter).then(function (result) {
                if (!result) {
                    return simpleAvailabilityCheck("Fitbit", ["RestingHeartRate"])(modifiedAfter).then(function (result) {
                        if (!result) {
                            return simpleAvailabilityCheck("Garmin", ["RestingHeartRateInBeatsPerMinute"])(modifiedAfter);
                        }
                        else {
                            return result;
                        }
                    })
                }
                else {
                    return result;
                }
            })
        },
        getLabel: () => language("resting-heart-rate"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [40, 100]
    },
    {
        dataSource: "All Sources",
        type: DailyDataType.Steps,
        dataProvider: combinedStepsDataProvider,
        availabilityCheck: function (modifiedAfter?: Date) {
            return simpleAvailabilityCheck("AppleHealth", ["Steps"])(modifiedAfter).then(function (result) {
                if (!result) {
                    return simpleAvailabilityCheck("Fitbit", ["Steps"])(modifiedAfter).then(function (result) {
                        if (!result) {
                            return simpleAvailabilityCheck("Garmin", ["Steps"])(modifiedAfter);
                        }
                        else {
                            return result;
                        }
                    })
                }
                else {
                    return result;
                }
            });
        },
        getLabel: () => language("steps"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        dataSource: "All Sources",
        type: DailyDataType.SleepMinutes,
        dataProvider: combinedSleepDataProvider,
        availabilityCheck: function (modifiedAfter?: Date) {
            return simpleAvailabilityCheck("AppleHealth", ["SleepAnalysisInterval"])(modifiedAfter).then(function (result) {
                if (!result) {
                    return simpleAvailabilityCheck("Fitbit", ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"])(modifiedAfter).then(function (result) {
                        if (!result) {
                            return simpleAvailabilityCheck("Garmin", ["Sleep"])(modifiedAfter);
                        }
                        else {
                            return result;
                        }
                    })
                }
                else {
                    return result;
                }
            })
        },
        getLabel: () => language("sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [420, 540]
    }
];
export default combinedTypeDefinitions;