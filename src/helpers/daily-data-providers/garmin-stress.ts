import queryGarminSingleDailyValue from "./query-garmin-single-daily-value";

export function maxStressLevel(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("MaxStressLevel", startDate, endDate);
}

export function averageStressLevel(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("AverageStressLevel", startDate, endDate);
}

export function totalStressMinutes(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("StressDurationInSeconds", startDate, endDate, 60);
}

export function lowStressMinutes(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("LowStressDurationInSeconds", startDate, endDate, 60);
}

export function mediumStressMinutes(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("MediumStressDurationInSeconds", startDate, endDate, 60);
}

export function highStressMinutes(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("HighStressDurationInSeconds", startDate, endDate, 60);
}