import { add } from "date-fns";
import { appleHealthRestingHeartRateDataProvider, fitbitRestingHeartRateDataProvider, garminRestingHeartRateDataProvider } from ".";
import getDayKey from "../get-day-key";
import MyDataHelps from "@careevolution/mydatahelps-js";

export default function (startDate: Date, endDate: Date) {
	let providers: Promise<{ [key: string]: number }>[] = [];

	return MyDataHelps.getDataCollectionSettings().then((settings) => {
		if (settings.fitbitEnabled) {
			providers.push(fitbitRestingHeartRateDataProvider(startDate, endDate));
		}
		if (settings.garminEnabled) {
			providers.push(garminRestingHeartRateDataProvider(startDate, endDate));
		}
		if (settings.queryableDeviceDataTypes.find(s => s.namespace == "AppleHealth" && s.type == "RestingHeartRate")) {
			providers.push(appleHealthRestingHeartRateDataProvider(startDate, endDate));
		}

		if (!providers.length) {
			return {};
		}

		return Promise.all(providers).then((values) => {
			var data: { [key: string]: number } = {};
			while (startDate < endDate) {
				var dayKey = getDayKey(startDate);
				var heartRates: number[] = [];
				values.forEach((value) => {
					if (value[dayKey] && value[dayKey] > 0) {
						heartRates.push(value[dayKey]);
					}
				});
				if (heartRates.length > 0) {
					data[dayKey] = heartRates.reduce((a,b) => a+b) / heartRates.length; // rounding?
				}
				startDate = add(startDate, { days: 1 });
			}
			return data;
		});
	});
}
