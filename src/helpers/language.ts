import MyDataHelps from "@careevolution/mydatahelps-js"
import englishStrings from "./strings-en"
import spanishStrings from "./strings-es"
import dutchStrings from "./strings-nl"
import germanStrings from "./strings-de"
import frenchStrings from "./strings-fr"
import portugueseStrings from "./strings-pt"
import italianStrings from "./strings-it"
import polishStrings from "./strings-pl"

export type Language = "en" | "es" | "nl" | "de" | "fr" | "pt" | "it" | "pl"

export function language(key: string) {
	const currentLanguage: "" | Language = getLanguageFromIso(MyDataHelps.getCurrentLanguage());

	if (currentLanguage == "es") return spanishStrings[key];
	if (currentLanguage == "nl") return dutchStrings[key];
	if (currentLanguage == "de") return germanStrings[key];
	if (currentLanguage == "fr") return frenchStrings[key];
	if (currentLanguage == "pt") return portugueseStrings[key];
	if (currentLanguage == "it") return italianStrings[key];
	if (currentLanguage == "pl") return polishStrings[key];

	return englishStrings[key];
}

export function getLanguage(language: string): Language {
    if (language == "es") return "es";
    if (language == "nl") return "nl";
    if (language == "de") return "de";
    if (language == "fr") return "fr";
    if (language == "pt") return "pt";
    if (language == "it") return "it";
    if (language == "pl") return "pl";

    return "en";
}
export function getLanguageFromIso(language: string): "" | Language {
    if (language.toLowerCase().startsWith("es")) return "es";
    if (language.toLowerCase().startsWith("nl")) return "nl";
    if (language.toLowerCase().startsWith("de")) return "de";
    if (language.toLowerCase().startsWith("fr")) return "fr";
    if (language.toLowerCase().startsWith("pt")) return "pt";
    if (language.toLowerCase().startsWith("it")) return "it";
    if (language.toLowerCase().startsWith("pl")) return "pl";

    return "";
}

export default language;