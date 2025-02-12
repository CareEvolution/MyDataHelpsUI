import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import {
    healthConnectStepsDataProvider,
    healthConnectAverageRestingHeartRateDataProvider,
} from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faHeartbeat, faWalking } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter, heartRateFormatter } from "./formatters";
import { simpleAvailabilityCheckV2 } from "./availability-check";

const healthConnectTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.HealthConnectSteps,
        dataProvider: healthConnectStepsDataProvider,
        availabilityCheck: simpleAvailabilityCheckV2("HealthConnect", [
            "steps",
        ]),
        labelKey: "steps",
        icon: <FontAwesomeSvgIcon icon={faWalking} />,
        formatter: defaultFormatter,
        previewDataRange: [4000, 8000],
        requiresV2Api: true,
    },
    {
        type: DailyDataType.HealthConnectAverageRestingHeartRate,
        dataProvider: healthConnectAverageRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheckV2("HealthConnect", [
            "resting-heart-rate",
        ]),
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70],
        requiresV2Api: true,
    },
];
healthConnectTypeDefinitions.forEach((def) => {
    def.dataSource = "HealthConnect";
});

export default healthConnectTypeDefinitions;
