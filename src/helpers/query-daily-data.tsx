import { add } from "date-fns";
import getDayKey from "./get-day-key";
import { DailyDataType, DailyDataTypeDefinition } from "./daily-data-types";
import allTypeDefinitions from "./daily-data-types/all";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter } from "./daily-data-types/formatters";

export type DailyDataQueryResult = { [key: string]: number };
export type DailyDataProvider = (startDate: Date, endDate: Date) => Promise<DailyDataQueryResult>;
export type DailyDataAvailabilityCheck = (modifiedAfter?: Date) => Promise<boolean>;

let dailyDataTypes = new Map(
	allTypeDefinitions.map((typeDefinition) => [typeDefinition.type, typeDefinition])
);

// deprecated.  Instead use registerDailyDataTypeDefinition
export function registerDailyDataProvider(type: string, provider: DailyDataProvider, availabilityCheck: DailyDataAvailabilityCheck) {
	dailyDataTypes.set(type, {
		type: type,
		getLabel: () => type,
		dataProvider: provider,
		availabilityCheck: availabilityCheck,
		icon: <FontAwesomeSvgIcon icon={faPersonRunning} />,
		formatter: defaultFormatter,
		previewDataRange: [0, 10000]
	});
}

export function registerDailyDataTypeDefinition(typeDefinition: DailyDataTypeDefinition) {
	dailyDataTypes.set(typeDefinition.type, typeDefinition);
}

export function checkDailyDataAvailability(type: string, modifiedAfter?: Date) {
	var dailyDataType = dailyDataTypes.get(type);
	if (!dailyDataType) { throw "Unknown data type:" + type; }
	return dailyDataType.availabilityCheck(modifiedAfter);
}

export function queryDailyData(type: string, startDate: Date, endDate: Date, preview?: boolean) {
	if (preview) {
		return Promise.resolve(queryPreviewDailyData(type, startDate, endDate));
	}
	var dailyDataType = dailyDataTypes.get(type);
	if (!dailyDataType) { throw "Unknown data type:" + type; }
	return dailyDataType.dataProvider(startDate, endDate).then(function (data) {
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
	let range = getDailyDataTypeDefinition(type as DailyDataType).previewDataRange;

	//poor man's seeded javascript rng
	//just for generating a relatively large random integer from a string seed,
	//which then uses modulo to get a number in a range
	async function randomNumber(message: string) {
		const encoder = new TextEncoder();
		const data = encoder.encode(message);
		const hash = await crypto.subtle.digest("SHA-1", data);
		const hashArray = Array.from(new Uint8Array(hash)).map(t => t.toString());
		return parseInt(hashArray.reduce((accumulator, currentValue) => {
			return accumulator + currentValue
		}, ""));
	}

	while (startDate < endDate && startDate < new Date()) {
		var dayKey = getDayKey(startDate);
		var value: number = ((await randomNumber(dayKey + "_" + type)) % (range[1] - range[0])) + range[0];
		result[dayKey] = value;
		startDate = add(startDate, { days: 1 });
	}
	return result;
}

export function getAllDailyDataTypes() {
	return Array.from(dailyDataTypes.values());
}

let definitionLookup = new Map(
	allTypeDefinitions.map((typeDefinition) => [typeDefinition.type, typeDefinition])
);
export function getDailyDataTypeDefinition(dataType: string): DailyDataTypeDefinition {
	return definitionLookup.get(dataType)!;
}

allTypeDefinitions.forEach(function (typeDefinition) {
	registerDailyDataTypeDefinition(typeDefinition);
});