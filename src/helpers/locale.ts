import { format, formatRelative, formatDistanceToNow, parseISO } from 'date-fns';
import { es, enUS, nl, de, fr, pt, it, pl, Locale } from 'date-fns/locale';
import MyDataHelps from '@careevolution/mydatahelps-js';
import language from "./language";

export function getLocaleFromIso(language: string): Locale {
    if (language.length < 2) return enUS;

    const currentLanguage = language.toLowerCase().slice(0,2);

    if (currentLanguage == "en") return enUS;
    if (currentLanguage == "es") return es;
    if (currentLanguage == "nl") return nl;
    if (currentLanguage == "de") return de;
    if (currentLanguage == "fr") return fr;
    if (currentLanguage == "pt") return pt;
    if (currentLanguage == "it") return it;
    if (currentLanguage == "pl") return pl;

    return enUS;
}

function toDate(dateOrDateString: string | Date): Date {
    var date;
    if (typeof(dateOrDateString) === 'string') {
        date = parseISO(dateOrDateString);
    } else {
        date = dateOrDateString;
    }
    return date;
}

export function formatDateForLocale(dateOrDateString: string | Date, formatString: string, titleize: boolean = true): string {
    const date = toDate(dateOrDateString);
    const formatted = format(date, formatString, { locale: getLocaleFromIso(MyDataHelps.getCurrentLanguage()) });
    return titleize ? titleizeForLocale(formatted) : formatted;
}

export function formatRelativeDateForLocale(dateOrDateString: string | Date, baseDate: Date, titleize: boolean = true): string {
    const date = toDate(dateOrDateString);
    const formatted = formatRelative(date, baseDate, { locale: getLocaleFromIso(MyDataHelps.getCurrentLanguage()) });
    return titleize ? titleizeForLocale(formatted) : formatted;
}

export function formatTimeFromNowForLocale(dateOrDateString: string | Date) {
    const date = toDate(dateOrDateString);
    return formatDistanceToNow(date, { locale: getLocaleFromIso(MyDataHelps.getCurrentLanguage()) });
}

export function formatNumberForLocale(value: number, fractionDigits?: number) {
    return Number(value.toFixed(fractionDigits || 0)).toLocaleString(MyDataHelps.getCurrentLanguage())
}

export function formatMinutesForLocale(value: number) {
    var hours = Math.floor(value / 60);
    var displayValue = hours > 0 ? (`${hours}${language("hours-abbreviation")} `) : "";
    if (Math.round(value - (hours * 60)) !== 0) {
        displayValue = `${displayValue}${(Math.round(value - (hours * 60)))}${language("minutes-abbreviation")}`;
    }
    return displayValue;
}

export function capitalizeFirstLetterForLocale(str: string) {
    // This won't be adequate if we expand to RTL or symbol-based (e.g., Chinese/Japanese/Korean) languages.
    if (!str) {
        return '';
    }
    if (str.length < 2) {
        return str.toLocaleUpperCase();
    }
    const firstLetter = str.slice(0, 1).toLocaleUpperCase();
    const rest = str.slice(1);
    return `${firstLetter}${rest}`;
}

export function titleizeForLocale(str: string) {
    // Limited version but good enough for mvp purposes
    if (!str) {
        return '';
    }
    const parts = str.split(' ');
    return parts.map( p => capitalizeFirstLetterForLocale(p) ).join(' ');
}