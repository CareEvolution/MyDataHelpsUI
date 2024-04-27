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

export function queryDailyData(type: string, startDate: Date, endDate: Date) {
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

let definitionLookup = new Map(
	allTypeDefinitions.map((typeDefinition) => [typeDefinition.type, typeDefinition])
);
export function getDailyDataTypeDefinition(dataType: DailyDataType): DailyDataTypeDefinition {
	return definitionLookup.get(dataType)!;
}

allTypeDefinitions.forEach(function (typeDefinition) {
	registerDailyDataProvider(typeDefinition.type, typeDefinition.dataProvider, typeDefinition.availabilityCheck);
});