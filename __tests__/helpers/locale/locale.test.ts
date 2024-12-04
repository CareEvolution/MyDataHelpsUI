/**
 * @jest-environment jsdom
 */
import { getIntlLocale, getDateLocale } from '../../../src/helpers/locale';
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

    describe('getIntlLocale', () => {        
        it('Should use MDH language if it has a country code.', () => {            
            mockMDHLanguage = "en-GB";
            const result = getIntlLocale();
            expect(result).toBe("en-gb");
        });
        it('Should return browser language if MDH has no country.', () => {
            mockMDHLanguage = "es";
            jest.spyOn(navigator, 'language', 'get').mockReturnValue('es-CO');
            const result = getIntlLocale();
            expect(result).toBe("es-co");
        });
        it('Should return base language if no browser langauge.', () => {
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
        it('Should use MDH language if it has a country code.', () => {            
            mockMDHLanguage = "en-AU";
            const result = getDateLocale();
            expect(result).toBe(enAU);
        });
        it('Should use browser language if MDH has no country.', () => {
            mockMDHLanguage = "en";
            jest.spyOn(navigator, 'language', 'get').mockReturnValue('en-GB');
            const result = getDateLocale();
            expect(result).toBe(enGB);
        });
        it('Should switch between locales based on browser country code.', () => {
            mockMDHLanguage = "en";
            jest.spyOn(navigator, 'language', 'get').mockReturnValue('en-CA');
            const result = getDateLocale();
            expect(result).toBe(enCA);
        });
        it('Should use default locale for language if browser has unsupported country.', () => {
            mockMDHLanguage = "en";
            jest.spyOn(navigator, 'language', 'get').mockReturnValue('en-XX');
            const result = getDateLocale();
            expect(result).toBe(enUS);
        });     
        it('Should use browser locale even if it set to a different (supported) language.', () => {
            mockMDHLanguage = "en";
            jest.spyOn(navigator, 'language', 'get').mockReturnValue('es-es');
            const result = getDateLocale();
            expect(result).toBe(es);
        });
        it('Should use base language if browser is set to an unsupported language.', () => {
            mockMDHLanguage = "en";
            jest.spyOn(navigator, 'language', 'get').mockReturnValue('xx-yy');
            const result = getDateLocale();
            expect(result).toBe(enUS);
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