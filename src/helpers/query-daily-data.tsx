import { add } from "date-fns";
import getDayKey from "./get-day-key";
import { DailyDataTypeDefinition } from "./daily-data-types";
import allTypeDefinitions from "./daily-data-types/all";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { defaultFormatter } from "./daily-data-types/formatters";
import { predictableRandomNumber } from "./predictableRandomNumber";
import { combineResultsUsingFirstValue } from "./daily-data-providers/daily-data";

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

function parseDailyDataTypes(type: string) : DailyDataTypeDefinition[] {
	const findDailyDataType = (type: string) : DailyDataTypeDefinition => {
		const dailyDataType = dailyDataTypes.get(type);
		if (!dailyDataType) {
			throw new Error("Unknown data type: " + type);
		}
		return dailyDataType;
	};

	if ( type.startsWith( "Custom:" )){
		return (JSON.parse(type.substring(7)) as string[]).map(findDailyDataType);
	}

	return [findDailyDataType(type)];
}

export async function checkDailyDataAvailability(type: string, modifiedAfter?: Date): Promise<boolean> {
	for (let dailyDataType of parseDailyDataTypes(type)) {
		if (await dailyDataType.availabilityCheck(modifiedAfter)) {
			return true;
		}
	}
	return false;
}

export async function queryDailyData(type: string, startDate: Date, endDate: Date, preview?: boolean): Promise<DailyDataQueryResult> {
	if (preview) {
		return await queryPreviewDailyData(type, startDate, endDate);
	}
    const dataProviders = parseDailyDataTypes(type).map(dailyDataType => dailyDataType.dataProvider(startDate, endDate));
    return combineResultsUsingFirstValue(startDate, endDate, await Promise.all(dataProviders));
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

export function getDailyDataTypeDefinition(type: string): DailyDataTypeDefinition {
	return parseDailyDataTypes(type)[0];
}

allTypeDefinitions.forEach(function (typeDefinition) {
	registerDailyDataTypeDefinition(typeDefinition);
});