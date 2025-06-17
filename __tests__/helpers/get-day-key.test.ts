import { describe, expect, it } from '@jest/globals';
import { parseISOWithoutOffset } from '../../src/helpers/date-helpers';
import getDayKey from '../../src/helpers/get-day-key';

describe('Get Day Key', () => {
    it('Should return the date portion of a date string.', () => {
        const someDate = '2025-03-14T13:22:04-04:00';
        expect(getDayKey(someDate)).toBe('2025-03-14');
    });

    it('Should return the date portion of a date.', () => {
        const someDate = parseISOWithoutOffset('2025-03-14T13:22:04-04:00');
        expect(getDayKey(someDate)).toBe('2025-03-14');
    });
});
