import { add } from "date-fns";
import { appleHealthRestingHeartRateDataProvider, fitbitRestingHeartRateDataProvider, garminRestingHeartRateDataProvider, ouraRestingHeartRateDataProvider } from ".";
import getDayKey from "../get-day-key";
import MyDataHelps from "@careevolution/mydatahelps-js";

export default function (startDate: Date, endDate: Date) {
	let providers: Promise<{ [key: string]: number }>[] = [];

	return Promise.all([MyDataHelps.getDataCollectionSettings(), MyDataHelps.getDeviceDataV2AllDataTypes()]).then(([settings, deviceDataV2Types]) => {
		if (settings.fitbitEnabled) {
			providers.push(fitbitRestingHeartRateDataProvider(startDate, endDate));
		}
		if (settings.garminEnabled) {
			providers.push(garminRestingHeartRateDataProvider(startDate, endDate));
		}
		if (settings.ouraEnabled && deviceDataV2Types.some(
			ddt =>
				ddt.enabled &&
				ddt.namespace === "Oura" &&
				ddt.type === "sleep"
		)) {
			providers.push(ouraRestingHeartRateDataProvider(startDate, endDate));
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
					data[dayKey] = Math.round( heartRates.reduce((a,b) => a+b) / heartRates.length );
				}
				startDate = add(startDate, { days: 1 });
			}
			return data;
		});
	});
}
