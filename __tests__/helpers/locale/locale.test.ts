/**
 * @jest-environment jsdom
 */
import { parseLocaleCode, getIntlLocale, getDateLocale } from '../../../src/helpers/locale';
import { es, enUS, enGB, enCA, enAU } from 'date-fns/locale';
import { describe, it } from '@jest/globals';


let mockMDHLanguage = "en";

jest.mock('@careevolution/mydatahelps-js', () => {
    return {
        __esModule: true,
        default: {
            getCurrentLanguage:  jest.fn(() => { return mockMDHLanguage; })
        }
    }
});

describe('Locale Tests', () => {
    describe('parseLocaleCode', () => {
        it('Should return lowercase locale portion if specified.', () => {
            const result = parseLocaleCode("en-US");
            expect(result).toBe("us");
        });
        it('Should return undefined if no locale.', () => {
            const result = parseLocaleCode("en");
            expect(result).toBe(undefined);
        });
        it('Should handle underscores too.', () => {
            const result = parseLocaleCode("en_UK");
            expect(result).toBe("uk");
        });
    });

    describe('getIntlLocale', () => {        
        it('Should use MDH language if it has a locale.', () => {            
            mockMDHLanguage = "en-GB";
            const result = getIntlLocale();
            expect(result).toBe("en-gb");
        });
        it('Should return navigator language if MDH has no locale.', () => {
            mockMDHLanguage = "es";
            jest.spyOn(navigator, 'language', 'get').mockReturnValue('es-CO');
            const result = getIntlLocale();
            expect(result).toBe("es-co");
        });
        it('Should return base language if no navigator langauge.', () => {
            mockMDHLanguage = "en";
            jest.spyOn(navigator, 'language', 'get').mockReturnValue('');
            const result = getIntlLocale();
            expect(result).toBe("en");
        });
        it('Should return en-US if no language specified.', () => {
            mockMDHLanguage = "";
            const result = getIntlLocale();
            expect(result).toBe("en-us");
        });
    });

    describe('getDateLocale', () => {        
        it('Should use MDH language if it has a locale.', () => {            
            mockMDHLanguage = "en-AU";
            const result = getDateLocale();
            expect(result).toBe(enAU);
        });
        it('Should use navigator language if MDH has no locale.', () => {
            mockMDHLanguage = "en";
            jest.spyOn(navigator, 'language', 'get').mockReturnValue('en-GB');
            const result = getDateLocale();
            expect(result).toBe(enGB);
        });
        it('Should support multiple locales based on navigator language.', () => {
            mockMDHLanguage = "en";
            jest.spyOn(navigator, 'language', 'get').mockReturnValue('en-CA');
            const result = getDateLocale();
            expect(result).toBe(enCA);
        });
        it('Should use base language if no navigator langauge.', () => {
            mockMDHLanguage = "es";
            jest.spyOn(navigator, 'language', 'get').mockReturnValue('');
            const result = getDateLocale();
            expect(result).toBe(es);
        });
        it('Should use en-US if no language specified.', () => {
            mockMDHLanguage = "";
            const result = getDateLocale();
            expect(result).toBe(enUS);
        });
    });

});