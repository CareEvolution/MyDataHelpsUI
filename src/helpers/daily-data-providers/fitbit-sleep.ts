import { add, formatISO, parseISO } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";

function querySleep(startDate: Date, endDate: Date, types: string[]) {
	return queryAllDeviceData({
		namespace: "Fitbit",
		type: types,
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}).then(function (ddp) {
		var data: { [key: string]: number } = {};
		ddp.forEach((d) => {
			if (!d.observationDate) { return; }
			var dataKey = formatISO(add(parseISO(d.observationDate)!, { hours: 6 })).substr(0, 10);
			if (!data[dataKey]) {
				data[dataKey] = 0;
			}
			data[dataKey] += parseFloat(d.value);
		});
		return data;
	});
}

export function totalSleepMinutes(startDate: Date, endDate: Date) {
	return querySleep(startDate, endDate, ["SleepLevelRem", "SleepLevelLight", "SleepLevelDeep", "SleepLevelAsleep"]);
}

export function remSleepMinutes(startDate: Date, endDate: Date) {
	return querySleep(startDate, endDate, ["SleepLevelRem"]);
}

export function lightSleepMinutes(startDate: Date, endDate: Date) {
	return querySleep(startDate, endDate, ["SleepLevelLight"]);
}

export function deepSleepMinutes(startDate: Date, endDate: Date) {
	return querySleep(startDate, endDate, ["SleepLevelDeep"]);
}