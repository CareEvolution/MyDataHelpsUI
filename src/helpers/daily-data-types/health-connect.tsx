import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import {
  healthConnectTotalExerciseMinutesDataProvider,
  healthConnectAverageRestingHeartRateDataProvider,
} from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faHeartbeat } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { heartRateFormatter, minutesFormatter } from "./formatters";
import { simpleAvailabilityCheckV2 } from "./availability-check";

const healthConnectTypeDefinitions: DailyDataTypeDefinition[] = [
  {
    type: DailyDataType.HealthConnectTotalExerciseMinutes,
    dataProvider: healthConnectTotalExerciseMinutesDataProvider,
    availabilityCheck: simpleAvailabilityCheckV2("HealthConnect", [
      "Exercise",
    ]),
    labelKey: "heart-rate-range",
    icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
    formatter: minutesFormatter,
    previewDataRange: [20, 100],
    requiresV2Api: true,
  },
  {
    type: DailyDataType.HealthConnectAverageRestingHeartRate,
    dataProvider: healthConnectAverageRestingHeartRateDataProvider,
    availabilityCheck: simpleAvailabilityCheckV2("HealthConnect", [
      "RestingHeartRate",
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
