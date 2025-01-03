import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faHeartbeat, faPersonRunning, faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter, heartRateFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import combinedRestingHeartRate from "../daily-data-providers/combined-resting-heart-rate";
import { combinedSleepDataProvider, combinedStepsDataProvider, combinedMindfulMinutesDataProvider, combinedTherapyMinutesDataProvider } from "../daily-data-providers";
import { simpleAvailabilityCheck } from "./availability-check";
import MyDataHelps from "@careevolution/mydatahelps-js";

let combinedTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        dataSource: "Unified",
        type: DailyDataType.RestingHeartRate,
        dataProvider: combinedRestingHeartRate,
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            const settings = await MyDataHelps.getDataCollectionSettings();

            if (settings.queryableDeviceDataTypes.find(dt => dt.namespace == "AppleHealth" && dt.type == "RestingHeartRate")
                && await simpleAvailabilityCheck("AppleHealth", "RestingHeartRate")(modifiedAfter)) {
                return true;
            }

            if (settings.fitbitEnabled && await simpleAvailabilityCheck("Fitbit", "RestingHeartRate")(modifiedAfter)) {
                return true;
            }

            return settings.garminEnabled && await simpleAvailabilityCheck("Garmin", "RestingHeartRateInBeatsPerMinute")(modifiedAfter);
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
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            const settings = await MyDataHelps.getDataCollectionSettings();

            if (settings.queryableDeviceDataTypes.find(dt => dt.namespace == "AppleHealth" && dt.type == "Steps")
                && await simpleAvailabilityCheck("AppleHealth", "Steps")(modifiedAfter)) {
                return true;
            }

            if (settings.fitbitEnabled && await simpleAvailabilityCheck("Fitbit", "Steps")(modifiedAfter)) {
                return true;
            }

            return settings.garminEnabled && await simpleAvailabilityCheck("Garmin", "Steps")(modifiedAfter);
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
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            const settings = await MyDataHelps.getDataCollectionSettings();

            if (settings.queryableDeviceDataTypes.find(dt => dt.namespace == "AppleHealth" && dt.type == "SleepAnalysisInterval")
                && await simpleAvailabilityCheck("AppleHealth", "SleepAnalysisInterval")(modifiedAfter)) {
                return true;
            }

            if (settings.fitbitEnabled && await simpleAvailabilityCheck("Fitbit", ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"])(modifiedAfter)) {
                return true;
            }

            return settings.garminEnabled && await simpleAvailabilityCheck("Garmin", "Sleep")(modifiedAfter);
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
            const settings = await MyDataHelps.getDataCollectionSettings();

            if (settings.queryableDeviceDataTypes.find(dt => dt.namespace == "AppleHealth" && dt.type == "MindfulSession")
                && await simpleAvailabilityCheck("AppleHealth", "MindfulSession")(modifiedAfter)) {
                return true;
            }

            return !!settings.queryableDeviceDataTypes.find(dt => dt.namespace == "GoogleFit" && dt.type == "ActivitySegment")
                && await simpleAvailabilityCheck("GoogleFit", "ActivitySegment")(modifiedAfter);
        },
        labelKey: "mindful-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => value.toFixed(0),
        previewDataRange: [0, 120]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.TherapyMinutes,
        dataProvider: combinedTherapyMinutesDataProvider,
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            const settings = await MyDataHelps.getDataCollectionSettings();

            if (settings.queryableDeviceDataTypes.find(dt => dt.namespace == "AppleHealth" && dt.type == "MindfulSession")
                && await simpleAvailabilityCheck("AppleHealth", "MindfulSession")(modifiedAfter)) {
                return true;
            }

            return !!settings.queryableDeviceDataTypes.find(dt => dt.namespace == "GoogleFit" && dt.type == "SilverCloudSession")
                && await simpleAvailabilityCheck("GoogleFit", "SilverCloudSession")(modifiedAfter);
        },
        labelKey: "therapy-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => value.toFixed(0),
        previewDataRange: [0, 120]
    }
];
export default combinedTypeDefinitions;