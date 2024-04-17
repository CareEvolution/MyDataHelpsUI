import { es, enUS, nl, de, fr, pt, it, pl } from 'date-fns/locale';

export function getLocaleFromIso(language: string): Locale {
	const currentLanguage = language.toLowerCase();

	if (currentLanguage.startsWith("es")) return es;
	if (currentLanguage.startsWith("nl")) return nl;
	if (currentLanguage.startsWith("de")) return de;
	if (currentLanguage.startsWith("fr")) return fr;
	if (currentLanguage.startsWith("pt")) return pt;
	if (currentLanguage.startsWith("it")) return it;
	if (currentLanguage.startsWith("pl")) return pl;

	return enUS;
}