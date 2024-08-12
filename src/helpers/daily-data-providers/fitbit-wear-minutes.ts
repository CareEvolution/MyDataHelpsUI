import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";

export default function (startDate: Date, endDate: Date) {
	return queryAllDeviceData({
		namespace: "Fitbit",
		type: "HeartRateIntradayCount",
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}).then(function (result) {
		var data: { [key: string]: number } = {};
		result.forEach((d) => {
			if (!d.startDate) { return; }
			let minuteCount = parseInt(d.properties?.["MinuteCount"] || "0");
			if (minuteCount == 0) { return; }
			var dayKey = d.startDate!.substr(0, 10);
			data[dayKey] = minuteCount;
		});
		return data;
	});
}
