import queryOuraDailyActivity from './query-oura-daily-activity';

export default function (startDate: Date, endDate: Date) {
	return queryOuraDailyActivity(startDate, endDate, "steps");
}
