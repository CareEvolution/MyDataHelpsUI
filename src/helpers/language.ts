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

export function language(key: string) {
	const currentLanguage: Language = getLanguageFromIso(MyDataHelps.getCurrentLanguage());

	if (currentLanguage == "en") return englishStrings[key];
	if (currentLanguage == "es") return spanishStrings[key];
	if (currentLanguage == "nl") return dutchStrings[key];
	if (currentLanguage == "de") return germanStrings[key];
	if (currentLanguage == "fr") return frenchStrings[key];
	if (currentLanguage == "pt") return portugueseStrings[key];
	if (currentLanguage == "it") return italianStrings[key];
	if (currentLanguage == "pl") return polishStrings[key];

	return englishStrings[key];
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

export default language;