import MyDataHelps from "@careevolution/mydatahelps-js"
import englishStrings from "../../locales/en.json"
import spanishStrings from "../../locales/es.json"
import germanStrings from "../../locales/de.json"
import filipinoStrings from "../../locales/fil.json"
import frenchStrings from "../../locales/fr.json"
import canadianFrenchStrings from "../../locales/fr-CA.json"
import italianStrings from "../../locales/it.json"
import dutchStrings from "../../locales/nl.json"
import polishStrings from "../../locales/pl.json"
import portugueseBrazilStrings from "../../locales/pt.json"
import portuguesePortugalStrings from "../../locales/pt-PT.json"
import romanianStrings from "../../locales/ro.json"
import samoanStrings from "../../locales/sm.json"
import somaliStrings from "../../locales/so.json"
import swahiliStrings from "../../locales/sw.json"
import tagalogStrings from "../../locales/tl.json"
import vietnameseStrings from "../../locales/vi.json"
// NOTE! If you add a new locale, be sure to also update getDateLocale()

interface LocaleStrings {
	[key: string]: string;
}

const localeToStringsMap : Record<string, LocaleStrings> = {
	"en": englishStrings,
    "es": spanishStrings,
    "nl": dutchStrings,
    "fr": frenchStrings,
    "it": italianStrings,
    "de": germanStrings,
    "pt": portugueseBrazilStrings,
    "pt-pt": portuguesePortugalStrings,
    "pl": polishStrings,
    "fr-ca": canadianFrenchStrings,
    "fil": filipinoStrings,
    "ro": romanianStrings,
    "sm": samoanStrings,
	"sw":swahiliStrings,
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