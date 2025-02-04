/**
 * @jest-environment jsdom
 */
import { toDate, daysInMonth, getDayOfWeek, getDayOfWeekLetter, 
    getAbbreviatedDayOfWeek, getDayAndDateAndTimeString, getFullDayAndDateString,
    getFullDateString, getLongDateString, getShortDateString, getShortestDateString,
    getMonthName, getAbbreviatedMonthName, getTimeFromNowString,
    getRelativeDateString, getTimeOfDayString, getShortTimeOfDayString, getDayOfMonth } from '../../../src/helpers/date-helpers';
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

// Note: Most of these methods just pass through to date-fns. We are not
// trying to unit test that entire library. These tests merely verify that we're calling it
// correctly to get the expected result.
describe('Date Helper Tests', () => {

    // Note: Date() uses 0-indexed months
    describe('toDate', () => {        
        it('Should pass through an actual date.', () => {            
            const result = toDate(new Date(2024, 10, 15));
            expect(result).toStrictEqual(new Date(2024, 10, 15));
        });
        it('Should parse an empty string.', () => {
            const result = toDate("");
            expect(result).toBe(undefined);
        });
        it('Should parse something not a date at all.', () => {
            const result = toDate("not a date");
            expect(result).toBe(undefined);
        });
        it('Should parse an invalid date string.', () => {
            const result = toDate("2024-14-99");
            expect(result).toBe(undefined);
        });
        it('Should return base language if no browser language.', () => {
            const result = toDate("2024-11-15");
            expect(result).toStrictEqual(new Date(2024, 10, 15));
        });
    });

    describe('daysInMonth', () => {        
        it('Should return days in a month.', () => {            
            const result = daysInMonth(2024, 10);
            expect(result).toBe(30);
        });
    });

    describe('getDayOfWeek', () => {        
        it('Should return a day.', () => {            
            mockMDHLanguage = "en";
            const result = getDayOfWeek(new Date(2024, 11, 5));
            expect(result).toBe("Thursday");
        });
        it('Should return a localized day.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getDayOfWeek(new Date(2024, 11, 5));
            expect(result).toBe("Donnerstag");
        });
        it('Should return today.', () => {            
            mockMDHLanguage = "en";
            const result = getDayOfWeek(new Date());
            expect(result).toBe("Today");
        });
        it('Should return localized today.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getDayOfWeek(new Date());
            expect(result).toBe("Heute");
        });
        it('Should return yesterday.', () => {            
            mockMDHLanguage = "en";
            const result = getDayOfWeek(new Date(new Date().setDate(new Date().getDate()-1)));
            expect(result).toBe("Yesterday");
        });
        it('Should return localized yesterday.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getDayOfWeek(new Date(new Date().setDate(new Date().getDate()-1)));
            expect(result).toBe("Gestern");
        });
    });

    describe('getDayOfWeekLetter', () => {        
        it('Should return a single day letter.', () => {            
            mockMDHLanguage = "en";
            const result = getDayOfWeekLetter(new Date(2024, 11, 5));
            expect(result).toBe("T");
        });
        it('Should return a localized single day letter.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getDayOfWeekLetter(new Date(2024, 11, 5));
            expect(result).toBe("D");
        });
    });

    describe('getDayOfMonth', () => {        
        it('Should return a day number.', () => {            
            mockMDHLanguage = "en";
            const result = getDayOfMonth(new Date(2024, 11, 5));
            expect(result).toBe("5");
        });
        it('Should not be affected by localization.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getDayOfMonth(new Date(2024, 11, 5));
            expect(result).toBe("5");
        });
    });

    describe('getAbbreviatedDayOfWeek', () => {        
        it('Should return an abbreviated day.', () => {            
            mockMDHLanguage = "en";
            const result = getAbbreviatedDayOfWeek(new Date(2024, 11, 5));
            expect(result).toBe("Th");
        });
        it('Should return a localized abbreviated day.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getAbbreviatedDayOfWeek(new Date(2024, 11, 5));
            expect(result).toBe("Do");
        });
    });    

    describe('getDayAndDateAndTimeString', () => {        
        it('Should return an English date string.', () => {            
            mockMDHLanguage = "en";
            const result = getDayAndDateAndTimeString(new Date(2024, 11, 5, 3, 24));
            expect(result).toBe("Thursday, December 5th, 2024 at 3:24 AM");
        });
        it('Should return a localized date string.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getDayAndDateAndTimeString(new Date(2024, 11, 5, 3, 24));
            expect(result).toBe("Donnerstag, 5. Dezember 2024 um 03:24");
        });
    });

    describe('getFullDayAndDateString', () => {        
        it('Should return an English date string.', () => {            
            mockMDHLanguage = "en";
            const result = getFullDayAndDateString(new Date(2024, 11, 5));
            expect(result).toBe("Thursday, December 5th, 2024");
        });
        it('Should return a localized date string.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getFullDayAndDateString(new Date(2024, 11, 5));
            expect(result).toBe("Donnerstag, 5. Dezember 2024");
        });
    }); 

    describe('getFullDateString', () => {        
        it('Should return an English date string.', () => {            
            mockMDHLanguage = "en";
            const result = getFullDateString(new Date(2024, 11, 5));
            expect(result).toBe("December 5th, 2024");
        });
        it('Should return a localized date string.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getFullDateString(new Date(2024, 11, 5));
            expect(result).toBe("5. Dezember 2024");
        });
    });  

    describe('getLongDateString', () => {        
        it('Should return an English date string.', () => {            
            mockMDHLanguage = "en";
            const result = getLongDateString(new Date(2024, 11, 5));
            expect(result).toBe("Dec 5, 2024");
        });
        it('Should return a localized date string.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getLongDateString(new Date(2024, 11, 5));
            expect(result).toBe("5. Dez. 2024");
        });
    });  

    describe('getShortDateString', () => {        
        it('Should return an English date string.', () => {            
            mockMDHLanguage = "en";
            const result = getShortDateString(new Date(2024, 11, 5));
            expect(result).toBe("12/05/2024");
        });
        it('Should return a localized date string.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getShortDateString(new Date(2024, 11, 5));
            expect(result).toBe("05.12.2024");
        });
    });

    describe('getShortestDateString', () => {        
        it('Should return an English date string.', () => {            
            mockMDHLanguage = "en";
            const result = getShortestDateString(new Date(2024, 11, 5));
            expect(result).toBe("12/5");
        });
        it('Should return a localized date string.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getShortestDateString(new Date(2024, 11, 5));
            expect(result).toBe("5.12.");
        });
    });   

    describe('getMonthName', () => {        
        it('Should return an English month name.', () => {            
            mockMDHLanguage = "en";
            const result = getMonthName(new Date(2024, 11, 5));
            expect(result).toBe("December");
        });
        it('Should return a localized month name.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getMonthName(new Date(2024, 11, 5));
            expect(result).toBe("Dezember");
        });
    });

    describe('getAbbreviatedMonthName', () => {        
        it('Should return an English month name.', () => {            
            mockMDHLanguage = "en";
            const result = getAbbreviatedMonthName(new Date(2024, 11, 5));
            expect(result).toBe("Dec");
        });
        it('Should return a localized month name.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getAbbreviatedMonthName(new Date(2024, 11, 5));
            expect(result).toBe("Dez");
        });
    }); 

    describe('getTimeFromNowString', () => {        
        it('Should return an English time string.', () => {            
            mockMDHLanguage = "en";
            const result = getTimeFromNowString(new Date(new Date().setDate(new Date().getDate()+1)));
            expect(result).toBe("1 day");
        });
        it('Should return a localized time string.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getTimeFromNowString(new Date(new Date().setDate(new Date().getDate()+1)));
            expect(result).toBe("1 Tag");
        });
    });

    describe('getRelativeDateString', () => {        
        it('Should return an English time string.', () => {            
            mockMDHLanguage = "en";
            const result = getRelativeDateString(new Date(2024, 11, 4, 3, 22), new Date(2024, 11, 5));
            expect(result).toBe("Yesterday at 3:22 AM");
        });
        it('Should return a localized time string.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getRelativeDateString(new Date(2024, 11, 4, 3, 22), new Date(2024, 11, 5));
            expect(result).toBe("Gestern um 03:22");
        });
    }); 

    describe('getTimeOfDayString', () => {        
        it('Should return an English time string.', () => {            
            mockMDHLanguage = "en";
            const result = getTimeOfDayString(new Date(2024, 11, 4, 3, 22));
            expect(result).toBe("3:22 AM");
        });
        it('Should return a localized time string.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getTimeOfDayString(new Date(2024, 11, 4, 3, 22));
            expect(result).toBe("03:22");
        });
        it('Should return an empty string if missing a time.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getTimeOfDayString(new Date(2024, 11, 4));
            expect(result).toBe("");
        });
    });
    
    describe('getShortTimeOfDayString', () => {        
        it('Should return an English short time string.', () => {            
            mockMDHLanguage = "en";
            const result = getShortTimeOfDayString(new Date(2024, 11, 4, 3, 22));
            expect(result).toBe("3 AM");
        });
        it('Should return a localized short time string.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getShortTimeOfDayString(new Date(2024, 11, 4, 3, 22));
            expect(result).toBe("03:22");
        });
        it('Should return an empty string if missing a time.', () => {            
            mockMDHLanguage = "de-DE";
            const result = getShortTimeOfDayString(new Date(2024, 11, 4));
            expect(result).toBe("");
        });
    });
});
