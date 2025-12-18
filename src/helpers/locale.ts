import { format } from 'date-fns';
import { es, enUS, enAU, enCA, enGB, enIE, enIN, enNZ, enZA, nl, nlBE, de, deAT, fr, frCA, frCH, pt, ptBR, it, itCH, pl, ro, vi, Locale } from 'date-fns/locale';
import MyDataHelps from '@careevolution/mydatahelps-js';
import language, { getCountryCodeFromIso, getLanguageCodeFromIso } from "./language";
import { toDate } from "./date-helpers";

// Returns a locale string suitable for use with the Intl library. Mostly used for 
// localizing numbers.
//
// Priority for locale selection:
// 1. If MDH locale has a country code (like "en-AU") use that.
// 2. If MDH locale does NOT have a locale code (like "en"), use the browser locale
//    as long as the language code matches. The browser often has more locale
//    specificity than MDH.
// 3. Fall back to the original language string.
export function getIntlLocale() : string {
    // Intl libraries don't support underscores, so it needs "en-US" not "en_US".
    const lang =`${MyDataHelps.getCurrentLanguage()}`.replace("_", "-");
    if (lang.length < 2) return "en-us";

    const languageCode = getLanguageCodeFromIso(lang);
    const countryCode = getCountryCodeFromIso(lang);

    let intlLocale = lang;
    if (!countryCode && navigator?.language && getLanguageCodeFromIso(navigator.language) === languageCode) {
        intlLocale = navigator.language;
    }
    return intlLocale.toLowerCase();
}

// Returns a date-fns locale suitable for date formatting.
//
// Note that date-fns does not accept an arbitrary locale string
// (e.g., "en-AU") but requires us to specify one of its locale
// packages.
//
// Priority for locale selection:
// 1. If MDH language has a country code (like "en-AU") use it to
//    select the appropriate locale for that language.
// 2. If MDH language does NOT have a country code (like "en"), use the browser language
//    to determine locale as long as the language code matches. The browser often has
//    more locale specificity than MDH.
// 3. If neither MDH nor browser specifies a locale, use the
//    default locale based on the current language.
export function getDateLocale(): Locale {
    const lang = MyDataHelps.getCurrentLanguage();
    if (lang.length < 2) return enUS;

    const languageCode = getLanguageCodeFromIso(lang);
    let countryCode = getCountryCodeFromIso(lang);

    if (!countryCode && navigator?.language && getLanguageCodeFromIso(navigator.language) === languageCode) {
        countryCode = getCountryCodeFromIso(navigator.language);
    }

    if (languageCode == "en") {
        switch (countryCode) {
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
        if (countryCode == 'at') return deAT;
        return de;
    }

    if (languageCode == "fr") {
        if (countryCode == 'ca') return frCA;
        if (countryCode == 'ch') return frCH;
        return fr;
    }

    if (languageCode == "it") {
        if (countryCode == 'ch') return itCH;
        return it;
    }

    if (languageCode == "nl") {
        if (countryCode == 'be') return nlBE;
        return nl;
    }

    if (languageCode == "pt") {
        if (countryCode == 'br') return ptBR;
        return pt;
    }

    if (languageCode == "pl") return pl;
    if (languageCode == "ro") return ro;
    if (languageCode == "vi") return vi;
    
    // Languages without specific date-fns locales
    // Using enUS as fallback for these languages until availible
    if (languageCode == "fil") return enUS;
    if (languageCode == "sm") return enUS;
    if (languageCode == "so") return enUS;
    if (languageCode == "sw") return enUS;
    if (languageCode == "tl") return enUS;

    return enUS;
}

/** 
 * Uses date-fns format strings.
 * Note that some languages don't treat day/month names as proper nouns, so a string might come
 * back like "27 marzo 2024". The capitalize param lets you auto-capitalize the first letter in case
 * the string is being used like a title/heading.
 */
export function formatDateForLocale(dateOrDateString: string | Date | undefined, formatString: string, capitalize: boolean = true): string {
    const date = toDate(dateOrDateString);
    if (!date) { return "" };
    const formatted = format(date, formatString, { locale: getDateLocale() });
    return capitalize ? capitalizeFirstLetterForLocale(formatted) : formatted;
}

export function formatNumberForLocale(value: number | undefined, fractionDigits?: number) {
    if (value === undefined || value === null) return "";
    const locale = getIntlLocale();
    return Number(value.toFixed(fractionDigits || 0)).toLocaleString(locale);
}

/** e.g., 7h 5m */
export function formatMinutesForLocale(value: number) {
    const totalMinutes = Math.round(value);

    const displayHours = Math.floor(totalMinutes / 60);
    const displayMinutes = totalMinutes % 60;

    const displayParts = [];
    if (displayHours !== 0) {
        displayParts.push(`${displayHours}${language('hours-abbreviation')}`);
    }
    if (displayMinutes !== 0) {
        displayParts.push(`${displayMinutes}${language('minutes-abbreviation')}`);
    }
    return displayParts.join(' ');
}

export function capitalizeFirstLetterForLocale(str: string) {
    // MVP implementation will need to be refined if we expand to RTL or symbol-based (e.g., Chinese/Japanese/Korean) languages.
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