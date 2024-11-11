import { createAverageValueInsightMatrixValueCalculator, createPercentageOfDaysInsightMatrixValueCalculator, getDayKey } from '../../../src';
import { add, startOfToday } from 'date-fns';

describe('Insight Matrix - Value Calculator Tests', () => {

    const thresholdDays = Array(10).fill(0).map((_, index) => getDayKey(add(startOfToday(), { days: -index })));

    describe('Average Value Calculator', () => {
        it('Should return the average of the non-zero values.', () => {
            const calculator = createAverageValueInsightMatrixValueCalculator();
            const result = calculator.calculate(thresholdDays, [10, 0, 20, 0, 30, 0, 40]);
            expect(result).toBe(25);
        });
        it('Should return undefined if there are no non-zero values.', () => {
            const calculator = createAverageValueInsightMatrixValueCalculator();
            const result = calculator.calculate(thresholdDays, [0, 0, 0]);
            expect(result).toBe(undefined);
        });
    });

    describe('Percentage Of Days Calculator', () => {
        it('Should return the percentage of non-zero values to threshold days.', () => {
            const calculator = createPercentageOfDaysInsightMatrixValueCalculator();
            const result = calculator.calculate(thresholdDays, [10, 0, 20, 0, 30, 0, 40]);
            expect(result).toBe(40);
        });
        it('Should return 0 if there are no values.', () => {
            const calculator = createPercentageOfDaysInsightMatrixValueCalculator();
            const result = calculator.calculate(thresholdDays, []);
            expect(result).toBe(0);
        });
        it('Should return undefined if there are no threshold days.', () => {
            const calculator = createPercentageOfDaysInsightMatrixValueCalculator();
            const result = calculator.calculate([], []);
            expect(result).toBe(undefined);
        });
    });
});
