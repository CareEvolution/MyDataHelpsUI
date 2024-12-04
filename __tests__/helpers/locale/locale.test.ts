/**
 * @jest-environment jsdom
 */
import { getIntlLocale, getDateLocale, formatNumberForLocale, formatDateForLocale, formatMinutesForLocale } from '../../../src/helpers/locale';
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

    describe('formatNumberForLocale', () => {        
        it('Should format a decimal number for a locale with period separator.', () => {            
            mockMDHLanguage = "en-US";
            const result = formatNumberForLocale(0.4, 1);
            expect(result).toBe("0.4");
        });
        it('Should format a decimal number for a locale with comma separator.', () => {            
            mockMDHLanguage = "de-DE";
            const result = formatNumberForLocale(0.4, 1);
            expect(result).toBe("0,4");
        });
        it('Should format a big number for a locale with comma separator.', () => {            
            mockMDHLanguage = "en-US";
            const result = formatNumberForLocale(1104200);
            expect(result).toBe("1,104,200");
        });
        it('Should format a big number for a locale with period separator.', () => {            
            mockMDHLanguage = "de-DE";
            const result = formatNumberForLocale(1104200);
            expect(result).toBe("1.104.200");
        });
        it('Should format number with the specified precision.', () => {            
            mockMDHLanguage = "en-US";
            let result = formatNumberForLocale(0.1234, 2);
            expect(result).toBe("0.12");

            result = formatNumberForLocale(0.1234, 1);
            expect(result).toBe("0.1");

            result = formatNumberForLocale(0.1234, 0);
            expect(result).toBe("0");
        });
        it('Should format zero.', () => {            
            mockMDHLanguage = "en-US";
            const result = formatNumberForLocale(0);
            expect(result).toBe("0");
        });
        it('Should format undef as empty string.', () => {            
            mockMDHLanguage = "en-US";
            const result = formatNumberForLocale(undefined);
            expect(result).toBe("");
        });
    });

    describe('formatDateForLocale', () => {        
        it('Should format a US style date MM/DD/YYYY.', () => {            
            mockMDHLanguage = "en-US";
            const result = formatDateForLocale(new Date(2024, 10, 15), "P");
            expect(result).toBe("11/15/2024");
        });
        it('Should format a Euro style date DD.MM.YYYY.', () => {            
            mockMDHLanguage = "de-DE";
            const result = formatDateForLocale(new Date(2024, 10, 15), "P");
            expect(result).toBe("15.11.2024");
        });
        it('Should capitalize the date string by default.', () => {            
            mockMDHLanguage = "es";
            const result = formatDateForLocale(new Date(2024, 10, 15), "LLLL");
            expect(result).toBe("Noviembre");
        });
        it('Should allow you to not auto-capitalize the date string.', () => {            
            mockMDHLanguage = "es";
            const result = formatDateForLocale(new Date(2024, 10, 15), "LLLL", false);
            expect(result).toBe("noviembre");
        });
        it('Should capitalize anyway in languages where dates use proper nouns.', () => {            
            mockMDHLanguage = "en-US";
            const result = formatDateForLocale(new Date(2024, 10, 15), "LLLL", false);
            expect(result).toBe("November");
        });
    });

    describe('formatMinutesForLocale', () => {        
        it('Should format minutes only.', () => {            
            mockMDHLanguage = "en-US";
            const result = formatMinutesForLocale(45);
            expect(result).toBe("45m");
        });
        it('Should format hours/minutes.', () => {            
            mockMDHLanguage = "en-US";
            const result = formatMinutesForLocale(94);
            expect(result).toBe("1h 34m");
        });
        it('Should format by locale.', () => {            
            mockMDHLanguage = "de-DE";
            const result = formatMinutesForLocale(94);
            expect(result).toBe("1 Std. 34 Min.");
        });        
    });

});