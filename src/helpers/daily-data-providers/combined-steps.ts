import { add } from "date-fns";
import { appleHealthStepsDataProvider, fitbitStepsDataProvider } from ".";
import getDayKey from "../get-day-key";

export default function (startDate: Date, endDate: Date) {
	var fitbitSteps = fitbitStepsDataProvider(startDate, endDate);
	var appleSteps = appleHealthStepsDataProvider(startDate, endDate);

	return Promise.all([fitbitSteps, appleSteps]).then((values) => {
		var data: { [key: string]: number } = {};
		while (startDate < endDate) {
			var dayKey = getDayKey(startDate);
			var steps: number | null = null;
			if (values[0][dayKey]) {
				steps = values[0][dayKey];
			}

			if (values[1][dayKey] && (steps == null || values[1][dayKey] > steps)) {
				steps = values[1][dayKey];
			}
			if (steps) {
				data[dayKey] = steps;
			}
			startDate = add(startDate, { days: 1 });
		}
		return data;
	});
}
