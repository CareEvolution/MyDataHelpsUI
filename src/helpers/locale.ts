import { es, enUS, nl, de, fr, pt, it, pl } from 'date-fns/locale';

export function getLocaleFromIso(language: string): Locale {
    if (language.length < 2) return enUS;

	const currentLanguage = language.toLowerCase().slice(0,2);

    if (currentLanguage == "es") return es;
	if (currentLanguage == "nl") return nl;
	if (currentLanguage == "de") return de;
	if (currentLanguage == "fr") return fr;
	if (currentLanguage == "pt") return pt;
	if (currentLanguage == "it") return it;
	if (currentLanguage == "pl") return pl;

	return enUS;
}