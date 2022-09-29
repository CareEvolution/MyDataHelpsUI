import { add } from "date-fns";
import queryAllDeviceData from "./query-all-device-data";
import queryFitbitSingleDailyValue from "./query-fitbit-single-daily-value";

export default function (startDate: Date, endDate: Date) {
	return queryFitbitSingleDailyValue("RestingHeartRate", startDate, endDate);
}
