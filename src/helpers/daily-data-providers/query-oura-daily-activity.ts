import { add } from "date-fns";
import queryAllDeviceDataV2 from "../query-all-device-data-v2";
import { DeviceDataV2Query } from "@careevolution/mydatahelps-js";

export default function (startDate: Date, endDate: Date, type: string) {
    const query: DeviceDataV2Query = {
        namespace: "Oura",
        type: "daily-activity",
        observedAfter: add(startDate, { days: -1 }).toISOString(),
        observedBefore: add(endDate, { days: 1 }).toISOString()
    };
    return queryAllDeviceDataV2(query).then(dataPoints => {
        var data: { [key: string]: number } = {};
        dataPoints.forEach((d) => {
            if (!d.observationDate) { return; }
            if (!d.properties) { return; }
            if (!d.properties[type]) { return; }
            if (parseInt(d.properties[type]) <= 0) { return; }
            var dayKey = d.observationDate!.substring(0, 10);
            data[dayKey] = Math.round(parseFloat(d.properties[type]));
        });
        return data;
    });
}