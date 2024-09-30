import { add, endOfDay, formatISO, parseISO, startOfDay } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import queryAllDeviceDataV2Aggregates from "../query-all-device-data-v2-aggregates";
import { DeviceDataPointQuery, DeviceDataV2AggregateQuery } from "@careevolution/mydatahelps-js/types";

export function maxHeartRate (startDate: Date, endDate: Date): Promise<{ [key: string]: number }> {
	const v2params: DeviceDataV2AggregateQuery = {
        namespace: 'AppleHealth',
        type: 'Heart Rate',
        observedAfter: startOfDay(startDate).toISOString(),
        observedBefore: endOfDay(endDate).toISOString(),
        intervalAmount: 1,
        intervalType: 'Days',
        aggregateFunctions: ['max']
    };

	const v1params: DeviceDataPointQuery = {
		namespace: "AppleHealth",
		type: "HourlyMaximumHeartRate",
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}

    return Promise.allSettled([ queryAllDeviceDataV2Aggregates(v2params), queryAllDeviceData(v1params) ]).then(queryResults => {
		var data: { [key: string]: number } = {};
		if (queryResults[0].status === 'fulfilled') {
			queryResults[0].value.forEach((aggregate) => {
				data[formatISO(parseISO(aggregate.date)).substring(0, 10)] = aggregate.statistics['max'];
			});
		}
		if (queryResults[1].status === 'fulfilled') {
			queryResults[1].value.forEach((d) => {
				if (!d.startDate) { return; }
				var day = formatISO(parseISO(d.startDate)).substring(0, 10);
				var value = parseFloat(d.value);
				if (!data[day]) {
					data[day] = value;
				} else if (value > data[day]) {
					data[day] = value;
				}
			});
		}
		return data;

    }, () => ({} as { [key: string]: number }));
}

export function minHeartRate (startDate: Date, endDate: Date): Promise<{ [key: string]: number }> {
	const v2params: DeviceDataV2AggregateQuery = {
        namespace: 'AppleHealth',
        type: 'Heart Rate',
        observedAfter: startOfDay(startDate).toISOString(),
        observedBefore: endOfDay(endDate).toISOString(),
        intervalAmount: 1,
        intervalType: 'Days',
        aggregateFunctions: ['min']
    };

	const v1params: DeviceDataPointQuery = {
		namespace: "AppleHealth",
		type: "HourlyMinimumHeartRate",
		observedAfter: add(startDate, { days: -1 }).toISOString(),
		observedBefore: add(endDate, { days: 1 }).toISOString()
	}

    return Promise.allSettled([ queryAllDeviceDataV2Aggregates(v2params), queryAllDeviceData(v1params) ]).then(queryResults => {
		var data: { [key: string]: number } = {};
		if (queryResults[0].status === 'fulfilled') {
			queryResults[0].value.forEach((aggregate) => {
				data[formatISO(parseISO(aggregate.date)).substring(0, 10)] = aggregate.statistics['min'];
			});
		}
		if (queryResults[1].status === 'fulfilled') {
			queryResults[1].value.forEach((d) => {
				if (!d.startDate) { return; }
				var day = formatISO(parseISO(d.startDate)).substring(0, 10);
				var value = parseFloat(d.value);
				if (!data[day]) {
					data[day] = value;
				} else if (value < data[day] && value > 0) {
					data[day] = value;
				}
			});
		}
		return data;

    }, () => ({} as { [key: string]: number }));
}

export function averageHeartRate (startDate: Date, endDate: Date): Promise<{ [key: string]: number }> {
	const v2params: DeviceDataV2AggregateQuery = {
        namespace: 'AppleHealth',
        type: 'Heart Rate',
        observedAfter: startOfDay(startDate).toISOString(),
        observedBefore: endOfDay(endDate).toISOString(),
        intervalAmount: 1,
        intervalType: 'Days',
        aggregateFunctions: ['average']
    };

    return Promise.allSettled([ queryAllDeviceDataV2Aggregates(v2params) ]).then(queryResults => {
		var data: { [key: string]: number } = {};
		if (queryResults[0].status === 'fulfilled') {
			queryResults[0].value.forEach((aggregate) => {
				data[formatISO(parseISO(aggregate.date)).substring(0, 10)] = aggregate.statistics['average'];
			});
		}
		
		return data;

    }, () => ({} as { [key: string]: number }));
}

