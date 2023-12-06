import queryGarminSingleDailyValue from "./query-garmin-single-daily-value";

export function restingCalories(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("BmrKilocalories", startDate, endDate);
}