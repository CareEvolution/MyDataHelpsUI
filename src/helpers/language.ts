import MyDataHelps from "@careevolution/mydatahelps-js"
import englishStrings from "./strings-en"
import spanishStrings from "./strings-es"
import dutchStrings from "./strings-nl"
import germanStrings from "./strings-de"
import frenchStrings from "./strings-fr"
import portugueseStrings from "./strings-pt"
import italianStrings from "./strings-it"
import polishStrings from "./strings-pl"
import portuguesePTStrings from "./strings-pt-pt"

export type Language = "" | "en" | "es" | "nl" | "fr" | "de" | "it" | "pt" | "pt-pt" | "pl"

function format(resolvedString: string, args?: { [key: string]: string }) {
	if (!resolvedString || !args) return resolvedString;
	return resolvedString.replace(/\{\s*([^}\s]+)\s*}/g, (_, key) => args[key]);
}

export function language(key: string, specifiedLanguage?: string, args?: { [key: string]: string }): string {
	const currentLanguage: Language = getLanguageFromIso(specifiedLanguage || MyDataHelps.getCurrentLanguage());

	let resolvedString = null;
	if (currentLanguage == "en") resolvedString = englishStrings[key];
	if (currentLanguage == "es") resolvedString = spanishStrings[key];
	if (currentLanguage == "nl") resolvedString = dutchStrings[key];
	if (currentLanguage == "fr") resolvedString = frenchStrings[key];
	if (currentLanguage == "it") resolvedString = italianStrings[key];
	if (currentLanguage == "de") resolvedString = germanStrings[key];
	if (currentLanguage == "pt") resolvedString = portugueseStrings[key];
	if (currentLanguage == "pt-pt") resolvedString = portuguesePTStrings[key];
	if (currentLanguage == "pl") resolvedString = polishStrings[key];
	if (resolvedString != null) return format(resolvedString, args);

	return format(englishStrings[key], args);
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