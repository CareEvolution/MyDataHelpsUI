import queryGarminSingleDailyValue from "./query-garmin-single-daily-value";

export function activeMinutes(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("ActiveTimeInSeconds", startDate, endDate, 60);
}