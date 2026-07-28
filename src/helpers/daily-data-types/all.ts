import airQualityTypeDefinitions from "./air-quality";
import appleHealthTypeDefinitions from "./apple-health";
import combinedTypeDefinitions from "./combined";
import fitbitTypeDefinitions from "./fitbit";
import garminTypeDefinitions from "./garmin";
import googleFitTypeDefinitions from "./google-fit";
import googleHealthTypeDefinitions from "./google-health";
import healthConnectTypeDefinitions from "./health-connect";
import ouraTypeDefinitions from "./oura";

const allTypeDefinitions = [
	...appleHealthTypeDefinitions,
	...fitbitTypeDefinitions,
	...garminTypeDefinitions,
	...combinedTypeDefinitions,
	...airQualityTypeDefinitions,
	...googleFitTypeDefinitions,
	...googleHealthTypeDefinitions,
	...healthConnectTypeDefinitions,
	...ouraTypeDefinitions
];
export default allTypeDefinitions;