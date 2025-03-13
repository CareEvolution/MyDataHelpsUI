import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import {
    healthConnectRestingHeartRateDataProvider,
    healthConnectTotalSleepMinutesDataProvider,
    healthConnectRemSleepMinutesDataProvider,
    healthConnectDeepSleepMinutesDataProvider,
    healthConnectLightSleepMinutesDataProvider,
} from "../daily-data-providers";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import {
    faBed,
    faHeartbeat,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {
    heartRateFormatter,
    minutesFormatter,
    sleepYAxisConverter,
} from "./formatters";
import { simpleAvailabilityCheckV2 } from "./availability-check";

const healthConnectTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.HealthConnectRestingHeartRate,
        dataProvider: healthConnectRestingHeartRateDataProvider,
        availabilityCheck: simpleAvailabilityCheckV2("HealthConnect", [
            "resting-heart-rate",
        ]),
        labelKey: "resting-heart-rate",
        icon: <FontAwesomeSvgIcon icon={faHeartbeat} />,
        formatter: heartRateFormatter,
        previewDataRange: [60, 70],
        requiresV2Api: true,
    },
    {
        type: DailyDataType.HealthConnectTotalSleepMinutes,
        dataProvider: healthConnectTotalSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheckV2("HealthConnect", [
            "sleep",
        ]),
        labelKey: "sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [400, 540],
    },
    {
        type: DailyDataType.HealthConnectRemSleepMinutes,
        dataProvider: healthConnectRemSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheckV2("HealthConnect", [
            "sleep",
        ]),
        labelKey: "rem-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240],
    },
    {
        type: DailyDataType.HealthConnectDeepSleepMinutes,
        dataProvider: healthConnectDeepSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheckV2("HealthConnect", [
            "sleep",
        ]),
        labelKey: "deep-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240],
    },
    {
        type: DailyDataType.HealthConnectLightSleepMinutes,
        dataProvider: healthConnectLightSleepMinutesDataProvider,
        availabilityCheck: simpleAvailabilityCheckV2("HealthConnect", [
            "sleep",
        ]),
        labelKey: "light-sleep-time",
        icon: <FontAwesomeSvgIcon icon={faBed} />,
        formatter: minutesFormatter,
        yAxisConverter: sleepYAxisConverter,
        previewDataRange: [180, 240],
    },
];
healthConnectTypeDefinitions.forEach((def) => {
    def.dataSource = "HealthConnect";
});

export default healthConnectTypeDefinitions;
