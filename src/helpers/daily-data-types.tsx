import { ReactElement } from "react";
import { DailyDataAvailabilityCheck, DailyDataProvider, DailyDataType } from "./query-daily-data";
import appleHealthTypeDefinitions from "./daily-data-types/apple-health";
import combinedTypeDefinitions from "./daily-data-types/combined";
import airQualityTypeDefinitions from "./daily-data-types/air-quality";
import googleFitTypeDefinitions from "./daily-data-types/google-fit";
import fitbitTypeDefinitions from "./daily-data-types/fitbit";
import garminTypeDefinitions from "./daily-data-types/garmin";

export interface DailyDataTypeDefinition {
	dataSource?: "AppleHealth" | "Garmin" | "Fitbit" | "GoogleFit" | "AirQuality";
	type: DailyDataType;
	dataProvider: DailyDataProvider;
	availabilityCheck: DailyDataAvailabilityCheck;
	label: string;
	icon: ReactElement;
	formatter: (value: number) => string;
	yAxisConverter?: (value: number) => number;
}

const allTypeDefinitions = [
	...appleHealthTypeDefinitions,
	...fitbitTypeDefinitions,
	...garminTypeDefinitions,
	...combinedTypeDefinitions,
	...airQualityTypeDefinitions,
	...googleFitTypeDefinitions
];
export default allTypeDefinitions;