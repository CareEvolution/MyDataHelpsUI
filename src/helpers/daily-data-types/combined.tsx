import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faHeartbeat, faPersonRunning, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter, heartRateFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import combinedRestingHeartRate from "../daily-data-providers/combined-resting-heart-rate";
import { combinedSleepDataProvider, combinedStepsDataProvider, combinedMindfulMinutesDataProvider, combinedTherapyMinutesDataProvider } from "../daily-data-providers";
import { simpleAvailabilityCheck } from "./availability-check";
import { formatNumberForLocale } from "../../helpers/locale";

let combinedTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        dataSource: "Unified",
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
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [40, 100]
    },
    {
        dataSource: "Unified",
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
        labelKey: "sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [420, 540]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.MindfulMinutes,
        dataProvider: combinedMindfulMinutesDataProvider,
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            const result = await simpleAvailabilityCheck("AppleHealth", "MindfulSession")(modifiedAfter);
            if (!result) {
                return simpleAvailabilityCheck("GoogleFit", "ActivitySegment")(modifiedAfter);
            } else {
                return result;
            }
        },
        labelKey: "mindful-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => formatNumberForLocale(value),
        previewDataRange: [0, 120]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.TherapyMinutes,
        dataProvider: combinedTherapyMinutesDataProvider,
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            const result = await simpleAvailabilityCheck("AppleHealth", "MindfulSession")(modifiedAfter);
            if (!result) {
                return simpleAvailabilityCheck("GoogleFit", "SilverCloudSession")(modifiedAfter);
            } else {
                return result;
            }
        },
        labelKey: "therapy-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => formatNumberForLocale(value),
        previewDataRange: [0, 120]
    }
];
export default combinedTypeDefinitions;