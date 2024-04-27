import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataTypeDefinition } from "../daily-data-types";
import { DailyDataType, simpleAvailabilityCheck } from "../query-daily-data";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import language from "../language";
import React from "react";
import { defaultFormatter } from "./formatters";
import { googleFitStepsDataProvider } from "../daily-data-providers";

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