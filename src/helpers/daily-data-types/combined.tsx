import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faBed, faHeartbeat, faHourglassHalf, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter, heartRateFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import combinedRestingHeartRate from "../daily-data-providers/combined-resting-heart-rate";
import { combinedMindfulMinutesDataProvider, combinedSleepDataProvider, combinedStepsDataProvider, combinedTherapyMinutesDataProvider } from "../daily-data-providers";
import { checkSourceAvailability, simpleAvailabilityCheck } from "./availability-check";
import MyDataHelps, { DeviceDataNamespace, DeviceDataV2Namespace } from "@careevolution/mydatahelps-js";
import { formatNumberForLocale } from "../../helpers/locale";
import { DataCollectionSettings } from "../daily-data-providers/data-collection-settings";

let combinedTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        dataSource: "Unified",
        type: DailyDataType.RestingHeartRate,
        dataProvider: combinedRestingHeartRate,
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            const settings = await DataCollectionSettings.create();

            const sources: {namespace: DeviceDataNamespace | DeviceDataV2Namespace, type: string[]}[] = [
                { namespace: "AppleHealth", type: ["RestingHeartRate"] },
                { namespace: "Fitbit", type: ["RestingHeartRate"] },
                { namespace: "Garmin", type: ["Daily"] },
                { namespace: "HealthConnect", type: ["resting-heart-rate"] }
            ];

            return await checkSourceAvailability(settings, sources, modifiedAfter);
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

            if (settings.queryableDeviceDataTypes.find(dt => dt.namespace == "AppleHealth" && dt.type == "HourlySteps")
                && await simpleAvailabilityCheck("AppleHealth", "HourlySteps")(modifiedAfter)) {
                return true;
            }

            if (settings.fitbitEnabled && await simpleAvailabilityCheck("Fitbit", "Steps")(modifiedAfter)) {
                return true;
            }

            return settings.garminEnabled && await simpleAvailabilityCheck("Garmin", "Daily")(modifiedAfter);
        },
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000]
    },
    {
        dataSource: "Unified",
        type: DailyDataType.StepsWithGoogleFit,
        dataProvider: (startDate: Date, endDate: Date) => combinedStepsDataProvider(startDate, endDate, true),
        availabilityCheck: async (modifiedAfter?: Date): Promise<boolean> => {
            const settings = await MyDataHelps.getDataCollectionSettings();

            if (settings.queryableDeviceDataTypes.find(dt => dt.namespace == "AppleHealth" && dt.type == "HourlySteps")
                && await simpleAvailabilityCheck("AppleHealth", "HourlySteps")(modifiedAfter)) {
                return true;
            }

            if (settings.queryableDeviceDataTypes.find(dt => dt.namespace == "GoogleFit" && dt.type == "Steps")
                && await simpleAvailabilityCheck("GoogleFit", "Steps")(modifiedAfter)) {
                return true;
            }

            if (settings.fitbitEnabled && await simpleAvailabilityCheck("Fitbit", "Steps")(modifiedAfter)) {
                return true;
            }

            return settings.garminEnabled && await simpleAvailabilityCheck("Garmin", "Daily")(modifiedAfter);
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
            const settings = await DataCollectionSettings.create();
            const sources: {namespace: DeviceDataNamespace | DeviceDataV2Namespace, type: string[]}[] = [
                { namespace: "AppleHealth", type: ["SleepAnalysisInterval"] },
                { namespace: "Fitbit", type: ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"]},
                { namespace: "Garmin", type: ["Sleep"] },
                { namespace: "HealthConnect", type: ["sleep"] }
            ] as const;

            return await checkSourceAvailability(settings, sources, modifiedAfter);
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
        formatter: value => formatNumberForLocale(value),
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
        formatter: value => formatNumberForLocale(value),
        previewDataRange: [0, 120]
    }
];
export default combinedTypeDefinitions;