import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faHourglassHalf, faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter } from "./formatters";
import { googleFitMindfulMinutesDataProvider, googleFitStepsDataProvider, googleFitTherapyMinutesDataProvider } from "../daily-data-providers";
import { simpleAvailabilityCheck } from "./availability-check";

let googleFitTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.GoogleFitMindfulMinutes,
        dataProvider: googleFitMindfulMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleFit", "ActivitySegment"),
        labelKey: "mindful-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => value.toFixed(0),
        previewDataRange: [0, 120]
    },
    {
        type: DailyDataType.GoogleFitSteps,
        dataProvider: googleFitStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleFit", ["Steps"]),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter,
        previewDataRange: [3000, 6000]
    },
    {
        type: DailyDataType.GoogleFitTherapyMinutes,
        dataProvider: googleFitTherapyMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleFit", "SilverCloudSession"),
        labelKey: "therapy-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => value.toFixed(0),
        previewDataRange: [0, 120]
    }
];
googleFitTypeDefinitions.forEach((def) => {
    def.dataSource = "GoogleFit";
});
export default googleFitTypeDefinitions;