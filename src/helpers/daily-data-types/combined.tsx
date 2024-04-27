import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataTypeDefinition } from "../daily-data-types";
import { DailyDataType, simpleAvailabilityCheck } from "../query-daily-data";
import { faBed, faHeartbeat, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import language from "../language";
import React from "react";
import { defaultFormatter, heartRateFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import combinedRestingHeartRate from "../daily-data-providers/combined-resting-heart-rate";
import { combinedSleepDataProvider, combinedStepsDataProvider } from "../daily-data-providers";

let combinedTypeDefinitions: DailyDataTypeDefinition[] = [
    {
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
        label: language("resting-heart-rate"),
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter
    },
    {
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
        label: language("steps"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter
    },
    {
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
        label: language("sleep-time"),
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter
    }
];
export default combinedTypeDefinitions;