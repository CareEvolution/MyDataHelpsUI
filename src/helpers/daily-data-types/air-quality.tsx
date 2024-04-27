import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { DailyDataTypeDefinition } from "../daily-data-types";
import { DailyDataType, simpleAvailabilityCheck } from "../query-daily-data";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import language from "../language";
import React from "react";
import { defaultFormatter } from "./formatters";
import { homeAirQualityDataProvider, workAirQualityDataProvider } from "../daily-data-providers";

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