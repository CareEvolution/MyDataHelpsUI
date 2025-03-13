import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter } from "./formatters";
import { airQualityDataProvider, homeAirQualityDataProvider, workAirQualityDataProvider } from "../daily-data-providers";
import { simpleAvailabilityCheck } from "./availability-check";

let airQualityTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.AirQuality,
        dataProvider: airQualityDataProvider,
        availabilityCheck: simpleAvailabilityCheck('AirNowApi', ['AirQuality']),
        labelKey: "air-quality",
        icon: <FontAwesomeSvgIcon icon={faWind} />,
        formatter: defaultFormatter,
        previewDataRange: [20, 80]
    },
    {
        type: DailyDataType.HomeAirQuality,
        dataProvider: homeAirQualityDataProvider,
        availabilityCheck: simpleAvailabilityCheck('AirNowApi', ['HomeAirQuality']),
        labelKey: "air-quality-home",
        icon: <FontAwesomeSvgIcon icon={faWind} />,
        formatter: defaultFormatter,
        previewDataRange: [20, 80]
    },
    {
        type: DailyDataType.WorkAirQuality,
        dataProvider: workAirQualityDataProvider,
        availabilityCheck: simpleAvailabilityCheck('AirNowApi', ['WorkAirQuality']),
        labelKey: "air-quality-work",
        icon: <FontAwesomeSvgIcon icon={faWind} />,
        formatter: defaultFormatter,
        previewDataRange: [20, 80]
    }
];
airQualityTypeDefinitions.forEach((def) => {
    def.dataSource = "AirQuality";
});
export default airQualityTypeDefinitions;