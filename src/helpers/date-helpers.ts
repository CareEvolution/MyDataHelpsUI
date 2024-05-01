import MyDataHelps from "@careevolution/mydatahelps-js";
import { add, format, isSameDay, sub } from "date-fns";
import language from "./language";
import { getLocaleFromIso } from "./locale";

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
	var locale = getLocaleFromIso(MyDataHelps.getCurrentLanguage());
	var result = format(date, "EEEE", { locale: locale });
	if (isSameDay(date, new Date())) {
		result = language("today");
	}
	if (isSameDay(date, add(new Date(), { days: -1 }))) {
		result = language("yesterday");
	}
	return result;
}

export function getFullDateString(date: Date) {
	var locale = getLocaleFromIso(MyDataHelps.getCurrentLanguage());
	return format(date, "MMMM d, yyyy", { locale: locale });
}

export function getShorterDateString(date: Date) {
	var locale = getLocaleFromIso(MyDataHelps.getCurrentLanguage());
	return format(date, "MMM d, yyyy", { locale: locale });
}

export function getMonthName(month: number) {
	var locale = getLocaleFromIso(MyDataHelps.getCurrentLanguage());
	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	return capitalizeFirstLetter(format(new Date(new Date().getFullYear(), month, 1, 0, 0, 0, 0), "MMMM", { locale: locale }));
}

export function titleForDateRange(intervalType: "Day" | "Week" | "Month", intervalStart: Date, variant?: "short" | "long") {
	var duration: Duration = intervalType == "Month" ? { months: 1 } : intervalType == "Day" ? { days: 1 } : { weeks: 1 };
	var intervalEnd = add(intervalStart, duration);

	if (intervalType == "Month" && intervalStart.getDate() == 1) {
		return `${getMonthName(intervalStart.getMonth())} ${intervalStart.getFullYear()}`;
	}
	else if (intervalType == "Week" || (intervalType == "Month" && intervalStart.getDate() != 1)) {
		return `${format(intervalStart, "MM/dd/yyyy")} - ${format(sub(intervalEnd, { days: 1 }), "MM/dd/yyyy")}`;
	}
	else if (intervalType == "Day") {
		if (variant === "long") {
			return `${getDayOfWeek(intervalStart)}, ${getFullDateString(intervalStart)}`;
		}
		return `${getDayOfWeek(intervalStart)}, ${format(intervalStart, "MM/dd/yyyy")}`;
	}
}