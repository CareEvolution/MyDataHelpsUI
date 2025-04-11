import { faBed, faHeartbeat, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { ouraRestingHeartRateDataProvider, ouraSleepMinutesDataProvider, ouraStepsDataProvider } from "../daily-data-providers";
import { DailyDataTypeDefinition, DailyDataType } from "../daily-data-types";
import { defaultFormatter, heartRateFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import React from "react";
import { simpleAvailabilityCheck } from "./availability-check";

let ouraTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.OuraSteps,
        dataProvider: ouraStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Oura", ["daily-activity"], true),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000],
        requiresV2Api: true
    },
    {
        type: DailyDataType.OuraRestingHeartRate,
        dataProvider: ouraRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Oura", ["sleep"], true),
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70],
        requiresV2Api: true
    },
    {
        type: DailyDataType.OuraSleepMinutes,
        dataProvider: ouraSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Oura", ["sleep"], true),
        labelKey: "sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [400, 540],
        requiresV2Api: true
    }
];
ouraTypeDefinitions.forEach((def) => {
    def.dataSource = "Oura";
});
export default ouraTypeDefinitions;