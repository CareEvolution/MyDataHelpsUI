import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";

function queryActivity(startDate: Date, endDate: Date, types: string[]) {
	return queryAllDeviceData({
		namespace: "Fitbit",
		type: types,
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}).then(function (ddp) {
		var data: { [key: string]: number } = {};
		ddp.forEach((d) => {
			if (!d.startDate) { return; }
			var dataKey = d.startDate!.substr(0, 10);
			if (!data[dataKey]) {
				data[dataKey] = 0;
			}
			data[dataKey] += parseInt(d.value);
		});
		return data;
	});
}

export function sedentaryMinutes(startDate: Date, endDate: Date) {
	return queryActivity(startDate, endDate, ["MinutesSedentary"]);
}

export function totalActiveMinutes(startDate: Date, endDate: Date) {
	return queryActivity(startDate, endDate, ["MinutesVeryActive", "MinutesFairlyActive", "MinutesLightlyActive"]);
}

export function lightlyActiveMinutes(startDate: Date, endDate: Date) {
	return queryActivity(startDate, endDate, ["MinutesLightlyActive"]);
}

export function fairlyActiveMinutes(startDate: Date, endDate: Date) {
	return queryActivity(startDate, endDate, ["MinutesFairlyActive"]);
}

export function veryActiveMinutes(startDate: Date, endDate: Date) {
	return queryActivity(startDate, endDate, ["MinutesVeryActive"]);
}