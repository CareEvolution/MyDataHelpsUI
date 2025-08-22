import { getLanguageCodeFromIso, getCountryCodeFromIso, language, supportedLocales, getCurrentLocale } from '../../../src/helpers/language';
import { describe, it } from '@jest/globals';
import englishStrings from "../../../locales/en.json"

let mockMDHLanguage = "en";

jest.mock('@careevolution/mydatahelps-js', () => {
    return {
        __esModule: true,
        default: {
            getCurrentLanguage:  jest.fn(() => { return mockMDHLanguage; })
        }
    }
});

describe('Language Tests', () => {
    describe('getLanguageCodeFromIso', () => {
        it('Should return lowercase language code if specified.', () => {
            const result = getLanguageCodeFromIso("EN-US");
            expect(result).toBe("en");
        });
        it('Should return empty string if no language.', () => {
            const result = getLanguageCodeFromIso("");
            expect(result).toBe("");
        });
        it('Should handle underscores too.', () => {
            const result = getLanguageCodeFromIso("en_UK");
            expect(result).toBe("en");
        });
    });
    
    describe('getCountryCodeFromIso', () => {
        it('Should return lowercase country code if specified.', () => {
            const result = getCountryCodeFromIso("en-US");
            expect(result).toBe("us");
        });
        it('Should return undefined if no country.', () => {
            const result = getCountryCodeFromIso("en");
            expect(result).toBe(undefined);
        });
        it('Should handle underscores too.', () => {
            const result = getCountryCodeFromIso("en_UK");
            expect(result).toBe("uk");
        });
    });

    describe('getCurrentLocale', () => {
        it('Should return a supported locale (using MDH language).', () => {
            mockMDHLanguage = "PT-PT";
            const result = getCurrentLocale();
            expect(result).toBe("pt-pt");
        });
        it('Should return a base language if specific locale unsupported (using MDH language).', () => {
            mockMDHLanguage = "PT-xx";
            const result = getCurrentLocale();
            expect(result).toBe("pt");
        });
        it('Should return English if entire language is unsupported (using MDH language).', () => {
            mockMDHLanguage = "Xx";
            const result = getCurrentLocale();
            expect(result).toBe("en");
        });        
        it('Should return a supported locale (with override param).', () => {
            const result = getCurrentLocale("FR-CA");
            expect(result).toBe("fr-ca");
        });
        it('Should return a base language if specific locale unsupported (with override param).', () => {
            const result = getCurrentLocale("FR-xx");
            expect(result).toBe("fr");
        });
        it('Should return English if entire language is unsupported (with override param).', () => {
            const result = getCurrentLocale("xx");
            expect(result).toBe("en");
        });
    });
    
    describe('language', () => {
        it('Should return a string from a specific supported locale.', () => {
            const result = language("settings", "PT-PT");
            expect(result).toBe("Definições");
        });
        it('Should return a string from the base language if specific locale unsupported.', () => {
            const result = language("settings", "PT-xx");
            expect(result).toBe("Configurações");
        });
        it('Should return English if entire language is unsupported.', () => {
            const result = language("settings", "xx");
            expect(result).toBe("Settings");
        });
        it('Should return empty string if the key is not found.', () => {
            const result = language("no_such_string", "xx");
            expect(result).toBe("");
        });
    });

    describe('supportedLocales', () => {
        it('Should have all strings in all locales', () => {
            Object.keys(englishStrings).forEach(localeStr => {
                supportedLocales().forEach(localeName => {
                    const otherString = language(localeStr, localeName);
                    if (!otherString) {
                        throw `Missing ${localeStr} in ${localeName}`;
                    }
                })
            })
        });
    })
});