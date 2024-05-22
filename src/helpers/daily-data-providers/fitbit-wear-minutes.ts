import queryFitbitSingleDailyValue from "./query-fitbit-single-daily-value";

export default function (startDate: Date, endDate: Date) {
	return queryFitbitSingleDailyValue("HeartRateIntradayCount", startDate, endDate);
}
