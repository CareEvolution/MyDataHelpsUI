import { add, Duration, isSameDay, sub, Day, parseISO } from "date-fns";
import language from "./language";
import { formatDateForLocale, getLocaleFromIso, capitalizeFirstLetterForLocale } from "./locale";
import MyDataHelps from '@careevolution/mydatahelps-js';

export function toDate(dateOrDateString: string | Date): Date {
    var date;
    if (typeof(dateOrDateString) === 'string') {
        date = parseISO(dateOrDateString);
    } else {
        date = dateOrDateString;
    }
    return date;
}

export function daysInMonth(iYear: number, iMonth: number) {
	return 32 - new Date(iYear, iMonth, 32).getDate();
}

export function getDatesForMonth(year: number, month: number) {
	var monthDays: Date[] = [];
	for (var i = 1; i < daysInMonth(year, month) + 1; i++) {
		var date = new Date(year, month, i);
		monthDays.push(date);
	}
	return monthDays;
}

// e.g., Monday or Friday, with special cases for today/yesterday
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

// e.g., M or F
export function getDayOfWeekLetter(dayOrDate: Day | Date) : string {
	if (dayOrDate instanceof Date) {
		return formatDateForLocale(dayOrDate, "EEEEE");
	}

	const locale = getLocaleFromIso(MyDataHelps.getCurrentLanguage());	
	return capitalizeFirstLetterForLocale(locale.localize?.day(dayOrDate, { width: "narrow" }));
}

// e.g., Mon or Fri
export function getAbreviatedDayOfWeek(dayOrDate: Day | Date) : string {
	if (dayOrDate instanceof Date) {
		return formatDateForLocale(dayOrDate, "EEEEEE");
	}

	const locale = getLocaleFromIso(MyDataHelps.getCurrentLanguage());	
	return capitalizeFirstLetterForLocale(locale.localize?.day(dayOrDate, { width: "abbreviated" }));
}

// e.g., 12:45 pm (localized, may be 24h) - a time of 00:00:00 is returned as an empty string
export function getTimeOfDayString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
		return "";
	}
	return formatDateForLocale(date, "p");
}

// e.g., Friday, April 29th, 2024 at 11:00pm - localized
export function getDayAndDateAndTimeString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	return formatDateForLocale(date, "PPPPp");
}

// e.g., Friday, April 29th, 2024 - localized
export function getFullDayAndDateString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	return formatDateForLocale(date, "PPPP");
}

// e.g., April 29th, 2024 - localized
export function getFullDateString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	return formatDateForLocale(date, "PPP");
}

// e.g., Apr 29, 2024 - localized
export function getLongDateString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	return formatDateForLocale(date, "PP");
}

// e.g., 04/29/2024 - localized
export function getShortDateString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	return formatDateForLocale(date, "P");
}

// e.g., 04/29 - localized
export function getShortestDateString(dateOrDateString: Date | string) {
	const date = toDate(dateOrDateString);
	const locale = getLocaleFromIso(MyDataHelps.getCurrentLanguage());	
	// date-fns doesn't have a format for this one, so we have to fall back to Intl
	return date.toLocaleDateString(locale.code, {
		month: 'numeric',
		day: 'numeric',
	 });	
}

// e.g., November
export function getMonthName(monthOrDate: number | Date, capitalize: boolean = true) {
	var date;
	if (typeof(monthOrDate) === 'number') {
		date = new Date(new Date().getFullYear(), monthOrDate, 1, 0, 0, 0, 0);
	} else {
		date = monthOrDate;
	}
	return formatDateForLocale(date, "LLLL", capitalize);
}

// e.g., Nov
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
		return `${getShortDateString(intervalStart)} - ${getShortDateString(sub(intervalEnd, { days: 1 }), "MM/dd/yyyy")}`;
	}
	else if (intervalType === "Day") {
		if (variant === "long") {
			return `${getDayOfWeek(intervalStart)}, ${getFullDateString(intervalStart)}`;
		}
		return `${getDayOfWeek(intervalStart)}, ${formatDateForLocale(intervalStart, "MM/dd/yyyy")}`;
	}
}