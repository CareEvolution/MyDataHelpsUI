import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import {
    faBed,
    faHeartbeat,
    faHourglassHalf,
    faPersonRunning
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {
    defaultFormatter,
    heartRateFormatter,
    minutesFormatter,
    sleepYAxisConverter
} from "./formatters";
import combinedRestingHeartRate from "../daily-data-providers/combined-resting-heart-rate";
import {
    combinedMindfulMinutesDataProvider,
    combinedSleepDataProvider,
    combinedStepsDataProvider,
    combinedTherapyMinutesDataProvider
} from "../daily-data-providers";
import { combinedAvailabilityCheck, sources } from "./availability-check";
import { formatNumberForLocale } from "../../helpers/locale";

const RESTING_HEART_RATE_SOURCES = sources(
    ["AppleHealth", "RestingHeartRate"],
    ["Fitbit", "RestingHeartRate"],
    ["Garmin", "Daily"],
    ["Oura", "heart-rate", true],
    ["HealthConnect", "resting-heart-rate", true]
);

const STEPS_SOURCES = sources(
    ["AppleHealth", "HourlySteps"],
    ["Fitbit", "Steps"],
    ["Garmin", "Daily"],
    ["Oura", "steps", true]
);

const STEPS_WITH_GOOGLE_FIT_SOURCES = sources(
    ["AppleHealth", "HourlySteps"],
    ["GoogleFit", "Steps"],
    ["Fitbit", "Steps"],
    ["Garmin", "Daily"]
);

const SLEEP_MINUTES_SOURCES = sources(
    ["AppleHealth", "SleepAnalysisInterval"],
    [
        "Fitbit",
        [
            "SleepLevelRem",
            "SleepLevelLight",
            "SleepLevelDeep",
            "SleepLevelAsleep"
        ]
    ],
    ["Garmin", "Sleep"],
    ["Oura", "sleep", true],
    ["HealthConnect", "sleep", true]
);

const MINDFUL_MINUTES_SOURCES = sources(
    ["AppleHealth", "MindfulSession"],
    ["GoogleFit", "ActivitySegment"]
);

const THERAPY_MINUTES_SOURCES = sources(
    ["AppleHealth", "MindfulSession"],
    ["GoogleFit", "SilverCloudSession"]
);

const combinedTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        dataSource: "Unified",
        type: DailyDataType.RestingHeartRate,
        dataProvider: combinedRestingHeartRate,
        availabilityCheck: combinedAvailabilityCheck(
            RESTING_HEART_RATE_SOURCES
        ),
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [40, 100]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.Steps,
        dataProvider: combinedStepsDataProvider,
        availabilityCheck: combinedAvailabilityCheck(STEPS_SOURCES),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.StepsWithGoogleFit,
        dataProvider: (startDate: Date, endDate: Date) =>
            combinedStepsDataProvider(startDate, endDate, true),
        availabilityCheck: combinedAvailabilityCheck(
            STEPS_WITH_GOOGLE_FIT_SOURCES
        ),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.SleepMinutes,
        dataProvider: combinedSleepDataProvider,
        availabilityCheck: combinedAvailabilityCheck(SLEEP_MINUTES_SOURCES),
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
        availabilityCheck: combinedAvailabilityCheck(MINDFUL_MINUTES_SOURCES),
        labelKey: "mindful-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => formatNumberForLocale(value),
        previewDataRange: [0, 120]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.TherapyMinutes,
        dataProvider: combinedTherapyMinutesDataProvider,
        availabilityCheck: combinedAvailabilityCheck(THERAPY_MINUTES_SOURCES),
        labelKey: "therapy-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => formatNumberForLocale(value),
        previewDataRange: [0, 120]
    }
];
export default combinedTypeDefinitions;
