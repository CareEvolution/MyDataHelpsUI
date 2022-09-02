import { DeviceDataNamespace, DeviceDataPoint } from "@careevolution/mydatahelps-js";
import add from 'date-fns/add'

export function getPreviewData(deviceDataType: string, deviceDataNamespace: DeviceDataNamespace, year: number, month: number) {
	if (deviceDataNamespace == "Fitbit") {
		if (deviceDataType == "Steps") {
			return getPreviewFitbitSteps(year, month);
		}
		if (deviceDataType == "RestingHeartRate") {
			return getPreviewFitbitRestingHeartRates(year, month);
		}
	}
	if (deviceDataNamespace == "AppleHealth") {
		if (deviceDataType == "HourlySteps") {
			return getPreviewAppleHealthSteps(year, month);
		}
		if (deviceDataType == "HourlyDistanceWalkingRunning") {
			return getPreviewAppleHealthDistance(year, month);
		}
	}
	if (deviceDataNamespace == "GoogleFit") {
		if (deviceDataType == "Steps") {
			return getPreviewGoogleFitSteps(year, month);
		}
	}
}

function getPreviewFitbitSteps(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);

	var monthEnd = add(date, { months: 1 });

	var result: DeviceDataPoint[] = [];
	while (date < monthEnd) {
		result.push({
			id: "1",
			identifier: "1",
			// @ts-ignore
			observationDate: add(date, { days: 1 }).toISOString(),
			namespace: "Fitbit",
			insertedDate: "empty",
			modifiedDate: "empty",
			properties: {},
			source: {
				identifier: "empty",
				properties: {}
			},
			type: "Steps",
			value: (3000 + Math.floor(Math.random() * 10000)).toString(),
			startDate: date.toISOString()
		})
		date = add(date, { days: 1 });
	}
	return result;
}

function getPreviewFitbitRestingHeartRates(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);

	var monthEnd = add(date, { months: 1 });

	var result: DeviceDataPoint[] = [];
	while (date < monthEnd) {
		result.push({
			id: "1",
			identifier: "1",
			// @ts-ignore
			observationDate: add(date, { days: 1 }).toISOString(),
			namespace: "Fitbit",
			insertedDate: "empty",
			modifiedDate: "empty",
			properties: {},
			source: {
				identifier: "empty",
				properties: {}
			},
			type: "RestingHeartRate",
			value: (60 + Math.floor(Math.random() * 5)).toString(),
			startDate: date.toISOString()
		});
		date = add(date, { days: 1 });
	}
	return result;
}


function getPreviewAppleHealthSteps(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);

	var monthEnd = add(date, { months: 1 });

	var result: DeviceDataPoint[] = [];
	while (date < monthEnd) {
		result.push({
			id: "1",
			identifier: "1",
			// @ts-ignore
			observationDate: add(date, { hours: 1 }).toISOString(),
			namespace: "AppleHealth",
			insertedDate: "empty",
			modifiedDate: "empty",
			properties: {},
			source: {
				identifier: "empty",
				properties: {}
			},
			type: "HourlySteps",
			value: (Math.floor(Math.random() * 500)).toString(),
			startDate: date.toISOString()
		})
		date = add(date, { hours: 1 });
	}
	return result;
}


function getPreviewAppleHealthDistance(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);

	var monthEnd = add(date, { months: 1 });

	var result: DeviceDataPoint[] = [];
	while (date < monthEnd) {
		result.push({
			id: "1",
			identifier: "1",
			// @ts-ignore
			observationDate: add(date, { hours: 1 }).toISOString(),
			namespace: "AppleHealth",
			insertedDate: "empty",
			modifiedDate: "empty",
			properties: {},
			source: {
				identifier: "empty",
				properties: {}
			},
			type: "HourlyDistanceWalkingRunning",
			value: (Math.floor(Math.random() * 500)).toString(),
			startDate: date.toISOString(),
			units: "m"
		})
		date = add(date, { hours: 1 });
	}
	return result;
}

function getPreviewGoogleFitSteps(year: number, month: number) {
	var date = new Date(year, month, 1, 0, 0, 0, 0);

	var monthEnd = add(date, { months: 1 });

	var result: DeviceDataPoint[] = [];
	while (date < monthEnd) {
		result.push({
			id: "1",
			identifier: "1",
			// @ts-ignore
			observationDate: add(date, { hours: 1 }).toISOString(),
			namespace: "GoogleFit",
			insertedDate: "empty",
			modifiedDate: "empty",
			properties: {},
			source: {
				identifier: "empty",
				properties: {}
			},
			type: "Steps",
			value: (Math.floor(Math.random() * 500)).toString(),
			startDate: date.toISOString()
		})
		date = add(date, { hours: 1 });
	}
	return result;
}