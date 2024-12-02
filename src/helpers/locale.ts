import { format, formatRelative } from 'date-fns';
import { es, enUS, enAU, enCA, enGB, enIE, enIN, enNZ, enZA, nl, nlBE, de, deAT, fr, frCA, frCH, pt, ptBR, it, itCH, pl, Locale } from 'date-fns/locale';
import MyDataHelps from '@careevolution/mydatahelps-js';
import language from "./language";
import { toDate } from "./date-helpers";

export function parseLocaleCode(language: string) : string | undefined {
    const code = language.toLowerCase().split(/[-_]/)[1];
    return code;
}

// Returns a language/locale string suitable for Intl formatting.
export function getIntlLocale() : string {
    // Intl libraries expect en-US only not en_US
    const language =`${MyDataHelps.getCurrentLanguage()}`.replace("_", "-");

    if (language.length < 2) return "en-us";

    let localeCode = parseLocaleCode(language);
    let intlLocale;
    
    if (localeCode) {
        intlLocale = language;
    }
    else {
        intlLocale = navigator.language || language;
    }
    return intlLocale.toLowerCase();
}

// Returns a date-fns locale suitable for date formatting.
export function getDateLocale(): Locale {
    const language = MyDataHelps.getCurrentLanguage();
    if (language.length < 2) return enUS;

    const languageCode = language.toLowerCase().slice(0,2);

    let localeCode = parseLocaleCode(language);
    if (!localeCode) {
        localeCode = parseLocaleCode(navigator.language);
    }

    if (languageCode == "en") {
        switch (localeCode) {
            case "au":
                return enAU;
            case "ca":
                return enCA;
            case "gb":
                return enGB;                
            case "ie":
                return enIE;
            case "in":
                return enIN;
            case "nz":
                return enNZ;
            case "za":
                return enZA;
            default:
                return enUS;
        }
    }
    if (languageCode == "es") return es;

    if (languageCode == "de") {
        if (localeCode == 'at') return deAT;
        return de;
    }

    if (languageCode == "fr") {
        if (localeCode == 'ca') return frCA;
        if (localeCode == 'ch') return frCH;
        return fr;
    }

    if (languageCode == "it") {
        if (localeCode == 'ch') return itCH;
        return it;
    }

    if (languageCode == "nl") {
        if (localeCode == 'be') return nlBE;
        return nl;
    }

    if (languageCode == "pt") {
        if (localeCode == 'br') return ptBR;
        return pt;
    }

    if (languageCode == "pl") return pl;

    return enUS;
}


export function formatDateForLocale(dateOrDateString: string | Date, formatString: string, titleize: boolean = true): string {
    const date = toDate(dateOrDateString);
    const formatted = format(date, formatString, { locale: getDateLocale() });
    return titleize ? titleizeForLocale(formatted) : formatted;
}

export function formatNumberForLocale(value: number | undefined, fractionDigits?: number) {
    if (!value) return "";
    const locale = getIntlLocale();
    return Number(value.toFixed(fractionDigits || 0)).toLocaleString(locale);
}

// e.g., 7h 5m
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