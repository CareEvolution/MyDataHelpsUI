import MyDataHelps from "@careevolution/mydatahelps-js"
import englishStrings from "../../locales/en.json"
import spanishStrings from "../../locales/es.json"
import germanStrings from "../../locales/de.json"
import filipinoStrings from "../../locales/fil.json"
import frenchStrings from "../../locales/fr.json"
import frenchCanadianStrings from "../../locales/fr-CA.json"
import italianStrings from "../../locales/it.json"
import dutchStrings from "../../locales/nl.json"
import polishStrings from "../../locales/pl.json"
import portugueseBrazilStrings from "../../locales/pt.json"
import portuguesePortugalStrings from "../../locales/pt-PT.json"
import romanianStrings from "../../locales/ro.json"
import somaliStrings from "../../locales/so.json"
import swahiliStrings from "../../locales/sw.json"
import tagalogStrings from "../../locales/tl.json"
import vietnameseStrings from "../../locales/vi.json"

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

/** Gets the currently active locale, accounting for which ones are supported (e.g., en-UK will fall back to just en) */
export function getCurrentLocale(specifiedLocale?: string) {
	const currentLocale = normalizeLocaleString(specifiedLocale || MyDataHelps.getCurrentLanguage());

	if (isLocaleSupported(currentLocale)) {
		return currentLocale;
	}
	const baseLocale = getLanguageCodeFromIso(currentLocale);
	if (isLocaleSupported(baseLocale)) {
		return baseLocale;
	}
	return "en";
}

export function language(key: string, specifiedLocale?: string, args?: { [key: string]: string }): string {
	const currentLocale = getCurrentLocale(specifiedLocale);	
	const localeStrings : LocaleStrings = localeToStringsMap[currentLocale];
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

function isLocaleSupported(locale: string) {
	return !!localeToStringsMap[normalizeLocaleString(locale)];
}

/** Normalize variations in ISO locale strings, including:
 *    - separators (hyphens or underscores) -> all hyphens
 *    - capitalization -> all lowercase
 */
function normalizeLocaleString(locale: string) {
	return (locale || "").replace("_", "-").toLowerCase();
}

export default language;