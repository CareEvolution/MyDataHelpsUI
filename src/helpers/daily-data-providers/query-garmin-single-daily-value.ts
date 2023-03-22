import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";

export default function (type: string, startDate: Date, endDate: Date) {
	return queryAllDeviceData({
		namespace: "Garmin",
		type: type,
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}).then(function (result) {
		var data: { [key: string]: number } = {};
		result.forEach((d) => {
			if (!d.startDate) { return; }
			if (parseInt(d.value) == 0) { return; }
			var dayKey = d.startDate!.substring(0, 10);
			data[dayKey] = Math.round(parseFloat(d.value));
		});
		return data;
	});
}
