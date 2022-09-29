import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";

function queryHeartMinutes(startDate: Date, endDate: Date, zone?: string) {
	return queryAllDeviceData({
		namespace: "Fitbit",
		type: "HeartRateZone",
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}).then(function (ddp) {
		var data: { [key: string]: number } = {};
		ddp.forEach((d) => {
			if (d.value == "Out of Range") { return; }
			if (zone && d.value != zone) { return;  }
			if (!d.properties || !d.properties["Minutes"]) { return; }
			if (!d.startDate) { return; }
			var dataKey = d.startDate!.substr(0, 10);
			if (!data[dataKey]) {
				data[dataKey] = 0;
			}
			data[dataKey] += parseInt(d.properties["Minutes"]);
		});
		return data;
	});
}

export function totalElevatedHeartRateMinutes(startDate: Date, endDate: Date) {
	return queryHeartMinutes(startDate, endDate);
}

export function peakMinutes(startDate: Date, endDate: Date) {
	return queryHeartMinutes(startDate, endDate, "Peak");
}

export function cardioMinutes(startDate: Date, endDate: Date) {
	return queryHeartMinutes(startDate, endDate, "Cardio");
}

export function fatBurnMinutes(startDate: Date, endDate: Date) {
	return queryHeartMinutes(startDate, endDate, "Fat Burn");
}