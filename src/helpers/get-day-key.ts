import { formatISO } from "date-fns";

export default function getDayKey(date: Date) {
	return formatISO(date).substr(0, 10);
}