import { add, startOfToday } from "date-fns";
import getDayKey from "./get-day-key";
import { DailyDataTypeDefinition } from "./daily-data-types";
import allTypeDefinitions from "./daily-data-types/all";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter } from "./daily-data-types/formatters";
import { predictableRandomNumber } from "./predictableRandomNumber";

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

export async function queryPreviewDailyData(type: string, startDate: Date, endDate: Date, fillPercentage?: number) {
	const result: DailyDataQueryResult = {};

	const range = getDailyDataTypeDefinition(type).previewDataRange;

	// Modulo repeatable random numbers to get a value in range.
	let currentDate = startDate;
	while (currentDate <= endDate && currentDate < new Date()) {
		const currentDayKey = getDayKey(currentDate);
		if (!fillPercentage || ((await predictableRandomNumber(currentDayKey + "_" + type + "_fill") % 100) / 100) <= fillPercentage) {
			result[currentDayKey] = ((await predictableRandomNumber(currentDayKey + "_" + type)) % (range[1] - range[0])) + range[0];
		}
		currentDate = add(currentDate, { days: 1 });
	}

	return result;
}

export function getAllDailyDataTypes() {
	return Array.from(dailyDataTypes.values());
}

export function getDailyDataTypeDefinition(dataType: string): DailyDataTypeDefinition {
	return dailyDataTypes.get(dataType)!;
}

allTypeDefinitions.forEach(function (typeDefinition) {
	registerDailyDataTypeDefinition(typeDefinition);
});