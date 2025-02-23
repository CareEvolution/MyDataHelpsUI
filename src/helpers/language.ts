import MyDataHelps from "@careevolution/mydatahelps-js"
import englishStrings from "./strings-en"
import spanishStrings from "./strings-es"
import dutchStrings from "./strings-nl"
import germanStrings from "./strings-de"
import frenchStrings from "./strings-fr"
import portugueseBrazilStrings from "./strings-pt"
import italianStrings from "./strings-it"
import polishStrings from "./strings-pl"
import portuguesePortugalStrings from "./strings-pt-pt"
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
	"pl": polishStrings
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