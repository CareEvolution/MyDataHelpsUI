export interface InsightMatrixValueCalculator {
    calculate: (thresholdDays: string[], values: number[]) => number | undefined;
}

export const createAverageValueInsightMatrixValueCalculator = (): InsightMatrixValueCalculator => {
    return {
        calculate: (_: string[], values: number[]) => {
            const nonZeroValues = values.filter(v => v > 0);
            return nonZeroValues.length > 0 ? nonZeroValues.reduce((total, current) => total + current, 0) / nonZeroValues.length : undefined;
        }
    };
};

export const createPercentageOfDaysInsightMatrixValueCalculator = (): InsightMatrixValueCalculator => {
    return {
        calculate: (thresholdDays: string[], values: number[]) => {
            if (thresholdDays.length === 0) {
                return undefined;
            }
            return (values.filter(v => v > 0).length * 100.0) / thresholdDays.length;
        }
    };
};