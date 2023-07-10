import queryGarminSingleDailyValue from "./query-garmin-single-daily-value";

export default function (startDate: Date, endDate: Date) {
	return queryGarminSingleDailyValue("FloorsClimbed", startDate, endDate);
}
