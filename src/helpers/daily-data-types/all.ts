import airQualityTypeDefinitions from "./air-quality";
import appleHealthTypeDefinitions from "./apple-health";
import combinedTypeDefinitions from "./combined";
import fitbitTypeDefinitions from "./fitbit";
import garminTypeDefinitions from "./garmin";
import googleFitTypeDefinitions from "./google-fit";
import healthConnectTypeDefinitions from "./health-connect";

const allTypeDefinitions = [
	...appleHealthTypeDefinitions,
	...fitbitTypeDefinitions,
	...garminTypeDefinitions,
	...combinedTypeDefinitions,
	...airQualityTypeDefinitions,
	...googleFitTypeDefinitions,
	...healthConnectTypeDefinitions
];
export default allTypeDefinitions;