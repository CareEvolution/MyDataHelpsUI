import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";

export default function (type: string, startDate: Date, endDate: Date) {
	return queryAllDeviceData({
		namespace: "Garmin",
		type: "Daily",
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}).then(function (result) {
		var data: { [key: string]: number } = {};
		result.forEach((d) => {
			if (!d.startDate) { return; }
			if (!d.properties) { return; }
			if (!d.properties[type]) { return; }
			var dayKey = d.startDate!.substring(0, 10);
			data[dayKey] = Math.round(parseFloat(d.properties[type]));
		});
		return data;
	});
}
