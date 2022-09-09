import { add, formatISO, parseISO } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";

export default function (startDate: Date, endDate: Date) {
	return queryAllDeviceData({
		namespace: "AppleHealth",
		type: "HourlyMaximumHeartRate",
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}).then(function (ddp) {
		var data: { [key: string]: number } = {};
		ddp.forEach((d) => {
			if (!d.startDate) { return; }
			var day = formatISO(parseISO(d.startDate)).substring(0, 10);
			var value = parseFloat(d.value);
			if (!data[day]) {
				data[day] = value;
			} else if (value > data[day]) {
				data[day] = value;
			}
		});
		return data;
	});
}
