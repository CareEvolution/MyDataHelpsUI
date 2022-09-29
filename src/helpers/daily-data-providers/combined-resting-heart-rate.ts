﻿import { add, parseISO } from "date-fns";
import { fitbitRestingHeartRateDataProvider } from ".";
import getDayKey from "../get-day-key";
import queryAllDeviceData from "./query-all-device-data";

export default function (startDate: Date, endDate: Date) {
	return queryAllDeviceData({
		namespace: "AppleHealth",
		type: "RestingHeartRate",
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}).then(function (ddp) {
		return fitbitRestingHeartRateDataProvider(startDate, endDate).then(function (fitbitData) {
			var dayValues: { [key: string]: number[] } = {};
			ddp.forEach((d) => {
				if (!d.startDate) { return; }
				var day = getDayKey(parseISO(d.startDate));
				var value = parseFloat(d.value);
				if (!dayValues[day]) {
					dayValues[day] = [];
				}
				dayValues[day].push(value);
			});

			var data: { [key: string]: number } = {};
			while (startDate < endDate) {
				var dayKey = getDayKey(startDate);
				if (fitbitData[dayKey]) {
					if (!dayValues[dayKey]) {
						dayValues[dayKey] = [];
					}
					dayValues[dayKey].push(fitbitData[dayKey]);
				}
				if (dayValues[dayKey]) {
					data[dayKey] = dayValues[dayKey].reduce((a, b) => a + b) / dayValues[dayKey].length;
				}
				startDate = add(startDate, { days: 1 });
			}
			return data;
		})
	});
}
