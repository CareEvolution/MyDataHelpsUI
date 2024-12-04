import { createIntegerInsightMatrixValueFormatter, createMinutesToHoursInsightMatrixValueFormatter, createShrinkThousandsInsightMatrixValueFormatter } from '../../../src/helpers/insight-matrix/value-formatter';
import { describe, it } from '@jest/globals';

jest.mock('@careevolution/mydatahelps-js', () => {
    return {
        __esModule: true,
        default: {
            getCurrentLanguage:  jest.fn(() => { return "en-US"; })
        }
    }
});

describe('Insight Matrix - Value Evaluator Tests', () => {
    describe('Shrink Thousands Formatter', () => {
        it('Should return values less than 1000 as they were.', () => {
            const formatter = createShrinkThousandsInsightMatrixValueFormatter();
            const result = formatter.format(521);
            expect(result).toBe('521');
        });
        it('Should return values greater than or equal to 1000 in a compact format.', () => {
            const formatter = createShrinkThousandsInsightMatrixValueFormatter();
            const result = formatter.format(5218);
            expect(result).toBe('5.2k');
        });
    });

    describe('Minutes To Hours Formatter', () => {
        it('Should return the value in hours instead of minutes.', () => {
            const formatter = createMinutesToHoursInsightMatrixValueFormatter();
            const result = formatter.format(521);
            expect(result).toBe('8.7h');
        });
    });

    describe('Integer Formatter', () => {
        it('Should return the value as a whole number.', () => {
            const formatter = createIntegerInsightMatrixValueFormatter();
            expect(formatter.format(21.28)).toBe('21');
            expect(formatter.format(21.51)).toBe('22');
        });
        it('Should return the value with a suffix when specified.', () => {
            const formatter = createIntegerInsightMatrixValueFormatter('%');
            const result = formatter.format(21.28);
            expect(result).toBe('21%');
        });
    });
});