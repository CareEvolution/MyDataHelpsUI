import { faBed, faFireFlameCurved, faHeartbeat, faShoePrints } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { ouraActiveCaloriesBurnedDataProvider, ouraRestingHeartRateDataProvider, ouraSleepMinutesDataProvider, ouraStepsDataProvider } from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { defaultFormatter, heartRateFormatter, minutesFormatter, sleepYAxisConverter } from "./formatters";
import React from "react";
import { simpleAvailabilityCheck } from "./availability-check";

let ouraTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.OuraSteps,
        dataProvider: ouraStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Oura", ["daily-activity"]),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faShoePrints} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000],
        requiresV2Api: true
    },
    {
        type: DailyDataType.OuraRestingHeartRate,
        dataProvider: ouraRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Oura", ["sleep"]),
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70],
        requiresV2Api: true
    },
    {
        type: DailyDataType.OuraSleepMinutes,
        dataProvider: ouraSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Oura", ["sleep"]),
        labelKey: "sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [400, 540],
        requiresV2Api: true
    },
    {
        type: DailyDataType.OuraActiveCaloriesBurned,
        dataProvider: ouraActiveCaloriesBurnedDataProvider,
        availabilityCheck: simpleAvailabilityCheck("Oura", ["daily-activity"]),
        labelKey: "active-calories-burned",
        icon: <FontAwesomeSvgIcon icon={faFireFlameCurved} />,
        formatter: defaultFormatter,
        previewDataRange: [300, 500]
    }
];
ouraTypeDefinitions.forEach((def) => {
    def.dataSource = "Oura";
});
export default ouraTypeDefinitions;