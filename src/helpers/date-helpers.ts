import MyDataHelps from "@careevolution/mydatahelps-js";
import { add, format, isSameDay } from "date-fns";
import { es, enUS } from 'date-fns/locale';
import language from "./language";

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
	var locale = MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es") ? es : enUS;
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
	var locale = MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es") ? es : enUS;
	return format(date, "MMMM d, yyyy", { locale: locale });
}

export function getShorterDateString(date: Date) {
	var locale = MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es") ? es : enUS;
	return format(date, "MMM d, yyyy", { locale: locale });
}

export function getMonthName(month: number) {
	var locale = MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es") ? es : enUS;
	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	return capitalizeFirstLetter(format(new Date(new Date().getFullYear(), month, 1, 0, 0, 0, 0), "MMMM", { locale: locale }));
}

export function getLocale(): Locale {
	return MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es") ? es : enUS;
}