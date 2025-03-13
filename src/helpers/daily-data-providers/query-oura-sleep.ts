import { add } from "date-fns";
import queryAllDeviceDataV2 from "../query-all-device-data-v2";
import { DeviceDataV2Query } from "@careevolution/mydatahelps-js";

export type OuraSleepType = "long_sleep" | "sleep" | "late_nap" | "deleted" | "rest";

export default function (startDate: Date, endDate: Date, type: string, sleepTypeToInclude: OuraSleepType[]) {
	let query: DeviceDataV2Query = {
		namespace: "Oura",
		type: "sleep",
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	};
	return queryAllDeviceDataV2(query).then(dataPoints => {
		var data: { [key: string]: number } = {};
		dataPoints.forEach((d) => {
			if (!d.properties) { return; }
			if (!d.properties['day']) { return; }
			if (sleepTypeToInclude.length > 0) {
				if (!d.properties['type'] || !sleepTypeToInclude.includes(d.properties['type'])) { return; } 
			}	
			if (!d.properties[type]) { return; }
			if (parseInt(d.properties[type]) <= 0) { return; }
			var dayKey = d.properties['day'];
			const existingValue = data[dayKey] || 0;
			data[dayKey] = Math.round(Number.parseFloat(d.properties[type])) + existingValue;
		});
		return data;
	});
}