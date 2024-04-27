import { add } from "date-fns";
import getDayKey from "./get-day-key";
import { DailyDataType, DailyDataTypeDefinition } from "./daily-data-types";
import allTypeDefinitions from "./daily-data-types/all";

export type DailyDataQueryResult = { [key: string]: number };
export type DailyDataProvider = (startDate: Date, endDate: Date) => Promise<DailyDataQueryResult>;
export type DailyDataAvailabilityCheck = (modifiedAfter?: Date) => Promise<boolean>;

var dailyDataTypes: { [key: string]: { provider: DailyDataProvider, availabilityCheck: DailyDataAvailabilityCheck } } = {};

export function registerDailyDataProvider(type: string, provider: DailyDataProvider, availabilityCheck: DailyDataAvailabilityCheck) {
	dailyDataTypes[type] = { provider: provider, availabilityCheck: availabilityCheck };
}

export function checkDailyDataAvailability(type: string, modifiedAfter?: Date) {
	var dailyDataType = dailyDataTypes[type];
	if (!dailyDataType) { throw "Unknown data type:" + type; }
	return dailyDataType.availabilityCheck(modifiedAfter);
}

export function queryDailyData(type: string, startDate: Date, endDate: Date, preview?: boolean) {
	if (preview) {
		return Promise.resolve(queryPreviewDailyData(type, startDate, endDate));
	}
	var dailyDataType = dailyDataTypes[type];
	return dailyDataType.provider(startDate, endDate).then(function (data) {
		var result: DailyDataQueryResult = {};
		while (startDate < endDate) {
			var dayKey = getDayKey(startDate);
			if (data[dayKey]) {
				result[dayKey] = data[dayKey];
			}
			startDate = add(startDate, { days: 1 });
		}
		return result;
	});
}

export async function queryPreviewDailyData(type: string, startDate: Date, endDate: Date) {
	var result: DailyDataQueryResult = {};
	let range = [0, 10000];
	if (Object.values<string>(DailyDataType).includes(type)) {
		range = getDailyDataTypeDefinition(type as DailyDataType).previewDataRange;
	}

	//poor man's seeded javascript rng
	async function randomNumber(message: string) {
		const encoder = new TextEncoder();
		const data = encoder.encode(message);
		const hash = await crypto.subtle.digest("SHA-1", data);
		const hashArray = Array.from(new Uint8Array(hash)).map(t => t.toString());
		return parseInt(hashArray.reduce((accumulator, currentValue) => {
			return accumulator + currentValue
		}, ""));
	}

	while (startDate < endDate) {
		var dayKey = getDayKey(startDate);
		var value = ((await randomNumber(dayKey + "_" + type)) % (range[1] - range[0])) + range[0];
		if (startDate > new Date()) {
			value = 0;
		}
		result[dayKey] = value;
		startDate = add(startDate, { days: 1 });
	}
	console.log(result);
	return result;
}


let definitionLookup = new Map(
	allTypeDefinitions.map((typeDefinition) => [typeDefinition.type, typeDefinition])
);
export function getDailyDataTypeDefinition(dataType: DailyDataType): DailyDataTypeDefinition {
	return definitionLookup.get(dataType)!;
}

allTypeDefinitions.forEach(function (typeDefinition) {
	registerDailyDataProvider(typeDefinition.type, typeDefinition.dataProvider, typeDefinition.availabilityCheck);
});