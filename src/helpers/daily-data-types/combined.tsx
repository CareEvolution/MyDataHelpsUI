import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import {
    faBed,
    faHeartbeat,
    faHourglassHalf,
    faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {
    defaultFormatter,
    heartRateFormatter,
    minutesFormatter,
    sleepYAxisConverter,
} from "./formatters";
import combinedRestingHeartRate from "../daily-data-providers/combined-resting-heart-rate";
import {
    combinedMindfulMinutesDataProvider,
    combinedSleepDataProvider,
    combinedStepsDataProvider,
    combinedTherapyMinutesDataProvider,
} from "../daily-data-providers";
import { checkSourceAvailability, sources } from "./availability-check";
import { formatNumberForLocale } from "../../helpers/locale";

let combinedTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        dataSource: "Unified",
        type: DailyDataType.RestingHeartRate,
        dataProvider: combinedRestingHeartRate,
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            return await checkSourceAvailability(
                sources(
                    ["AppleHealth", "RestingHeartRate"],
                    ["Fitbit", "RestingHeartRate"],
                    ["Garmin", "Daily"],
                    ["HealthConnect", "resting-heart-rate"],
                ),
                modifiedAfter,
            );
        },
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [40, 100],
    },
    {
        dataSource: "Unified",
        type: DailyDataType.Steps,
        dataProvider: combinedStepsDataProvider,
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            return await checkSourceAvailability(
                sources(
                    ["AppleHealth", "HourlySteps"],
                    ["Fitbit", "Steps"],
                    ["Garmin", "Daily"],
                ),
                modifiedAfter,
            );
        },
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000],
    },
    {
        dataSource: "Unified",
        type: DailyDataType.StepsWithGoogleFit,
        dataProvider: (startDate: Date, endDate: Date) =>
            combinedStepsDataProvider(startDate, endDate, true),
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            return await checkSourceAvailability(
                sources(
                    ["AppleHealth", "HourlySteps"],
                    ["GoogleFit", "Steps"],
                    ["Fitbit", "Steps"],
                    ["Garmin", "Daily"],
                ),
                modifiedAfter,
            );
        },
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000],
    },
    {
        dataSource: "Unified",
        type: DailyDataType.SleepMinutes,
        dataProvider: combinedSleepDataProvider,
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            return await checkSourceAvailability(
                sources(
                    ["AppleHealth", "SleepAnalysisInterval"],
                    [
                        "Fitbit",
                        [
                            "SleepLevelRem",
                            "SleepLevelLight",
                            "SleepLevelDeep",
                            "SleepLevelAsleep",
                        ],
                    ],
                    ["Garmin", "Sleep"],
                    ["HealthConnect", "sleep"],
                ),
                modifiedAfter,
            );
        },
        labelKey: "sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [420, 540],
    },
    {
        dataSource: "Unified",
        type: DailyDataType.MindfulMinutes,
        dataProvider: combinedMindfulMinutesDataProvider,
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            return await checkSourceAvailability(
                sources(
                    ["AppleHealth", "MindfulSession"],
                    ["GoogleFit", "ActivitySegment"],
                ),
                modifiedAfter,
            );
        },
        labelKey: "mindful-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: (value) => formatNumberForLocale(value),
        previewDataRange: [0, 120],
    },
    {
        dataSource: "Unified",
        type: DailyDataType.TherapyMinutes,
        dataProvider: combinedTherapyMinutesDataProvider,
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            return await checkSourceAvailability(
                sources(
                    ["AppleHealth", "MindfulSession"],
                    ["GoogleFit", "SilverCloudSession"],
                ),
                modifiedAfter,
            );
        },
        labelKey: "therapy-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: (value) => formatNumberForLocale(value),
        previewDataRange: [0, 120],
    },
];
export default combinedTypeDefinitions;
