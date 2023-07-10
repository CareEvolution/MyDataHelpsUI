import queryGarminSingleDailyValue from "./query-garmin-single-daily-value";

export function restingHeartRate(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("RestingHeartRateInBeatsPerMinute", startDate, endDate);
}

export function minHeartRate(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("MinHeartRateInBeatsPerMinute", startDate, endDate);
}

export function maxHeartRate(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("MaxHeartRateInBeatsPerMinute", startDate, endDate);
}

export function averageHeartRate(startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("AverageHeartRateInBeatsPerMinute", startDate, endDate);
}