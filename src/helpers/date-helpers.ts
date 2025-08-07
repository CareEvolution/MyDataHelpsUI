import { add, Duration, isSameDay, sub, Day, parseISO, formatRelative, formatDistanceToNow } from "date-fns";
import language from "./language";
import { formatDateForLocale, getDateLocale, getIntlLocale, capitalizeFirstLetterForLocale } from "./locale";

/** Ensures we have a Date object. If the param is already a Date, it passes through unchanged.
 *  If it's a string, it will be converted to a Date.
 *  If the date string is undefined or invalid, it will return undefined.
 */
export function toDate(dateOrDateString: string | Date | undefined): Date | undefined {
	var date;
	if (!dateOrDateString) {
		return undefined;
	}
	else if (typeof (dateOrDateString) === 'string') {
		date = parseISO(dateOrDateString);
		// date-fns returns "Invalid Date" when it couldn't parse.
		if (!date || (date.toString() === "Invalid Date")) {
			return undefined;
		}
	} else {
		date = dateOrDateString;
	}
	return date;
}

/** Number of days in the month.
 * @param iMonth 0-indexed month number
 */
export function daysInMonth(iYear: number, iMonth: number) {
	return 32 - new Date(iYear, iMonth, 32).getDate();
}

/** List of dates in the specified month
 * @param iMonth 0-indexed month number
 */
export function getDatesForMonth(iYear: number, iMonth: number) {
	var monthDays: Date[] = [];
	for (var i = 1; i < daysInMonth(iYear, iMonth) + 1; i++) {
		var date = new Date(iYear, iMonth, i);
		monthDays.push(date);
	}
	return monthDays;
}

/** e.g., Monday or Friday, with special cases for today/yesterday */
export function getDayOfWeek(date: Date) {
	var result = formatDateForLocale(date, "EEEE");
	if (isSameDay(date, new Date())) {
		result = language("today");
	}
	if (isSameDay(date, add(new Date(), { days: -1 }))) {
		result = language("yesterday");
	}
	return result;
}

/** e.g., M or F */
export function getDayOfWeekLetter(dayOrDate: Day | Date) : string {
	if (dayOrDate instanceof Date) {
		return formatDateForLocale(dayOrDate, "EEEEE");
	}

	const locale = getDateLocale();
	return capitalizeFirstLetterForLocale(locale.localize?.day(dayOrDate, { width: "narrow" }));
}

/** Digits-only day of the month, e.g., 1-31 */
export function getDayOfMonth(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	return formatDateForLocale(date, "d");

}

/** e.g., Mon or Fri */
export function getAbbreviatedDayOfWeek(dayOrDate: Day | Date) : string {
	if (dayOrDate instanceof Date) {
		return formatDateForLocale(dayOrDate, "EEEEEE");
	}

	const locale = getDateLocale();
	return capitalizeFirstLetterForLocale(locale.localize?.day(dayOrDate, { width: "abbreviated" }));
}

/** e.g., Friday, April 29th, 2024 at 11:00pm - localized */
export function getDayAndDateAndTimeString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	return formatDateForLocale(date, "PPPPp");
}

/** e.g., April 29th, 2024 at 11:00pm - localized */
export function getDateAndTimeString(dateOrDateString: Date | string) {
    const date = toDate(dateOrDateString);
    return formatDateForLocale(date, "PPPp");
}

/** e.g., Friday, April 29th, 2024 - localized */
export function getFullDayAndDateString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	return formatDateForLocale(date, "PPPP");
}

/** e.g., April 29th, 2024 - localized */
export function getFullDateString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	return formatDateForLocale(date, "PPP");
}

/** e.g., Apr 29, 2024 - localized */
export function getLongDateString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	return formatDateForLocale(date, "PP");
}

/** e.g., 04/29/2024 - localized */
export function getShortDateString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	return formatDateForLocale(date, "P");
}

/** e.g., 04/29 - localized */
export function getShortestDateString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	// date-fns doesn't have a format for this one, so we have to fall back to Intl
	const locale = getIntlLocale();
	if (!date) { return "" }
	return date.toLocaleDateString(locale, {
		month: 'numeric',
		day: 'numeric',
	 });
}

/** e.g., November */
export function getMonthName(monthOrDate: number | Date, capitalize: boolean = true) {
	var date;
	if (typeof(monthOrDate) === 'number') {
		date = new Date(new Date().getFullYear(), monthOrDate, 1, 0, 0, 0, 0);
	} else {
		date = monthOrDate;
	}
	return formatDateForLocale(date, "LLLL", capitalize);
}

/** e.g., Nov */
export function getAbbreviatedMonthName(month: number | Date, capitalize: boolean = true) {
	var date;
	if (typeof(month) === 'number') {
		date = new Date(new Date().getFullYear(), month, 1, 0, 0, 0, 0);
	} else {
		date = month;
	}
	return formatDateForLocale(date, "LLL", capitalize);
}

export function titleForDateRange(intervalType: "Day" | "Week" | "Month" | "6Month", intervalStart: Date, variant?: "short" | "long") {
	const duration: Duration = intervalType === "Month" ? { months: 1 } : intervalType === "Day" ? { days: 1 } : intervalType === "Week" ? { weeks: 1 } : intervalType === "6Month" ? { months: 6 } : { weeks: 1 };
	const intervalEnd = add(intervalStart, duration);

	if(intervalType === "6Month" && intervalStart.getDate() === 1){
		return `${getMonthName(intervalStart.getMonth())} - ${getMonthName(sub(intervalEnd, { months: 1}).getMonth())}`;
	}
	else if (intervalType === "Month" && intervalStart.getDate() === 1) {
		return `${getMonthName(intervalStart.getMonth())} ${intervalStart.getFullYear()}`;
	}
	else if (intervalType === "Week" || intervalType === "Month" || intervalType === "6Month") {
		return `${getShortDateString(intervalStart)} - ${getShortDateString(sub(intervalEnd, { days: 1 }))}`;
	}
	else if (intervalType === "Day") {
		if (variant === "long") {
			return `${getDayOfWeek(intervalStart)}, ${getFullDateString(intervalStart)}`;
		}
		return `${getDayOfWeek(intervalStart)}, ${getShortDateString(intervalStart)}`;
	}
}

/** For future dates - e.g., "3 days" */
export function getTimeFromNowString(dateOrDateString: string | Date) {
    const date = toDate(dateOrDateString);
	if (!date) { return "" }
	return formatDistanceToNow(date, { locale: getDateLocale() });
}

/** For past dates - e.g., "2 weeks ago" or "yesterday" */
export function getRelativeDateString(dateOrDateString: string | Date, baseDate: Date, capitalize: boolean = true): string {
    const date = toDate(dateOrDateString);
	if (!date) { return "" }
    const formatted = formatRelative(date, baseDate, { locale: getDateLocale() });
    return capitalize ? capitalizeFirstLetterForLocale(formatted) : formatted;
}

/** e.g., 12:45 pm (localized, may be 24h) - a time of 00:00:00 is returned as an empty string */
export function getTimeOfDayString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	if (!date || (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0)) {
		return "";
	}
	return formatDateForLocale(date, "p");
}

/** e.g., 12 P (localized, may be 24h) - a time of 00:00:00 is returned as an empty string */
export function getShortTimeOfDayString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	if (!date || (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0)) {
		return "";
	}
	// date-fns doesn't have a format for this one, so we have to fall back to Intl
	const locale = getIntlLocale();
	const formatOptions = new Intl.DateTimeFormat(locale, {
		timeStyle: 'short',
		}).resolvedOptions();

		return formatDateForLocale(date, formatOptions.hour12 ? "h a" : "p");
}

export function parseISOWithoutOffset(dateStr: string): Date {
    // A substring from 0 to 19 is used here to strip the offset from the ISO date string.
    // 2025-05-09T18:13:16-04:00 becomes 2025-05-09T18:13:16
	return parseISO(dateStr.substring(0, 19));
}
