import { add, endOfDay, formatISO, parseISO, startOfDay } from "date-fns";
import queryAllDeviceDataV2Aggregates from "../query-all-device-data-v2-aggregates";
import { DeviceDataV2AggregateQuery } from "@careevolution/mydatahelps-js/types";

export function fitbitMaxHeartRate (startDate: Date, endDate: Date): Promise<{ [key: string]: number }> {
	const v2params: DeviceDataV2AggregateQuery = {
        namespace: 'Fitbit',
        type: 'activities-heart-intraday',
        observedAfter: startOfDay(startDate).toISOString(),
        observedBefore: endOfDay(endDate).toISOString(),
        intervalAmount: 1,
        intervalType: 'Days',
        aggregateFunctions: ['max']
    };

    return Promise.allSettled([ queryAllDeviceDataV2Aggregates(v2params) ]).then(queryResults => {
		var data: { [key: string]: number } = {};
		if (queryResults[0].status === 'fulfilled') {
			queryResults[0].value.forEach((aggregate) => {
				data[formatISO(parseISO(aggregate.date)).substring(0, 10)] = aggregate.statistics['max'];
			});
		}
		
		return data;

    }, () => ({} as { [key: string]: number }));
}

export function fitbitMinHeartRate (startDate: Date, endDate: Date): Promise<{ [key: string]: number }> {
	const v2params: DeviceDataV2AggregateQuery = {
        namespace: 'Fitbit',
        type: 'activities-heart-intraday',
        observedAfter: startOfDay(startDate).toISOString(),
        observedBefore: endOfDay(endDate).toISOString(),
        intervalAmount: 1,
        intervalType: 'Days',
        aggregateFunctions: ['min']
    };

    return Promise.allSettled([ queryAllDeviceDataV2Aggregates(v2params) ]).then(queryResults => {
		var data: { [key: string]: number } = {};
		if (queryResults[0].status === 'fulfilled') {
			queryResults[0].value.forEach((aggregate) => {
				data[formatISO(parseISO(aggregate.date)).substring(0, 10)] = aggregate.statistics['min'];
			});
		}
		
		return data;

    }, () => ({} as { [key: string]: number }));
}

export function fitbitAverageHeartRate (startDate: Date, endDate: Date): Promise<{ [key: string]: number }> {
	const v2params: DeviceDataV2AggregateQuery = {
        namespace: 'Fitbit',
        type: 'activities-heart-intraday',
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

