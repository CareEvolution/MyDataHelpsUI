import { createMinMaxInsightMatrixValueEvaluator } from '../../../src/helpers/insight-matrix/value-evaluator';

describe('Insight Matrix - Value Evaluator Tests', () => {
    describe('Min Max Evaluator', () => {
        it('Should return true if the value is greater than or equal to the minimum good value.', () => {
            const evaluator = createMinMaxInsightMatrixValueEvaluator(10);
            expect(evaluator.evaluate(5)).toBe(false);
            expect(evaluator.evaluate(10)).toBe(true);
            expect(evaluator.evaluate(15)).toBe(true);
        });
        it('Should return true if the value is greater than or equal to the minimum good value and less than or equal to the maximum good value.', () => {
            const evaluator = createMinMaxInsightMatrixValueEvaluator(10, 20);
            expect(evaluator.evaluate(5)).toBe(false);
            expect(evaluator.evaluate(10)).toBe(true);
            expect(evaluator.evaluate(15)).toBe(true);
            expect(evaluator.evaluate(20)).toBe(true);
            expect(evaluator.evaluate(25)).toBe(false);
        });
    });
});