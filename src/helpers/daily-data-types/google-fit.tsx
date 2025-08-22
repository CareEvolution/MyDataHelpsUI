import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faHourglassHalf, faShoePrints } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter } from "./formatters";
import { googleFitStepsDataProvider, googleFitMindfulMinutesDataProvider, googleFitTherapyMinutesDataProvider } from "../daily-data-providers";
import { simpleAvailabilityCheck } from "./availability-check";
import { formatNumberForLocale } from "../locale";

let googleFitTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.GoogleFitMindfulMinutes,
        dataProvider: googleFitMindfulMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleFit", "ActivitySegment"),
        labelKey: "mindful-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => formatNumberForLocale(value),
        previewDataRange: [0, 120]
    },
    {
        type: DailyDataType.GoogleFitSteps,
        dataProvider: googleFitStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleFit", ["Steps"]),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faShoePrints} />,
        formatter: defaultFormatter,
        previewDataRange: [3000, 6000]
    },
    {
        type: DailyDataType.GoogleFitTherapyMinutes,
        dataProvider: googleFitTherapyMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleFit", "SilverCloudSession"),
        labelKey: "therapy-minutes",
        icon: <FontAwesomeSvgIcon icon={faHourglassHalf} />,
        formatter: value => formatNumberForLocale(value),
        previewDataRange: [0, 120]
    }
];
googleFitTypeDefinitions.forEach((def) => {
    def.dataSource = "GoogleFit";
});
export default googleFitTypeDefinitions;