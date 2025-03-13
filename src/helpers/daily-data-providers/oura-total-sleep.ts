import queryOuraSleep from './query-oura-sleep';

export default function (startDate: Date, endDate: Date) {
	// total sleep is in second, convert to minutes
	return queryOuraSleep(startDate, endDate, "total_sleep_duration", ["long_sleep", "sleep"]).then(data => {
		var result: { [key: string]: number } = {};
		Object.keys(data).forEach((key) => {
			result[key] = Math.round(data[key] / 60);
		});
		return result;
	});
}
