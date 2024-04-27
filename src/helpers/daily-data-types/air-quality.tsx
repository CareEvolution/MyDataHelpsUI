import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataType, DailyDataTypeDefinition } from "../daily-data-types";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import language from "../language";
import React from "react";
import { defaultFormatter } from "./formatters";
import { homeAirQualityDataProvider, workAirQualityDataProvider } from "../daily-data-providers";
import { simpleAvailabilityCheck } from "./availability-check";

let airQualityTypeDefinitions: DailyDataTypeDefinition[] = [
    {
        type: DailyDataType.HomeAirQuality,
        dataProvider: homeAirQualityDataProvider,
        availabilityCheck: simpleAvailabilityCheck('AirNowApi', ['HomeAirQuality']),
        label: language("home-air-quality"),
        icon: <FontAwesomeSvgIcon icon={faWind} />,
        formatter: defaultFormatter
    },
    {
        type: DailyDataType.WorkAirQuality,
        dataProvider: workAirQualityDataProvider,
        availabilityCheck: simpleAvailabilityCheck('AirNowApi', ['WorkAirQuality']),
        label: language("work-air-quality"),
        icon: <FontAwesomeSvgIcon icon={faWind} />,
        formatter: defaultFormatter
    }
];
airQualityTypeDefinitions.forEach((def) => {
    def.dataSource = "AirQuality";
});
export default airQualityTypeDefinitions;