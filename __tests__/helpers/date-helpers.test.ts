import { describe, expect, it } from '@jest/globals';
import { isEqual } from 'date-fns';
import { parseISOWithoutOffset } from '../../src/helpers/date-helpers';

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
});
