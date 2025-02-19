import { getLanguageCodeFromIso, getCountryCodeFromIso, language } from '../../../src/helpers/language';
import { describe, it } from '@jest/globals';

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
        it('Should return the string key if the key is not found.', () => {
            const result = language("no_such_string", "xx");
            expect(result).toBe("no_such_string");
        });
    });
});