import MyDataHelps from "@careevolution/mydatahelps-js"
import englishStrings from "./strings-en"
import spanishStrings from "./strings-es"
import dutchStrings from "./strings-nl"
import germanStrings from "./strings-de"
import frenchStrings from "./strings-fr"
import portugueseStrings from "./strings-pt"
import italianStrings from "./strings-it"
import polishStrings from "./strings-pl"

export type Language = "" | "en" | "es" | "nl" | "de" | "fr" | "pt" | "it" | "pl"

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
	if (currentLanguage == "de") resolvedString = germanStrings[key];
	if (currentLanguage == "fr") resolvedString = frenchStrings[key];
	if (currentLanguage == "pt") resolvedString = portugueseStrings[key];
	if (currentLanguage == "it") resolvedString = italianStrings[key];
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
	if (beginningOfLanguage == "de") return "de";
	if (beginningOfLanguage == "fr") return "fr";
	if (beginningOfLanguage == "pt") return "pt";
	if (beginningOfLanguage == "it") return "it";
	if (beginningOfLanguage == "pl") return "pl";

	return "";
}

export function setLanguageString(language: Language, key: string, value: string) {
	if (language == "en") englishStrings[key] = value;
	if (language == "es") spanishStrings[key] = value;
	if (language == "nl") dutchStrings[key] = value;
	if (language == "de") germanStrings[key] = value;
	if (language == "fr") frenchStrings[key] = value;
	if (language == "pt") portugueseStrings[key] = value;
	if (language == "it") italianStrings[key] = value;
	if (language == "pl") polishStrings[key] = value;
}

export default language;