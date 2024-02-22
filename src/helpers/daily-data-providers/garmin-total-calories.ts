import queryGarminTotalDailyValues from "./query-garmin-total-daily-values";

export function totalCalories(startDate: Date, endDate: Date) {
	return queryGarminTotalDailyValues(["ActiveKilocalories", "BmrKilocalories"], startDate, endDate);
}