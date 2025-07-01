import { describe, expect, it } from '@jest/globals';
import { isEqual } from 'date-fns';
import { getDateAndTimeString, parseISOWithoutOffset } from '../../src/helpers/date-helpers';

jest.mock('@careevolution/mydatahelps-js', () => ({
    __esModule: true,
    default: {
        getCurrentLanguage: jest.fn(() => 'en')
    }
}));

describe('Date Helpers', () => {
    describe('parseISOWithoutOffset', () => {
        it('Should parse dates, ignoring the offset.', () => {
            const date1 = parseISOWithoutOffset('2025-03-14T13:22:04-04:00');
            const date2 = parseISOWithoutOffset('2025-03-14T13:22:04-06:00');
            const date3 = parseISOWithoutOffset('2025-03-14T13:22:04');

            expect(isEqual(date1, date2)).toBe(true);
            expect(isEqual(date2, date3)).toBe(true);
        });
    });

    describe('getDateAndTimeString', () => {
        it('Should return a date and time string that includes the full month, day, year, and time.', () => {
            const date = new Date(2024, 3, 29, 23);

            const result = getDateAndTimeString(date);

            expect(result).toBe('April 29th, 2024 at 11:00 PM');
        });
    });
});
