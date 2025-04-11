import queryOuraSleep from './query-oura-sleep';

export default async function (startDate: Date, endDate: Date): Promise<Record<string, number>> {
	// total sleep is in seconds, convert to minutes
	const data = await queryOuraSleep(startDate, endDate, "total_sleep_duration", ["long_sleep"]);
	const result: Record<string, number> = {};
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			result[key] = Math.round(data[key] / 60);
		}
	}
	return result;
}
