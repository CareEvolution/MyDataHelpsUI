import { add } from "date-fns";
import { appleHealthStepsDataProvider, fitbitStepsDataProvider, garminStepsDataProvider } from ".";
import getDayKey from "../get-day-key";
import MyDataHelps from "@careevolution/mydatahelps-js";

export default function (startDate: Date, endDate: Date) {
	let providers: Promise<{ [key: string]: number }>[] = [];

	return MyDataHelps.getDataCollectionSettings().then((settings) => {
		if (settings.fitbitEnabled) {
			providers.push(fitbitStepsDataProvider(startDate, endDate));
		}
		if (settings.garminEnabled) {
			providers.push(garminStepsDataProvider(startDate, endDate));
		}
		if (settings.queryableDeviceDataTypes.find(s => s.namespace == "AppleHealth" && s.type == "HourlySteps")) {
			providers.push(appleHealthStepsDataProvider(startDate, endDate));
		}

		if (!providers.length) {
			return {};
		}

		return Promise.all(providers).then((values) => {
			var data: { [key: string]: number } = {};
			while (startDate < endDate) {
				var dayKey = getDayKey(startDate);
				var steps: number | null = null;
				values.forEach((value) => {
					if (value[dayKey] || steps == null || steps < value[dayKey]) {
						steps = value[dayKey];
					}
				});
				if (steps) {
					data[dayKey] = steps;
				}
				startDate = add(startDate, { days: 1 });
			}
			return data;
		});
	});


}
