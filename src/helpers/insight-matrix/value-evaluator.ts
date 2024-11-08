export interface InsightMatrixValueEvaluator {
    evaluate: (value: number) => boolean;
}

export const createMinMaxInsightMatrixValueEvaluator = (minimumGoodValue: number, maximumGoodValue?: number): InsightMatrixValueEvaluator => {
    return {
        evaluate: value => maximumGoodValue !== undefined ? value >= minimumGoodValue && value <= maximumGoodValue : value >= minimumGoodValue
    };
};