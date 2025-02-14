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

export type Language = "" | "en" | "es" | "nl" | "fr" | "de" | "it" | "pt" | "pt-pt" | "pl"

function format(resolvedString: string, args?: { [key: string]: string }) {
	if (!resolvedString || !args) return resolvedString;
	return resolvedString.replace(/\{\s*([^}\s]+)\s*}/g, (_, key) => args[key]);
}

export function language(key: string, specifiedLocale?: string, args?: { [key: string]: string }): string {
	// Normalize formats like pt-PT or pt_PT to a consistent pt-pt for lookup.
	const currentLocale = (specifiedLocale || MyDataHelps.getCurrentLanguage() || "").replace("_", "-").toLowerCase();
	
	const localeToStringsMap : any = {
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

	let stringTable = localeToStringsMap[currentLocale];
	if (!stringTable) {
		const baseLanguage = currentLocale.split("-")[0];
		stringTable = localeToStringsMap[baseLanguage] || englishStrings;
	}
	
	return format(stringTable[key] || "", args);
}

export function getLanguageFromIso(language: string): Language {
	if (language.length < 2) return "";

	var beginningOfLanguage = language.slice(0, 2);
	if (beginningOfLanguage == "en") return "en";
	if (beginningOfLanguage == "es") return "es";
	if (beginningOfLanguage == "nl") return "nl";
	if (beginningOfLanguage == "fr") return "fr";
	if (beginningOfLanguage == "de") return "de";
	if (beginningOfLanguage == "it") return "it";
	if (beginningOfLanguage == "pt") return "pt";
	if (beginningOfLanguage == "pl") return "pl";

	return "";
}

export function getCountryCodeFromIso(language: string) : string | undefined {
    const code = language.toLowerCase().split(/[-_]/)[1];
    return code;
}

export default language;