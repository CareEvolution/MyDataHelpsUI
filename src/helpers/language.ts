﻿import MyDataHelps from "@careevolution/mydatahelps-js"
import englishStrings from "./strings-en"
import spanishStrings from "./strings-es"
import dutchStrings from "./strings-nl"
import germanStrings from "./strings-de"
import frenchStrings from "./strings-fr"
import portugueseBrazilStrings from "./strings-pt"
import italianStrings from "./strings-it"
import polishStrings from "./strings-pl"
import portuguesePortugalStrings from "./strings-pt-pt"
import frenchCanadianStrings from "./strings-fr-ca"
import filipinoStrings from "./strings-fil"
import romanianStrings from "./strings-ro"
import samoanStrings from "./strings-sm"
import somaliStrings from "./strings-so"
import swahiliStrings from "./strings-sw"
import tagalogStrings from "./strings-tl"
import vietnameseStrings from "./strings-vi"
// NOTE! If you add a new locale, be sure to also update getDateLocale()

interface LocaleStrings {
	[key: string]: string;
}

// Please alphabetize by language name (with en/es first) to 
// match the UI list.
const localeToStringsMap : Record<string, LocaleStrings> = {
	"en": englishStrings,
	"es": spanishStrings,
	"nl": dutchStrings,
	"fil": filipinoStrings,
	"fr": frenchStrings,
	"fr-ca": frenchCanadianStrings,
	"de": germanStrings,
	"it": italianStrings,
	"pt": portugueseBrazilStrings,
	"pt-pt": portuguesePortugalStrings,
	"pl": polishStrings,
	"ro": romanianStrings,
	"sm": samoanStrings,
	"sw": swahiliStrings,
	"so": somaliStrings,
	"tl": tagalogStrings,
	"vi": vietnameseStrings
};

function format(resolvedString: string, args?: { [key: string]: string }) {
	if (!resolvedString || !args) return resolvedString;
	return resolvedString.replace(/\{\s*([^}\s]+)\s*}/g, (_, key) => args[key]);
}

export function supportedLocales() {
	return Object.keys(localeToStringsMap);
}

export function language(key: string, specifiedLocale?: string, args?: { [key: string]: string }): string {
	const currentLocale = normalizeLocaleString(specifiedLocale || MyDataHelps.getCurrentLanguage());
	
	let localeStrings : LocaleStrings = localeToStringsMap[currentLocale];
	if (!localeStrings) {
		const languageCode = getLanguageCodeFromIso(currentLocale);
		localeStrings = localeToStringsMap[languageCode] || englishStrings;
	}
	
	return format(localeStrings[key] || "", args);
}

/** Gets the language code from an ISO locale string (e.g., en-US returns en. */
export function getLanguageCodeFromIso(locale: string): string {
	const normalizedLocale = normalizeLocaleString(locale);
	return normalizedLocale.split("-")[0];
}

/** Gets the country code from an ISO locale string (e.g., en-US returns us). */
export function getCountryCodeFromIso(locale: string) : string | undefined {
	const normalizedLocale = normalizeLocaleString(locale);
    return normalizedLocale.split("-")[1];
}

/** Normalize variations in ISO locale strings, including:
 *    - separators (hyphens or underscores) -> all hyphens
 *    - capitalization -> all lowercase
 */
function normalizeLocaleString(locale: string) {
	return (locale || "").replace("_", "-").toLowerCase();
}

export default language;