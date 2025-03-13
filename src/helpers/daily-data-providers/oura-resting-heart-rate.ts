import queryOuraSleep from "./query-oura-sleep";


export default function (startDate: Date, endDate: Date) {
	return queryOuraSleep(startDate, endDate, "lowest_heart_rate", ["long_sleep"]);
}