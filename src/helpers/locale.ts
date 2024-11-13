import { format, formatRelative, parseISO } from 'date-fns';
import { es, enUS, nl, de, fr, pt, it, pl } from 'date-fns/locale';
import MyDataHelps from '@careevolution/mydatahelps-js';

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

export function formatDateForLocale(dateOrDateString: string | Date, formatString: string): string {
    const date = toDate(dateOrDateString);
    return format(date, formatString, { locale: getLocaleFromIso(MyDataHelps.getCurrentLanguage()) });
}

export function formatRelativeDateForLocale(dateOrDateString: string | Date, baseDate: Date): string {
    const date = toDate(dateOrDateString);
    return formatRelative(date, baseDate, { locale: getLocaleFromIso(MyDataHelps.getCurrentLanguage()) });
}

export function capitalizeForLocale(str: string) {
    // This won't be adequate if we expand to RTL or symbol-based (e.g., Chinese/Japanese/Korean) languages.
    if (!str) {
        return null;
    }
    if (str.length < 2) {
        return str.toLocaleUpperCase();
    }
    const firstLetter = str.slice(0, 1).toLocaleUpperCase();
    const rest = str.slice(1);
    console.log(firstLetter);
    console.log(rest);
    return `${firstLetter}${rest}`;
}