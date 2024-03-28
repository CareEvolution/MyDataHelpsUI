import queryGarminSingleDailyValue from "./query-garmin-single-daily-value";

export function activeCalories(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("ActiveKilocalories", startDate, endDate);
}