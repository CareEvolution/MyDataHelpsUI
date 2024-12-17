import { getCountryCodeFromIso } from '../../../src/helpers/language';
import { describe, it } from '@jest/globals';

describe('Language Tests', () => {
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
});