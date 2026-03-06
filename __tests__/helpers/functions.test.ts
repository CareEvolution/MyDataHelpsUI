import { describe, expect, it } from '@jest/globals';
import { safeEntries, safeValues } from '../../src/helpers/functions';

describe('Helper Function Tests', () => {
    describe('safeValues', () => {
        it('Should return empty array for undefined.', () => {
            expect(safeValues(undefined)).toEqual([]);
        });

        it('Should filter out null and undefined values.', () => {
            const input = { a: 1, b: 0, c: '', d: null, e: undefined, f: 2 };
            expect(safeValues(input)).toEqual([1, 0, '', 2]);
        });
    });

    describe('safeEntries', () => {
        it('Should return empty array for undefined.', () => {
            expect(safeEntries(undefined)).toEqual([]);
        });

        it('Should filter out null and undefined values and preserves keys.', () => {
            const input = { a: 1, b: 0, c: '', d: null, e: undefined, f: 2 };
            expect(safeEntries(input)).toEqual([['a', 1], ['b', 0], ['c', ''], ['f', 2]]);
        });
    });
});
