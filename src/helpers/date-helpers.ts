import { add, Duration, isSameDay, sub, Day } from "date-fns";
import language from "./language";
import { formatDateForLocale, getLocaleFromIso, capitalizeFirstLetterForLocale } from "./locale";
import MyDataHelps from '@careevolution/mydatahelps-js';

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

export function getDayOfWeekLetter(day: Day) : string {
	const locale = getLocaleFromIso(MyDataHelps.getCurrentLanguage());	
	return capitalizeFirstLetterForLocale(locale.localize?.day(day, { width: "narrow" }));
}

export function getFullDateString(date: Date) {
	return formatDateForLocale(date, "MMMM do, yyyy");
}

export function getShorterDateString(date: Date) {
	return formatDateForLocale(date, "MMM d, yyyy");
}

export function getMonthName(month: number, capitalize: boolean = true) {
	return formatDateForLocale(new Date(new Date().getFullYear(), month, 1, 0, 0, 0, 0), "MMMM", capitalize);
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
		return `${formatDateForLocale(intervalStart, "MM/dd/yyyy")} - ${formatDateForLocale(sub(intervalEnd, { days: 1 }), "MM/dd/yyyy")}`;
	}
	else if (intervalType === "Day") {
		if (variant === "long") {
			return `${getDayOfWeek(intervalStart)}, ${getFullDateString(intervalStart)}`;
		}
		return `${getDayOfWeek(intervalStart)}, ${formatDateForLocale(intervalStart, "MM/dd/yyyy")}`;
	}
}