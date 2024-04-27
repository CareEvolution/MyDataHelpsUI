import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import language from "../language";
import React from "react";
import { defaultFormatter } from "./formatters";
import { googleFitStepsDataProvider } from "../daily-data-providers";
import { simpleAvailabilityCheck } from "./availability-check";

let googleFitTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.GoogleFitSteps,
        dataProvider: googleFitStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheck("GoogleFit", ["Steps"]),
        label: language("steps"),
        icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
        formatter: defaultFormatter
    }
];
googleFitTypeDefinitions.forEach((def) => {
    def.dataSource = "GoogleFit";
});
export default googleFitTypeDefinitions;