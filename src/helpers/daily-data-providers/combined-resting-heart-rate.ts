import { add } from "date-fns";
import {
    appleHealthRestingHeartRateDataProvider,
    fitbitRestingHeartRateDataProvider,
    garminRestingHeartRateDataProvider,
    healthConnectAverageRestingHeartRateDataProvider,
} from ".";
import getDayKey from "../get-day-key";
import { DataCollectionSettings } from "./data-collection-settings";

export default async function (startDate: Date, endDate: Date): Promise<Record<string, number>> {
	const providers: Promise<Record<string, number>>[] = [];

	const settings = await DataCollectionSettings.create();
	if (settings.isFitbitEnabled()) {
			providers.push(fitbitRestingHeartRateDataProvider(startDate, endDate));
	}
	if (settings.isGarminEnabled()) {
			providers.push(garminRestingHeartRateDataProvider(startDate, endDate));
	}
	if (settings.isAppleHealthEnabled("RestingHeartRate")) {
			providers.push(appleHealthRestingHeartRateDataProvider(startDate, endDate));
	}
	if (await settings.isHealthConnectEnabled("resting-heart-rate")) {
			providers.push(healthConnectAverageRestingHeartRateDataProvider(startDate, endDate));
	}

	if (!providers.length) {
		return {};
	}

	const values = await Promise.all(providers);
	const data: Record<string, number> = {};
	while (startDate < endDate) {
		let dayKey = getDayKey(startDate);
		let heartRates: number[] = [];
		values.forEach((value) => {
			if (value[dayKey] && value[dayKey] > 0) {
				heartRates.push(value[dayKey]);
			}
		});
		if (heartRates.length > 0) {
			data[dayKey] = Math.round(heartRates.reduce((a, b) => a + b) / heartRates.length);
		}
		startDate = add(startDate, { days: 1 });
	}
	return data;
}
