import { add, parseISO } from "date-fns";
import getDayKey from "../get-day-key";
import queryAllDeviceData from "./query-all-device-data";

export default function (startDate: Date, endDate: Date) {
	return queryAllDeviceData({
		namespace: "AppleHealth",
		type: ["HourlyMaximumHeartRate", "HourlyMinimumHeartRate"],
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}).then(function (ddp) {
		var dailyMinMax: { [key: string]: { [key: string]: number } } = {};
		ddp.forEach((d) => {
			if (!d.startDate) { return; }
			var day = getDayKey(parseISO(d.startDate));
			var value = parseFloat(d.value);
			if (d.type == "HourlyMaximumHeartRate") {
				if (!dailyMinMax[day]) {
					dailyMinMax[day] = { "MaxHeartRate": value };
				} else if (!dailyMinMax[day]["MaxHeartRate"] || value > dailyMinMax[day]["MaxHeartRate"]) {
					dailyMinMax[day]["MaxHeartRate"] = value;
				}
			}
			if (d.type == "HourlyMinimumHeartRate") {
				if (!dailyMinMax[day]) {
					dailyMinMax[day] = { "MinHeartRate": value };
				} else if (!dailyMinMax[day]["MinHeartRate"] || value < dailyMinMax[day]["MinHeartRate"]) {
					dailyMinMax[day]["MinHeartRate"] = value;
				}
			}
		});

		var data: { [key: string]: number } = {};
		while (startDate < endDate) {
			var dailyData = dailyMinMax[getDayKey(startDate)];
			if (dailyData && dailyData["MaxHeartRate"] && dailyData["MinHeartRate"]) {
				data[getDayKey(startDate)] = dailyData["MaxHeartRate"] - dailyData["MinHeartRate"];
			}
			startDate = add(startDate, { days: 1 });
		}
		return data;
	});
}
