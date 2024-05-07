import airQualityTypeDefinitions from "./air-quality";
import appleHealthTypeDefinitions from "./apple-health";
import combinedTypeDefinitions from "./combined";
import fitbitTypeDefinitions from "./fitbit";
import garminTypeDefinitions from "./garmin";
import googleFitTypeDefinitions from "./google-fit";

const allTypeDefinitions = [
	...appleHealthTypeDefinitions,
	...fitbitTypeDefinitions,
	...garminTypeDefinitions,
	...combinedTypeDefinitions,
	...airQualityTypeDefinitions,
	...googleFitTypeDefinitions
];
export default allTypeDefinitions;