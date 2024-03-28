import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import { DeviceDataPoint } from "@careevolution/mydatahelps-js";

export default function (types: string[], startDate: Date, endDate: Date, divideBy?: number) {
	return queryAllDeviceData({
		namespace: "Garmin",
		type: "Daily",
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}).then(function (result) {
		var data: { [key: string]: number } = {};

		var getProperty = function (d: DeviceDataPoint, type: string) {
				if (!d.properties) { return; }
				if (!d.properties[type]) { return; }

				//Garmin average stress level is -2 if you are not wearing the device
				if (parseInt(d.properties[type]) <= 0) { return; }
				return Math.round(parseFloat(d.properties[type]));
		}

		result.forEach((d) => {
			types.forEach(type => {
				if (!d.startDate) { return; }
				if (!d.properties) { return; }
				if (!d.properties[type]) { return; }
				//Garmin average stress level is -2 if you are not wearing the device
				if (parseInt(d.properties[type]) <= 0) { return; }
				var dayKey = d.startDate!.substring(0, 10);
				var val = Math.round(parseFloat(d.properties[type]));
				if (divideBy) {
					val = Math.round(val / divideBy);
				}

				if (data[dayKey]) {
					data[dayKey] += val;
				}
				else {
					data[dayKey] = val;
				}
			});
		});
		return data;
	});
}
