export interface OverviewValueEvaluator {
    evaluate: (value: number) => boolean;
}

export const createMinMaxOverviewValueEvaluator = (minimumGoodValue: number, maximumGoodValue?: number): OverviewValueEvaluator => {
    return {
        evaluate: value => maximumGoodValue !== undefined ? value >= minimumGoodValue && value <= maximumGoodValue : value >= minimumGoodValue
    };
};