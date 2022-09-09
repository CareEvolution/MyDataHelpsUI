import { add, formatISO, parseISO } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";

export default function (startDate: Date, endDate: Date) {
	return queryAllDeviceData({
		namespace: "AppleHealth",
		type: "HourlyDistanceWalkingRunning",
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}).then(function (ddp) {
		var data: { [key: string]: number } = {};

		ddp.forEach((d) => {
			if (!d.startDate) { return; }
			var day = formatISO(parseISO(d.startDate)).substring(0, 10);
			if (!data[day]) {
				data[day] = 0;
			}
			data[day] += parseFloat(d.value);
		});

		return data;
	});
}
