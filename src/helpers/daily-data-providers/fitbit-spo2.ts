import queryFitbitSingleDailyValue from "./query-fitbit-single-daily-value";

export default function (startDate: Date, endDate: Date) {
	return queryFitbitSingleDailyValue("SpO2", startDate, endDate);
}
